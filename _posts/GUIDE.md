# 🧭 Panduan Penulisan RandomWeeks
**Dokumen Resmi Standar Penulisan & Taksonomi Blog**

Dokumen ini adalah *Buku Suci* (Guideline) untuk Anda (Zidan) sebelum menerbitkan artikel baru. Mengikuti panduan ini akan memastikan arsitektur blog Anda tetap rapi, konsisten, dan mudah ditemukan oleh mesin pencari maupun pembaca, tidak peduli apakah artikel Anda berjumlah 10 atau 10.000.

---

## 🏗️ 1. Struktur *Front-Matter* (Kepala Artikel)
Setiap artikel (file markdown) wajib diawali dengan blok *Front-Matter*. Salin templat di bawah ini setiap kali Anda membuat tulisan baru:

```yaml
---
layout: post
title: "Judul Artikel Anda yang Memancing Rasa Penasaran"
date: YYYY-MM-DD
categories: [SatuKategoriUtama]
tags: [Tag1, Tag2, Tag3]
image: "/assets/images/posts/nama-gambar.jpg"
excerpt: "Satu atau dua kalimat singkat (maksimal 110 karakter) yang merangkum isi artikel untuk memancing pengunjung mengeklik tulisan ini di Beranda."
---
```

### Penjelasan Variabel:
*   **`layout`**: Harus selalu bernilai `post`.
*   **`title`**: Gunakan kapitalisasi yang benar (Tittle Case). Hindari judul yang seluruhnya huruf besar (ALL CAPS).
*   **`date`**: Harus berformat `Tahun-Bulan-Tanggal` (contoh: `2026-03-24`).
*   **`image`**: Tautan absolut menuju gambar utama. Sangat direkomendasikan untuk **selalu ada** agar tampilan Beranda (*Cinematic Card*) tidak bolong/kosong.
*   **`excerpt`**: Deskripsi pendek. Dulu Anda menggunakan *meta keywords*, sekarang gunakan `excerpt` ini. Kalimat inilah yang dibaca oleh Google sebagai *meta description*.

---

## 🗂️ 2. Aturan Kategori (Rak Buku)
Kategori adalah pilar utama web Anda. Anda **DILARANG KERAS** menciptakan kategori baru secara sembarangan. Setiap artikel **HANYA BOLEH MEMILIKI 1 KATEGORI** (maksimal 2 jika terpaksa). 

Pilih salah satu dari 4 Pilar ini:

1.  **`Jurnal Pribadi`**
    *   **Deskripsi:** Ruang personal Anda.
    *   **Isi:** Curhatan harian, status mahasiswa, kopi & hujan, profil diri, atau refleksi yang sangat subyektif.
2.  **`Opini & Refleksi`**
    *   **Deskripsi:** Esai mendalam dan filosofis.
    *   **Isi:** Opini publik, pemikiran kognitif, psikologi, membahas waktu, overthinking, atau kreativitas.
3.  **`Kultur Pop`**
    *   **Deskripsi:** Hiburan dan Seni.
    *   **Isi:** Bedah lirik lagu, J-Pop, Pop Punk, review Anime (contoh: Frieren, Tokyo Revengers), Film, Fiksi.
4.  **`Sains & Industri`**
    *   **Deskripsi:** Analisis teknis, sejarah, dan bisnis.
    *   **Isi:** Otomotif (Honda, Sonic 150R), Teknologi, Audio Gear (Moondrop, IEM), analisis bisnis, atau sejarah pabrikan (Wimcycle).

---

## 🏷️ 3. Aturan Tag (Indeks Buku)
Berbeda dengan kategori, *Tags* boleh sangat spesifik dan jumlahnya tidak terbatas. Gunakan **3 hingga 5 Tag** per artikel.

Berdasarkan hasil perapihan, tag sebaiknya ditulis menggunakan pola berikut agar tidak tumpang tindih:

*   **Nama Spesifik/Brand:** (Contoh: `Moondrop`, `Honda`, `Sonic 150R`, `Cid Kagenou`, `Frieren`).
*   **Istilah Niche:** (Contoh: `IEM`, `Motor Matic`, `Pop Punk`, `Chi-Fi`, `Audiophile`).
*   **Tema Perasaan:** (Contoh: `Overthinking`, `Perfeksionisme`, `Pendewasaan`, `Malam`).
*   **Bentuk Tulisan:** (Contoh: `Review`, `Lirik`, `Terjemahan`, `Analisis Karakter`).

*(Catatan: Jangan pernah lagi menjadikan "Opini" sebagai Kategori sekaligus Tag. Jika sudah jadi Kategori, jangan ditulis di Tag).*

---

## 🖼️ 4. Tips Pemformatan di Dalam Artikel (Markdown)

*   **Judul Seksi:** Jika artikel sangat panjang, gunakan Heading 3 (`### Judul Seksi`) agar fitur **Daftar Isi (Table of Contents)** bisa otomatis mendeteksinya. Jangan gunakan Heading 1 (`#`) atau Heading 2 (`##`) di dalam konten karena itu hak milik judul utama blog.
*   **Gambar di Tengah Artikel:** Gunakan sintaks HTML sederhana ketimbang *markdown* murni agar Anda bisa menambahkan kelas CSS estetis:
    ```html
    <img src="/assets/images/isi-artikel.jpg" class="img-fluid rounded-4 shadow-sm my-4" alt="Penjelasan Gambar">
    ```
*   **Kutipan Terang (Blockquote):** Gunakan tanda `>` untuk kutipan favorit Anda agar pembaca bisa meresapi maknanya.
    ```markdown
    > "Tidak semua tulisan punya tujuan. Tidak semua harus selesai." — Zidan
    ```

---
**Dirancang dan Disusun Oleh:** Antigravity (Sistem AI Anda)
*Maret 2026 - Demi umur panjang RandomWeeks.*
