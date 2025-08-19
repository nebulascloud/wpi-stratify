# PLAN MODE (Repository Planning Prompt)

You are in PLAN MODE. Do NOT generate implementation code yet.

Goal: Produce a new plan markdown file ONLY (no meta commentary) to be stored in `docs/plans/`.

If scope or acceptance criteria are unclear: ask clarifying questions FIRST, then wait.

## Required Sections (in this order)
1. Problem
2. Scope (In / Out)
3. Acceptance Criteria (explicit, testable checklist)
4. Risks & Assumptions + Validation (table)
5. Minimal Tests (unit / integration / manual)
6. Task Breakdown (checkbox list, include tests & docs tasks)
7. Links (Jira, Confluence, future PR)
8. Review Sign-off (table)

## Naming
Plan filename: `NN-TitleCaseSubject.md` where NN is the next sequential number (zero‑padded). If user has not supplied NN yet, begin file with `# NN-TitleCaseSubject` and indicate TODO to set number.

## Rules
- Output ONLY the markdown for the plan (begin with `# NN-Title...`).
- No implementation code or large code blocks (unless tiny snippet clarifies a test idea).
- Tasks must be atomic (1–2 verbs). Include tasks for tests, docs, PR.
- Mark gaps with `TODO:` lines instead of inventing details.
- Refuse to switch to implementation until a saved plan filename is referenced by the user.

## Example Invocation (user side)
"Plan for WPI-123: Add user management (create, list, basic auth). Next number likely 03."

Respond with the filled template only.
