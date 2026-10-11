export type StatusPenetapan = 'Belum Ditetapkan' | 'Kota/Kabupaten' | 'Provinsi' | 'Nasional';

export interface Lampiran {
  id: number;
  namaFile: string;
  tipe: 'pdf' | 'doc' | 'jpg' | 'png' | 'sk' | 'foto' | 'peta' | 'sertifikat';
  ukuran: string;
  tanggalUpload: string;
  uploader: string;
  deskripsi: string;
  url: string;
}

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
  statusPenetapan: StatusPenetapan;
  nomorSK?: string;
  tanggalPenetapan?: string;
  koordinat: { lat: number; lng: number };
  gambar: string;
  fasilitas: string[];
  lampiran: Lampiran[];
}

export const statusPenetapanLabels: Record<StatusPenetapan, string> = {
  'Belum Ditetapkan': 'Belum Ditetapkan',
  'Kota/Kabupaten': 'Tingkat Kota/Kabupaten',
  'Provinsi': 'Tingkat Provinsi',
  'Nasional': 'Tingkat Nasional',
};

export const statusPenetapanColors: Record<StatusPenetapan, string> = {
  'Belum Ditetapkan': 'bg-gray-100 text-gray-700 border-gray-300',
  'Kota/Kabupaten': 'bg-blue-100 text-blue-700 border-blue-300',
  'Provinsi': 'bg-purple-100 text-purple-700 border-purple-300',
  'Nasional': 'bg-amber-100 text-amber-700 border-amber-300',
};

export const statusPenetapanIcons: Record<StatusPenetapan, string> = {
  'Belum Ditetapkan': '⏳',
  'Kota/Kabupaten': '🏙️',
  'Provinsi': '🏔️',
  'Nasional': '🇮🇩',
};

export const tipeFileIcons: Record<string, string> = {
  'pdf': '📄',
  'doc': '📝',
  'jpg': '🖼️',
  'png': '🖼️',
  'sk': '📜',
  'foto': '📷',
  'peta': '🗺️',
  'sertifikat': '🏅',
};

