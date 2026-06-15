# Tubus Servicios — Documentation

Internal developer knowledge for the **Tubus Servicios** landing page (Angular).
This folder is version-controlled and is the single place where project
documentation accumulates over time.

## Structure

```
docs/
├── README.md              ← this index
└── features/              ← one document per feature / domain
    ├── angular-migration.md
    └── railway-deployment.md
```

## Index

| Document | What it covers |
|----------|----------------|
| [features/angular-migration.md](features/angular-migration.md) | Migration of the monolithic static HTML site to an Angular 21 standalone app: folder architecture, theming/encapsulation decisions, the Angular 19→21 upgrade, and the design-fidelity fixes. |
| [features/railway-deployment.md](features/railway-deployment.md) | How the app is built and served on Railway: multi-stage Dockerfile, nginx SPA configuration, `$PORT` handling, and the GitHub auto-deploy pipeline. |

## Conventions for new docs

- Each new feature/domain gets its own file under `docs/features/<feature-name>.md`.
- Documents are written in **English**.
- Follow the section template: **Purpose**, **Architectural Decisions**, **Technical Flow**, **Limitations & Edge Cases**, **Integration & Future Improvements**.
- Update existing documents in place (complement, don't overwrite) when a feature evolves.

## Project snapshot (as of 2026-06-15)

- **Stack:** Angular 21 (standalone components, signals, native control flow), SCSS, TypeScript 5.9.
- **Hosting:** Railway, Docker + nginx, auto-deploy from `main`.
- **Repo:** `tubusservice-dev/tubus-servicios`.
- **No backend:** the site is fully static; the gallery admin persists to `localStorage`.
