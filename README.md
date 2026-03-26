# auth-api

A NestJS-based authentication service with JWT, refresh tokens, MFA, RBAC, sessions, and account lockout.

## Description

A comprehensive authentication API built with NestJS, MongoDB, and JWT authentication. This project includes user authentication, authorization, password management, email verification, and role-based access control.

## Features

- 🔐 User Authentication (Register/Login)
- 🔑 JWT Token-based Authentication with Refresh Tokens
- 🔒 Password Reset & Recovery
- ✉️ Email Verification
- 👥 Role-Based Access Control (RBAC)
- 🚦 Rate Limiting
- 📊 Request Logging & Monitoring
- 📈 Prometheus Metrics
- 🐳 Docker Support
- 🔄 CI/CD Pipeline
- 📚 Swagger API Documentation
- ✅ Comprehensive Testing (Unit & E2E)
- 🛡️ Enhanced Security Headers (CSP, HSTS)
- 🔄 API Versioning Support
- ⏱️ Configurable Request Timeouts
- 💚 Enhanced Health Checks with Database Status

## Project setup

```bash
$ npm install
```

## Environment Variables

Create a `.env` file in the root directory (see `env.example` for a full list). Minimum:

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/user-auth
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=1h
JWT_REFRESH_EXPIRES_IN=7d
REQUEST_TIMEOUT=30000
```

### Core

- `NODE_ENV`, `PORT`, `MONGODB_URI`
- `JWT_SECRET`, `JWT_EXPIRES_IN`, `JWT_REFRESH_EXPIRES_IN`, `JWT_ISSUER`

### Optional

- `SWAGGER_ENABLED`, `LOG_LEVEL`, `DEBUG_MODE`, `MAINTENANCE_MODE`
- `BCRYPT_ROUNDS` (clamped [10, 12])
- `ALLOW_REGISTRATION`, `DEFAULT_USER_ROLE`
- `CORS_ORIGIN`, `CORS_MAX_AGE`
- `PAGINATION_DEFAULT_LIMIT`, `PAGINATION_MAX_LIMIT`
- `PASSWORD_MIN_LENGTH`, `PASSWORD_REQUIRE_*`
- `LOGIN_MAX_ATTEMPTS`, `LOGIN_LOCK_MINUTES`

See `env.example` for the full list with defaults.

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run with Docker

The image declares a `HEALTHCHECK` against `/api/health/live` so orchestrators
can detect a stalled process.


```bash
# Build and run with Docker Compose
$ docker-compose up --build

# Run in detached mode
$ docker-compose up -d
```

## CI

A GitHub Actions workflow under `.github/workflows/` runs `npm run check` on each
push. The workflow installs deps with `npm ci` and uses Node 20.

## Quality checks

```bash
npm run lint          # lint and auto-fix
npm run typecheck     # tsc --noEmit
npm run check         # lint + typecheck + tests
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API Documentation

A Postman collection can be generated from the Swagger spec at `/api-json` once the
server is running:

```bash
curl http://localhost:3000/api-json -o postman-spec.json
```

Import `postman-spec.json` into Postman as an OpenAPI collection.

Clients can fetch the active password policy at runtime via `GET /api/auth/password-policy`.


Once the application is running, visit `http://localhost:3000/api` to view the Swagger documentation (when `SWAGGER_ENABLED` is not `false`).

For detailed API documentation, see [API.md](./API.md) and [docs/AUTH_FLOWS.md](./docs/AUTH_FLOWS.md).
See [ARCHITECTURE.md](./ARCHITECTURE.md) for the high-level design and [SECURITY.md](./SECURITY.md) for the reporting policy.

## Deployment

Build a production image with `docker build .` or run `npm run build && npm run start:prod`.


## FAQ

See [docs/FAQ.md](./docs/FAQ.md) for answers to common questions.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup and commit conventions.

## License

UNLICENSED — internal use only. See `package.json` for the field.

## Development

For development with auto-reload:

```bash
$ npm run start:dev
```
