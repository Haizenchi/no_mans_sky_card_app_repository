# Changelog

## Desktop 2.0.0

- Fixed release executable to use the Windows GUI subsystem (no console window).
- Removed the desktop PWA install button and all PWA/service-worker code.
- Replaced browser file inputs/downloads with Tauri native open/save dialogs.
- Added PNG, JPG and WebP exports.
- Added configurable JPG/WebP compression quality.
- Kept lossless PNG as the default export format.
- Kept 16:10, 1:1 and 16:9 card layouts.
- Desktop QR now always carries compact NMS Passport data rather than a local/website path.
- Restricted Tauri permissions to open/save plus read/write of user-selected files.
- Updated GitHub Actions to Node 24 generation actions and normalized build artifacts.
- Added SHA-256 generation for Windows artifacts.
- Updated app/package metadata to Desktop 2.0.0.
- Removed obsolete desktop-only web/PWA strings, browser PWA icons and unused CSS.
- Pinned the direct Tauri Rust dependencies used by the Desktop 2.0.0 build.
- Added an export-type verification so WebP/JPG cannot silently fall back to another image format.
- Expanded the bundled QR vendor notice with the complete MIT license text.
