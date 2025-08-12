# Copilot Instructions: Coding Standards and Development Workflow (instruction.md)

Purpose: Define our coding standards, folder structure rules, and the end‑to‑end development workflow for TypeScript (frontend) and Python (backend). This enforces planning before coding and verification before marking work complete.

Audience & Usage
- For GitHub Copilot agents and contributors: use this as the source of truth when generating branches, commits, PRs, and docs.
- Prefer smallest diffs; do not reformat unrelated code or change public APIs unless required by the task.
- For docs‑only changes, avoid touching package manifests or lockfiles.
- Ask Copilot agent to update these when you encounter things that either worked well (include new standards) or didn't (propose changes).

---

## 1) Plan Before You Code (required)

Before starting any implementation:
- Define the problem, scope, and Acceptance Criteria in Jira (link Confluence when applicable).
- Identify risks/assumptions and how you’ll validate them.
- Decide minimal tests you’ll write/run to prove it works.
- Create a feature branch from up‑to‑date `main` (see Section 3 and 4).

Completion gate for planning:
- [ ] Jira ticket has a clear Description and AC
- [ ] Links to any docs/specs
- [ ] Validation approach noted (tests + manual checks)

---

## 2) Folder Structure Rules

Root level (mono‑repo):
- `frontend/` — Vite + React (TypeScript)
- `backend/` — Python service(s) (future)
- `.github/` — PR/Issue templates, CODEOWNERS
- Other: `data/`, root docs (e.g., this file), config files

Frontend (conventions):
- `frontend/components/` — Reusable UI components
- `frontend/pages/` — Route‑level pages/screens
- `frontend/styles/` — Global styles
- `frontend/index.html`, `frontend/main.tsx`, `frontend/vite.config.ts`

Backend (suggested):
- `backend/app/` — Application code
- `backend/tests/` — Tests
- `backend/requirements.txt` or `pyproject.toml` — Dependencies

Rules:
- Keep modules small and cohesive; prefer flat structure per domain over deep nesting.
- No secrets in repo. Use environment variables (e.g., Vercel/Local env files not committed).
- No generated artifacts in Git (e.g., `dist/`, `node_modules/`, `__pycache__/`).

---

## 3) Development Workflow (Git)

- Branches: `feature/wpi-<ticket>-<short-name>` (e.g., `feature/wpi-25-coding-standards`). Always include the Jira key in branch names.
- Never commit directly to `main`.
- Keep branch synced: `git fetch` + `git rebase origin/main` regularly.
- Commit messages: Conventional Commits with Jira key (e.g., `docs(WPI-25): add instruction.md`).
- Open a PR using the template. Keep PRs small and focused.
- Vercel Preview deploys on every push to non‑main branches (expected).
- Merge only after checks pass and review complete.

PR description mapping (use the repository template):
- Related Issue: link Jira (e.g., `Closes WPI-25`).
- Description: concise summary; call out scope (docs/code) and risk.
- Checklist: confirm local build/tests and link Preview URL if applicable.

---

## 4) TypeScript (Frontend) Standards

General:
- Enable and honor TypeScript’s types; avoid `any`. Prefer specific types or generics.
- Prefer `type`/`interface` for public contracts; use discriminated unions for variants.
- Keep functions pure where possible; avoid side effects in render paths.
- Organize imports (libs first, absolute aliases next if configured, then relative). No unused imports.
- Consistent file naming: `PascalCase` for components, `camelCase` for utilities.

React specifics:
- Functional components + hooks. Derive state; avoid redundant state.
- Props must be typed; avoid implicit `any`.
- Extract reusable UI into `components/` with clear props.
- Side effects in `useEffect` with correct deps; cleanup when needed.

Example (good):
```ts
// frontend/components/UserCard.tsx
import React from 'react';

type User = {
  id: string;
  name: string;
};

type Props = { user: User };

export function UserCard({ user }: Props) {
  return <div>{user.name}</div>;
}
```

Anti‑patterns:
- Using `any` for props/state
- Large components doing multiple concerns
- Business logic inside JSX conditionals (extract helpers)

Simplicity & Maintainability (agent guardrails):
- Keep changes minimal; avoid over‑engineering and speculative abstractions.
- Fix issues at root cause; don’t add layers to mask symptoms.
- Prefer clear, direct code over “clever” patterns.
- Keep files and lines-of-code small to fit comfortably within agent context limits.
- Add small helpers over large refactors; extract only when duplication/complexity justifies it.

---

## 5) Python (Backend) Standards

General:
- Follow PEP 8 style and PEP 484 type hints. Use docstrings for public functions/classes.
- Prefer composition over inheritance; keep modules small.
- Use `logging` (not `print`) with appropriate levels.
- Isolate external I/O; make core logic testable.

Dependencies & env:
- Track dependencies in `requirements.txt` or `pyproject.toml`.
- Use virtualenvs locally; do not commit virtualenv folders.

Example (good):
```py
# backend/app/calculator.py
from typing import Iterable

def sum_positive(values: Iterable[int]) -> int:
    """Return the sum of positive integers in values."""
    return sum(v for v in values if v > 0)
```

Anti‑patterns:
- No type hints/docstrings
- Global state and hidden side effects
- Catch‑all exceptions without handling/logging

Simplicity & Maintainability (agent guardrails):
- Single‑purpose functions/modules; avoid unnecessary classes.
- Early returns for guard conditions; explicit over implicit.
- Choose the simplest data structure that works (e.g., dict/list before custom classes).
- Keep code paths short; avoid redundant layers.

---

## 6) Testing & Verification (must pass before Done)

Minimum checks:
- Frontend: `npm run build` must succeed; smoke test on Vercel Preview URL.
- Backend: add unit tests for new logic (e.g., `pytest`), or a minimal script demonstrating behavior.

CI build hygiene:
- If Vercel `npm ci` fails due to lockfile mismatch, first rebase with `origin/main` to adopt the canonical lockfile; only regenerate if necessary and commit the lockfile.

Before marking a Jira task Done:
- [ ] All acceptance criteria met
- [ ] Preview/Local verification completed
- [ ] Tests updated/added where applicable
- [ ] PR approved and merged; branch deleted

---

## 7) Examples & Anti‑patterns (Quick Lists)

Examples (do):
- Small, single‑purpose components/functions
- Explicit types and clear boundaries
- Early returns for guard conditions

Anti‑patterns (avoid):
- Large “god” modules/components
- Casting to bypass types (`as unknown as X`)
- Duplicated logic across pages/components

---

Status: Initial version for WPI‑25. Update as standards evolve.
