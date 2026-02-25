# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this project, please **do not** open a public
GitHub issue. Instead, email the maintainer directly so that the issue can be triaged and
patched before disclosure.

We aim to respond to security reports within 48 hours and publish a fix within 14 days
of confirmation, depending on severity.

## Supported Versions

Only the latest minor release on `main` receives security updates.

## Hardening Checklist

- Always set a strong `JWT_SECRET` (32+ random characters) in production.
- Set `BCRYPT_ROUNDS` to at least 10. The project clamps this to a safe range.
- Run behind HTTPS only. The `Strict-Transport-Security` header is enabled in production.
- Lock down `CORS_ORIGIN` to your front-end domain(s); do not leave it as `*` in production.
- Keep `ALLOW_REGISTRATION` set explicitly. Use `false` when running a private deployment.
- Rotate JWT refresh tokens; the service revokes the previous refresh token on each use.
- Enable MFA for admin accounts (`POST /auth/2fa/setup`).
