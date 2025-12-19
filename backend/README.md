# Task Management - Backend API

Backend API untuk Task Management System yang dibangun menggunakan Node.js, Express.js, TypeScript, dan TypeORM dengan MySQL sebagai database.

## 🚀 Fitur Utama

- ✅ **RESTful API** - Arsitektur REST yang clean dan terstruktur
- ✅ **Authentication & Authorization** - JWT-based authentication dengan refresh token
- ✅ **CRUD Operations** - Complete task management operations
- ✅ **Input Validation** - Schema validation menggunakan Zod
- ✅ **Database ORM** - TypeORM untuk type-safe database operations
- ✅ **Error Handling** - Centralized error handling middleware
- ✅ **Logging System** - Winston logger untuk tracking dan debugging
- ✅ **Database Migration** - Version control untuk database schema
- ✅ **Database Seeding** - Sample data untuk development
- ✅ **Security** - CORS, bcrypt password hashing, SQL injection prevention

## 🛠️ Teknologi yang Digunakan

### Core Framework
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **TypeScript** - Typed superset of JavaScript

### Database
- **MySQL** - Relational database management system
- **TypeORM** - ORM untuk TypeScript dan JavaScript

### Authentication & Security
- **JWT (jsonwebtoken)** - Token-based authentication
- **Bcrypt** - Password hashing algorithm
- **CORS** - Cross-Origin Resource Sharing

### Validation & Utilities
- **Zod** - TypeScript-first schema validation
- **UUID** - Unique identifier generation
- **Cookie Parser** - Parse HTTP request cookies

### Logging
- **Winston** - Versatile logging library
- **Morgan** - HTTP request logger middleware

### Development Tools
- **Nodemon** - Auto-restart on file changes
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **ts-node** - TypeScript execution environment

## 📋 Prerequisites

- Node.js 18.x atau lebih baru
- MySQL 8.x atau lebih baru
- npm atau yarn package manager

## 🏃 Cara Menjalankan

### 1. Install Dependencies

```bash
yarn install
# atau
npm install
```

### 2. Setup Environment Variables

Copy file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Sesuaikan konfigurasi di file `.env`:

```env
# Application Configuration
APP_URL=http://localhost:3001
PORT=3001
NODE_ENV=development

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3002

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_NAME=task_management

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
JWT_EXPIRES_IN=1800s          # 30 minutes
JWT_REFRESH_EXPIRES_IN=86400s # 24 hours
```

### 3. Setup Database

Pastikan MySQL server sudah berjalan, lalu buat database:

```bash
mysql -u root -p
CREATE DATABASE task_management;
EXIT;
```

### 4. Jalankan Database Migration

```bash
yarn migration:run
```

### 5. (Optional) Seed Database

Untuk mengisi database dengan sample data:

```bash
yarn db:seed
```

### 6. Jalankan Development Server

```bash
yarn dev
```

Server akan berjalan di http://localhost:3001

### 7. Build untuk Production

```bash
yarn build
yarn start
```

## 📁 Struktur Project

