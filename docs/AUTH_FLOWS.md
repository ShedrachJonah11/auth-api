# Authentication Flows

This document describes the request/response shape of each auth endpoint.
All endpoints live under the global prefix `/api`.

## Registration

```
POST /api/auth/register
{ "email": "user@example.com", "password": "Secret123!", "name": "Alice" }
```

- 201 Created: returns `{ user, token }`
- 400: validation error (returns `{ message: string[] }`)
- 409: email already taken (`AUTH_EMAIL_TAKEN`)
- 409: registration disabled (`AUTH_REGISTRATION_DISABLED`)

## Login

```
POST /api/auth/login
{ "email": "user@example.com", "password": "Secret123!" }
```

- 200 OK: returns `{ user, token, refreshToken }`
- 401: invalid credentials (`AUTH_INVALID_CREDENTIALS`)
- 423: account locked (`AUTH_ACCOUNT_LOCKED`) — see lockout settings

## Refresh

```
POST /api/auth/refresh
{ "refreshToken": "..." }
```

- 200 OK: returns `{ token, refreshToken }` (old refresh token is revoked)
- 401: revoked (`AUTH_TOKEN_REVOKED`) or invalid

## Password reset

1. `POST /api/auth/forgot-password { email }` — always 200 OK to prevent enumeration
2. `POST /api/auth/reset-password { token, password }` — 200 OK on success, 401 on bad/expired token

## Two-factor authentication

1. `POST /api/auth/2fa/setup` — generates secret + QR code
2. `POST /api/auth/2fa/enable { token }` — verifies first TOTP code
3. `POST /api/auth/2fa/disable` — turns 2FA off
