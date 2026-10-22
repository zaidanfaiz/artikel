---
title: "Cara Mengecek Status Root Android melalui ADB"
description: "Pelajari arti UID, cara menguji shell, dan membedakan akses superuser dari shell biasa."
date: 2026-10-18
category: "Root & Modding"
tags: ["Root", "ADB", "Terminal"]
cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1400&q=85"
featured: false
draft: false
---

## Apa indikator root berhasil?

Ikon aplikasi pengelola root tidak otomatis membuktikan bahwa setiap proses memiliki hak akses root. Pemeriksaan teknis yang umum adalah membaca UID proses.

## Memeriksa koneksi

```bash
adb devices
```

Pastikan perangkat muncul sebagai `device`, bukan `unauthorized`.

## Melihat UID shell

```bash
adb shell id
```

Contoh shell biasa:

```text
uid=2000(shell) gid=2000(shell)
```

Nilai ini menunjukkan ADB shell bukan proses root.

## Menguji superuser jika tersedia

```bash
adb shell su -c id
```

Bila izin root diberikan, output dapat memuat `uid=0(root)`. Jika muncul `su: not found` atau `permission denied`, akses tidak tersedia atau tidak disetujui.

::note[Hak root bersifat per proses; root pada satu aplikasi tidak berarti shell ADB secara otomatis mempunyai hak yang sama.]

## Uji setelah reboot

Jika sedang mendokumentasikan temporary root, lakukan kembali pemeriksaan setelah reboot dan catat perbedaan hasilnya. Sertakan model, versi firmware, dan langkah uji saat memublikasikan tutorial.
