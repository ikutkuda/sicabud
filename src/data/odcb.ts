export type StatusODCB = 'Terdaftar' | 'Lolos Verifikasi' | 'Tidak Lolos Verifikasi' | 'Pengkajian' | 'Direkomendasikan' | 'Ditetapkan' | 'Ditolak';
export type JenisIdentitas = 'KTP' | 'SIM';

// Jenis ODCB sesuai UU No. 11 Tahun 2010
export type JenisODCB = 'Benda' | 'Bangunan' | 'Struktur' | 'Situs' | 'Kawasan';

// Asal/Latar Belakang Pendaftar sesuai Permendikbudristek 36/2023
export type AsalPendaftar = 
  | 'Direktorat Jenderal Kebudayaan'
  | 'Perwakilan RI di luar negeri'
  | 'OPD Bidang Kebudayaan Provinsi'
  | 'OPD Bidang Kebudayaan Kabupaten'
  | 'OPD Bidang Kebudayaan Kota'
  | 'Kementerian/Lembaga Negara'
  | 'BUMN'
  | 'BUMD'
  | 'BUMDes'
  | 'Badan Usaha Swasta'
  | 'Masyarakat Hukum Adat'
  | 'Pendaftar Umum';

// Periode/Masa sesuai Permendikbudristek 36/2023
export type PeriodeMasa = 
  | 'Prasejarah'
  | 'Klasik (Hindu-Buddha)'
  | 'Islam'
  | 'Kolonial'
  | 'Kemerdekaan'
  | 'Modern';

// Kondisi ODCB sesuai Permendikbudristek 36/2023
export type KondisiODCB = 'Utuh' | 'Tinggal Sebagian' | 'Musnah' | 'Hilang' | 'Berubah Wujud dan Gaya';

// Status Kepemilikan
export type StatusKepemilikan = 'Milik Pribadi' | 'Milik Negara' | 'Milik Daerah' | 'Milik Desa' | 'Milik Badan Usaha' | 'Milik Masyarakat Hukum Adat' | 'Tidak Diketahui';

// Status Pengelolaan
export type StatusPengelolaan = 'Dikelola Sendiri' | 'Dikelola Pemerintah' | 'Dikelola Badan Usaha' | 'Dikelola Masyarakat' | 'Tidak Dikelola';

export interface ODCB {
  id: number;
  nomorInduk?: string;
  
  // IDENTITAS ODCB
  namaODCB: string;
  jenisODCB: JenisODCB;
  alamatODCB: string;
  desaKelurahan: string;
  kecamatan: string;
  kabupatenKota: string;
  provinsi: string;
  koordinat: { lat: number; lng: number } | null;
  
  // Data Teknis ODCB
  ukuran?: {
    panjang?: string;
    lebar?: string;
    tinggi?: string;
    tebal?: string;
    diameter?: string;
    luas?: string;
    volume?: string;
  };
  bahan?: string[];
  hiasanOrnamen?: string[];
  tahunPembuatan?: string;
  periodeMasa?: PeriodeMasa;
  batasUtara?: string;
  batasTimur?: string;
  batasSelatan?: string;
  batasBarat?: string;
  
  // URAIAN ODCB
  deskripsi: string;
  sejarah: string;
  kondisiSaatIni: KondisiODCB;
  penjelasanKondisi?: string;
  pemeliharaan: 'Terpelihara' | 'Tidak Terpelihara';
  riwayatPemugaran: 'Pernah Dipugar' | 'Belum Pernah Dipugar';
  narasiNilaiPenting?: string;
  
  // URGENSI PENETAPAN
  latarBelakangUsulan?: string;
  hasilVerifikasi?: string;
  
  // STATUS KEPEMILIKAN & PENGELOLAAN
  statusKepemilikan: StatusKepemilikan;
  statusPengelolaan: StatusPengelolaan;
  riwayatKepemilikan?: string;
  
