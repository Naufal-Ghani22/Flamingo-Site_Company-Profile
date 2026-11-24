/*
  DATA FLAMINGO SITE
  Semua isi yang sering berubah ada di file ini: kontak, harga paket, karya, dan FAQ.
  Ubah di sini, simpan, lalu refresh browser. Tidak perlu menyentuh HTML.
*/
window.FLAMINGO = {
  kontak: {
    wa: "62XXXXXXXXXX",            // nomor WhatsApp tanpa 0 / + di depan, contoh 6281234567890
    pesanWa: "Halo Flamingo Site, saya mau tanya soal website",
    email: "",                     // contoh "halo@flamingosite.id" (kosong = tidak ditampilkan)
    instagram: "flamingosite",     // tanpa @
    jamKerja: "Senin–Jumat, 09.00–17.00 WIB",
  },

  // Termin bayar (harus berjumlah 100). Sama dengan _build/config.py di kit dokumen.
  termin: [
    { persen: 50, kapan: "saat kontrak" },
    { persen: 30, kapan: "saat desain disetujui" },
    { persen: 20, kapan: "sebelum tayang" },
  ],

  // Berlaku untuk semua paket di bawah.
  semuaPaket: ["Domain & hosting 1 tahun", "Rapi di HP", "Kontrak tertulis", "Garansi 30 hari"],

  paket: [
    {
      id: "siap-tampil",
      nama: "Siap Tampil",
      untuk: "Untuk usaha yang baru mau online",
      harga: 1200000,
      durasi: "Selesai ± 5 hari kerja",
      isi: ["1 halaman landing page", "Tombol WhatsApp & Google Maps", "Menu, produk, atau galeri foto", "SEO dasar supaya muncul di Google"],
    },
    {
      id: "profil-usaha",
      nama: "Profil Usaha",
      untuk: "Untuk usaha yang ingin terlihat serius",
      harga: 2400000,
      durasi: "Selesai ± 10 hari kerja",
      rekomendasi: true,
      isi: ["Hingga 5 halaman", "Layanan, galeri, testimoni, kontak", "Dibantu daftar Google Bisnis", "Formulir pesan langsung ke WhatsApp"],
    },
    {
      id: "toko-online",
      nama: "Toko Online",
      untuk: "Untuk usaha yang jualan produk",
      harga: 4500000,
      durasi: "Selesai ± 3 minggu",
      isi: ["Katalog hingga 100 produk", "Keranjang, pesanan masuk ke WhatsApp", "Halaman admin ubah produk & harga", "Rekap pesanan sederhana"],
    },
  ],

  kustom: {
    nama: "Sistem Kustom",
    kalimat: "Aplikasi web yang mengikuti cara kerja usahamu.",
    mulai: 8000000,
    contoh: ["Pemesanan", "Stok barang", "Kasir", "Reservasi", "Laporan usaha"],
  },

  tambahan: [
    { nama: "Perawatan bulanan", harga: 150000, satuan: "/bulan" },
    { nama: "Perpanjangan domain & hosting", harga: 350000, satuan: "/tahun" },
    { nama: "Halaman tambahan", harga: 250000, satuan: "/halaman" },
  ],

  /*
    KARYA / PORTOFOLIO
    Selama daftar ini kosong, web menampilkan kartu "Segera tayang".
    Cara menambah:
      1. Simpan screenshot website (rasio 16:10, lebar ± 1600 px) ke assets/img/karya/
      2. Tambahkan satu objek seperti contoh ini:
         {
           nama: "Nama Usaha",
           kategori: "Landing page | Kuliner",
           gambar: "assets/img/karya/nama-usaha.webp",
           url: "https://namausaha.com",   // boleh dikosongkan ""
         },
  */
  karya: [],

  faq: [
    { t: "Aku belum punya logo atau foto produk. Bisa?", j: "Bisa. Mulai saja dari nama usaha dan foto dari HP. Kami tata supaya tetap rapi, dan semuanya bisa diganti kapan saja." },
    { t: "Domain dan hosting itu apa?", j: "Domain adalah alamat website, misalnya namausaha.com. Hosting adalah tempat website disimpan. Tahun pertama sudah termasuk di semua paket." },
    { t: "Bayarnya bagaimana?", j: "Tiga tahap: 50% saat kontrak, 30% saat desain disetujui, dan 20% sebelum website tayang." },
    { t: "Berapa kali boleh revisi?", j: "Dua kali di tahap desain dan satu kali di tahap pengembangan. Revisi di luar itu kami tulis dulu biayanya sebelum dikerjakan." },
    { t: "Bisa ubah isi website sendiri?", j: "Paket Toko Online punya halaman admin. Untuk paket lain, perubahan bisa lewat perawatan bulanan atau per permintaan." },
    { t: "Setelah garansi 30 hari habis?", j: "Website tetap milikmu dan tetap jalan. Kalau ingin ada yang menjaga, pilih perawatan bulanan." },
  ],
};
