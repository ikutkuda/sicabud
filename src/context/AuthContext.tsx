import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, StatusAkun, BuktiBayar, defaultUsers } from '../data/users';

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => { success: boolean; message: string; code?: string };
  register: (userData: Omit<User, 'id' | 'tanggalDaftar' | 'status' | 'lastLogin' | 'avatar' | 'statusAkun'> & { buktiBayar?: BuktiBayar }) => { success: boolean; message: string };
  logout: () => void;
  updateUser: (id: number, data: Partial<User>) => void;
  deleteUser: (id: number) => void;
  changeUserRole: (id: number, role: UserRole) => void;
  toggleUserStatus: (id: number) => void;
  approveUser: (id: number, catatan?: string) => void;
  rejectUser: (id: number, alasan: string) => void;
  isAdmin: () => boolean;
  isManager: () => boolean;
  isMember: () => boolean;
  isPublic: () => boolean;
  isLoggedIn: () => boolean;
  isAccountApproved: () => boolean;
  getPendingUsers: () => User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(defaultUsers);

  const login = (email: string, password: string) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return { success: false, message: 'Email atau password salah!', code: 'INVALID_CREDENTIALS' };
    }
    if (user.status === 'nonaktif') {
      return { success: false, message: 'Akun Anda telah dinonaktifkan. Hubungi administrator.', code: 'ACCOUNT_DISABLED' };
    }
    // Cek status persetujuan akun untuk role manager/member
    if ((user.role === 'manager' || user.role === 'member') && user.statusAkun === 'pending') {
      return { 
        success: false, 
        message: 'Akun Anda masih menunggu persetujuan Administrator. Silakan cek status pendaftaran Anda.',
        code: 'PENDING_APPROVAL'
      };
    }
    if ((user.role === 'manager' || user.role === 'member') && user.statusAkun === 'rejected') {
      return { 
        success: false, 
        message: `Pendaftaran Anda ditolak. ${user.catatanAdmin || 'Silakan hubungi administrator untuk informasi lebih lanjut.'}`,
        code: 'REJECTED'
      };
    }
    const now = new Date().toLocaleString('id-ID');
    const updatedUser = { ...user, lastLogin: now };
    setCurrentUser(updatedUser);
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, lastLogin: now } : u));
    return { success: true, message: `Selamat datang, ${user.nama}!` };
  };

  const register = (userData: Omit<User, 'id' | 'tanggalDaftar' | 'status' | 'lastLogin' | 'avatar' | 'statusAkun'> & { buktiBayar?: BuktiBayar }) => {
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'Email sudah terdaftar!' };
    }
    const requiresPayment = userData.role === 'manager' || userData.role === 'member';
    const newUser: User = {
      ...userData,
      id: Math.max(...users.map(u => u.id)) + 1,
      tanggalDaftar: new Date().toISOString().split('T')[0],
      status: 'aktif',
      statusAkun: requiresPayment ? 'pending' : 'approved',
      lastLogin: '-',
      avatar: requiresPayment ? '⏳' : (userData.role === 'public' ? '🌐' : '👤'),
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, message: requiresPayment 
      ? 'Pendaftaran berhasil! Akun Anda menunggu persetujuan Administrator setelah bukti pembayaran diverifikasi.'
      : 'Registrasi berhasil! Selamat datang.' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUser = (id: number, data: Partial<User>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...data } : u));
    if (currentUser?.id === id) {
      setCurrentUser(prev => prev ? { ...prev, ...data } : null);
    }
  };

  const deleteUser = (id: number) => {
    if (currentUser?.id === id) return;
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const changeUserRole = (id: number, role: UserRole) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, role } : u));
    if (currentUser?.id === id) {
      setCurrentUser(prev => prev ? { ...prev, role } : null);
    }
  };

  const toggleUserStatus = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'aktif' ? 'nonaktif' : 'aktif' } : u));
  };

  const approveUser = (id: number, catatan?: string) => {
    const now = new Date().toISOString().split('T')[0];
    setUsers(prev => prev.map(u => u.id === id ? {
      ...u,
      statusAkun: 'approved' as StatusAkun,
      avatar: u.role === 'manager' ? '📋' : '👤',
      tanggalVerifikasi: now,
      verifiedBy: currentUser?.nama,
      catatanAdmin: catatan,
    } : u));
  };

  const rejectUser = (id: number, alasan: string) => {
    const now = new Date().toISOString().split('T')[0];
    setUsers(prev => prev.map(u => u.id === id ? {
      ...u,
      statusAkun: 'rejected' as StatusAkun,
      tanggalVerifikasi: now,
      verifiedBy: currentUser?.nama,
      catatanAdmin: alasan,
    } : u));
  };

  const isAdmin = () => currentUser?.role === 'admin';
  const isManager = () => currentUser?.role === 'manager';
  const isMember = () => currentUser?.role === 'member';
  const isPublic = () => currentUser?.role === 'public';
  const isLoggedIn = () => currentUser !== null;
  const isAccountApproved = () => currentUser?.statusAkun === 'approved';

  const getPendingUsers = () => users.filter(u => u.statusAkun === 'pending');

  return (
    <AuthContext.Provider value={{
      currentUser,
      users,
      login,
      register,
      logout,
      updateUser,
      deleteUser,
      changeUserRole,
      toggleUserStatus,
      approveUser,
      rejectUser,
      isAdmin,
      isManager,
      isMember,
      isPublic,
      isLoggedIn,
      isAccountApproved,
      getPendingUsers,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