  // Data Pendaftar
  pendaftarId: number;
  namaPendaftar: string;
  nikPendaftar: string;
  nomorTelepon: string;
  nomorPonsel: string;
  asalPendaftar: AsalPendaftar;
  namaInstansi?: string;
  emailPendaftar?: string;
  alamatPendaftar?: string;
  
  // Identitas
  jenisIdentitas: JenisIdentitas;
  nomorIdentitas: string;
  fotoIdentitas: FileAttachment;
  
  // Dokumen Pendukung
  fotoODCB: FileAttachment[];
  dokumenPendukung?: FileAttachment[];
  
  // Status
  status: StatusODCB;
  tanggalPengajuan: string;
  tanggalUpdate: string;
  catatanManager?: string;
  reviewedBy?: string;
}

export interface FileAttachment {
  id: number;
  namaFile: string;
  tipe: string;
  ukuran: string;
  tanggalUpload: string;
  deskripsi: string;
}

export const statusODCBLabels: Record<StatusODCB, string> = {
  'Terdaftar': 'Terdaftar',
  'Lolos Verifikasi': 'Lolos Verifikasi',
  'Tidak Lolos Verifikasi': 'Tidak Lolos Verifikasi',
  'Pengkajian': 'Sedang Pengkajian',
  'Direkomendasikan': 'Direkomendasikan',
  'Ditetapkan': 'Ditetapkan sebagai CB',
  'Ditolak': 'Ditolak',
};

export const statusODCBColors: Record<StatusODCB, string> = {
  'Terdaftar': 'bg-blue-100 text-blue-700 border-blue-300',
  'Lolos Verifikasi': 'bg-cyan-100 text-cyan-700 border-cyan-300',
  'Tidak Lolos Verifikasi': 'bg-gray-100 text-gray-700 border-gray-300',
  'Pengkajian': 'bg-amber-100 text-amber-700 border-amber-300',
  'Direkomendasikan': 'bg-purple-100 text-purple-700 border-purple-300',
  'Ditetapkan': 'bg-green-100 text-green-700 border-green-300',
  'Ditolak': 'bg-red-100 text-red-700 border-red-300',
};

export const statusODCBIcons: Record<StatusODCB, string> = {
  'Terdaftar': '📝',
  'Lolos Verifikasi': '✓',
  'Tidak Lolos Verifikasi': '✗',
  'Pengkajian': '🔍',
  'Direkomendasikan': '📋',
  'Ditetapkan': '✅',
  'Ditolak': '❌',
};

// Master data Jenis ODCB sesuai UU No. 11 Tahun 2010
export interface JenisODCBInfo {
  nama: JenisODCB;
  ikon: string;
  deskripsi: string;
  definisiUU: string;
  contoh: string[];
  warna: string;
}

