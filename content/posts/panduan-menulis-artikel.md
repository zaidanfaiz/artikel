---
title: "Cara Menulis Artikel dengan Foto, Video, dan Blok Kode"
description: "Panduan mengelola publikasi di Zaidan Journal menggunakan Markdown, galeri, dan video YouTube."
date: 2026-10-16
category: "Panduan"
tags: ["Markdown", "Website", "Konten"]
cover: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1400&q=85"
featured: false
draft: false
---

## Menulis melalui Studio Artikel

Buka halaman **Studio Artikel**, lengkapi judul, deskripsi, kategori, tanggal, dan isi. Unduh file `.md`, lalu unggah ke folder `content/posts/` di GitHub.

## Cara menambahkan gambar

Sisipkan foto dengan sintaks Markdown:

```markdown
![Deskripsi foto](https://example.com/gambar.jpg)
```

Untuk screenshot buatan sendiri, unggah dulu ke `public/images`, lalu tulis path `/images/namafile.jpg`.

## Menyisipkan video YouTube

Tuliskan perintah ini pada baris terpisah:

```text
::youtube[ID_VIDEO_YOUTUBE]
```

Video akan memakai pemutar embed YouTube dengan rasio 16:9.

## Galeri dan blok kode

Galeri dapat dibuat dengan format:

```text
::gallery[/images/satu.png|/images/dua.png]
```

Contoh blok kode terminal:

```bash
adb devices
adb shell id
```

::warning[Jangan unggah token akses, password, data pribadi, atau screenshot yang masih memuat informasi sensitif.]

## Draf dan penerbitan

Ubah `draft: true` di header artikel untuk menyembunyikannya dari website. Setelah siap, ganti menjadi `draft: false` dan commit ke branch `main`.
