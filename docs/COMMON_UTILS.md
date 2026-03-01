# Common Utilities

Helpers used across the codebase. Prefer these over inline `process.env` or
ad-hoc string/date manipulation.

## `src/common/config/env.ts`

- `envString(name, fallback)`, `envInt`, `envBool`, `envList`

## `src/common/utils/string.util.ts`

- `truncate`, `slugify`, `capitalize`, `maskEmail`

## `src/common/utils/date.util.ts`

- `addMinutes/Hours/Days`, `isExpired`, `isoNow`

## `src/common/utils/mongo-id.util.ts`

- `isValidObjectId(value)`, `toObjectId(value)`

## `src/common/utils/sort.util.ts`

- `buildSort(field?, order?)` — applies field whitelist

## `src/common/utils/ip.util.ts`

- `getClientIp(req)`, `isLocalIp(ip)`

## `src/common/utils/user-agent.util.ts`

- `parseUserAgent(ua?)` — `{ raw, browser, os, isMobile, isBot }`

## `src/common/utils/array.util.ts`

- `unique`, `chunk`, `compact`

## `src/common/utils/retry.util.ts`

- `retry(fn, { attempts, delayMs, backoff, shouldRetry })`

## `src/common/utils/sleep.util.ts`

- `sleep(ms)`, `withTimeout(promise, ms, message?)`

## `src/common/utils/redact.util.ts`

- `redactSecrets(value)` — deep-redacts known secret keys
