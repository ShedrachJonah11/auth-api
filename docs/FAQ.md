# FAQ

### How do I disable signups?

Set `ALLOW_REGISTRATION=false`. The `POST /api/auth/register` endpoint will return
`409 Conflict` with `errorCode: AUTH_REGISTRATION_DISABLED`.

### What does account lockout look like to the client?

After `LOGIN_MAX_ATTEMPTS` failed logins, the next `POST /api/auth/login` returns
`423 Locked` with `errorCode: AUTH_ACCOUNT_LOCKED`. A successful login resets
the counter.

### Why does `POST /forgot-password` always return 200?

To avoid exposing which emails belong to registered users. The endpoint also
adds a small random delay to obscure timing.

### How do I generate a Postman collection?

```bash
curl http://localhost:3000/api-json -o postman-spec.json
```

Import the JSON into Postman as an OpenAPI collection.
