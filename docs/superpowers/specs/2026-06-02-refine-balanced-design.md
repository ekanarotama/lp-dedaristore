# Design: Refine lp-dedaristore (Balanced)
**Date:** 2026-06-02  
**Scope:** Backend fixes + dependency cleanup + UI/UX polish (ringan)  
**Approach:** Opsi 2 — Balanced

---

## 1. Backend Fixes

### 1a. Fix CORS
- Ganti default `'*'` dengan env variable `CORS_ORIGINS`
- Fallback default: `http://localhost:3000` (bukan `*`)
- File: `backend/server.py:75`

### 1b. Fix Deprecated `@app.on_event`
- Migrasi dari `@app.on_event("shutdown")` ke `lifespan` context manager
- Pattern FastAPI modern menggunakan `asynccontextmanager`
- File: `backend/server.py:87`

```python
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    client.close()

app = FastAPI(lifespan=lifespan)
```

---

## 2. Dependency Cleanup

### Proses
1. Grep seluruh `frontend/src/` untuk setiap package
2. Hanya hapus package yang **nol** import di seluruh source
3. Jalankan build setelah hapus untuk verifikasi tidak ada yang break

### Target Hapus (perlu verifikasi grep dulu)
- `recharts` — chart library, tidak ada grafik di LP
- `react-router-dom` — routing, tidak dipakai di single-page LP
- `react-hook-form` + `@hookform/resolvers` — form library kompleks
- `zod` — schema validation, tidak ada form yang perlu ini
- `react-day-picker` + `date-fns` — date picker, tidak ada di LP
- `input-otp` — OTP input, tidak relevan
- `@radix-ui/react-breadcrumb` — tidak ada breadcrumb
- `@radix-ui/react-calendar` — tidak ada calendar
- `@radix-ui/react-input-otp` — tidak ada OTP input
- `next-themes` — theme switcher, tidak ada dark mode

### Tidak Dihapus
- `framer-motion`, `lucide-react`, `tailwindcss` — dipakai aktif
- Semua Radix UI yang terbukti di-import di `src/`
- `axios`, `@tanstack/react-query` — perlu verifikasi

---

## 3. UI/UX Polish

### 3a. Konsistensi Visual
- Audit padding/margin antar section — gunakan nilai yang konsisten
- Pastikan font-size hierarki heading → subheading → body konsisten

### 3b. Mobile Experience
- Hero: pastikan CTA buttons tidak terlalu kecil di mobile (min 44px touch target)
- Katalog cards: pastikan grid tidak overflow di layar kecil
- Kalkulator: pastikan dropdown dan hasil estimasi readable di mobile

### 3c. Katalog Cards
- Badge grade (A/B/C/D) dibuat lebih visual (warna berbeda per grade)
- Hover state card lebih jelas (shadow/border transition)
- Status "Terjual" lebih prominent (overlay atau badge merah)

### 3d. Kalkulator Estimasi
- Hasil estimasi (Titip Jual vs Jual Putus) ditampilkan lebih besar dan jelas
- Tambah penjelasan singkat perbedaan Titip Jual vs Jual Putus di dekat hasil

### 3e. FloatingWhatsApp
- Pastikan posisi tidak overlap konten penting di mobile
- Tambah margin bottom saat keyboard muncul (jika ada input di halaman)

### 3f. Minor Text
- Cek typo dan konsistensi capitalization
- Pastikan CTA text jelas dan action-oriented

---

## Batasan (Out of Scope)
- Tidak mengubah warna brand (`#1F3A5F`, `#3BAFA0`, `#E0A526`)
- Tidak mengubah layout/struktur komponen utama
- Tidak menambah fitur baru
- Tidak membuat backend API fungsional (tetap minimal)

---

## Success Criteria
- [ ] Backend tidak ada deprecated warning saat startup
- [ ] CORS tidak lagi `*` di production config
- [ ] Bundle size frontend berkurang (dependencies berkurang)
- [ ] Build frontend berhasil setelah cleanup
- [ ] UI konsisten dan mobile-friendly
