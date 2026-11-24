# Flamingo Site | Company Profile

Website company profile Flamingo Site, jasa pembuatan website untuk UMKM.
HTML + CSS + JavaScript biasa, tanpa build step. Bisa langsung di-deploy ke Vercel, Netlify, Cloudflare Pages, atau GitHub Pages.

## Menjalankan di komputer

```
python -m http.server 5173
```
Lalu buka http://127.0.0.1:5173. (Membuka `index.html` langsung juga bisa, tapi font lebih aman lewat server lokal.)

## Yang perlu kamu isi dulu

Semua ada di **`js/data.js`**:

| Bagian | Isi |
|---|---|
| `kontak.wa` | Nomor WhatsApp, format `62812xxxx` (tanpa 0 dan tanpa +). Semua tombol WhatsApp ikut berubah, termasuk pesan otomatis per paket. |
| `kontak.email` | Kosongkan bila belum ada, tautannya otomatis disembunyikan. |
| `kontak.instagram` | Username tanpa @. |
| `paket` | Nama, harga, durasi, dan isi tiap paket. Tombol **Cicil 3 tahap** menghitung sendiri dari `termin`. |
| `kustom`, `tambahan` | Harga mulai sistem kustom dan layanan tambahan. |
| `karya` | Portofolio. Lihat di bawah. |
| `faq` | Pertanyaan dan jawaban. |

## Menambah portofolio

1. Screenshot website klien (rasio 16:10, lebar ± 1600 px), simpan sebagai `.webp` atau `.jpg` di `assets/img/karya/`.
2. Tambahkan ke `karya` di `js/data.js`:
   ```js
   karya: [
     { nama: "Nama Usaha", kategori: "Landing page | Kuliner", gambar: "assets/img/karya/nama-usaha.webp", url: "https://namausaha.com" },
   ],
   ```
Selama `karya` masih kosong, halaman menampilkan tiga kartu "Segera tayang".

## Ciri khas desain

- **Hero dua babak.** Dibuka gelap dengan foto flamingo 4K. Saat digulir, latar berubah jadi pink flamingo, teks raksasa berjalan *di belakang* burung, lalu catatan kaki menjawab judulnya: *"Kalau usahamu tidak ketemu, pelanggan pindah.\*"* → *"\*kami bantu biar ketemu."*
- **Suara catatan kaki (\*).** Dipakai juga di bagian janji: "Syarat & ketentuan berlaku\*", dengan catatan kecil yang justru berpihak ke klien.
- **Kartu harga gaya nota** dengan tepi berlubang, dekat dengan dunia UMKM.
- **Tanda `>`** dari logo dipakai sebagai pemisah di breadcrumb, teks berjalan, dan alur kerja.
- Tepi kertas sobek dan tekstur grain dari gaya feed Instagram v2.

Pengunjung yang mematikan animasi (reduced motion) mendapat versi hero statis yang tetap lengkap.

## Struktur

```
index.html
css/style.css
js/data.js        isi yang sering diubah
js/main.js        render harga/karya/FAQ, animasi hero
assets/img/hero/  foto flamingo 960–3840 px (+ versi potongan transparan)
assets/img/karya/ screenshot portofolio
assets/fonts/     Poppins, Instrument Serif Italic, Anton (woff2, subset Latin)
assets/logo/      logo + favicon dari kit brand
```

## Online

- Website live di https://flamingo-site-five.vercel.app (Vercel, terhubung ke repo ini: setiap push ke `main` otomatis tayang). Kalau nanti pakai domain sendiri, ganti alamat di `og:url`, `og:image`, dan `canonical` di `index.html`.
- Harga di `data.js` adalah usulan awal yang selaras dengan rentang budget di Formulir Brief (di bawah 1,5 jt | 1,5–3 jt | 3–7 jt | di atas 7 jt). Sesuaikan dengan hitunganmu.

## Kredit

Foto flamingo oleh Thomas Griesbeck, CC0 (Unsplash, via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Flamingo_Thomas_Griesbeck_2016-09-06_(Unsplash).jpg)). Detail di `assets/img/KREDIT-FOTO.md`.