export const jenisODCBList: JenisODCBInfo[] = [
  {
    nama: 'Benda',
    ikon: '🏺',
    deskripsi: 'Benda alam/buatan manusia berusia ≥50 tahun',
    definisiUU: 'Benda alam dan/atau benda buatan manusia, baik yang bergerak maupun yang tidak bergerak, yang memiliki usia sekurang-kurangnya 50 tahun.',
    contoh: ['Arca', 'Prasasti', 'Keris', 'Mata Uang Kuno', 'Gerabah', 'Perhiasan Kuno'],
    warna: 'from-amber-400 to-orange-500'
  },
  {
    nama: 'Bangunan',
    ikon: '🏛️',
    deskripsi: 'Susunan binaan untuk mewadahi kegiatan manusia',
    definisiUU: 'Susunan binaan yang terbuat dari benda alam dan/atau buatan manusia untuk mewadahi kegiatan manusia, baik di atas tanah maupun di atas air.',
    contoh: ['Masjid', 'Gereja', 'Gedung', 'Rumah Adat', 'Museum', 'Stasiun'],
    warna: 'from-blue-400 to-indigo-500'
  },
  {
    nama: 'Struktur',
    ikon: '🏗️',
    deskripsi: 'Susunan binaan untuk infrastruktur',
    definisiUU: 'Susunan binaan yang terbuat dari benda alam dan/atau buatan manusia untuk mendukung kegiatan konstruksi atau infrastruktur.',
    contoh: ['Jembatan Kuno', 'Benteng', 'Tembok Pertahanan', 'Sumur Kuno', 'Saluran Air', 'Menara'],
    warna: 'from-purple-400 to-pink-500'
  },
  {
    nama: 'Situs',
    ikon: '🗿',
    deskripsi: 'Lokasi yang mengandung CB sebagai bukti masa lalu',
    definisiUU: 'Lokasi di darat dan/atau di air yang mengandung Benda, Bangunan, dan/atau Struktur Cagar Budaya sebagai hasil kegiatan manusia atau bukti kejadian pada masa lalu.',
    contoh: ['Situs Megalitikum', 'Situs Arkeologi', 'Situs Prasejarah', 'Situs Kerajaan Kuno'],
    warna: 'from-emerald-400 to-teal-500'
  },
  {
    nama: 'Kawasan',
    ikon: '🌏',
    deskripsi: 'Area dengan ≥2 Situs CB berdekatan',
    definisiUU: 'Area di darat dan/atau di air yang memiliki dua Situs Cagar Budaya atau lebih yang letaknya berdekatan dan memperlihatkan ciri tata ruang yang khas.',
    contoh: ['Kawasan Kota Tua', 'Kawasan Pusat Kerajaan', 'Kawasan Pelabuhan Kuno', 'Kawasan Adat'],
    warna: 'from-rose-400 to-red-500'
  }
];

export const jenisODCBIcons: Record<JenisODCB, string> = {
  'Benda': '🏺',
  'Bangunan': '🏛️',
  'Struktur': '🏗️',
  'Situs': '🗿',
  'Kawasan': '🌏',
};

export const jenisODCBColors: Record<JenisODCB, string> = {
  'Benda': 'bg-amber-100 text-amber-700 border-amber-300',
  'Bangunan': 'bg-blue-100 text-blue-700 border-blue-300',
  'Struktur': 'bg-purple-100 text-purple-700 border-purple-300',
  'Situs': 'bg-emerald-100 text-emerald-700 border-emerald-300',
  'Kawasan': 'bg-rose-100 text-rose-700 border-rose-300',
};

export const asalPendaftarList: AsalPendaftar[] = [
  'Direktorat Jenderal Kebudayaan',
  'Perwakilan RI di luar negeri',
  'OPD Bidang Kebudayaan Provinsi',
  'OPD Bidang Kebudayaan Kabupaten',
  'OPD Bidang Kebudayaan Kota',
  'Kementerian/Lembaga Negara',
  'BUMN',
  'BUMD',
  'BUMDes',
  'Badan Usaha Swasta',
  'Masyarakat Hukum Adat',
  'Pendaftar Umum'
];

export const periodeMasaList: PeriodeMasa[] = [
  'Prasejarah',
  'Klasik (Hindu-Buddha)',
  'Islam',
  'Kolonial',
  'Kemerdekaan',
  'Modern'
];

export const kondisiODCBList: KondisiODCB[] = [
  'Utuh',
  'Tinggal Sebagian',
  'Musnah',
  'Hilang',
  'Berubah Wujud dan Gaya'
];

export const statusKepemilikanList: StatusKepemilikan[] = [
  'Milik Pribadi',
  'Milik Negara',
  'Milik Daerah',
  'Milik Desa',
  'Milik Badan Usaha',
  'Milik Masyarakat Hukum Adat',
  'Tidak Diketahui'
];

export const statusPengelolaanList: StatusPengelolaan[] = [
  'Dikelola Sendiri',
  'Dikelola Pemerintah',
  'Dikelola Badan Usaha',
  'Dikelola Masyarakat',
  'Tidak Dikelola'
];

// Sample data kosong (akan diisi melalui form)
export const odcbData: ODCB[] = [];
