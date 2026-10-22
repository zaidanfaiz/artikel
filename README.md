# Zaidan Journal

**Understand the tech. Own the knowledge.**

Website artikel teknologi berbasis file Markdown yang dipublikasikan otomatis lewat GitHub Pages. Topik unggulan saat ini: **Temporary Root Android dengan GhostLock**.

## Baca tutorial GhostLock

- Situs: https://zaidanfaiz.github.io/artikel/
- Tutorial lengkap: https://zaidanfaiz.github.io/artikel/artikel/tutorial-temporary-root-ghostlock/
- Sumber utama: https://github.com/YuKongA/ghostlock-app
- Daftar kernel yang didukung: https://github.com/YuKongA/ghostlock-app/blob/main/docs/kernel_profiles/SUPPORTED_DEVICES.md

Artikel GhostLock berisi diagram penjelasan orisinal, ilustrasi tahap pengecekan dan verifikasi, serta foto bebas pakai dari Unsplash. Diagramnya bukan screenshot aplikasi maupun klaim pengujian perangkat tertentu. Cocokkan kernel secara persis dan baca risiko sebelum menjalankan metode temp root.

## Buat artikel baru kapan saja

1. Kunjungi https://zaidanfaiz.github.io/artikel/studio.html.
2. Tulis judul, deskripsi, tanggal, kategori dan isi konten Markdown. Ada tombol sisip gambar, video YouTube, kode terminal, galeri dan peringatan.
3. Unduh file `.md`.
4. Di GitHub, unggah ke folder `content/posts/`, lalu commit ke `main`.
5. GitHub Actions akan membangun halaman baru dengan alamat sesuai nama file. Contoh `artikel-saya.md` menghasilkan `/artikel/artikel-saya/`.

**Studio menyimpan draf di browser, bukan database.** Tidak ada token GitHub, password atau informasi pribadi yang diminta oleh frontend.

## Format Markdown

```yaml
---
title: "Judul artikel"
description: "Ringkasan artikel"
date: 2026-10-22
category: "Android"
tags: ["Android", "Tutorial"]
cover: "/images/cover.svg"
featured: true
draft: false
---
```

Tambahkan konten Markdown di bawah metadata. Sisip foto menggunakan `![Penjelasan foto](/images/foto.png)`; foto lokal ditaruh di `public/images/`. Untuk video gunakan `::youtube[ID_VIDEO_YOUTUBE]`, galeri menggunakan `::gallery[/images/01.png|/images/02.png]`, dan peringatan menggunakan `::warning[Pesan]`.

## Deploy

Pada **Settings → Pages** pilih **Source: GitHub Actions**. Workflow `.github/workflows/deploy.yml` akan berjalan saat push ke `main`.

Build lokal dengan Node.js 22+:

```sh
node scripts/build.cjs
python -m http.server 8000 --directory dist
```

Untuk domain pribadi, sesuaikan `site.config.json`, file `CNAME`, konfigurasi DNS dan **Settings → Pages → Custom domain** berdasarkan panduan resmi GitHub.

## Kredit dan sumber

- GhostLock: https://github.com/YuKongA/ghostlock-app (proyek pihak ketiga, tidak berafiliasi dengan jurnal ini).
- ReSukiSU: https://github.com/ReSukiSU/ReSukiSU
- Shizuku: https://shizuku.rikka.app/
- Lisensi foto Unsplash: https://unsplash.com/license
- Ilustrasi SVG (`public/images/ghostlock/`) dibuat khusus untuk Zaidan Journal. Tidak ada screenshot root sukses yang diklaim sebagai hasil pengujian.

Ditulis dan dikelola oleh [Zaidan Faiz](https://github.com/zaidanfaiz).
