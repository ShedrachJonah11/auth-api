# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Added

- Configurable request ID and correlation ID headers
- CORS origin and max age configuration
- Refresh token rotation on use
- BCRYPT_ROUNDS, DEFAULT_USER_ROLE, PAGINATION_* env support
- JWT_ISSUER and optional DEBUG_MODE
- ALLOW_REGISTRATION flag to disable signups
- Typed configuration with env and jwt.issuer
- MFA_ISSUER_NAME and PASSWORD_RESET_EXPIRY_MINUTES
- Production mode startup log and auth controller docs

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

## [1.1.0] - 2025-02-19

### Added

- Full January–February 2025 feature set (see Unreleased).

## [1.0.0] - 2025-01-01

### Added

- Initial NestJS auth API with JWT and refresh tokens
- User registration and login
- MongoDB and Mongoose integration
- Swagger API documentation