```
backend/
├── logs/                          # Log files
├── scripts/                       # Utility scripts
├── src/
│   ├── application/              # Application configuration
│   │   ├── logging.ts            # Winston logger setup
│   │   └── web.ts                # Express app configuration
│   │
│   ├── controller/               # Route controllers
│   │   ├── task.controller.ts    # Task CRUD handlers
│   │   └── user.controller.ts    # User & auth handlers
│   │
│   ├── database/                 # Database layer
│   │   ├── entity/               # TypeORM entities
│   │   │   ├── Task.ts           # Task entity model
│   │   │   └── User.ts           # User entity model
│   │   ├── migration/            # Database migrations
│   │   │   └── *.ts              # Migration files
│   │   └── seeder/               # Database seeders
│   │       └── seed.ts           # Seed data script
│   │
│   ├── error/                    # Custom error classes
│   │   └── response.error.ts     # HTTP response error
│   │
│   ├── middleware/               # Express middlewares
│   │   ├── auth.middleware.ts    # JWT authentication
│   │   ├── error.middleware.ts   # Global error handler
│   │   ├── notfound.middleware.ts # 404 handler
│   │   └── task-owner.middleware.ts # Task ownership check
│   │
│   ├── model/                    # Request/Response models
│   │   ├── task.model.ts         # Task DTOs
│   │   └── user.model.ts         # User DTOs
│   │
│   ├── request/                  # Custom request types
│   │   └── auth.request.ts       # Extended Express Request
│   │
│   ├── route/                    # Route definitions
│   │   ├── api.ts                # Protected API routes
│   │   ├── index.ts              # Main router
│   │   └── public.route.ts       # Public routes
│   │
│   ├── service/                  # Business logic layer
│   │   ├── task.service.ts       # Task business logic
│   │   └── user.service.ts       # User business logic
│   │
│   ├── util/                     # Utility functions
│   │   └── jwt.ts                # JWT helper functions
│   │
│   ├── validation/               # Input validation
│   │   ├── task.validation.ts    # Task validation schemas
│   │   ├── user.validation.ts    # User validation schemas
│   │   └── validation.ts         # Validation middleware
│   │
│   ├── data-source.ts            # TypeORM data source config
│   └── index.ts                  # Application entry point
│
├── .env.example                  # Environment template
├── Dockerfile                    # Docker configuration
├── eslint.config.mjs             # ESLint configuration
├── nodemon.json                  # Nodemon configuration
├── package.json                  # Dependencies & scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # Documentation
```

## 🗄️ Database Schema

### Entity: User

```typescript
@Entity()
export class User {
  @PrimaryColumn()
  user_id: string;          // UUID

  @Column({ unique: true })
  username: string;         // Unique username

  @Column()
  name: string;             // Full name

  @Column({ unique: true })
  email: string;            // Unique email

  @Column()
  password: string;         // Bcrypt hashed password

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Task, task => task.user)
  tasks: Task[];
}
```

### Entity: Task

```typescript
@Entity()
export class Task {
  @PrimaryColumn()
  task_id: string;          // UUID

  @Column()
  user_id: string;          // Foreign key to User

  @Column()
  title: string;            // Task title

  @Column('text')
  description: string;      // Task description

  @Column({
    type: 'enum',
    enum: ['to_do', 'in_progress', 'done'],
    default: 'to_do'
  })
  status: string;           // Task status

  @Column({ nullable: true })
  deadline: Date;           // Task deadline (optional)

  @Column()
  created_by: string;       // Creator name

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.tasks, {
    onDelete: 'CASCADE'
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
```

### Relasi

- **User → Task**: One to Many (Satu user bisa memiliki banyak task)
- **Task → User**: Many to One (Setiap task dimiliki oleh satu user)
- **CASCADE DELETE**: Jika user dihapus, semua task miliknya ikut terhapus

## 🔧 Environment Variables

| Variable | Deskripsi | Default | Required |
|----------|-----------|---------|----------|
| `APP_URL` | Base URL aplikasi | `http://localhost:3001` | ✅ |
| `PORT` | Port server | `3001` | ✅ |
| `NODE_ENV` | Environment mode | `development` | ✅ |
| `ALLOWED_ORIGINS` | CORS allowed origins (comma-separated) | - | ✅ |
| `DB_HOST` | MySQL host | `localhost` | ✅ |
| `DB_PORT` | MySQL port | `3306` | ✅ |
| `DB_USERNAME` | Database username | `root` | ✅ |
| `DB_PASSWORD` | Database password | - | ✅ |
| `DB_NAME` | Database name | `task_management` | ✅ |
| `JWT_SECRET` | JWT signing secret | - | ✅ |
| `JWT_REFRESH_SECRET` | Refresh token secret | - | ✅ |
| `JWT_EXPIRES_IN` | Access token expiry | `1800s` (30 min) | ✅ |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry | `86400s` (24 hours) | ✅ |

## 📝 Available Scripts

| Script | Deskripsi |
|--------|-----------|
| `yarn dev` | Jalankan development server dengan nodemon (auto-reload) |
| `yarn build` | Compile TypeScript ke JavaScript (output: `dist/`) |
| `yarn start` | Jalankan production server dari compiled code |
| `yarn migration:generate` | Generate migration file dari entity changes |
| `yarn migration:run` | Jalankan semua pending migrations |
| `yarn migration:revert` | Rollback migration terakhir |
| `yarn db:seed` | Populate database dengan sample data |
| `yarn lint` | Run ESLint untuk code quality check |
| `yarn format` | Format code dengan Prettier |

