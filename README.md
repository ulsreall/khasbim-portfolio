# Khasbi Maulana — Web3 Portfolio

Static HTML/CSS/JS portfolio for `khasbim.web.id`.

## Deploy to Vercel

### Option A — Import from GitHub

1. Create a GitHub repository, for example `khasbim-portfolio`.
2. Upload all files from this folder to the repository root.
3. Open Vercel → Add New Project → Import Git Repository.
4. Framework Preset: **Other**.
5. Build Command: leave empty.
6. Output Directory: leave empty / root.
7. Deploy.

### Option B — Vercel manual upload

1. Open Vercel dashboard.
2. Add New Project.
3. Upload this folder / ZIP contents.
4. Deploy as a static site.

## Custom domain

In Vercel:

1. Project → Settings → Domains.
2. Add `khasbim.web.id`.
3. Follow the DNS records shown by Vercel from your domain/DNS provider.
4. Wait until Vercel shows Valid Configuration and HTTPS is active.

## Files

- `index.html` — portfolio page
- `styles.css` — styling
- `script.js` — interactions
- `assets/profile.png` — profile image
- `assets/CV_Khasbi_Maulana.pdf` — CV download asset
- `vercel.json` — Vercel static hosting headers/config
