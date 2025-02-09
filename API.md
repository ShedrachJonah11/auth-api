# Authentication API Documentation

## Overview
This is a comprehensive authentication API built with NestJS, MongoDB, and JWT authentication. All routes are under the `/api` prefix when the global prefix is enabled.

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
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout and invalidate refresh token
- `POST /auth/change-password` - Change password (authenticated)
- `POST /auth/forgot-password` - Request password reset
- `POST /auth/reset-password` - Reset password with token
- `POST /auth/verify-email` - Verify email address
- `POST /auth/resend-verification` - Resend verification email
- `GET /auth/profile` - Get current user profile
- `POST /auth/2fa/setup` - Generate 2FA secret
- `POST /auth/2fa/enable` - Enable 2FA with TOTP
- `POST /auth/2fa/disable` - Disable 2FA
- `GET /auth/sessions` - List my sessions
- `DELETE /auth/sessions/:sessionId` - Revoke a session

### User Management
- `GET /users` - Get all users with pagination
- `GET /users/me/preferences` - Get my preferences
- `PATCH /users/me/preferences` - Update my preferences
- `PATCH /users/me/avatar` - Set avatar URL
- `POST /users/me/request-deletion` - Request account deletion
- `POST /users/me/confirm-deletion` - Confirm deletion with password
- `GET /users/me/export` - Export my data (GDPR)
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `PATCH /users/:id/role` - Assign role (admin only)
- `DELETE /users/:id` - Delete user (admin only)

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
