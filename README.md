# NMS Passport Desktop v1.0.0

Desktop edition of **NMS Passport**, by **Haizenchi**.

This package is designed to live alongside the existing Vercel/web edition in the same GitHub repository:

```text
repo/
├── index.html                 # existing web app
├── css/                       # existing web app
├── script/                    # existing web app
├── assets/                    # existing web app
├── desktop/                   # desktop edition (this package)
└── .github/workflows/
    └── build-desktop.yml
```

## What the desktop edition changes

- Keeps the current NMS Passport v2.2 FR/EN interface and card engine.
- Runs in its own native Windows application window through Tauri 2.
- Works offline; no Vercel server is required to launch it.
- Removes the need for the PWA install flow inside the desktop app.
- PNG and JSON exports use the native Windows **Save As** dialog.
- Image and JSON imports still use the normal operating-system file picker.
- Local profiles remain stored locally in the embedded WebView data store.
- The desktop app only exposes file-system read/write APIs for files explicitly selected by the user through a native dialog.

## Easiest Windows build: GitHub Actions

Copy the contents of this package into the root of your existing repository, commit and push it.

Then on GitHub:

1. Open **Actions**.
2. Select **Build NMS Passport Desktop**.
3. Click **Run workflow**.
4. Wait for the Windows build to finish.
5. Open the completed run and download the **NMS-Passport-Windows** artifact.

The artifact contains the NSIS installer and the raw Windows executable produced by Tauri.

You can also create and push a tag such as `desktop-v1.0.0`; the workflow will run automatically.

## Local Windows build

Tauri requires Rust, Microsoft C++ Build Tools and Microsoft Edge WebView2 for Windows development. Once those prerequisites are installed:

```bash
cd desktop
npm install
npm run desktop:build
```

The installer is generated under:

```text
desktop/src-tauri/target/release/bundle/nsis/
```

## Code signing

The application metadata identifies **Haizenchi** as publisher/author, but Windows will still show an unknown/unverified publisher until the executable is signed with a real Windows code-signing certificate. No private signing key is included in this repository.
