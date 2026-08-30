# Desktop source

Tauri 2 wrapper for **NMS Passport Desktop v2.0.1**.

- `src/` — FR/EN desktop frontend based on the NMS Passport v2.2 card engine.
- `src-tauri/` — native Windows wrapper and restricted capabilities.
- `package.json` — pinned Tauri CLI and build commands.

Build on Windows:

```bash
npm install --no-audit --no-fund
npm run desktop:build
```

The desktop source intentionally contains **no PWA manifest or service worker**.
