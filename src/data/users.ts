export type UserRole = 'admin' | 'manager' | 'member' | 'public';

export interface User {
  id: number;
  nama: string;
  email: string;
  password: string;
  role: UserRole;
  avatar: string;
  tanggalDaftar: string;
  status: 'aktif' | 'nonaktif';
  lastLogin: string;
  phone?: string;
  alamat?: string;
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
    lastLogin: '2024-01-14 14:20',
    phone: '081234567891',
    alamat: 'Jl. Sukapura No. 10, Tasikmalaya'
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
    lastLogin: '2024-01-13 09:15',
    phone: '081234567892',
    alamat: 'Jl. Merdeka No. 5, Tasikmalaya'
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
    lastLogin: '2024-01-12 16:45',
    phone: '081234567893',
    alamat: 'Jl. Veteran No. 8, Tasikmalaya'
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
    lastLogin: '2024-01-11 11:30',
    phone: '081234567894',
    alamat: 'Jl. Diponegoro No. 3, Tasikmalaya'
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
    lastLogin: '2024-01-14 10:00',
    phone: '081234567895',
    alamat: 'Jl. Asia Afrika No. 15, Tasikmalaya'
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
    lastLogin: '2024-01-14 07:00',
    phone: '',
    alamat: ''
  },
];
