export type UserRole = 'admin' | 'manager' | 'member' | 'public';
export type StatusAkun = 'pending' | 'approved' | 'rejected';

export interface BuktiBayar {
  namaFile: string;
  tipe: string;
  ukuran: string;
  tanggalUpload: string;
  nominal: number;
  rekeningTujuan: string;
  catatan?: string;
}

export interface User {
  id: number;
  nama: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string;
  tanggalDaftar: string;
  status: 'aktif' | 'nonaktif';
  statusAkun: StatusAkun;
  lastLogin: string;
  phone?: string;
  alamat?: string;
  buktiBayar?: BuktiBayar;
  tanggalVerifikasi?: string;
  catatanAdmin?: string;
  verifiedBy?: string;
}

export const roleLabels: Record<UserRole, string> = {
  admin: 'Administrator',
  manager: 'Manager',
  member: 'User Member',
  public: 'User Publik',
};

export const roleColors: Record<UserRole, string> = {
  admin: 'bg-red-100 text-red-700 border-red-200',
  manager: 'bg-blue-100 text-blue-700 border-blue-200',
  member: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  public: 'bg-gray-100 text-gray-700 border-gray-200',
};

export const roleIcons: Record<UserRole, string> = {
  admin: '👑',
  manager: '📋',
  member: '👤',
  public: '🌐',
};

export const statusAkunLabels: Record<StatusAkun, string> = {
  'pending': 'Menunggu Persetujuan',
  'approved': 'Disetujui',
  'rejected': 'Ditolak',
};

export const statusAkunColors: Record<StatusAkun, string> = {
  'pending': 'bg-amber-100 text-amber-700 border-amber-300',
  'approved': 'bg-green-100 text-green-700 border-green-300',
  'rejected': 'bg-red-100 text-red-700 border-red-300',
};

export const statusAkunIcons: Record<StatusAkun, string> = {
  'pending': '⏳',
  'approved': '✅',
  'rejected': '❌',
};

// Info rekening untuk pembayaran
export const INFO_PEMBAYARAN = {
  nominal: 110000,
  nominalFormatted: 'Rp 110.000,-',
  bank: 'BRI (Bank Rakyat Indonesia)',
  nomorRekening: '445301021768537',
  atasNama: 'Agus Wirabudiman',
  keterangan: 'Pendaftaran SICABA - [Nama Anda]',
  rolesRequiringPayment: ['manager', 'member'] as UserRole[],
};

