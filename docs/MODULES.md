# Module Cheat-sheet

| Module       | What lives here                                                 |
| ------------ | ---------------------------------------------------------------- |
| `auth/`      | Login, registration, JWT signing, OAuth, MFA, sessions, lockout |
| `users/`     | User CRUD, preferences, avatars, account deletion               |
| `health/`    | Liveness/readiness probes, DB ping                              |
| `common/`    | Shared types, constants, utils, filters, interceptors, middleware |
| `audit/`     | Audit log persistence                                            |
| `activity/`  | Per-user activity events                                         |
| `api-keys/`  | Programmatic API key issuance and verification                  |
| `cache/`     | Cache abstractions (in-memory, redis)                           |
| `devices/`   | Per-device fingerprinting and session tagging                   |
| `files/`     | File upload endpoints                                            |
| `metrics/`   | Prometheus exporter                                              |
| `monitoring/`| Performance interceptor                                          |
| `security/`  | IP whitelist guard                                               |
| `webhooks/`  | Outbound webhook delivery                                        |

## Policies & constants

- `src/auth/policies/password.policy.ts` — runtime-configurable password rules
- `src/common/constants/*` — centralized constants for app, auth, http, cache, status, error codes
- `src/common/types/*` — `JwtPayload`, `UserRole`, `Result`, `LogContextFields`
