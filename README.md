# Zaidan Journal

**Understand the tech. Own the knowledge.**

Portal artikel Android, rooting, modding, jaringan, dan pemrograman. Tampilan editorial modern, responsif, dengan halaman permanen untuk setiap artikel, kategori, pencarian, galeri, video YouTube, blok kode, dark mode, sitemap, RSS, dan metadata SEO.

## Terbitkan website

1. Buka **Settings → Pages** di repository.
2. Pada **Build and deployment**, pilih **GitHub Actions**.
3. Buka tab **Actions → Deploy Zaidan Journal**, pilih **Run workflow** jika diperlukan.
4. Situs publik: **https://zaidanfaiz.github.io/artikel/** (setelah deployment berhasil).

## Tambah artikel (tanpa edit kode)

1. Buka **https://zaidanfaiz.github.io/artikel/studio.html**.
2. Isi judul, kategori, deskripsi, tags, tanggal, dan konten Markdown.
3. Gunakan tombol **+ Foto**, **+ YouTube**, **+ Kode**, **+ Galeri** bila perlu.
4. Klik **Unduh file .md**. Studio juga dapat menyimpan draf di browser lokal.
5. Di GitHub, buka **content/posts → Add file → Upload files**, unggah file tadi, lalu commit ke `main`.
6. GitHub Actions membangun ulang website. Nama file menjadi slug URL. Misalnya `tutorial-root.md` → `/artikel/tutorial-root/`.

**Catatan:** Studio bukan CMS dengan login. Belum ada tombol publikasi langsung agar tidak perlu memasukkan token GitHub pribadi di browser publik.

## Media

- Foto dan screenshot sendiri: unggah ke folder `public/images/`, gunakan referensi `/images/contoh.png`.
- Foto lain: gunakan yang jelas izinnya, misalnya **Unsplash**: https://unsplash.com/license.
- Embed video: `::youtube[ID_VIDEO_YOUTUBE]` atau URL YouTube yang didukung.
- Galeri: `::gallery[/images/foto1.jpg|/images/foto2.jpg]`.
- Peringatan: `::warning[Isi peringatan]`, catatan: `::note[Isi catatan]`.
- Kode: gunakan code fence Markdown tiga backtick beserta nama bahasa (misalnya `bash`).

## Tulis secara manual

Buat file Markdown baru di `content/posts/` dengan header berikut:

```yaml
---
title: "Panduan baru"
description: "Ringkasan singkat untuk Google dan pengunjung."
date: 2026-10-22
category: "Android"
tags: ["Android", "Tutorial"]
cover: "/images/cover.jpg"
featured: false
draft: false
---
```

Tambahkan isi artikel Markdown di bawah header. Ubah `draft: true` untuk menyembunyikan artikel. Jangan memakai nama file yang sama dengan artikel lain.

## Build lokal

Proyek tidak memiliki dependency runtime eksternal. Gunakan Node.js 22+:

```sh
node scripts/build.cjs
python -m http.server 8000 --directory dist
```

Website keluaran berada di `dist/`. Aplikasi ini dibangun sebagai halaman statis; tidak membutuhkan database, server backend, maupun token akses rahasia.

## Domain custom

Default `site.config.json`: `siteUrl = https://zaidanfaiz.github.io`, `basePath = /artikel/`.
Kalau lu telah memiliki domain, ubah `siteUrl` menjadi `https://domainlu.com`, `basePath` menjadi `/`, tambahkan file `CNAME` berisi nama domain tersebut, atur DNS, dan masukkan domain pada **Settings → Pages → Custom domain**. Panduan DNS resmi: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## Panduan keamanan

Jangan mengunggah password, token API, data sensitif, atau screenshot yang berisi informasi pribadi. Untuk tutorial Android root, sebutkan model perangkat, build firmware, patch keamanan, metode uji, dan risiko pemulihan. Gambar hasil pencarian Google tidak otomatis bebas hak cipta.

---
Created and maintained by [Zaidan Faiz](https://github.com/zaidanfaiz).