export const tipeFileLabels: Record<string, string> = {
  'pdf': 'Dokumen PDF',
  'doc': 'Dokumen Word',
  'jpg': 'Foto JPEG',
  'png': 'Foto PNG',
  'sk': 'Surat Keputusan',
  'foto': 'Foto Dokumentasi',
  'peta': 'Peta Lokasi',
  'sertifikat': 'Sertifikat',
};

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
    statusPenetapan: "Nasional",
    nomorSK: "SK/Mendikbud/2015/042",
    tanggalPenetapan: "15 Maret 2015",
    koordinat: { lat: -7.3274, lng: 108.2217 },
    gambar: "mosque",
    fasilitas: ["Area Parkir", "Tempat Wudhu", "Perpustakaan", "Tempat Parkir Roda Dua & Empat"],
    lampiran: [
      {
        id: 101,
        namaFile: "SK_Penetapan_Nasional_Masjid_Agung.pdf",
        tipe: "sk",
        ukuran: "2.4 MB",
        tanggalUpload: "2024-01-10",
        uploader: "Admin SICABA",
        deskripsi: "Surat Keputusan penetapan sebagai Cagar Budaya tingkat Nasional",
        url: "#"
      },
      {
        id: 102,
        namaFile: "Sertifikat_Cagar_Budaya.pdf",
        tipe: "sertifikat",
        ukuran: "1.8 MB",
        tanggalUpload: "2024-01-10",
        uploader: "Admin SICABA",
        deskripsi: "Sertifikat resmi cagar budaya dari Kementerian",
        url: "#"
      },
      {
        id: 103,
        namaFile: "Peta_Lokasi_Masjid_Agung.png",
        tipe: "peta",
        ukuran: "856 KB",
        tanggalUpload: "2024-01-12",
        uploader: "Manager Konten",
        deskripsi: "Peta detail lokasi dan area cagar budaya",
        url: "#"
      },
      {
        id: 104,
        namaFile: "Foto_Dokumentasi_Masjid.jpg",
        tipe: "foto",
        ukuran: "3.2 MB",
        tanggalUpload: "2024-01-15",
        uploader: "Tim Dokumentasi",
        deskripsi: "Koleksi foto dokumentasi bangunan masjid",
        url: "#"
      },
      {
        id: 105,
        namaFile: "Laporan_Pemugaran_2020.pdf",
        tipe: "pdf",
        ukuran: "5.1 MB",
        tanggalUpload: "2024-02-01",
        uploader: "Admin SICABA",
        deskripsi: "Laporan lengkap pemugaran dan renovasi tahun 2020",
        url: "#"
      }
    ]
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
    statusPenetapan: "Kota/Kabupaten",
    nomorSK: "SK/Walikota/2018/015",
    tanggalPenetapan: "20 Juni 2018",
    koordinat: { lat: -7.3295, lng: 108.2195 },
    gambar: "building",
    fasilitas: ["Auditorium", "Area Parkir", "Toilet Umum", "Ruang Pertunjukan"],
    lampiran: [
      {
        id: 201,
        namaFile: "SK_Penetapan_Kota_Gedung_Kesenian.pdf",
        tipe: "sk",
        ukuran: "1.5 MB",
        tanggalUpload: "2024-01-08",
        uploader: "Admin SICABA",
        deskripsi: "SK Walikota tentang penetapan cagar budaya tingkat kota",
        url: "#"
      },
      {
        id: 202,
        namaFile: "Dokumen_Sejarah_Gedung.doc",
        tipe: "doc",
        ukuran: "2.8 MB",
        tanggalUpload: "2024-01-09",
        uploader: "Manager Konten",
        deskripsi: "Dokumen lengkap sejarah gedung kesenian",
        url: "#"
      },
      {
        id: 203,
        namaFile: "Foto_Fasad_Depan.jpg",
        tipe: "foto",
        ukuran: "2.1 MB",
        tanggalUpload: "2024-01-10",
        uploader: "Tim Dokumentasi",
        deskripsi: "Foto fasad depan gedung kesenian",
        url: "#"
      }
    ]
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
    statusPenetapan: "Nasional",
    nomorSK: "SK/Mendikbud/2013/078",
    tanggalPenetapan: "8 September 2013",
    koordinat: { lat: -7.3450, lng: 108.2350 },
    gambar: "archaeology",
    fasilitas: ["Area Parkir", "Papan Informasi", "Jalur Pejalan Kaki", "Pos Jaga"],
    lampiran: [
      {
        id: 301,
        namaFile: "SK_Penetapan_Nasional_Situs_Batu_Calung.pdf",
        tipe: "sk",
        ukuran: "3.2 MB",
        tanggalUpload: "2024-01-05",
        uploader: "Admin SICABA",
        deskripsi: "SK penetapan nasional dari Kementerian",
        url: "#"
      },
      {
        id: 302,
        namaFile: "Laporan_Penelitian_Arkeologi.pdf",
        tipe: "pdf",
        ukuran: "8.5 MB",
        tanggalUpload: "2024-01-06",
        uploader: "Admin SICABA",
        deskripsi: "Laporan penelitian arkeologi lengkap",
        url: "#"
      },
      {
        id: 303,
        namaFile: "Peta_Situs_Batu_Calung.png",
        tipe: "peta",
        ukuran: "1.2 MB",
        tanggalUpload: "2024-01-07",
        uploader: "Manager Konten",
        deskripsi: "Peta detail situs dengan titik-titik temuan",
        url: "#"
      },
      {
        id: 304,
        namaFile: "Foto_Temuan_Artefak.jpg",
        tipe: "foto",
        ukuran: "4.5 MB",
        tanggalUpload: "2024-01-08",
        uploader: "Tim Dokumentasi",
        deskripsi: "Foto-foto temuan artefak di situs",
        url: "#"
      }
    ]
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
    statusPenetapan: "Provinsi",
    nomorSK: "SK/Gubernur_Jabar/2019/033",
    tanggalPenetapan: "12 April 2019",
    koordinat: { lat: -7.3280, lng: 108.2200 },
    gambar: "government",
    fasilitas: ["Area Parkir", "Taman", "Ruang Pertemuan", "Toilet"],
    lampiran: [
      {
        id: 401,
        namaFile: "SK_Gubernur_Penetapan_Provinsi.pdf",
        tipe: "sk",
        ukuran: "2.1 MB",
        tanggalUpload: "2024-01-11",
        uploader: "Admin SICABA",
        deskripsi: "SK Gubernur Jawa Barat tentang penetapan cagar budaya provinsi",
        url: "#"
      },
      {
        id: 402,
        namaFile: "Sertifikat_Cagar_Budaya_Provinsi.pdf",
        tipe: "sertifikat",
        ukuran: "1.5 MB",
        tanggalUpload: "2024-01-11",
        uploader: "Admin SICABA",
        deskripsi: "Sertifikat resmi dari Pemprov Jawa Barat",
        url: "#"
      },
      {
        id: 403,
        namaFile: "Dokumentasi_Bangunan.jpg",
        tipe: "foto",
        ukuran: "3.8 MB",
        tanggalUpload: "2024-01-12",
        uploader: "Tim Dokumentasi",
        deskripsi: "Dokumentasi foto kondisi bangunan saat ini",
        url: "#"
      }
    ]
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
    statusPenetapan: "Kota/Kabupaten",
    nomorSK: "SK/Walikota/2017/022",
    tanggalPenetapan: "5 Agustus 2017",
    koordinat: { lat: -7.3310, lng: 108.2240 },
    gambar: "station",
    fasilitas: ["Loket Tiket", "Area Tunggu", "Toilet", "Kantin", "Area Parkir"],
    lampiran: [
      {
        id: 501,
        namaFile: "SK_Walikota_Stasiun.pdf",
        tipe: "sk",
        ukuran: "1.8 MB",
        tanggalUpload: "2024-01-14",
        uploader: "Admin SICABA",
        deskripsi: "SK penetapan stasiun sebagai cagar budaya kota",
        url: "#"
      },
      {
        id: 502,
        namaFile: "Sejarah_Stasiun_Tasikmalaya.pdf",
        tipe: "pdf",
        ukuran: "4.2 MB",
        tanggalUpload: "2024-01-15",
        uploader: "Manager Konten",
        deskripsi: "Buku digital sejarah stasiun Tasikmalaya",
        url: "#"
      }
    ]
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
    statusPenetapan: "Nasional",
    nomorSK: "SK/Mendikbud/2010/015",
    tanggalPenetapan: "22 Mei 2010",
    koordinat: { lat: -7.3800, lng: 108.2600 },
    gambar: "megalithic",
    fasilitas: ["Area Parkir", "Papan Informasi", "Jalur Pejalan Kaki", "Museum Mini"],
    lampiran: [
      {
        id: 601,
        namaFile: "SK_Nasional_Situs_Cipari.pdf",
        tipe: "sk",
        ukuran: "2.9 MB",
        tanggalUpload: "2024-01-03",
        uploader: "Admin SICABA",
        deskripsi: "SK penetapan nasional dari Kemendikbud",
        url: "#"
      },
      {
        id: 602,
        namaFile: "Jurnal_Penelitian_Cipari.pdf",
        tipe: "pdf",
        ukuran: "12.3 MB",
        tanggalUpload: "2024-01-04",
        uploader: "Admin SICABA",
        deskripsi: "Kumpulan jurnal penelitian arkeologi di Situs Cipari",
        url: "#"
      },
      {
        id: 603,
        namaFile: "Peta_Topografi_Situs.png",
        tipe: "peta",
        ukuran: "2.1 MB",
        tanggalUpload: "2024-01-05",
        uploader: "Manager Konten",
        deskripsi: "Peta topografi detail kawasan situs",
        url: "#"
      },
      {
        id: 604,
        namaFile: "Foto_Menhir_Dolmen.jpg",
        tipe: "foto",
        ukuran: "5.6 MB",
        tanggalUpload: "2024-01-06",
        uploader: "Tim Dokumentasi",
        deskripsi: "Foto menhir dan dolmen di situs Cipari",
        url: "#"
      },
      {
        id: 605,
        namaFile: "Sertifikat_Nasional.pdf",
        tipe: "sertifikat",
        ukuran: "1.1 MB",
        tanggalUpload: "2024-01-07",
        uploader: "Admin SICABA",
        deskripsi: "Sertifikat cagar budaya nasional",
        url: "#"
      }
    ]
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
    statusPenetapan: "Provinsi",
    nomorSK: "SK/Gubernur_Jabar/2020/045",
    tanggalPenetapan: "18 Oktober 2020",
    koordinat: { lat: -7.3265, lng: 108.2210 },
    gambar: "church",
    fasilitas: ["Area Parkir", "Ruang Ibadah", "Perpustakaan", "Toilet"],
    lampiran: [
      {
        id: 701,
        namaFile: "SK_Gubernur_Gereja_Immanuel.pdf",
        tipe: "sk",
        ukuran: "2.3 MB",
        tanggalUpload: "2024-01-16",
        uploader: "Admin SICABA",
        deskripsi: "SK Gubernur penetapan cagar budaya provinsi",
        url: "#"
      },
      {
        id: 702,
        namaFile: "Foto_Interior_Gereja.jpg",
        tipe: "foto",
        ukuran: "3.4 MB",
        tanggalUpload: "2024-01-17",
        uploader: "Tim Dokumentasi",
        deskripsi: "Foto interior dan kaca patri gereja",
        url: "#"
      }
    ]
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
    statusPenetapan: "Kota/Kabupaten",
    nomorSK: "SK/Walikota/2016/008",
    tanggalPenetapan: "3 Februari 2016",
    koordinat: { lat: -7.3290, lng: 108.2230 },
    gambar: "museum",
    fasilitas: ["Ruang Pamer", "Perpustakaan", "Toilet", "Area Parkir", "Toko Souvenir"],
    lampiran: [
      {
        id: 801,
        namaFile: "SK_Walikota_Museum.pdf",
        tipe: "sk",
        ukuran: "1.6 MB",
        tanggalUpload: "2024-01-18",
        uploader: "Admin SICABA",
        deskripsi: "SK penetapan museum sebagai cagar budaya kota",
        url: "#"
      },
      {
        id: 802,
        namaFile: "Katalog_Koleksi_Museum.pdf",
        tipe: "pdf",
        ukuran: "15.2 MB",
        tanggalUpload: "2024-01-19",
        uploader: "Manager Konten",
        deskripsi: "Katalog lengkap koleksi museum",
        url: "#"
      },
      {
        id: 803,
        namaFile: "Peta_Zona_Museum.png",
        tipe: "peta",
        ukuran: "980 KB",
        tanggalUpload: "2024-01-20",
        uploader: "Manager Konten",
        deskripsi: "Peta zona dan tata letak museum",
        url: "#"
      }
    ]
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
    statusPenetapan: "Nasional",
    nomorSK: "SK/Mendikbud/2012/067",
    tanggalPenetapan: "10 Juli 2012",
    koordinat: { lat: -7.3600, lng: 108.2800 },
    gambar: "ruins",
    fasilitas: ["Area Parkir", "Pemandu Wisata", "Papan Informasi", "Toilet", "Mushola"],
    lampiran: [
      {
        id: 901,
        namaFile: "SK_Nasional_Karangkamulyan.pdf",
        tipe: "sk",
        ukuran: "3.5 MB",
        tanggalUpload: "2024-01-21",
        uploader: "Admin SICABA",
        deskripsi: "SK penetapan nasional dari Kemendikbud",
        url: "#"
      },
      {
        id: 902,
        namaFile: "Penelitian_Kerajaan_Galuh.pdf",
        tipe: "pdf",
        ukuran: "9.8 MB",
        tanggalUpload: "2024-01-22",
        uploader: "Admin SICABA",
        deskripsi: "Hasil penelitian tentang Kerajaan Galuh",
        url: "#"
      },
      {
        id: 903,
        namaFile: "Peta_Area_Situs.png",
        tipe: "peta",
        ukuran: "1.8 MB",
        tanggalUpload: "2024-01-23",
        uploader: "Manager Konten",
        deskripsi: "Peta area situs Karangkamulyan",
        url: "#"
      },
      {
        id: 904,
        namaFile: "Foto_Candi_Batu.jpg",
        tipe: "foto",
        ukuran: "4.2 MB",
        tanggalUpload: "2024-01-24",
        uploader: "Tim Dokumentasi",
        deskripsi: "Foto candi dan struktur batu di situs",
        url: "#"
      }
    ]
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
    statusPenetapan: "Belum Ditetapkan",
    koordinat: { lat: -7.3300, lng: 108.2180 },
    gambar: "traditional",
    fasilitas: ["Area Parkir", "Pemandu Wisata", "Toilet", "Taman"],
    lampiran: [
      {
        id: 1001,
        namaFile: "Dokumen_Pengajuan_Penetapan.pdf",
        tipe: "pdf",
        ukuran: "4.1 MB",
        tanggalUpload: "2024-02-01",
        uploader: "Manager Konten",
        deskripsi: "Dokumen pengajuan penetapan cagar budaya (dalam proses)",
        url: "#"
      },
      {
        id: 1002,
        namaFile: "Foto_Rumah_Adat.jpg",
        tipe: "foto",
        ukuran: "3.6 MB",
        tanggalUpload: "2024-02-02",
        uploader: "Tim Dokumentasi",
        deskripsi: "Foto detail rumah adat Julang Ngapak",
        url: "#"
      },
      {
        id: 1003,
        namaFile: "Sketsa_Arsitektur.png",
        tipe: "peta",
        ukuran: "1.4 MB",
        tanggalUpload: "2024-02-03",
        uploader: "Manager Konten",
        deskripsi: "Sketsa arsitektur dan denah rumah adat",
        url: "#"
      }
    ]
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
