# Auth Flow Review

## Issues Found & Fixed

### 1. `src/auth/auth.module.ts` — CRITICAL (runtime crash)

**Problem:** The module was missing `PassportModule`, `JwtModule`, and the strategy providers. NestJS DI would fail to inject `JwtService` into `AuthService` and the JWT guards would never work.

**Fixed:** Added `PassportModule`, `JwtModule.register({})`, `JwtStrategy`, and `JwtRefreshStrategy` to the module.

```ts
imports: [PassportModule, JwtModule.register({})],
providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
```

> `JwtModule.register({})` is intentionally empty — secrets are passed per-call in `signAsync()` to support dual-token (access + refresh) with different secrets.

---

### 2. Dead scaffold files — removed

These were auto-generated CLI stubs with no content. They imported nothing and were never used:

- `src/auth/entities/auth.entity.ts` — empty `Auth` class
- `src/auth/dto/create-auth.dto.ts` — empty `CreateAuthDto`
- `src/auth/dto/update-auth.dto.ts` — `UpdateAuthDto extends PartialType(CreateAuthDto)` — pointless since `CreateAuthDto` was empty

---

### 3. `prisma/schema.prisma` — no `url` needed (Prisma 7)

**Note:** Prisma 7 removed `url = env(...)` from `schema.prisma`. The connection URL is correctly configured in `prisma.config.ts` via `datasource.url`. No change needed.

---

### 4. `src/auth/strategies/jwt.strategy.ts` & `jwt-refresh.strategy.ts`

`secretOrKey: process.env.JWT_ACCESS_SECRET` typed as `string | undefined`, but expects `string | Buffer`.

**Fixed:** Cast to `as string`.

---

### 5. `src/auth/auth.service.ts` — `signAsync` overload error

`expiresIn` expects `StringValue` (branded type from `ms`), not plain `string`.

**Fixed:** Cast to `as any` — safe at runtime, only a type-system workaround.

---

## What Is Good

- **Timing-safe password comparison** — `bcrypt.compare` used correctly in both `login` and `refresh`.
- **Refresh token hashing** — the refresh token is hashed before storing in DB. Correct.
- **Unified error message** — `login` returns the same `'Invalid credentials'` whether user not found or wrong password. Prevents user enumeration.
- **Token rotation** — `signTokens` always re-hashes and updates the stored refresh token. Correct pattern.
- **Logout** — sets `refreshToken: null` in DB. Valid invalidation approach.
- **`PrismaModule` is `@Global()`** — no need to import it in `AuthModule`.
- **`passReqToCallback: true`** in `JwtRefreshStrategy` — correctly passes the raw token from the request to `validate()` for comparison.
- **DTOs use `class-validator`** — `RegisterDto` and `LoginDto` are properly decorated.

---

## Flow Summary

```
POST /auth/register  →  hash password  →  create user  →  signTokens  →  { accessToken, refreshToken }
POST /auth/login     →  find user  →  compare password  →  signTokens  →  { accessToken, refreshToken }
POST /auth/refresh   →  [jwt-refresh guard]  →  find user  →  compare refreshToken  →  signTokens  →  { accessToken, refreshToken }
POST /auth/logout    →  [jwt guard]  →  set refreshToken = null
```
