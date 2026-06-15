# Railway Deployment

## 1. Purpose & Functionality

Builds and serves the Angular SPA on **Railway** as a Docker container: Node
compiles the app, and **nginx** serves the static output with SPA routing.
Deploys happen automatically on every push to `main`.

- **Service:** `tubus-servicios` (Railway project `tu-bus-express`,
  `production` environment).
- **Repo / branch:** `tubusservice-dev/tubus-servicios` @ `main`.
- **Public URL:** `tubus-servicios.up.railway.app`.

## 2. Architectural Decisions (The "Why")

- **Docker + nginx over Nixpacks/Railpack.** Railway has no native static
  hosting; it runs containers. A multi-stage Dockerfile gives full control over
  the three things a static SPA needs: listen on the injected `$PORT`, **fall
  back unknown routes to `index.html`** (so `/admin` deep-links don't 404), and
  cache fingerprinted assets. `railway.json` pins the builder to `DOCKERFILE`.

- **Multi-stage build** keeps the runtime image small: the Node toolchain and
  `node_modules` stay in the build stage; only the compiled
  `dist/tubus-servicios/browser` output is copied into the nginx image.

- **`npm ci`** (not `npm install`) for reproducible builds — `package-lock.json`
  is committed.

- **Port handling.** nginx listens on `${PORT}`. The Dockerfile sets
  `ENV PORT=80` as a local default, but on Railway the **`PORT` service variable
  is set to `8080`** and the public domain's target port is `8080` — both ends
  match deterministically. (Railway containers are network-isolated, so the
  internal port never collides with other services.)

- **`.dockerignore`** excludes `node_modules`, `dist`, `.angular`, `.git`,
  `legacy`, and `*.md` from the build context — so docs/legacy never bloat the
  image or trigger functional rebuilds.

## 3. Technical Flow & Components

**Files (repo root):**

- `Dockerfile` — stage 1: `node:22-alpine`, `npm ci`, `npm run build`. Stage 2:
  `nginx:1.27-alpine`, copies the nginx template + the `browser` output.
- `nginx/default.conf.template` — rendered by the nginx image entrypoint at
  startup (envsubst substitutes `${PORT}`; other nginx vars like `$uri` are left
  intact). Contains gzip, long-cache for hashed assets, `no-cache` for
  `index.html`, and the SPA fallback `location / { try_files $uri $uri/ /index.html; }`.
- `.dockerignore` — build-context exclusions.
- `railway.json` — `build.builder = DOCKERFILE`; restart policy `ON_FAILURE` (10).

**Deploy pipeline:**

1. Push to `main` (`tubusservice-dev/tubus-servicios`).
2. Railway's GitHub App detects the push (auto-deploys enabled) and builds the
   Dockerfile.
3. nginx serves on `$PORT`; the generated domain routes to it.

**Build output path:** the Angular `application` builder emits to
`dist/tubus-servicios/browser/` — this exact path is what the Dockerfile copies.

## 4. Limitations & Edge Cases

- **GitHub App access:** the repo was transferred `gerardojcnz` →
  `tubusservice-dev`. Railway only lists repos its GitHub App can access; the org
  `tubusservice-dev` had to be granted access (and the repo added to the
  installation) before it appeared in *Connect Repo*. Symptom was
  "No repositories found" / "GitHub Repo not found".
- **Domain needs a running deploy:** generating the domain before a successful
  deploy yields 502/404. Order: deploy first, then generate domain.
- **Port mismatch is the classic failure:** if the `PORT` variable and the
  domain's target port differ, the domain won't connect. Keep both at `8080`.
- **No healthcheck path** is configured (nginx is effectively always-up once the
  build succeeds).
- **`git remote`** locally still points to the old `gerardojcnz` URL; GitHub
  redirects pushes to the new location, but it can be updated with
  `git remote set-url origin https://github.com/tubusservice-dev/tubus-servicios.git`.

## 5. Integration Guide & Future Improvements

- **Deploy a change:** push to `main`. Railway rebuilds and redeploys
  automatically (~2–4 min). Watch **Deployments → View Logs** for `npm ci` →
  `ng build` → nginx.
- **Deploy without GitHub (fallback):** Railway CLI —
  `npm i -g @railway/cli` → `railway login` → `railway link` → `railway up`
  (uses the same Dockerfile).
- **Verify a deploy objectively:** the home URL must return the correct
  `<title>`; `/<deep-link>` (e.g. `/admin`) must return **HTTP 200** with the app
  shell (not 404) — that proves the nginx SPA fallback.
- **Custom domain:** Railway → service → Networking → **Custom Domain**
  (e.g. `servicios.tubusexpress.com`) and add the CNAME at the DNS provider.
- **Next steps:** add a healthcheck path; consider a CDN/cache layer if traffic
  grows; pin `node:22.x-alpine` to an exact minor for fully reproducible images.
