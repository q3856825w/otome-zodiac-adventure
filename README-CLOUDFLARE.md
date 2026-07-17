# otome-zodiac-adventure

## Local build

```bash
npm install
npm run build
```

## Cloudflare Pages

- Root directory: `/`
- Build command: `npm run build`
- Build output directory: `dist`

The project is a Vite + React + TypeScript application. Do not upload `node_modules` or `dist`; Cloudflare Pages installs dependencies and creates `dist` during deployment.
