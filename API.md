# Authentication API Documentation

## Overview
This is a comprehensive authentication API built with NestJS, MongoDB, and JWT authentication.

## Features
- User registration and login
- JWT token authentication
- Password reset functionality
- Email verification
- Role-based access control
- Rate limiting
- Request logging and monitoring
- API versioning
- Docker containerization
- CI/CD pipeline

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token
- `POST /auth/verify-email` - Verify email address
- `POST /auth/resend-verification` - Resend verification email

### User Management
- `GET /users` - Get all users (admin only)
- `GET /users/:id` - Get user by ID
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Health Check
- `GET /health` - Health check endpoint
- `GET /status` - API status

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Rate Limiting
API endpoints are rate limited to prevent abuse. Default limits:
- 100 requests per minute per IP
- 10 requests per minute for authentication endpoints

## Error Handling
All API responses follow a consistent format:
```json
{
  "success": false,
  "message": "Error message",
  "errorCode": "ERROR_CODE",
  "statusCode": 400,
  "timestamp": "2025-09-27T14:15:30.000Z"
}
```

## Development
```bash
# Install dependencies
npm install

# Run in development
npm run start:dev

# Run tests
npm run test
npm run test:e2e

# Build for production
npm run build
```

## Docker
```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in production
docker-compose -f docker-compose.prod.yml up
```
