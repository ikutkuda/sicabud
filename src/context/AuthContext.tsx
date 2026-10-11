import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole, defaultUsers } from '../data/users';

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, password: string) => { success: boolean; message: string };
  register: (userData: Omit<User, 'id' | 'tanggalDaftar' | 'status' | 'lastLogin' | 'avatar'>) => { success: boolean; message: string };
  logout: () => void;
  updateUser: (id: number, data: Partial<User>) => void;
  deleteUser: (id: number) => void;
  changeUserRole: (id: number, role: UserRole) => void;
  toggleUserStatus: (id: number) => void;
  isAdmin: () => boolean;
  isManager: () => boolean;
  isMember: () => boolean;
  isPublic: () => boolean;
  isLoggedIn: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(defaultUsers);

  const login = (email: string, password: string) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      return { success: false, message: 'Email atau password salah!' };
    }
    if (user.status === 'nonaktif') {
      return { success: false, message: 'Akun Anda telah dinonaktifkan. Hubungi administrator.' };
    }
    const now = new Date().toLocaleString('id-ID');
    const updatedUser = { ...user, lastLogin: now };
    setCurrentUser(updatedUser);
    // Update last login in users list
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, lastLogin: now } : u));
    return { success: true, message: `Selamat datang, ${user.nama}!` };
  };

  const register = (userData: Omit<User, 'id' | 'tanggalDaftar' | 'status' | 'lastLogin' | 'avatar'>) => {
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return { success: false, message: 'Email sudah terdaftar!' };
    }
    const newUser: User = {
      ...userData,
      id: Math.max(...users.map(u => u.id)) + 1,
      tanggalDaftar: new Date().toISOString().split('T')[0],
      status: 'aktif',
      lastLogin: new Date().toLocaleString('id-ID'),
      avatar: '👤',
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true, message: 'Registrasi berhasil! Selamat datang.' };
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
    if (currentUser?.id === id) return; // Cannot delete self
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

  const isAdmin = () => currentUser?.role === 'admin';
  const isManager = () => currentUser?.role === 'manager';
  const isMember = () => currentUser?.role === 'member';
  const isPublic = () => currentUser?.role === 'public';
  const isLoggedIn = () => currentUser !== null;

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
      isAdmin,
      isManager,
      isMember,
      isPublic,
      isLoggedIn,
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
