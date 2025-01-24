# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added

- Logout endpoint with refresh token invalidation
- Change password endpoint for authenticated users
- Forgot password and reset password flow
- Verify email and resend verification endpoints
- Assign role endpoint (admin only)
- Pagination on users list
- User preferences get/update endpoints
- Set avatar URL endpoint
- Account deletion request and confirm with grace period
- Export my data (GDPR) endpoint
- 2FA setup, enable, and disable endpoints
- List and revoke sessions endpoints
- Request ID and correlation ID middleware
- Global API prefix `/api`
- Health module registration
- Optional Swagger via SWAGGER_ENABLED
- Configurable log level (LOG_LEVEL)
- Maintenance mode (MAINTENANCE_MODE)
- Typed configuration loading

## [1.0.0] - 2025-01-01

### Added

- Initial NestJS auth API with JWT and refresh tokens
- User registration and login
- MongoDB and Mongoose integration
- Swagger API documentation
