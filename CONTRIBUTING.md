# Contributing to wpi-stratify

This guide documents the repository conventions for the project. Please read it before opening a PR.

Related: Confluence page “WPI-14: Repository Conventions”.

## Branching Strategy
We follow GitHub Flow.

- main is protected (no direct pushes)
- Use feature branches for all work
- Naming: `JIRA-KEY-short-description` (e.g., `WPI-14-document-repo-conventions`)
- Create from main and keep up to date via rebase:

```bash
git pull --rebase origin main
```

## Commit Messages (Conventional Commits)

Format: `<type>(<scope>): <subject>`

- type: feat | fix | docs | style | refactor | test | chore
- scope: optional (e.g., backend, frontend, auth)
- subject: imperative summary

Example:

```text
feat(auth): implement user login endpoint
```

## Pull Requests

- Use the PR template
- Require at least 1 approval
- Require passing checks and up-to-date with main

## Labels

Use labels to categorize work (initial set):

- bug, feature, documentation, backend, frontend

## Jira Components

- backend, frontend, devops

## Workflow Overview (diagram)

```mermaid
flowchart LR
    A[Start work] --> B[Create feature branch: JIRA-KEY-short-name]
    B --> C[Commit changes using Conventional Commits]
    C --> D[Open Pull Request targeting main]
    D --> E{Checks & Reviews}
    E -->|CI fails| C
    E -->|CI passes| F[At least 1 approval]
    F --> G[Rebase/update with main if required]
    G --> H[Merge PR]
    H --> I[Delete branch]
    I --> J[Deploy/Release as configured]
```

## Timeline Example (diagram)

```mermaid
gitGraph
  commit id: "init"
  branch feat/WPI-10-standardize-git-files
  commit id: "WPI-10 work"
  branch feat/WPI-11-add-github-templates
  checkout feat/WPI-11-add-github-templates
  commit id: "templates"
  checkout main
  merge feat/WPI-11-add-github-templates id: "merge WPI-11"
  checkout feat/WPI-10-standardize-git-files
  commit id: "rebase on main"
  checkout main
  merge feat/WPI-10-standardize-git-files id: "merge WPI-10"
  branch fix/WPI-15-hotfix
  checkout fix/WPI-15-hotfix
  commit id: "hotfix"
  checkout main
  merge fix/WPI-15-hotfix id: "merge hotfix"
```
