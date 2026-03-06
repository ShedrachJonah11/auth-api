# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

_No changes since 1.2.0._

## [1.2.0] - 2026-05-15

### Added

- Typed env helpers (`envString`, `envInt`, `envBool`, `envList`)
- Centralized constants for app, auth, http, cache, status, error codes
- `JwtPayload` interface, `UserRole` enum, `Result` discriminated union
- Configurable password policy module (`PASSWORD_*` envs)
- Account lockout (`LOGIN_MAX_ATTEMPTS`, `LOGIN_LOCK_MINUTES`)
- Centralized bcrypt helper with rounds clamping
- Opaque token and numeric code generators
- Production-only env validation at startup
- Response-time interceptor (`X-Response-Time` header) and `ApiVersionMiddleware`
- `/health/ready`, `/health/live`, `/version`, `/auth/me`, `/auth/password-strength`, `/auth/password-policy`
- Docker HEALTHCHECK pointing at `/api/health/live`
- Swagger JSON exposed at `/api-json`
- `SECURITY.md`, `ARCHITECTURE.md`, expanded `CONTRIBUTING.md`
- `docs/AUTH_FLOWS.md`, `docs/MODULES.md`, `docs/COMMON_UTILS.md`, `docs/FAQ.md`
- GitHub Actions CI workflow (`npm run check`)

### Changed

- `BusinessException` is typed with `ErrorCode`
- `forgotPassword` adds timing jitter to obscure account existence
- Global exception filter defaults `errorCode` to `HTTP_<status>`
- HealthService logs DB ping failures instead of swallowing them
- Maintenance mode now lets `/api/health/*` through
- Email is normalized (lowercase + trim) on register/login/forgot/resend


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
- Request/correlation ID, CORS, refresh token rotation, configurable env options.
- Documentation updates (README, API.md, env.example).

## [1.0.0] - 2025-01-01

### Added

- Initial NestJS auth API with JWT and refresh tokens
- User registration and login
- MongoDB and Mongoose integration
- Swagger API documentation
