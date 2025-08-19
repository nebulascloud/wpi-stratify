# 01-UserManagementSystem

## 1. Problem
Current application lacks authenticated user accounts, preventing personalization, secure data access, and role‑based administration. A foundational user management system (accounts, authentication, authorization) is required to enable future features (saved assessments, auditability, admin curation of maturity models).

## 2. Scope
### In
- User entity (id, email, hashed password, created_at, role)
- Roles: `user` (default), `admin`
- Backend REST endpoints:
  - POST /api/auth/register
  - POST /api/auth/login
  - GET /api/users/me (auth required)
  - PATCH /api/users/me (update limited fields: display name)
  - GET /api/users (admin only, paginated)
  - PATCH /api/users/:id (admin role/disable)
- Authentication: JWT (access token) signed with server secret (HS256)
- Password hashing (Argon2 preferred; fallback bcrypt if library constraints)
- Basic account validation (email format, password strength rules)
- Frontend: Login + Registration forms; session handling via in‑memory state + localStorage token
- Frontend guard/redirect for protected page(s) (e.g., maturity form requires login)
- Logout mechanism (client-side token purge)
- Minimal security hardening: rate limit auth endpoints, constant‑time password compare, deny duplicate email
- Error model (standard JSON error envelope)
- Basic audit fields (created_at, last_login)
- Minimal documentation (README section + endpoint reference)
- Unit + integration tests (backend auth flows; hashing; role guard)
- Manual test script

### Out
- Social login (OAuth)
- Password reset / email delivery
- Email verification
- Multi‑factor auth
- Refresh tokens / rotation strategy
- Account deletion privacy workflows
- Full admin UI (only minimal listing via API)
- Fine‑grained permissions beyond simple roles
- SSO / enterprise identity
- Rate limit persistence / distributed throttling
- Frontend design polish beyond functional forms

## 3. Acceptance Criteria
- [ ] A user can register with unique email + valid password (strength: ≥8 chars, 1 letter, 1 number)
- [ ] Duplicate registration with same email returns 409
- [ ] Login with valid credentials returns JWT (exp ≤ 24h) and user profile (excluding password hash)
- [ ] Invalid credentials return 401 (no user enumeration specifics)
- [ ] Authenticated request with `Authorization: Bearer <token>` to /api/users/me returns correct user
- [ ] Expired / malformed token returns 401
- [ ] Standard user forbidden (403) from GET /api/users and PATCH /api/users/:id
- [ ] Admin can list users with pagination (default limit 20, supports `?page=` or `?offset=&limit=`)
- [ ] Admin can elevate/demote user role (cannot remove last remaining admin; attempt returns 400)
- [ ] Passwords stored only as strong hashes (no plaintext in logs or DB)
- [ ] Rate limiting active on login + register (e.g., >5 attempts per 5 minutes per IP returns 429)
- [ ] Frontend exposes Login + Register flows with validation messages
- [ ] After login, token stored (localStorage) and used on protected requests
- [ ] Logout clears token and protected route redirects to login
- [ ] Maturity assessment page requires auth (redirect if not logged in)
- [ ] Basic backend test suite passes (≥80% coverage on auth module functions)
- [ ] README updated with run + auth usage instructions
- [ ] Plan file referenced in PR description

## 4. Risks & Assumptions + Validation

| Risk / Assumption | Type (R/A) | Impact if False | Mitigation / Validation Step |
|-------------------|-----------|-----------------|------------------------------|
| Argon2 library availability in deployment env | A | Need fallback hashing | Abstract hasher; test both locally |
| JWT secret properly injected via env | R | Tokens invalid / insecure | Add startup check rejecting empty secret |
| Single admin could demote self leaving no admins | R | Locked admin functions | Guard logic + test |
| Rate limiting in stateless environment may reset too easily | R | Brute force window | Simple in‑memory ok for MVP; document future Redis |
| Password policy sufficient | A | Weak accounts | Add configurable validator; test edge cases |
| Frontend token storage safe enough for MVP | A | XSS risk | Document limitation; future httpOnly cookie plan |
| Time skew may cause premature expiry | R | User complaints | Use reasonable exp (e.g., 12h) + test with mock clock |
| Pagination performance acceptable with naive query | A | Slow list | Accept for MVP; future indexing if needed |

## 5. Minimal Tests
### Backend Unit
- Hashing: password -> hash -> verify (success + failure)
- JWT: sign -> verify -> tamper signature -> fail
- Role guard middleware: allows admin; denies user
- Validation: weak password rejected; malformed email rejected

### Backend Integration
- Register -> Login -> Me flow (happy path)
- Duplicate email register
- Login wrong password
- Access protected route without token
- Admin list users (with >1 created) pagination correctness
- Admin role change attempt demoting last admin (fails)
- Rate limit trigger (simulate >5 login failures)

### Frontend
- Form validation messages (email format, password strength)
- Successful login stores token & redirects
- Protected page redirect when unauthenticated
- Logout clears token

### Manual
- JWT expiry check (adjust system time or configure short exp)
- Inspect network requests for absence of password leakage

## 6. Task Breakdown
- [ ] Create plan file (this) & assign issue linkage
- [ ] Backend: define user model (in-memory or simple persistence layer placeholder) TODO: confirm persistence (file/DB)
- [ ] Backend: add password hashing utility (argon2 wrapper with fallback)
- [ ] Backend: add JWT utility (sign, verify, extract user)
- [ ] Backend: add validation helpers (email, password policy)
- [ ] Backend: implement register endpoint
- [ ] Backend: implement login endpoint
- [ ] Backend: implement auth middleware (token parse + attach user)
- [ ] Backend: implement role guard middleware
- [ ] Backend: implement GET /api/users/me
- [ ] Backend: implement PATCH /api/users/me (allowed fields)
- [ ] Backend: implement admin list users endpoint (pagination)
- [ ] Backend: implement admin user role update / disable endpoint
- [ ] Backend: implement last-admin protection logic
- [ ] Backend: implement rate limiting (simple in-memory counter)
- [ ] Backend: standardize error response format
- [ ] Backend: tests - hashing & jwt unit
- [ ] Backend: tests - validation
- [ ] Backend: tests - role guard
- [ ] Backend: tests - register/login/me integration
- [ ] Backend: tests - pagination & admin restrictions
- [ ] Backend: tests - last admin protection
- [ ] Backend: tests - rate limit scenario
- [ ] Frontend: add auth API client wrapper
- [ ] Frontend: add auth state (context/provider)
- [ ] Frontend: Login page/form + validation
- [ ] Frontend: Registration page/form + validation
- [ ] Frontend: Protected route wrapper / redirect logic
- [ ] Frontend: Integrate auth guard into maturity page
- [ ] Frontend: Logout action (nav item)
- [ ] Frontend: minimal styling adjustments (reuse existing style approach)
- [ ] Frontend: add basic component tests (if test framework present) TODO: confirm framework
- [ ] README: document auth endpoints + local env vars
- [ ] Security review pass (check no plaintext password logging)
- [ ] Manual test script doc
- [ ] PR creation referencing plan & issue
- [ ] Post-merge cleanup (verify deployment)

## 7. Links
- Jira: TODO: Add ticket key (e.g., WPI-XX)
- Confluence: TODO: Add architecture / auth notes page
- Future PR: TODO: Add PR link once opened
- This Plan File: `docs/plans/01-UserManagementSystem.md`

## 8. Review Sign-off
| Reviewer Role | Name | Date | Notes |
|---------------|------|------|-------|
| Engineering | TODO |  |  |
| Security | TODO |  |  |
| Product | TODO |  |  |
| QA | TODO |  |  |
