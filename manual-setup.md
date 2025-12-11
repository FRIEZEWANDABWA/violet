# Manual VPS Setup (Step by Step)

If you prefer to run commands manually instead of using the automated script:

## 1. Initial Server Setup

```bash
# Update system
apt update && apt upgrade -y

# Install essential packages
apt install -y curl wget git unzip software-properties-common apt-transport-https ca-certificates gnupg lsb-release ufw fail2ban nginx
```

## 2. Install Docker

```bash
# Add Docker repository
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Install Docker
apt update
apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose
```

## 3. Configure Firewall

```bash
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow 'Nginx Full'
ufw --force enable
```

## 4. Setup Website

```bash
# Create directory
mkdir -p /var/www/yourdomain.com
cd /var/www/yourdomain.com

# Clone website
git clone https://github.com/FRIEZEWANDABWA/violet.git .

# Set permissions
chown -R www-data:www-data /var/www/yourdomain.com
chmod -R 755 /var/www/yourdomain.com
```

## 5. Configure Nginx for Website

```bash
# Create Nginx config
cat > /etc/nginx/sites-available/yourdomain.com << 'EOF'
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/yourdomain.com;
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
        try_files $uri $uri/ =404;
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
```

## 6. Setup n8n

```bash
# Create n8n directory
mkdir -p /opt/n8n
cd /opt/n8n

# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
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
      - N8N_BASIC_AUTH_PASSWORD=${N8N_PASSWORD}
      - N8N_HOST=${N8N_HOST}
      - N8N_PORT=5678
      - N8N_PROTOCOL=https
      - NODE_ENV=production
      - WEBHOOK_URL=https://${N8N_HOST}/
      - GENERIC_TIMEZONE=Africa/Nairobi
    volumes:
      - n8n_data:/home/node/.n8n
      - /var/run/docker.sock:/var/run/docker.sock

volumes:
  n8n_data:
EOF

# Create environment file
cat > .env << EOF
N8N_HOST=n8n.yourdomain.com
N8N_PASSWORD=$(openssl rand -base64 32)
EOF
```

## 7. Configure Nginx for n8n

```bash
cat > /etc/nginx/sites-available/n8n.yourdomain.com << 'EOF'
server {
    listen 80;
    server_name n8n.yourdomain.com;

    location / {
        proxy_pass http://localhost:5678;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }
}
EOF

# Enable n8n site
ln -sf /etc/nginx/sites-available/n8n.yourdomain.com /etc/nginx/sites-enabled/
```

## 8. Start Services

```bash
# Test and restart Nginx
nginx -t
systemctl restart nginx
systemctl enable nginx

# Start n8n
cd /opt/n8n
docker-compose up -d
```

## 9. Setup SSL Certificates

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get certificates
certbot --nginx -d yourdomain.com -d www.yourdomain.com --non-interactive --agree-tos --email your@email.com
certbot --nginx -d n8n.yourdomain.com --non-interactive --agree-tos --email your@email.com

# Setup auto-renewal
(crontab -l 2>/dev/null; echo "0 12 * * * /usr/bin/certbot renew --quiet") | crontab -
```

## 10. Security & Monitoring

```bash
# Configure fail2ban
cat > /etc/fail2ban/jail.local << 'EOF'
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
```

## 11. Setup Backups

```bash
# Create backup script
cat > /usr/local/bin/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup website
tar -czf $BACKUP_DIR/website_$DATE.tar.gz -C /var/www/yourdomain.com .

# Backup n8n
docker-compose -f /opt/n8n/docker-compose.yml exec -T n8n n8n export:workflow --backup --output=/tmp/n8n_backup_$DATE.json
docker cp n8n:/tmp/n8n_backup_$DATE.json $BACKUP_DIR/

# Keep only last 7 days
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
find $BACKUP_DIR -name "*.json" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

chmod +x /usr/local/bin/backup.sh

# Schedule daily backups
(crontab -l 2>/dev/null; echo "0 2 * * * /usr/local/bin/backup.sh") | crontab -
```

**Replace `yourdomain.com` with your actual domain throughout the commands.**