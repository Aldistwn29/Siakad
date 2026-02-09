# Deployment Checklist - Siakad Academic Information System

## Pre-Deployment Configuration

### 1. Environment Configuration
- [ ] Copy `.env.example` to `.env`
- [ ] Set `APP_ENV=production`
- [ ] Set `APP_DEBUG=false` (Critical: Never enable debug in production)
- [ ] Generate application key: `php artisan key:generate`
- [ ] Set proper `APP_URL` to your production domain

### 2. Database Configuration
- [ ] Use MySQL or PostgreSQL (not SQLite) for production
- [ ] Configure `DB_CONNECTION`, `DB_HOST`, `DB_PORT`, `DB_DATABASE`
- [ ] Set secure database credentials (`DB_USERNAME`, `DB_PASSWORD`)
- [ ] Test database connection before deployment

### 3. Security Settings
- [ ] Set `SESSION_ENCRYPT=true`
- [ ] Configure `SESSION_LIFETIME` appropriately (default: 480 minutes/8 hours)
- [ ] Ensure `BCRYPT_ROUNDS=12` or higher for password hashing
- [ ] Review and set appropriate `SESSION_DOMAIN` if using subdomains

### 4. Logging Configuration
- [ ] Set `LOG_CHANNEL=stack`
- [ ] Set `LOG_STACK=daily` for automatic log rotation
- [ ] Set `LOG_LEVEL=warning` or `error` (not `debug`)
- [ ] Configure `LOG_DAILY_DAYS=14` for log retention

### 5. Mail Configuration
- [ ] Configure proper mail service (not `log`)
- [ ] Set `MAIL_MAILER`, `MAIL_HOST`, `MAIL_PORT`
- [ ] Configure `MAIL_FROM_ADDRESS` and `MAIL_FROM_NAME`
- [ ] Test email sending functionality

### 6. Cache & Queue Configuration
- [ ] Consider using Redis for better performance: `CACHE_STORE=redis`
- [ ] Configure `QUEUE_CONNECTION=database` or `redis`
- [ ] Set up queue workers: `php artisan queue:work --daemon`

## Deployment Steps

### 1. Server Requirements
- PHP >= 8.2
- Composer
- Node.js & NPM
- MySQL/PostgreSQL database server
- Web server (Nginx/Apache)

### 2. Install Dependencies
```bash
composer install --optimize-autoloader --no-dev
npm install
npm run build
```

### 3. Database Migration
```bash
php artisan migrate --force
php artisan db:seed --force  # If needed
```

### 4. Optimize Application
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
php artisan event:cache
```

### 5. Set Permissions
```bash
chmod -R 755 storage bootstrap/cache
chown -R www-data:www-data storage bootstrap/cache
```

### 6. Configure Web Server
- Point document root to `/public` directory
- Enable `.htaccess` file (Apache) or configure proper Nginx rules
- Configure HTTPS/SSL certificate (mandatory for production)
- Set up proper PHP-FPM configuration

## Post-Deployment

### 1. Security Verification
- [ ] Verify debug mode is OFF
- [ ] Test error pages don't expose sensitive information
- [ ] Verify rate limiting is working on login/register
- [ ] Check file upload limits are enforced (5MB default)
- [ ] Test all authentication flows

### 2. Performance Monitoring
- [ ] Set up application monitoring (Laravel Telescope/Horizon if needed)
- [ ] Monitor log files: `storage/logs/laravel-*.log`
- [ ] Set up database query monitoring
- [ ] Configure uptime monitoring

### 3. Backup Strategy
- [ ] Set up automated database backups (daily recommended)
- [ ] Back up uploaded files in `storage/app` directory
- [ ] Store backups in secure, off-site location
- [ ] Test backup restoration procedure

### 4. Maintenance
- [ ] Schedule regular security updates
- [ ] Monitor and rotate logs (automatic with daily driver)
- [ ] Review user access and permissions periodically
- [ ] Keep Laravel and dependencies up to date

## Rollback Plan

In case of deployment issues:
1. Keep previous release directory/backup
2. Revert web server configuration to previous version
3. Restore database from backup if migrations were run
4. Clear all caches: `php artisan cache:clear`

## Production Best Practices

### Security
- Always use HTTPS in production
- Keep `APP_DEBUG=false` to prevent information disclosure
- Regularly update dependencies for security patches
- Implement database backup and disaster recovery plan
- Use environment variables for sensitive configuration

### Performance
- Enable OPcache in PHP configuration
- Use Redis/Memcached for caching when available
- Configure proper database indexes
- Monitor and optimize slow queries
- Use CDN for static assets if needed

### Monitoring
- Monitor application logs regularly
- Set up error alerting (email/Slack)
- Track application performance metrics
- Monitor disk space, especially for logs and uploads

## Troubleshooting

### Common Issues

**500 Internal Server Error**
- Check `storage/logs/laravel.log` for details
- Verify file permissions on `storage` and `bootstrap/cache`
- Run `php artisan config:clear` to clear cached config

**Database Connection Failed**
- Verify database credentials in `.env`
- Check database server is running and accessible
- Verify firewall rules allow database connections

**File Upload Errors**
- Check PHP `upload_max_filesize` and `post_max_size` settings
- Verify `storage/app` directory permissions
- Check available disk space

**Session Issues**
- Run `php artisan session:table` and `php artisan migrate`
- Clear browser cookies
- Verify `SESSION_DRIVER=database` is set

## Support & Documentation

- Laravel Documentation: https://laravel.com/docs
- Siakad Repository: https://github.com/Aldistwn29/Siakad
- Report Issues: https://github.com/Aldistwn29/Siakad/issues
