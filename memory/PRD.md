# Dedari Store Bali — PRD

## Original Problem Statement
Single-page, mobile-first landing page (Bahasa Indonesia) untuk Dedari Store Bali —
perantara jual-beli iPhone second original & terdaftar resmi di area Sarbagita, Bali.
Tujuan: penjual dapat 75–90% harga pasaran (bukan ditekan makelar), pembeli dapat unit
terverifikasi (battery ≥80%, terdaftar resmi / inter bercukai).

Stack: React + Tailwind + framer-motion. Tanpa backend. Semua data editable via JSON.
Semua kontak via WhatsApp.

## User Personas
1. **Penjual (user lama iPhone)** — mau jual iPhone bekas, butuh harga adil
2. **Pembeli (user baru)** — mau beli iPhone second terverifikasi

## Architecture
- **Frontend**: React 19 + Tailwind + framer-motion + shadcn/ui
- **Data**: `/app/frontend/src/data/config.json` (kontak, harga pasaran, multiplier, katalog)
- **Logic**: `/app/frontend/src/lib/pricing.js` (kalkulator estimasi), `/app/frontend/src/lib/whatsapp.js` (link builder)
- **Backend**: Tidak dipakai (template FastAPI tetap ada tapi tidak diakses)

## Implemented (Dec 2025)
- Hero dengan 2 CTA (Saya Mau Jual / Saya Mau Beli) + 3 trust badge
- Problem section (Makelar vs Dedari, perbandingan 2 kolom)
- Seller path: 2 kartu (Jual Putus, Titip Jual) + Kalkulator Estimasi 6-field
  - Auto grading A/B/C/D dari battery+fisik+riwayat+kelengkapan
  - Rejection jika BH < 80%
  - Output 2 angka (Titip Jual & Jual Putus) + tombol WA dengan pesan otomatis
- Buyer path: katalog grid 8 unit dummy + filter (model/grade/harga)
  - Status TERJUAL overlay + tombol disabled
  - Tombol "Tanya Unit Ini" → WA dengan detail unit
- Sistem Grading: 4 kartu A/B/C/D + warning callout 80% BH
- Cara Kerja: 3 langkah dengan icon + dashed connector
- Trust Signals: 6 kartu
- FAQ accordion (7 pertanyaan)
- Footer (WhatsApp +6281237529881, IG @dedaristorebali, area, jam ops)
- Floating WhatsApp button (muncul setelah scroll 400px)
- Sticky header glassmorphism dengan mobile menu
- Logo SVG fallback (jika `/public/logo.png` belum diupload)
- Animasi framer-motion (fade-up, stagger) di semua section
- 100% Bahasa Indonesia
- Mobile-first responsive (tested 375px + 1920px)

## Config (User-editable)
File: `/app/frontend/src/data/config.json`
- `kontak.whatsapp` = "6281237529881"
- `kontak.instagram` = "https://www.instagram.com/dedaristorebali"
- `hargaPasaran` — 10 model iPhone (11 → 15 Pro)
- `multiplierTitipJual` — A:0.90 / B:0.85 / C:0.80 / D:0.72
- `potonganJualPutus` — 0.07
- `katalog` — 8 unit dummy, field: id/model/kapasitas/warna/grade/asal/batteryHealth/harga/foto/status/highlight

## Test Status
- Frontend: 24/24 checks passed (iteration_1.json)
- No console errors, no critical bugs
- Calculator math verified: iPhone 13 128GB Grade A → Titip Rp 5.850.000, Putus Rp 5.450.000

## Backlog / Next
- P1: User upload logo file (`/app/frontend/public/logo.png`) untuk replace SVG fallback
- P1: User upload foto produk asli (saat ini pakai Unsplash placeholder)
- P2: Tambah halaman "Tentang" terpisah jika dibutuhkan
- P2: Form lead-magnet "Cek harga iPhone-mu" untuk capture WA leads (saat ini langsung ke WA)
- P2: Testimoni section (foto + caption dari user yang sudah deal)
- P2: SEO sitemap.xml + robots.txt untuk local SEO Bali
- P2: Tambah Google Tag Manager / Meta Pixel untuk tracking
- P2: Loading skeleton untuk gambar katalog
