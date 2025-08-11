# Stratify Maturity Assessment Module

Initial MVP for collecting and scoring SWP maturity levels.

## Repository Configuration

This repository includes several configuration files to ensure a consistent and clean development environment.

### `.gitignore`

This file specifies intentionally untracked files to ignore. It includes standard Python and Node.js patterns, as well as common OS and IDE files. Key ignored directories include:
- `__pycache__/`
- `build/`, `dist/`
- `.env`, `.venv`
- `frontend/node_modules/`
- `frontend/dist/`

### `.gitattributes`

This file is used to define attributes for pathnames. It ensures consistent line endings across different operating systems by setting `* text=auto`. It also explicitly defines text and binary file types.

### GitHub Templates

The `.github` directory contains templates to standardize community interactions:

- **Issue Templates**: (`.github/ISSUE_TEMPLATE/`)
  - `bug_report.md`: A template for reporting bugs.
  - `feature_request.md`: A template for requesting new features.
  - `config.yml`: Disables blank issues and links to project documentation.
- **Pull Request Template**: (`.github/pull_request_template.md`)
  - Provides a simple checklist for pull requests to ensure quality and completeness.
- **CODEOWNERS**: (`.github/CODEOWNERS`)
  - Specifies the primary developer as the default reviewer for all changes.
