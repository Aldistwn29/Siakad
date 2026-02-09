# Siakad - Academic Information System

A comprehensive academic information system built with Laravel 12, Inertia.js, and React for managing university/college operations including students, teachers, courses, schedules, and academic records.

## Features

- 📚 **Academic Management**: Faculties, Departments, Classes, Courses, and Schedules
- 👥 **User Management**: Students, Teachers, Operators, and Admins with role-based access control
- 💰 **Fee Management**: Fee groups and payment tracking
- 📊 **Academic Records**: Study plans, attendance, grades, and results
- 🎨 **Modern UI**: Built with React, Inertia.js, and Tailwind CSS
- 🔒 **Secure**: Role-based permissions, rate limiting, and production-ready security

## Tech Stack

- **Backend**: Laravel 12, PHP 8.2+
- **Frontend**: React 18, Inertia.js, Tailwind CSS
- **Database**: MySQL/PostgreSQL (production), SQLite (development)
- **Authentication**: Laravel Breeze with Spatie Permissions

## Quick Start

### Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/Aldistwn29/Siakad.git
cd Siakad
```

2. **Install dependencies and setup**
```bash
composer install
npm install
cp .env.example .env
php artisan key:generate
```

3. **Configure database**
   - For development, SQLite is configured by default
   - For production, update `.env` with MySQL/PostgreSQL credentials

4. **Run migrations**
```bash
php artisan migrate
php artisan db:seed  # Optional: seed initial data
```

5. **Start development servers**
```bash
composer run dev
# This runs: php artisan serve + queue worker + logs + vite dev server
```

Or start services individually:
```bash
php artisan serve
npm run dev
php artisan queue:work
```

6. **Access the application**
   - Open http://localhost:8000

## Production Deployment

For production deployment, please refer to [DEPLOYMENT.md](DEPLOYMENT.md) for a comprehensive checklist and guide.

### Quick Production Setup

1. **Environment Configuration**
```bash
cp .env.example .env
# Edit .env and set:
APP_ENV=production
APP_DEBUG=false
APP_URL=https://your-domain.com
```

2. **Database Configuration**
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=siakad
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

3. **Install and Build**
```bash
composer install --optimize-autoloader --no-dev
npm install
npm run build
```

4. **Setup Application**
```bash
php artisan key:generate
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

5. **Set Permissions**
```bash
chmod -R 755 storage bootstrap/cache
```

## Security Features

- ✅ **Rate Limiting**: Login and registration attempts are rate-limited to prevent brute force attacks
- ✅ **Session Encryption**: Session data is encrypted in production
- ✅ **Error Handling**: Production mode hides sensitive error details from users
- ✅ **File Upload Validation**: File uploads are limited to 5MB by default
- ✅ **Role-Based Access Control**: Using Spatie Laravel Permission package
- ✅ **CSRF Protection**: Built-in Laravel CSRF protection
- ✅ **Password Hashing**: Secure bcrypt hashing with configurable rounds

## Testing

Run the test suite:
```bash
composer run test
# or
php artisan test
```

## Code Quality

Format code with Prettier:
```bash
npm run format
```

Lint PHP code with Laravel Pint:
```bash
./vendor/bin/pint
```

## Project Structure

```
├── app/
│   ├── Http/Controllers/     # Controllers organized by role (Admin, Teacher, Student, Operator)
│   ├── Models/               # Eloquent models
│   ├── Traits/               # Reusable traits (HasFile)
│   ├── Enums/                # Enumerations
│   └── Helpers/              # Helper functions
├── resources/
│   └── js/                   # React components and Inertia pages
├── routes/                   # Route definitions by role
├── database/
│   ├── migrations/           # Database migrations
│   └── seeders/              # Database seeders
└── config/                   # Configuration files
```

## Default Roles

The system includes these default roles:
- **Admin**: Full system access
- **Operator**: Administrative operations
- **Teacher**: Course and grade management
- **Student**: Access to academic records and schedules

## Contributing

Thank you for considering contributing to Siakad! Please ensure:
- Code follows existing patterns and conventions
- Tests are added for new features
- Security best practices are followed
- Changes don't introduce unnecessary complexity

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

