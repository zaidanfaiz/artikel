---
title: "Instal ADB dan Fastboot di Windows: Panduan Pemula"
description: "Panduan aman memasang Android Platform Tools, mengaktifkan USB Debugging, dan mengenali perintah ADB dasar."
date: 2026-10-20
category: "Android"
tags: ["ADB", "Fastboot", "Windows"]
cover: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=85"
featured: false
draft: false
---

## Apa itu ADB?

ADB (Android Debug Bridge) adalah alat resmi untuk berkomunikasi dengan perangkat Android dari komputer. Sebagian besar perintah diagnostik tidak memerlukan root.

## Persiapan

1. Unduh [Android SDK Platform Tools](https://developer.android.com/tools/releases/platform-tools) dari Google.
2. Ekstrak ke direktori yang mudah diakses, misalnya `C:\platform-tools`.
3. Buka **Opsi developer** di Android lalu aktifkan **USB debugging**.
4. Hubungkan perangkat dengan kabel data yang berfungsi.

::warning[Setujui USB Debugging hanya pada komputer tepercaya. Hapus otorisasi debugging ketika sudah tidak digunakan.]

## Jalankan perintah pertama

Di PowerShell Windows:

```powershell
cd C:\platform-tools
.\adb.exe version
.\adb.exe devices
```

Jika muncul pesan `unauthorized`, periksa dialog persetujuan pada layar ponsel.

## Ambil informasi perangkat

```powershell
.\adb.exe shell getprop ro.product.model
.\adb.exe shell getprop ro.build.version.release
.\adb.exe shell getprop ro.build.version.security_patch
```

Hasil pemeriksaan ini akan membantu menentukan kompatibilitas tutorial Android berikutnya.

## Masalah yang umum

- **device not found:** cek driver USB dan kabel.
- **unauthorized:** pastikan konfirmasi RSA pada ponsel telah disetujui.
- **adb not recognized:** jalankan dari folder platform-tools atau atur variabel PATH.

Perintah ADB tidak sama dengan metode root. Hindari menjalankan skrip yang tidak dipahami, terutama yang mengubah partisi sistem.
