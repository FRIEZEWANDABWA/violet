# OZONE I.T SYSTEM - VPS Quick Setup Guide

## Prerequisites
- Hostinger KVM VPS with Ubuntu 20.04/22.04
- Domain name pointed to your VPS IP
- Root access to your server

## One-Command Setup

### Step 1: Connect to your VPS
```bash
ssh root@YOUR_VPS_IP
```

### Step 2: Download and run setup script
```bash
curl -sSL https://raw.githubusercontent.com/FRIEZEWANDABWA/violet/master/server-setup.sh | bash
```

**OR** if you prefer to review the script first:
```bash
wget https://raw.githubusercontent.com/FRIEZEWANDABWA/violet/master/server-setup.sh
chmod +x server-setup.sh
./server-setup.sh
```

## What the script will ask you:
1. **Domain name** (e.g., ozoneitsystem.com)
2. **Email** for SSL certificates
3. **n8n subdomain** (e.g., n8n for n8n.ozoneitsystem.com)

## What gets installed:
- ✅ Your OZONE website
- ✅ n8n automation server
- ✅ Nginx web server
- ✅ SSL certificates (Let's Encrypt)
- ✅ Docker & Docker Compose
- ✅ Firewall (UFW)
- ✅ Fail2ban security
- ✅ Automated backups
- ✅ Auto SSL renewal

## After Setup:
- **Website**: https://yourdomain.com
- **n8n**: https://n8n.yourdomain.com
- **n8n credentials**: `/opt/n8n/.env`

## Management Commands:
```bash
# Restart n8n
cd /opt/n8n && docker-compose restart

# View n8n logs
cd /opt/n8n && docker-compose logs -f

# Manual backup
/usr/local/bin/backup.sh

# Check SSL certificates
certbot certificates

# Restart Nginx
systemctl restart nginx
```

## Troubleshooting:
```bash
# Check services status
systemctl status nginx
docker ps

# Check logs
journalctl -u nginx -f
docker logs n8n

# Test Nginx config
nginx -t
```

## Security Features:
- Firewall configured (SSH, HTTP, HTTPS only)
- Fail2ban protection against brute force
- SSL certificates with auto-renewal
- Security headers configured
- Basic authentication for n8n

## Backup Schedule:
- Daily automated backups at 2 AM
- Backups stored in `/opt/backups/`
- 7-day retention policy

---

**Total setup time: ~10-15 minutes**
**No manual configuration needed!**