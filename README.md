# Sai Assets — Wealth Dashboard

A single-file, static mutual-fund portfolio dashboard. It parses a Consolidated Account
Statement (CAMS + KFintech CAS) **entirely in your browser** and revalues holdings with
live NAVs. Nothing is uploaded to any server.

## Privacy

- The app ships with **no personal data**. On first load it shows an empty dashboard
  and prompts you to import a CAS.
- Your imported statement (holdings, SIPs, investor name/PAN) is stored only in your
  browser's `localStorage` on your own device. It is never sent anywhere.
- CAS PDFs are excluded from git via `.gitignore` — never commit them.

## Use

Open the deployed site, go to **Import Portfolio**, enter your CAS PDF password, and
select the file. The dashboard populates locally. Use **Settings → Clear saved data**
to wipe it, or **Privacy mode** to mask amounts.

## Deploy

Static site — no build step.

### GitHub + Vercel
1. Create a new GitHub repo and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Sai Assets dashboard (no personal data)"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```
2. In Vercel: **Add New → Project → Import** the repo.
3. Framework preset: **Other**. Build command: none. Output directory: `./` (root).
4. Deploy. `index.html` is served at the root.

## Files

- `index.html` — the entire app (HTML + CSS + JS in one file).
- `vercel.json` — static hosting config + security headers.
- `.gitignore` — keeps CAS PDFs and private backups out of the repo.

## Disclaimer

Informational dashboard only — not investment advice. Mutual fund investments are
subject to market risks; read all scheme-related documents carefully.
