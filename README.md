# Khasbi Maulana — Web3 Portfolio

Clean static portfolio for **Khasbi Maulana**, focused on React frontend work, Web3 projects, on-chain experience, and community contributions.

**Live site:** https://www.khasbim.web.id/

## Overview

This repo contains a lightweight HTML/CSS/JavaScript portfolio deployed on Vercel. It is intentionally simple: no framework, no build step, and no runtime dependencies.

## Featured work

- **KindJar** — Celo / MiniPay donation dApp
- **Base Streak Arena** — Base + Farcaster mini app experiment
- **Ayshata Guard** — Web3 wallet-safety education and risk checker
- **Crypto Price Tracker** — React + CoinGecko API market dashboard

## Tech stack

- HTML5
- CSS3
- Vanilla JavaScript
- Vercel static hosting

## Project structure

```text
.
├── assets/
│   ├── CV_Khasbi_Maulana.pdf
│   └── profile.png
├── index.html
├── script.js
├── styles.css
├── vercel.json
├── robots.txt
├── sitemap.xml
└── README.md
```

## Local preview

Because this is a static site, you can preview it with any local web server:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

## Deploy to Vercel

1. Import this repository in Vercel.
2. Framework Preset: **Other**.
3. Build Command: leave empty.
4. Output Directory: leave empty / root.
5. Deploy.
6. Add the custom domain `khasbim.web.id` in Vercel Project Settings → Domains.

## Repository settings suggestion

Use these settings on GitHub:

- **Description:** `Personal Web3 developer portfolio showcasing React projects, on-chain experience, and community contributions.`
- **Website:** `https://www.khasbim.web.id/`
- **Topics:** `portfolio`, `web3`, `react`, `frontend`, `vercel`, `static-site`

## Notes

- No API keys or private credentials are required.
- Keep assets optimized before uploading new images or PDFs.
- If project cards are changed, update the project count and sitemap/metadata when needed.
