export type StatusODCB = 'Diajukan' | 'Diperiksa' | 'Direvisi' | 'Ditolak' | 'Disetujui';
export type JenisIdentitas = 'KTP' | 'SIM';

export interface ODCB {
  id: number;
  // Data ODCB
  namaODCB: string;
  jenisODCB: string;
  lokasi: string;
  kecamatan: string;
  deskripsi: string;
  perkiraanUmur: string;
  kondisi: string;
  koordinat: { lat: number; lng: number } | null;
  
  // Data Pendaftar
  pendaftarId: number;
  pendaftarNama: string;
  pendaftarEmail: string;
  pendaftarPhone: string;
  pendaftarAlamat: string;
  
  // Identitas
  jenisIdentitas: JenisIdentitas;
  nomorIdentitas: string;
  fotoIdentitas: FileAttachment;
  
  // Foto ODCB
  fotoODCB: FileAttachment[];
  
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
  'Diajukan': 'Diajukan',
  'Diperiksa': 'Sedang Diperiksa',
  'Direvisi': 'Perlu Revisi',
  'Ditolak': 'Ditolak',
  'Disetujui': 'Disetujui',
};

export const statusODCBColors: Record<StatusODCB, string> = {
  'Diajukan': 'bg-blue-100 text-blue-700 border-blue-300',
  'Diperiksa': 'bg-amber-100 text-amber-700 border-amber-300',
  'Direvisi': 'bg-orange-100 text-orange-700 border-orange-300',
  'Ditolak': 'bg-red-100 text-red-700 border-red-300',
  'Disetujui': 'bg-green-100 text-green-700 border-green-300',
};

export const statusODCBIcons: Record<StatusODCB, string> = {
  'Diajukan': '📤',
  'Diperiksa': '🔍',
  'Direvisi': '✏️',
  'Ditolak': '❌',
  'Disetujui': '✅',
};

export const jenisODCBList = [
  'Bangunan',
  'Struktur',
  'Situs Arkeologi',
  'Benda Budaya',
  'Kawasan Bersejarah',
  'Lainnya'
];

export const kondisiList = [
  'Baik',
  'Cukup Baik',
  'Kurang Baik',
  'Rusak Ringan',
  'Rusak Berat'
];

