# Contributing

Thanks for taking the time to contribute. This document explains how to set up the
project locally and the conventions we follow.

## Local Setup

```bash
git clone <repo>
cd auth-api
cp env.example .env
npm install
npm run start:dev
```

## Commit Style

We use [Conventional Commits](https://www.conventionalcommits.org/) prefixes:

- `feat:` new user-visible feature
- `fix:` bug fix
- `refactor:` no behavioral change
- `test:` add or update tests
- `docs:` documentation only
- `chore:` tooling, config, dependencies
- `perf:` performance improvement

## Branching

- Create feature branches off `main`: `git checkout -b feat/short-name`
- Keep PRs small and self-contained.
- Squash-merge into `main`.

## Code Quality Gates

Before opening a PR:

```bash
npm run lint
npm test
npm run build
```

## Style Notes

- Prefer typed env helpers (`envString`, `envInt`, `envBool`) over raw `process.env`.
- Put new shared helpers under `src/common/utils/` and re-export from the barrel.
- Put new constants under `src/common/constants/` and re-export from the barrel.
- Tests live next to the file (`foo.util.ts` → `foo.util.spec.ts`).

## Adding Environment Variables

1. Add the variable to `env.example` with a comment and sensible default.
2. Read it through `src/common/config/env.ts` helpers, not raw `process.env`.
3. Add a default in `src/common/constants/` if one applies.
4. Document the variable in `README.md` under "Environment Variables".