## 🔐 Authentication Flow

### 1. Register

```http
POST /api/register
Content-Type: application/json

{
  "username": "johndoe",
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "status": 201,
  "message": "User berhasil dibuat",
  "data": {
    "user_id": "uuid-here",
    "username": "johndoe",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 2. Login

```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "status": 200,
  "message": "Login berhasil",
  "data": {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "user_id": "uuid-here",
      "username": "johndoe",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### 3. Refresh Token

```http
POST /api/refresh-token
Content-Type: application/json

{
  "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 4. Protected Routes

Untuk mengakses protected routes, tambahkan JWT token di header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📡 API Endpoints

### Public Routes (No Authentication Required)

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | `/api/register` | Register user baru |
| POST | `/api/login` | Login user |
| POST | `/api/refresh-token` | Refresh access token |

### Protected Routes (Authentication Required)

#### User Management

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/users/current` | Get current logged-in user data |
| POST | `/api/logout` | Logout user (invalidate session) |

#### Task Management

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| GET | `/api/tasks` | Get all tasks for current user |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/:id` | Update task (owner only) |
| DELETE | `/api/tasks/:id` | Delete task (owner only) |

### Detailed API Documentation

#### Create Task

```http
POST /api/tasks
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README for frontend and backend",
  "status": "to_do",
  "deadline": "2025-12-31T23:59:59.000Z"
}
```

**Response:**
```json
{
  "status": 201,
  "message": "Task berhasil dibuat",
  "data": {
    "task_id": "uuid-here",
    "title": "Complete project documentation",
    "description": "Write comprehensive README for frontend and backend",
    "status": "to_do",
    "deadline": "2025-12-31T23:59:59.000Z",
    "created_by": "John Doe",
    "created_at": "2025-12-19T10:30:00.000Z",
    "user_id": "uuid-here"
  }
}
```

#### Update Task

```http
PUT /api/tasks/{task_id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "in_progress"
}
```

#### Delete Task

```http
DELETE /api/tasks/{task_id}
Authorization: Bearer {token}
```

## ✅ Input Validation

Menggunakan **Zod** untuk schema validation:

### User Validation

```typescript
// Register schema
{
  username: string (min: 3, max: 100)
  name: string (min: 1, max: 255)
  email: string (valid email format)
  password: string (min: 8, max: 100)
}

