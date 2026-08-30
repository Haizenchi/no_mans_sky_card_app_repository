# NMS Passport Desktop v2.0.0

Desktop edition of **NMS Passport**, by **Haizenchi**.

This package is designed to be copied into the existing NMS Passport GitHub repository without replacing the Vercel/web edition:

```text
repo/
├── index.html                 # web edition
├── css/                       # web edition
├── script/                    # web edition
├── assets/                    # web edition
├── desktop/                   # Windows desktop edition
└── .github/workflows/
    └── build-desktop.yml
```

## Desktop v2 highlights

- True Windows GUI executable: release builds no longer open a console window.
- FR/EN interface and the four NMS Passport modules are preserved.
- The PWA install button and all service-worker/PWA logic are removed from the desktop source.
- Native Windows file dialogs are used for image selection, JSON import, JSON export and image export.
- Export formats: **PNG, JPG and WebP**.
- JPG/WebP compression quality is adjustable from 60–100%; PNG remains lossless.
- Card layouts remain available in 16:10, square 1:1 and banner 16:9.
- The desktop QR contains a compact `NMSP2:` payload and never embeds a local Windows path.
- Local profiles remain in the WebView profile store (IndexedDB) and survive normal app restarts/updates as long as the app identifier remains `com.haizenchi.nmspassport`.
- Tauri permissions are limited to native open/save dialogs plus reading/writing files selected by the user.
- Windows build artifacts are normalized to:
  - `NMS-Passport.exe`
  - `NMS-Passport-Setup.exe`
  - `SHA256SUMS.txt`

## GitHub Actions build

Copy this package into the root of the repository, commit and push it. Then:

1. Open **Actions** on GitHub.
2. Select **Build NMS Passport Desktop**.
3. Click **Run workflow**.
4. Download the `NMS-Passport-Desktop-v2.0.0-Windows` artifact when the job is green.

The workflow also runs automatically for tags matching `desktop-v*`, for example:

```bash
git tag desktop-v2.0.0
git push origin desktop-v2.0.0
```

## Local Windows build

Install the current Tauri Windows prerequisites (Rust, Microsoft C++ Build Tools and Edge WebView2), then:

```bash
cd desktop
npm install --no-audit --no-fund
npm run desktop:build
```

The raw executable is created under `desktop/src-tauri/target/release/` and the NSIS installer under `desktop/src-tauri/target/release/bundle/nsis/`.

## Security model

The desktop wrapper exposes no shell, HTTP-client, camera, microphone, geolocation or broad filesystem capability. The frontend can request only open/save dialogs and file read/write commands. Paths selected by Tauri's native dialogs are added to the runtime filesystem scope for that session.

Imported images are signature-checked as PNG/JPEG/WebP, capped at 18 MB and dimension-validated before being stored. JSON imports are size-limited and sanitized through the same data schema as the web edition.

## Code signing

The application metadata identifies **Haizenchi** as publisher/author. This is not an Authenticode signature. Windows will continue to show an unknown/unverified publisher until releases are signed with a real Windows code-signing certificate controlled by Haizenchi.
