export interface CagarBudaya {
  id: number;
  nama: string;
  kategori: string;
  lokasi: string;
  kecamatan: string;
  tahunBerdiri: string;
  deskripsi: string;
  sejarah: string;
  arsitektur: string;
  status: string;
  koordinat: { lat: number; lng: number };
  gambar: string;
  fasilitas: string[];
}

export const cagarBudayaData: CagarBudaya[] = [
  {
    id: 1,
    nama: "Masjid Agung Kota Tasikmalaya",
    kategori: "Bangunan Keagamaan",
    lokasi: "Jl. Masjid Agung, Kahuripan, Tawang",
    kecamatan: "Tawang",
    tahunBerdiri: "1832",
    deskripsi: "Masjid Agung Kota Tasikmalaya merupakan salah satu masjid tertua dan terbesar di Kota Tasikmalaya. Masjid ini memiliki nilai sejarah yang tinggi sebagai pusat penyebaran agama Islam di wilayah Tasikmalaya.",
    sejarah: "Masjid ini dibangun pada tahun 1832 oleh Bupati Sukapura ke-7, Wiradadaha VIII. Masjid ini telah mengalami beberapa kali renovasi namun tetap mempertahankan arsitektur aslinya. Masjid ini menjadi saksi bisu perkembangan Islam di Priangan Timur.",
    arsitektur: "Arsitektur masjid memadukan gaya tradisional Sunda dengan pengaruh arsitektur Islam. Atap tumpang tiga tingkat menjadi ciri khas utama, dengan ornamen kaligrafi dan ukiran khas Sunda pada bagian dalamnya.",
    status: "Cagar Budaya Nasional",
    koordinat: { lat: -7.3274, lng: 108.2217 },
    gambar: "mosque",
    fasilitas: ["Area Parkir", "Tempat Wudhu", "Perpustakaan", "Tempat Parkir Roda Dua & Empat"]
  },
  {
    id: 2,
    nama: "Gedung Kesenian Kota Tasikmalaya",
    kategori: "Bangunan Publik",
    lokasi: "Jl. Sukapura, Yudanagara, Cihideung",
    kecamatan: "Cihideung",
    tahunBerdiri: "1920",
    deskripsi: "Gedung Kesenian Kota Tasikmalaya merupakan bangunan peninggalan kolonial Belanda yang digunakan sebagai pusat kegiatan seni dan budaya masyarakat Tasikmalaya.",
    sejarah: "Dibangun pada masa kolonial Belanda sekitar tahun 1920, gedung ini awalnya berfungsi sebagai gedung pertemuan dan pertunjukan. Setelah kemerdekaan, gedung ini dialihfungsikan sebagai pusat kesenian dan kebudayaan daerah.",
    arsitektur: "Bangunan bergaya Art Deco dengan elemen arsitektur Eropa klasik. Memiliki pilar-pilar besar, jendela-jendela tinggi dengan kaca patri, serta atap yang tinggi dengan ventilasi alami.",
    status: "Cagar Budaya Daerah",
    koordinat: { lat: -7.3295, lng: 108.2195 },
    gambar: "building",
    fasilitas: ["Auditorium", "Area Parkir", "Toilet Umum", "Ruang Pertunjukan"]
  },
  {
    id: 3,
    nama: "Situs Batu Calung",
    kategori: "Situs Arkeologi",
    lokasi: "Desa Sukarasa, Sukaratu",
    kecamatan: "Sukaratu",
    tahunBerdiri: "Abad ke-8",
    deskripsi: "Situs Batu Calung merupakan situs arkeologi yang mengandung batu-batu megalitikum peninggalan zaman prasejarah. Situs ini menjadi bukti adanya peradaban kuno di wilayah Tasikmalaya.",
    sejarah: "Situs ini ditemukan pada awal abad ke-20 dan diteliti oleh para arkeolog Belanda. Batu-batu yang ditemukan diperkirakan berasal dari abad ke-8 Masehi, menunjukkan adanya aktivitas masyarakat pada masa Hindu-Buddha.",
    arsitektur: "Terdiri dari batu-batu besar yang tersusun secara teratur, termasuk menhir, dolmen, dan batu dakon. Beberapa batu memiliki ukiran yang masih dapat dilihat hingga saat ini.",
    status: "Cagar Budaya Nasional",
    koordinat: { lat: -7.3450, lng: 108.2350 },
    gambar: "archaeology",
    fasilitas: ["Area Parkir", "Papan Informasi", "Jalur Pejalan Kaki", "Pos Jaga"]
  },
  {
    id: 4,
    nama: "Kantor Bupati Lama Tasikmalaya",
    kategori: "Bangunan Pemerintahan",
    lokasi: "Jl. Sukapura No. 1, Cihideung",
    kecamatan: "Cihideung",
    tahunBerdiri: "1860",
    deskripsi: "Kantor Bupati Lama merupakan bangunan bersejarah yang pernah menjadi pusat pemerintahan Kabupaten Tasikmalaya pada masa kolonial dan awal kemerdekaan.",
    sejarah: "Dibangun pada tahun 1860 sebagai pusat pemerintahan Kabupaten Sukapura (nama lama Tasikmalaya). Bangunan ini menjadi saksi perjalanan sejarah pemerintahan dari masa kolonial hingga era kemerdekaan Indonesia.",
    arsitektur: "Bangunan bergaya Indische Empire Style dengan ciri khas pilar-pilar besar, beranda luas, dan atap tinggi. Dinding tebal dari batu bata dan plesteran dengan ornamen klasik Eropa.",
    status: "Cagar Budaya Daerah",
    koordinat: { lat: -7.3280, lng: 108.2200 },
    gambar: "government",
    fasilitas: ["Area Parkir", "Taman", "Ruang Pertemuan", "Toilet"]
  },
  {
    id: 5,
    nama: "Stasiun Tasikmalaya",
    kategori: "Bangunan Transportasi",
    lokasi: "Jl. Stasiun, Cihideung",
    kecamatan: "Cihideung",
    tahunBerdiri: "1916",
    deskripsi: "Stasiun Tasikmalaya merupakan stasiun kereta api peninggalan kolonial Belanda yang dibangun untuk mendukung jalur kereta api di Priangan.",
    sejarah: "Dibangun pada tahun 1916 sebagai bagian dari jalur kereta api Staatsspoorwegen yang menghubungkan Batavia dengan daerah Priangan. Stasiun ini menjadi pintu masuk utama ke Tasikmalaya pada masa kolonial.",
    arsitektur: "Bangunan stasiun bergaya kolonial Belanda dengan atap pelana yang lebar, jendela-jendela besar, dan kanopi besi tempa yang khas. Struktur bangunan menggunakan bata ekspos dan elemen besi.",
    status: "Cagar Budaya Daerah",
    koordinat: { lat: -7.3310, lng: 108.2240 },
    gambar: "station",
    fasilitas: ["Loket Tiket", "Area Tunggu", "Toilet", "Kantin", "Area Parkir"]
  },
  {
    id: 6,
    nama: "Situs Cipari",
    kategori: "Situs Arkeologi",
    lokasi: "Desa Cipari, Cigalon",
    kecamatan: "Cigalon",
    tahunBerdiri: "Abad ke-8",
    deskripsi: "Situs Cipari merupakan kompleks situs megalitikum yang terletak di perbukitan. Situs ini mengandung berbagai peninggalan berupa menhir, dolmen, dan batu dakon.",
    sejarah: "Situs ini telah diteliti sejak masa kolonial dan terus menjadi objek penelitian arkeologi hingga sekarang. Diperkirakan situs ini merupakan tempat pemujaan dan pemakaman pada masa prasejarah.",
    arsitektur: "Kompleks situs terdiri dari beberapa kelompok batu megalitikum yang tersusun berteras. Terdapat menhir setinggi 2 meter, dolmen, dan batu dakon yang menunjukkan perkembangan kebudayaan megalitikum.",
    status: "Cagar Budaya Nasional",
    koordinat: { lat: -7.3800, lng: 108.2600 },
    gambar: "megalithic",
    fasilitas: ["Area Parkir", "Papan Informasi", "Jalur Pejalan Kaki", "Museum Mini"]
  },
  {
    id: 7,
    nama: "Gedung Gereja GPIB Immanuel",
    kategori: "Bangunan Keagamaan",
    lokasi: "Jl. Gereja, Kahuripan, Tawang",
    kecamatan: "Tawang",
    tahunBerdiri: "1905",
    deskripsi: "Gereja GPIB Immanuel merupakan gereja tertua di Kota Tasikmalaya yang dibangun pada masa kolonial Belanda sebagai pusat kegiatan jemaat Protestan.",
    sejarah: "Dibangun pada tahun 1905 oleh pemerintah kolonial Belanda untuk melayani kebutuhan rohani warga Belanda dan pribumi yang beragama Protestan. Gereja ini menjadi simbol toleransi beragama di Tasikmalaya.",
    arsitektur: "Bangunan bergaya Gothic Revival dengan menara lonceng yang menjulang, jendela-jendela lancip dengan kaca patri berwarna, dan atap yang curam. Interior memiliki langit-langit tinggi dengan balok kayu.",
    status: "Cagar Budaya Daerah",
    koordinat: { lat: -7.3265, lng: 108.2210 },
    gambar: "church",
    fasilitas: ["Area Parkir", "Ruang Ibadah", "Perpustakaan", "Toilet"]
  },
  {
    id: 8,
    nama: "Museum Kota Tasikmalaya",
    kategori: "Museum",
    lokasi: "Jl. Ir. H. Juanda, Cihideung",
    kecamatan: "Cihideung",
    tahunBerdiri: "1985",
    deskripsi: "Museum Kota Tasikmalaya menyimpan berbagai koleksi benda-benda bersejarah dan budaya dari wilayah Tasikmalaya dan sekitarnya, termasuk artefak prasejarah dan benda-benda etnografi.",
    sejarah: "Didirikan pada tahun 1985 untuk melestarikan dan memamerkan warisan budaya Tasikmalaya. Museum ini menjadi pusat edukasi dan penelitian bagi masyarakat yang ingin mempelajari sejarah dan budaya daerah.",
    arsitektur: "Bangunan museum dirancang dengan gaya modern yang memadukan elemen tradisional Sunda. Memiliki ruang pamer yang luas dengan pencahayaan alami yang baik.",
    status: "Cagar Budaya Daerah",
    koordinat: { lat: -7.3290, lng: 108.2230 },
    gambar: "museum",
    fasilitas: ["Ruang Pamer", "Perpustakaan", "Toilet", "Area Parkir", "Toko Souvenir"]
  },
  {
    id: 9,
    nama: "Situs Karangkamulyan",
    kategori: "Situs Arkeologi",
    lokasi: "Desa Karangkamulyan, Cijeungjing",
    kecamatan: "Cijeungjing",
    tahunBerdiri: "Abad ke-12",
    deskripsi: "Situs Karangkamulyan merupakan kompleks situs bersejarah yang berkaitan dengan Kerajaan Galuh. Situs ini memiliki nilai sejarah tinggi sebagai peninggalan peradaban Sunda kuno.",
    sejarah: "Situs ini dipercaya sebagai bekas pusat Kerajaan Galuh yang berdiri pada abad ke-7 hingga ke-12. Berbagai penemuan arkeologis menunjukkan adanya aktivitas peradaban yang maju di kawasan ini.",
    arsitektur: "Terdapat berbagai struktur batu, termasuk candi-candi kecil, batu bertulis, dan situs pemandian kuno. Beberapa struktur menunjukkan pengaruh Hindu-Buddha yang kuat.",
    status: "Cagar Budaya Nasional",
    koordinat: { lat: -7.3600, lng: 108.2800 },
    gambar: "ruins",
    fasilitas: ["Area Parkir", "Pemandu Wisata", "Papan Informasi", "Toilet", "Mushola"]
  },
  {
    id: 10,
    nama: "Rumah Adat Sunda (Imah Julang Ngapak)",
    kategori: "Bangunan Tradisional",
    lokasi: "Kampung Adat, Cihideung",
    kecamatan: "Cihideung",
    tahunBerdiri: "Abad ke-17",
    deskripsi: "Rumah adat Sunda tipe Julang Ngapak merupakan contoh arsitektur tradisional Sunda yang masih terjaga keasliannya di Kota Tasikmalaya.",
    sejarah: "Rumah ini merupakan peninggalan keluarga bangsawan Sukapura yang telah dijaga keasliannya selama beberapa generasi. Rumah ini menjadi contoh nyata arsitektur tradisional Sunda yang adaptif terhadap iklim tropis.",
    arsitektur: "Atap berbentuk seperti burung julang yang sedang mengapak (melebar sayapnya), terbuat dari ijuk. Struktur menggunakan kayu dan bambu tanpa paku, hanya menggunakan pasak dan tali pengikat tradisional.",
    status: "Cagar Budaya Daerah",
    koordinat: { lat: -7.3300, lng: 108.2180 },
    gambar: "traditional",
    fasilitas: ["Area Parkir", "Pemandu Wisata", "Toilet", "Taman"]
  }
];

export const kategoriList = [
  "Semua",
  "Bangunan Keagamaan",
  "Bangunan Publik",
  "Bangunan Pemerintahan",
  "Bangunan Transportasi",
  "Bangunan Tradisional",
  "Situs Arkeologi",
  "Museum"
];
