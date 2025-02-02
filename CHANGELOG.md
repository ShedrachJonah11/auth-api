# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- NestJS auth API project scaffold with TypeScript
- MongoDB connection and ConfigModule
- User schema and Mongoose model
- JWT strategy and Passport integration
- User registration endpoint with validation
- Login endpoint with bcrypt verification
- Refresh token endpoint and rotation
- Protected profile endpoint with JWT guard
- Global validation pipe with class-validator
- Swagger/OpenAPI documentation
- CORS configuration and request timeout middleware
- Environment variables template (env.example)
- Health check module and /health endpoint
- Global exception filter for consistent errors
- Business exception class for domain errors
- Password strength utility and validation
- IsStrongPassword custom decorator for DTOs
- Enable 2FA DTO and TOTP token validation
- Two-factor authentication service (TOTP)
- MFA guard for protecting 2FA-required routes
- Session schema and session management service
- Login attempts tracking and persistence
- Account lockout guard after failed attempts
- Password history service to prevent reuse
- API versioning decorator and version guard
- Configuration module and config validation
- Email template service for transactional emails
- User-level rate limiting guard
- IP whitelist schema and guard
- Device schema and device tracking
- Activity logging schema and service
- Audit log schema and audit service
- User preferences schema and update DTO
