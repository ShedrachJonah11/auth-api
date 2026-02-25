# Architecture

This document describes the high-level structure of the auth-api service.

## Tech Stack

- **Framework**: NestJS 11 (Express adapter)
- **Database**: MongoDB via Mongoose
- **Auth**: JWT (access + refresh), Passport (Local, JWT, Google, GitHub)
- **MFA**: TOTP via `speakeasy`, QR codes via `qrcode`
- **Docs**: Swagger / OpenAPI (`/api`)
- **Tests**: Jest (unit) + Supertest (e2e)

## Module Layout

```
src/
├── auth/              # Login, register, JWT, OAuth, MFA, sessions
├── users/             # User CRUD, preferences, avatar, deletion
├── health/            # Liveness/readiness probes
├── common/            # Shared utilities, DTOs, filters, interceptors
│   ├── config/        # Typed env helpers and validation
│   ├── constants/     # Centralized constants (auth, http, errors)
│   ├── types/         # Shared TypeScript types/interfaces
│   ├── utils/         # String, date, password helpers
│   ├── exceptions/    # Custom HttpException subclasses
│   ├── filters/       # Global exception filter
│   ├── interceptors/  # Metrics, performance, response-time
│   ├── middleware/    # Request ID, correlation ID, logging, security
│   └── dto/           # Pagination and shared DTOs
├── audit/             # Audit log writes
├── activity/          # Per-user activity records
├── api-keys/          # Programmatic access tokens
├── cache/             # Cache abstractions
├── devices/           # Device fingerprinting
├── files/             # Upload endpoints
├── metrics/           # Prometheus exporter
├── monitoring/        # Performance interceptor + service
├── security/          # IP whitelist guard
├── webhooks/          # Outbound webhook delivery
└── main.ts            # Bootstrap: prefix, CORS, Swagger, middleware
```

## Request Lifecycle

1. **Middleware** (request-id, correlation-id, security headers, logging)
2. **Guards** (JWT, roles, MFA, account-lockout, IP whitelist)
3. **Interceptors** (response-time, metrics, performance)
4. **Pipes** (global ValidationPipe with whitelist + transform)
5. **Controller → Service → Repository (Mongoose model)**
6. **Filters** (`GlobalExceptionFilter` formats errors into a stable JSON shape)

## Configuration

All runtime configuration is read from `process.env` via the typed helpers in
`src/common/config/env.ts`. Defaults live in `src/common/constants/`.