// Default users data
export const defaultUsers: User[] = [
  {
    id: 1,
    nama: 'Admin SICABA',
    email: 'admin@sicaba.go.id',
    password: 'admin123',
    role: 'admin',
    avatar: '👑',
    tanggalDaftar: '2024-01-01',
    status: 'aktif',
    statusAkun: 'approved',
    lastLogin: '2024-01-15 08:30',
    phone: '081234567890',
    alamat: 'Jl. Ir. H. Juanda No. 1, Tasikmalaya'
  },
  {
    id: 2,
    nama: 'Budi Santoso',
    email: 'manager@sicaba.go.id',
    password: 'manager123',
    role: 'manager',
    avatar: '📋',
    tanggalDaftar: '2024-01-05',
    status: 'aktif',
    statusAkun: 'approved',
    lastLogin: '2024-01-14 14:20',
    phone: '081234567891',
    alamat: 'Jl. Sukapura No. 10, Tasikmalaya',
    buktiBayar: {
      namaFile: 'bukti_transfer_budi.jpg',
      tipe: 'jpg',
      ukuran: '1.5 MB',
      tanggalUpload: '2024-01-04',
      nominal: 110000,
      rekeningTujuan: '445301021768537',
    },
    tanggalVerifikasi: '2024-01-05',
    verifiedBy: 'Admin SICABA'
  },
  {
    id: 3,
    nama: 'Siti Nurhaliza',
    email: 'member@sicaba.go.id',
    password: 'member123',
    role: 'member',
    avatar: '👤',
    tanggalDaftar: '2024-01-10',
    status: 'aktif',
    statusAkun: 'approved',
    lastLogin: '2024-01-13 09:15',
    phone: '081234567892',
    alamat: 'Jl. Merdeka No. 5, Tasikmalaya',
    buktiBayar: {
      namaFile: 'bukti_transfer_siti.jpg',
      tipe: 'jpg',
      ukuran: '1.2 MB',
      tanggalUpload: '2024-01-09',
      nominal: 110000,
      rekeningTujuan: '445301021768537',
    },
    tanggalVerifikasi: '2024-01-10',
    verifiedBy: 'Admin SICABA'
  },
  {
    id: 4,
    nama: 'Ahmad Rizki',
    email: 'ahmad@email.com',
    password: 'member123',
    role: 'member',
    avatar: '👤',
    tanggalDaftar: '2024-01-12',
    status: 'aktif',
    statusAkun: 'approved',
    lastLogin: '2024-01-12 16:45',
    phone: '081234567893',
    alamat: 'Jl. Veteran No. 8, Tasikmalaya',
    buktiBayar: {
      namaFile: 'bukti_transfer_ahmad.jpg',
      tipe: 'jpg',
      ukuran: '980 KB',
      tanggalUpload: '2024-01-11',
      nominal: 110000,
      rekeningTujuan: '445301021768537',
    },
    tanggalVerifikasi: '2024-01-12',
    verifiedBy: 'Admin SICABA'
  },
  {
    id: 5,
    nama: 'Dewi Lestari',
    email: 'dewi@email.com',
    password: 'member123',
    role: 'member',
    avatar: '👤',
    tanggalDaftar: '2024-01-08',
    status: 'aktif',
    statusAkun: 'pending',
    lastLogin: '-',
    phone: '081234567894',
    alamat: 'Jl. Diponegoro No. 3, Tasikmalaya',
    buktiBayar: {
      namaFile: 'bukti_transfer_dewi.jpg',
      tipe: 'jpg',
      ukuran: '1.1 MB',
      tanggalUpload: '2024-01-08',
      nominal: 110000,
      rekeningTujuan: '445301021768537',
    },
  },
  {
    id: 6,
    nama: 'Rudi Hermawan',
    email: 'rudi@email.com',
    password: 'manager123',
    role: 'manager',
    avatar: '📋',
    tanggalDaftar: '2024-01-03',
    status: 'aktif',
    statusAkun: 'pending',
    lastLogin: '-',
    phone: '081234567895',
    alamat: 'Jl. Asia Afrika No. 15, Tasikmalaya',
    buktiBayar: {
      namaFile: 'bukti_transfer_rudi.jpg',
      tipe: 'jpg',
      ukuran: '1.3 MB',
      tanggalUpload: '2024-01-03',
      nominal: 110000,
      rekeningTujuan: '445301021768537',
    },
  },
  {
    id: 7,
    nama: 'Pengunjung Umum',
    email: 'public@sicaba.go.id',
    password: 'public123',
    role: 'public',
    avatar: '🌐',
    tanggalDaftar: '2024-01-14',
    status: 'aktif',
    statusAkun: 'approved',
    lastLogin: '2024-01-14 07:00',
    phone: '',
    alamat: ''
  },
  {
    id: 8,
    nama: 'Hendra Wijaya',
    email: 'hendra@email.com',
    password: 'member123',
    role: 'member',
    avatar: '👤',
    tanggalDaftar: '2024-02-10',
    status: 'aktif',
    statusAkun: 'rejected',
    lastLogin: '-',
    phone: '081234567896',
    alamat: 'Jl. Samudra No. 7, Tasikmalaya',
    buktiBayar: {
      namaFile: 'bukti_transfer_hendra.jpg',
      tipe: 'jpg',
      ukuran: '890 KB',
      tanggalUpload: '2024-02-10',
      nominal: 110000,
      rekeningTujuan: '445301021768537',
    },
    tanggalVerifikasi: '2024-02-11',
    verifiedBy: 'Admin SICABA',
    catatanAdmin: 'Bukti transfer tidak jelas / blur. Mohon upload ulang dengan foto yang lebih jelas.'
  },
];
