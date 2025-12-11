#!/bin/bash

# OZONE I.T SYSTEM - Complete VPS Setup Script
# This script sets up Ubuntu server with Nginx, your website, and n8n

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}🚀 OZONE I.T SYSTEM - VPS Setup Starting...${NC}"

# Get user input
read -p "Enter your domain name (e.g., ozoneitsystem.com): " DOMAIN
read -p "Enter your email for SSL certificates: " EMAIL
read -p "Enter n8n subdomain (e.g., n8n): " N8N_SUBDOMAIN

N8N_DOMAIN="${N8N_SUBDOMAIN}.${DOMAIN}"

echo -e "${YELLOW}📋 Configuration:${NC}"
echo "Website: https://$DOMAIN"
echo "n8n: https://$N8N_DOMAIN"
echo "Email: $EMAIL"
echo ""

# Update system
echo -e "${GREEN}📦 Updating system packages...${NC}"
apt update && apt upgrade -y

# Install essential packages
echo -e "${GREEN}🔧 Installing essential packages...${NC}"
apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release ufw fail2ban

# Install Docker
echo -e "${GREEN}🐳 Installing Docker...${NC}"
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Install Docker Compose
echo -e "${GREEN}📦 Installing Docker Compose...${NC}"
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install Nginx
echo -e "${GREEN}🌐 Installing Nginx...${NC}"
apt install -y nginx

# Install Certbot
echo -e "${GREEN}🔒 Installing Certbot...${NC}"
apt install -y certbot python3-certbot-nginx

# Configure firewall
echo -e "${GREEN}🔥 Configuring firewall...${NC}"
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable

# Create project directory
echo -e "${GREEN}📁 Setting up directories...${NC}"
mkdir -p /var/www/$DOMAIN
mkdir -p /opt/n8n

# Clone website
echo -e "${GREEN}📥 Cloning website...${NC}"
cd /var/www/$DOMAIN
git clone https://github.com/FRIEZEWANDABWA/violet.git .
chown -R www-data:www-data /var/www/$DOMAIN
chmod -R 755 /var/www/$DOMAIN

# Create Nginx config for website
echo -e "${GREEN}⚙️ Configuring Nginx for website...${NC}"
cat > /etc/nginx/sites-available/$DOMAIN << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;
    root /var/www/$DOMAIN;
    index index.html index.htm;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Cache static files
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files \$uri \$uri/ =404;
    }
}
EOF

# Create Nginx config for n8n
echo -e "${GREEN}⚙️ Configuring Nginx for n8n...${NC}"
cat > /etc/nginx/sites-available/$N8N_DOMAIN << EOF
server {
    listen 80;
    server_name $N8N_DOMAIN;

    location / {
        proxy_pass http://localhost:5678;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_read_timeout 86400;
    }
}
EOF

# Enable sites
ln -sf /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/
ln -sf /etc/nginx/sites-available/$N8N_DOMAIN /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default

# Test Nginx config
nginx -t

# Restart Nginx
systemctl restart nginx
systemctl enable nginx

# Setup n8n with Docker Compose
echo -e "${GREEN}🤖 Setting up n8n...${NC}"
cd /opt/n8n

cat > docker-compose.yml << EOF
version: '3.8'

services:
  n8n:
    image: n8nio/n8n:latest
    container_name: n8n
    restart: unless-stopped
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=\${N8N_PASSWORD}
      - N8N_HOST=\${N8N_HOST}
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - NODE_ENV=production
      - WEBHOOK_URL=https://\${N8N_HOST}/
      - GENERIC_TIMEZONE=Africa/Nairobi
    volumes:
      - n8n_data:/home/node/.n8n
      - /var/run/docker.sock:/var/run/docker.sock

volumes:
  n8n_data:
EOF

# Create environment file
cat > .env << EOF
N8N_HOST=$N8N_DOMAIN
N8N_PASSWORD=$(openssl rand -base64 32)
EOF

echo -e "${GREEN}🔑 n8n credentials created in /opt/n8n/.env${NC}"

# Start n8n
docker-compose up -d

# Wait for services to start
echo -e "${YELLOW}⏳ Waiting for services to start...${NC}"
sleep 30

# Get SSL certificates
echo -e "${GREEN}🔒 Getting SSL certificates...${NC}"
certbot --nginx -d $DOMAIN -d www.$DOMAIN --non-interactive --agree-tos --email $EMAIL
certbot --nginx -d $N8N_DOMAIN --non-interactive --agree-tos --email $EMAIL

# Setup auto-renewal
echo -e "${GREEN}🔄 Setting up SSL auto-renewal...${NC}"
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -

# Configure fail2ban
echo -e "${GREEN}🛡️ Configuring fail2ban...${NC}"
cat > /etc/fail2ban/jail.local << EOF
[DEFAULT]
bantime = 3600
findtime = 600
maxretry = 3

[sshd]
enabled = true

[nginx-http-auth]
enabled = true

[nginx-limit-req]
enabled = true
EOF

systemctl restart fail2ban
systemctl enable fail2ban

# Create backup script
echo -e "${GREEN}💾 Creating backup script...${NC}"
cat > /usr/local/bin/backup.sh << EOF
#!/bin/bash
BACKUP_DIR="/opt/backups"
DATE=\$(date +%Y%m%d_%H%M%S)

mkdir -p \$BACKUP_DIR

# Backup website
tar -czf \$BACKUP_DIR/website_\$DATE.tar.gz -C /var/www/$DOMAIN .

# Backup n8n
docker-compose -f /opt/n8n/docker-compose.yml exec -T n8n n8n export:workflow --backup --output=/tmp/n8n_backup_\$DATE.json
docker cp n8n:/tmp/n8n_backup_\$DATE.json \$BACKUP_DIR/

# Keep only last 7 days of backups
find \$BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find \$BACKUP_DIR -name "*.json" -mtime +7 -delete

echo "Backup completed: \$DATE"
EOF

chmod +x /usr/local/bin/backup.sh

# Schedule daily backups
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup.sh") | crontab -

# Final status check
echo -e "${GREEN}🔍 Final status check...${NC}"
systemctl status nginx --no-pager
docker ps

echo -e "${GREEN}✅ Setup completed successfully!${NC}"
echo ""
echo -e "${YELLOW}📋 Access Information:${NC}"
echo "Website: https://$DOMAIN"
echo "n8n: https://$N8N_DOMAIN"
echo "n8n credentials: /opt/n8n/.env"
echo ""
echo -e "${YELLOW}🔧 Management Commands:${NC}"
echo "Restart n8n: cd /opt/n8n && docker-compose restart"
echo "View n8n logs: cd /opt/n8n && docker-compose logs -f"
echo "Backup: /usr/local/bin/backup.sh"
echo ""
echo -e "${GREEN}🎉 Your server is ready!${NC}"