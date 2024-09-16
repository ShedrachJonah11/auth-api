# Auth API

A comprehensive authentication API built with NestJS, MongoDB, and JWT. This API provides user registration, login, profile management, and secure authentication features.

## Features

- 🔐 **JWT Authentication** - Secure token-based authentication
- 👤 **User Management** - Complete CRUD operations for users
- 🛡️ **Input Validation** - Comprehensive validation using class-validator
- 📚 **API Documentation** - Interactive Swagger documentation
- 🏥 **Health Monitoring** - Health check endpoints for monitoring
- 🧪 **Testing** - Unit and integration tests
- 🔧 **Configuration** - Environment-based configuration management
- 📝 **Logging** - Request logging and monitoring

## Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with Passport
- **Validation**: class-validator
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Language**: TypeScript

## Prerequisites

- Node.js (v18 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd auth-api
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/user-auth
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h
PORT=3000
NODE_ENV=development
```

## Running the Application

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

## API Documentation

Once the application is running, you can access the interactive API documentation at:
- **Swagger UI**: http://localhost:3000/api

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `GET /auth/profile` - Get user profile (requires authentication)

### Users
- `GET /users` - Get all users (requires authentication)
- `GET /users/:id` - Get user by ID (requires authentication)
- `PATCH /users/profile` - Update current user profile (requires authentication)
- `PATCH /users/:id` - Update user by ID (requires authentication)
- `DELETE /users/:id` - Delete user by ID (requires authentication)

### Health
- `GET /health` - General health check
- `GET /health/ready` - Readiness probe
- `GET /health/live` - Liveness probe

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Testing

### Unit Tests
```bash
npm run test
```

### E2E Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:cov
```

## Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── dto/             # Data Transfer Objects
│   ├── guards/          # Authentication guards
│   ├── strategies/      # Passport strategies
│   └── *.ts            # Auth service, controller, module
├── users/               # User management module
│   ├── dto/             # User DTOs
│   └── *.ts            # User service, controller, module
├── common/              # Shared utilities
│   ├── filters/         # Exception filters
│   ├── interceptors/    # Response interceptors
│   ├── middleware/      # Custom middleware
│   └── pipes/          # Validation pipes
├── config/              # Configuration management
├── health/              # Health check module
└── *.ts                # Main application files
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/user-auth` |
| `JWT_SECRET` | JWT secret key | `your-super-secret-jwt-key-here` |
| `JWT_EXPIRES_IN` | JWT expiration time | `24h` |
| `PORT` | Application port | `3000` |
| `NODE_ENV` | Environment | `development` |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.