// Login schema
{
  email: string (valid email format)
  password: string (min: 1)
}
```

### Task Validation

```typescript
// Create/Update task schema
{
  title: string (min: 1, max: 255)
  description: string (min: 1)
  status: enum ['to_do', 'in_progress', 'done'] (optional)
  deadline: datetime (optional)
}
```

## 🛡️ Middleware

### 1. Authentication Middleware

Memverifikasi JWT token dan mengekstrak user info:

```typescript
// src/middleware/auth.middleware.ts
export const authMiddleware = async (req, res, next) => {
  // Verify JWT token from Authorization header
  // Attach user data to request object
  // Handle expired/invalid tokens
}
```

### 2. Task Owner Middleware

Memastikan user hanya bisa modify task miliknya:

```typescript
// src/middleware/task-owner.middleware.ts
export const taskOwnerMiddleware = async (req, res, next) => {
  // Check if current user is the task owner
  // Prevent unauthorized access
}
```

### 3. Error Middleware

Centralized error handling:

```typescript
// src/middleware/error.middleware.ts
export const errorMiddleware = (err, req, res, next) => {
  // Log error details
  // Send appropriate error response
  // Handle different error types
}
```

### 4. Not Found Middleware

Handle undefined routes:

```typescript
// src/middleware/notfound.middleware.ts
export const notFoundMiddleware = (req, res) => {
  // Return 404 for undefined routes
}
```

## 📊 Logging

Menggunakan **Winston** untuk logging dengan multiple transports:

### Log Levels

- `error` - Error messages
- `warn` - Warning messages
- `info` - Informational messages
- `http` - HTTP request logs
- `debug` - Debug information

### Log Output

- **Console**: Development environment
- **File**: Production environment (`logs/` directory)
  - `error.log` - Error level logs
  - `combined.log` - All level logs

### Log Format

```
[2025-12-19 10:30:45] INFO: Server running on port 3001
[2025-12-19 10:31:12] HTTP: POST /api/login 200 45ms
[2025-12-19 10:32:20] ERROR: Database connection failed
```

## 🗃️ Database Migration

### Generate Migration

Setelah mengubah entity, generate migration file:

```bash
yarn migration:generate src/database/migration/DescriptionOfChanges
```

### Run Migration

Apply migrations ke database:

```bash
yarn migration:run
```

### Revert Migration

Rollback migration terakhir:

```bash
yarn migration:revert
```

### Migration Workflow

1. Modify entity files di `src/database/entity/`
2. Generate migration: `yarn migration:generate`
3. Review generated migration file
4. Run migration: `yarn migration:run`
5. Jika ada error, revert: `yarn migration:revert`

## 🌱 Database Seeding

File seeder tersedia di `src/database/seeder/seed.ts` untuk populate database dengan sample data.

```bash
yarn db:seed
```

**Sample Data:**
- 1 user dummy untuk testing
- Multiple tasks dengan berbagai status

## 🔒 Security Best Practices

### Implemented Security Features

✅ **Password Hashing** - Bcrypt dengan salt rounds  
✅ **JWT Authentication** - Secure token-based auth  
✅ **CORS Protection** - Configured allowed origins  
✅ **SQL Injection Prevention** - TypeORM parameterized queries  
✅ **Input Validation** - Zod schema validation  
✅ **Error Handling** - No sensitive data in error responses  
✅ **Environment Variables** - Sensitive config in .env  

### Security Recommendations

🔐 Change default JWT secrets in production  
🔐 Use HTTPS in production  
🔐 Implement rate limiting untuk API endpoints  
🔐 Add request body size limits  
🔐 Implement CSRF protection untuk web clients  
🔐 Use helmet.js untuk security headers  
🔐 Regular dependency updates  
🔐 Enable database SSL connection in production  

## 🚀 Deployment

### Docker Deployment

Build Docker image:

```bash
docker build -t task-management-backend .
docker run -p 3001:3001 --env-file .env task-management-backend
```

### Manual Deployment

1. Build aplikasi:
```bash
yarn build
```

2. Copy files ke server:
```bash
# Copy dist/, package.json, .env
```

3. Install production dependencies:
```bash
yarn install --production
```

4. Run migrations:
```bash
yarn migration:run
```

5. Start server:
```bash
yarn start
```

### Environment Configuration

Untuk production, pastikan update:
- `NODE_ENV=production`
- Strong JWT secrets
- Secure database credentials
- Proper CORS origins
- Disable debug logging

## 🧪 Testing

### Manual Testing dengan Postman

1. Import `postman_collection.json` dari root project
2. Set environment variables di Postman:
   - `base_url`: http://localhost:3001
   - `access_token`: (akan di-set otomatis setelah login)

### Test Flow

1. **Register** - Create new user account
2. **Login** - Get access & refresh tokens
3. **Get Current User** - Verify authentication
4. **Create Task** - Test task creation
5. **Get Tasks** - List all tasks
6. **Update Task** - Modify task status
7. **Delete Task** - Remove task
8. **Refresh Token** - Test token refresh
9. **Logout** - End session

## 🐛 Troubleshooting

### Database Connection Error

```
Error: ER_ACCESS_DENIED_ERROR: Access denied for user
```

**Solution:**
- Verify database credentials di `.env`
- Ensure MySQL server is running
- Check user permissions

### Migration Error

```
Error: Migration failed
```

**Solution:**
```bash
# Revert migration
yarn migration:revert

# Fix entity/migration code
# Run again
yarn migration:run
```

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solution:**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3001 | xargs kill -9
```

### TypeScript Compilation Error

```bash
# Clear build cache
rm -rf dist/

# Rebuild
yarn build
```

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [TypeORM Documentation](https://typeorm.io/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Zod Documentation](https://zod.dev/)
- [JWT.io](https://jwt.io/)
- [Winston Logging](https://github.com/winstonjs/winston)

## 📄 License

MIT License

---

**Note**: Pastikan MySQL server berjalan dan database sudah dibuat sebelum menjalankan aplikasi.