// Sample data
export const odcbData: ODCB[] = [
  {
    id: 1,
    namaODCB: 'Rumah Tua di Kampung Adat',
    jenisODCB: 'Bangunan',
    lokasi: 'Jl. Kampung Adat No. 15',
    kecamatan: 'Cihideung',
    deskripsi: 'Rumah tua peninggalan keluarga bangsawan yang masih terjaga keasliannya. Atap ijuk dan struktur kayu masih utuh.',
    perkiraanUmur: '±150 tahun',
    kondisi: 'Cukup Baik',
    koordinat: { lat: -7.3285, lng: 108.2195 },
    pendaftarId: 3,
    pendaftarNama: 'Siti Nurhaliza',
    pendaftarEmail: 'member@sicaba.go.id',
    pendaftarPhone: '081234567892',
    pendaftarAlamat: 'Jl. Merdeka No. 5, Tasikmalaya',
    jenisIdentitas: 'KTP',
    nomorIdentitas: '3206xxxxxxxxxxxx',
    fotoIdentitas: {
      id: 1,
      namaFile: 'foto_ktp_siti.jpg',
      tipe: 'jpg',
      ukuran: '1.2 MB',
      tanggalUpload: '2024-02-15',
      deskripsi: 'Foto KTP pendaftar'
    },
    fotoODCB: [
      {
        id: 2,
        namaFile: 'foto_depan_rumah.jpg',
        tipe: 'jpg',
        ukuran: '2.5 MB',
        tanggalUpload: '2024-02-15',
        deskripsi: 'Tampak depan rumah'
      },
      {
        id: 3,
        namaFile: 'foto_samping_rumah.jpg',
        tipe: 'jpg',
        ukuran: '2.3 MB',
        tanggalUpload: '2024-02-15',
        deskripsi: 'Tampak samping'
      },
      {
        id: 4,
        namaFile: 'foto_detail_ukiran.jpg',
        tipe: 'jpg',
        ukuran: '1.8 MB',
        tanggalUpload: '2024-02-15',
        deskripsi: 'Detail ukiran kayu'
      }
    ],
    status: 'Diperiksa',
    tanggalPengajuan: '2024-02-15',
    tanggalUpdate: '2024-02-16',
    catatanManager: 'Sedang dalam proses verifikasi lapangan',
    reviewedBy: 'Budi Santoso'
  },
  {
    id: 2,
    namaODCB: 'Sumur Kuno di Desa Sukarasa',
    jenisODCB: 'Struktur',
    lokasi: 'Desa Sukarasa',
    kecamatan: 'Sukaratu',
    deskripsi: 'Sumur kuno yang diduga berasal dari masa kerajaan. Struktur batu dan mortar masih terlihat.',
    perkiraanUmur: '±200 tahun',
    kondisi: 'Kurang Baik',
    koordinat: { lat: -7.3420, lng: 108.2380 },
    pendaftarId: 4,
    pendaftarNama: 'Ahmad Rizki',
    pendaftarEmail: 'ahmad@email.com',
    pendaftarPhone: '081234567893',
    pendaftarAlamat: 'Jl. Veteran No. 8, Tasikmalaya',
    jenisIdentitas: 'SIM',
    nomorIdentitas: '3206xxxxxxxxxxxx',
    fotoIdentitas: {
      id: 5,
      namaFile: 'foto_sim_ahmad.jpg',
      tipe: 'jpg',
      ukuran: '980 KB',
      tanggalUpload: '2024-02-18',
      deskripsi: 'Foto SIM pendaftar'
    },
    fotoODCB: [
      {
        id: 6,
        namaFile: 'foto_sumur_utuh.jpg',
        tipe: 'jpg',
        ukuran: '3.1 MB',
        tanggalUpload: '2024-02-18',
        deskripsi: 'Kondisi sumur secara keseluruhan'
      },
      {
        id: 7,
        namaFile: 'foto_detail_batu.jpg',
        tipe: 'jpg',
        ukuran: '2.7 MB',
        tanggalUpload: '2024-02-18',
        deskripsi: 'Detail struktur batu'
      }
    ],
    status: 'Direvisi',
    tanggalPengajuan: '2024-02-18',
    tanggalUpdate: '2024-02-20',
    catatanManager: 'Mohon tambahkan foto dari sudut berbeda dan koordinat GPS yang lebih akurat',
    reviewedBy: 'Budi Santoso'
  },
  {
    id: 3,
    namaODCB: 'Pohon Beringin Tua di Alun-alun',
    jenisODCB: 'Benda Budaya',
    lokasi: 'Alun-alun Kota Tasikmalaya',
    kecamatan: 'Tawang',
    deskripsi: 'Pohon beringin tua yang diperkirakan telah ada sejak masa kolonial. Menjadi simbol sejarah kota.',
    perkiraanUmur: '±180 tahun',
    kondisi: 'Baik',
    koordinat: { lat: -7.3270, lng: 108.2210 },
    pendaftarId: 7,
    pendaftarNama: 'Pengunjung Umum',
    pendaftarEmail: 'public@sicaba.go.id',
    pendaftarPhone: '',
    pendaftarAlamat: '',
    jenisIdentitas: 'KTP',
    nomorIdentitas: '3206xxxxxxxxxxxx',
    fotoIdentitas: {
      id: 8,
      namaFile: 'foto_ktp_public.jpg',
      tipe: 'jpg',
      ukuran: '1.1 MB',
      tanggalUpload: '2024-02-22',
      deskripsi: 'Foto KTP pendaftar'
    },
    fotoODCB: [
      {
        id: 9,
        namaFile: 'foto_pohon_beringin.jpg',
        tipe: 'jpg',
        ukuran: '4.2 MB',
        tanggalUpload: '2024-02-22',
        deskripsi: 'Pohon beringin secara keseluruhan'
      }
    ],
    status: 'Ditolak',
    tanggalPengajuan: '2024-02-22',
    tanggalUpdate: '2024-02-24',
    catatanManager: 'Objek tidak memenuhi kriteria cagar budaya menurut UU No. 11 Tahun 2010. Pohon tidak termasuk dalam kategori benda cagar budaya.',
    reviewedBy: 'Rudi Hermawan'
  },
  {
    id: 4,
    namaODCB: 'Batu Prasasti di Perbukitan',
    jenisODCB: 'Situs Arkeologi',
    lokasi: 'Perbukitan Cipari',
    kecamatan: 'Cigalon',
    deskripsi: 'Batu dengan ukiran yang diduga merupakan prasasti kuno. Ditemukan oleh warga setempat.',
    perkiraanUmur: '±500 tahun',
    kondisi: 'Cukup Baik',
    koordinat: { lat: -7.3750, lng: 108.2550 },
    pendaftarId: 5,
    pendaftarNama: 'Dewi Lestari',
    pendaftarEmail: 'dewi@email.com',
    pendaftarPhone: '081234567894',
    pendaftarAlamat: 'Jl. Diponegoro No. 3, Tasikmalaya',
    jenisIdentitas: 'KTP',
    nomorIdentitas: '3206xxxxxxxxxxxx',
    fotoIdentitas: {
      id: 10,
      namaFile: 'foto_ktp_dewi.jpg',
      tipe: 'jpg',
      ukuran: '1.3 MB',
      tanggalUpload: '2024-02-25',
      deskripsi: 'Foto KTP pendaftar'
    },
    fotoODCB: [
      {
        id: 11,
        namaFile: 'foto_batu_prasasti.jpg',
        tipe: 'jpg',
        ukuran: '3.5 MB',
        tanggalUpload: '2024-02-25',
        deskripsi: 'Batu prasasti secara keseluruhan'
      },
      {
        id: 12,
        namaFile: 'foto_detail_ukiran.jpg',
        tipe: 'jpg',
        ukuran: '2.8 MB',
        tanggalUpload: '2024-02-25',
        deskripsi: 'Detail ukiran pada batu'
      },
      {
        id: 13,
        namaFile: 'foto_lokasi.jpg',
        tipe: 'jpg',
        ukuran: '2.1 MB',
        tanggalUpload: '2024-02-25',
        deskripsi: 'Kondisi lokasi sekitar'
      },
      {
        id: 14,
        namaFile: 'foto_sketsa.jpg',
        tipe: 'jpg',
        ukuran: '1.5 MB',
        tanggalUpload: '2024-02-25',
        deskripsi: 'Sketsa ukiran'
      }
    ],
    status: 'Disetujui',
    tanggalPengajuan: '2024-02-25',
    tanggalUpdate: '2024-02-28',
    catatanManager: 'Objek memenuhi kriteria dan akan diproses untuk ditetapkan sebagai cagar budaya tingkat kota.',
    reviewedBy: 'Budi Santoso'
  }
];
