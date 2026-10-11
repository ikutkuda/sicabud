import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { roleLabels, roleColors, roleIcons, UserRole } from '../data/users';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  const { currentUser, users, deleteUser, changeUserRole, toggleUserStatus, isAdmin, isManager } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content' | 'settings'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState<UserRole | 'semua'>('semua');
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<number | null>(null);

  if (!currentUser) {
    onNavigate('login');
    return null;
  }

  const filteredUsers = users.filter(u => {
    const matchSearch = u.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = filterRole === 'semua' || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const stats = {
    total: users.length,
    admin: users.filter(u => u.role === 'admin').length,
    manager: users.filter(u => u.role === 'manager').length,
    member: users.filter(u => u.role === 'member').length,
    public: users.filter(u => u.role === 'public').length,
    aktif: users.filter(u => u.status === 'aktif').length,
    nonaktif: users.filter(u => u.status === 'nonaktif').length,
  };

  const canManageUsers = isAdmin();
  const canManageContent = isAdmin() || isManager();

  const tabs = [
    { id: 'overview' as const, label: 'Overview', icon: '📊', show: true },
    { id: 'users' as const, label: 'Kelola User', icon: '👥', show: canManageUsers },
    { id: 'content' as const, label: 'Kelola Konten', icon: '📝', show: canManageContent },
    { id: 'settings' as const, label: 'Pengaturan', icon: '⚙️', show: true },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
              <p className="text-gray-500 text-sm mt-1">
                Selamat datang, <span className="font-medium text-emerald-600">{currentUser.nama}</span>
              </p>
            </div>
            <div className="mt-3 md:mt-0 flex items-center">
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold border ${roleColors[currentUser.role]}`}>
                {roleIcons[currentUser.role]} {roleLabels[currentUser.role]}
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex space-x-1 overflow-x-auto">
            {tabs.filter(t => t.show).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total User</p>
                    <p className="text-2xl font-bold text-gray-800 mt-1">{stats.total}</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">👥</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">User Aktif</p>
                    <p className="text-2xl font-bold text-emerald-600 mt-1">{stats.aktif}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">✅</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Member</p>
                    <p className="text-2xl font-bold text-blue-600 mt-1">{stats.member}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Nonaktif</p>
                    <p className="text-2xl font-bold text-red-600 mt-1">{stats.nonaktif}</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <span className="text-xl">⛔</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Role Distribution */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Distribusi Role User</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(['admin', 'manager', 'member', 'public'] as UserRole[]).map(role => (
                  <div key={role} className="text-center p-4 rounded-lg bg-gray-50">
                    <span className="text-3xl block mb-2">{roleIcons[role]}</span>
                    <p className="text-2xl font-bold text-gray-800">{stats[role]}</p>
                    <p className="text-sm text-gray-500">{roleLabels[role]}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Aktivitas Terakhir</h2>
              <div className="space-y-3">
                {users.slice(0, 5).map(user => (
                  <div key={user.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                      <span>{user.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">{user.nama}</p>
                      <p className="text-sm text-gray-500">Login terakhir: {user.lastLogin}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${roleColors[user.role]}`}>
                      {roleLabels[user.role]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Access Info */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
              <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">🔐</span> Hak Akses Anda ({roleLabels[currentUser.role]})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentUser.role === 'admin' && (
                  <>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Kelola semua user</div>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Ubah role user</div>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Hapus user</div>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Kelola konten cagar budaya</div>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Kelola berita & artikel</div>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Akses penuh statistik</div>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Pengaturan sistem</div>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Backup & restore data</div>
                  </>
                )}
                {currentUser.role === 'manager' && (
                  <>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Lihat daftar user</div>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Kelola konten cagar budaya</div>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Kelola berita & artikel</div>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Approve konten baru</div>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Akses statistik</div>
                    <div className="flex items-center text-sm"><span className="mr-2">❌</span> Tidak bisa kelola user</div>
                    <div className="flex items-center text-sm"><span className="mr-2">❌</span> Tidak bisa ubah role</div>
                    <div className="flex items-center text-sm"><span className="mr-2">❌</span> Tidak bisa hapus user</div>
                  </>
                )}
                {currentUser.role === 'member' && (
                  <>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Lihat semua cagar budaya</div>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Akses peta lokasi</div>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Lihat galeri & berita</div>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Bookmark cagar budaya</div>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Komentar & review</div>
                    <div className="flex items-center text-sm"><span className="mr-2">❌</span> Tidak bisa kelola konten</div>
                    <div className="flex items-center text-sm"><span className="mr-2">❌</span> Tidak bisa kelola user</div>
                    <div className="flex items-center text-sm"><span className="mr-2">❌</span> Tidak bisa akses statistik</div>
                  </>
                )}
                {currentUser.role === 'public' && (
                  <>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Lihat beranda</div>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Lihat daftar cagar budaya</div>
                    <div className="flex items-center text-sm"><span className="mr-2">✅</span> Akses peta lokasi</div>
                    <div className="flex items-center text-sm"><span className="mr-2">❌</span> Tidak bisa komentar</div>
                    <div className="flex items-center text-sm"><span className="mr-2">❌</span> Tidak bisa bookmark</div>
                    <div className="flex items-center text-sm"><span className="mr-2">❌</span> Tidak bisa kelola konten</div>
                    <div className="flex items-center text-sm"><span className="mr-2">❌</span> Tidak bisa kelola user</div>
                    <div className="flex items-center text-sm"><span className="mr-2">❌</span> Tidak bisa akses statistik</div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab (Admin only) */}
        {activeTab === 'users' && canManageUsers && (
          <div className="space-y-6">
            {/* Search & Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Cari user berdasarkan nama atau email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                </div>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value as UserRole | 'semua')}
                  className="px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                >
                  <option value="semua">Semua Role</option>
                  <option value="admin">Administrator</option>
                  <option value="manager">Manager</option>
                  <option value="member">User Member</option>
                  <option value="public">User Publik</option>
                </select>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Menampilkan <span className="font-bold text-emerald-600">{filteredUsers.length}</span> dari {users.length} user
              </p>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">User</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Role</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase hidden md:table-cell">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase hidden lg:table-cell">Last Login</th>
                      <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-sm">{user.avatar}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 text-sm">{user.nama}</p>
                              <p className="text-xs text-gray-500">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {editingUser === user.id ? (
                            <select
                              value={user.role}
                              onChange={(e) => {
                                changeUserRole(user.id, e.target.value as UserRole);
                                setEditingUser(null);
                              }}
                              className="text-xs px-2 py-1 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                            >
                              <option value="admin">Admin</option>
                              <option value="manager">Manager</option>
                              <option value="member">Member</option>
                              <option value="public">Public</option>
                            </select>
                          ) : (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${roleColors[user.role]}`}>
                              {roleIcons[user.role]} {roleLabels[user.role]}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 hidden md:table-cell">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {user.status === 'aktif' ? '✅ Aktif' : '⛔ Nonaktif'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-500 hidden lg:table-cell">
                          {user.lastLogin}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end space-x-1">
                            {user.id !== currentUser.id && (
                              <>
                                <button
                                  onClick={() => setEditingUser(editingUser === user.id ? null : user.id)}
                                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                  title="Ubah Role"
                                >
                                  🔄
                                </button>
                                <button
                                  onClick={() => toggleUserStatus(user.id)}
                                  className={`p-1.5 rounded-lg transition-colors ${
                                    user.status === 'aktif' ? 'text-orange-600 hover:bg-orange-50' : 'text-green-600 hover:bg-green-50'
                                  }`}
                                  title={user.status === 'aktif' ? 'Nonaktifkan' : 'Aktifkan'}
                                >
                                  {user.status === 'aktif' ? '⏸️' : '▶️'}
                                </button>
                                <button
                                  onClick={() => setShowDeleteConfirm(user.id)}
                                  className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="Hapus User"
                                >
                                  🗑️
                                </button>
                              </>
                            )}
                            {user.id === currentUser.id && (
                              <span className="text-xs text-gray-400 italic">Anda</span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

            {/* Content Tab (Admin & Manager) */}
            {activeTab === 'content' && canManageContent && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Kelola Konten Cagar Budaya</h2>
                  <p className="text-gray-600 mb-6">
                    Kelola data cagar budaya, berita, dan konten lainnya yang tampil di aplikasi.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => onNavigate('daftar')}
                      className="p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left"
                    >
                      <span className="text-2xl block mb-2">🏛️</span>
                      <h3 className="font-bold text-gray-800">Cagar Budaya</h3>
                      <p className="text-sm text-gray-500 mt-1">Tambah, edit, hapus data cagar budaya</p>
                    </button>
                    <button
                      onClick={() => onNavigate('berita')}
                      className="p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left"
                    >
                      <span className="text-2xl block mb-2">📰</span>
                      <h3 className="font-bold text-gray-800">Berita & Artikel</h3>
                      <p className="text-sm text-gray-500 mt-1">Kelola berita dan artikel terkini</p>
                    </button>
                    <button
                      onClick={() => onNavigate('galeri')}
                      className="p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left"
                    >
                      <span className="text-2xl block mb-2">📸</span>
                      <h3 className="font-bold text-gray-800">Galeri</h3>
                      <p className="text-sm text-gray-500 mt-1">Kelola foto dan galeri cagar budaya</p>
                    </button>
                  </div>
                </div>

                {/* Kelola Lampiran */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Kelola Lampiran & Status Penetapan</h2>
                  <p className="text-gray-600 mb-6">
                    Upload dokumen SK, sertifikat, foto dokumentasi, dan kelola status penetapan cagar budaya.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => onNavigate('kelola-lampiran')}
                      className="p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left"
                    >
                      <span className="text-2xl block mb-2">📎</span>
                      <h3 className="font-bold text-gray-800">Kelola Lampiran</h3>
                      <p className="text-sm text-gray-500 mt-1">Upload SK, sertifikat, foto, peta</p>
                    </button>
                    <button
                      onClick={() => onNavigate('kelola-penetapan')}
                      className="p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left"
                    >
                      <span className="text-2xl block mb-2">🏷️</span>
                      <h3 className="font-bold text-gray-800">Status Penetapan</h3>
                      <p className="text-sm text-gray-500 mt-1">Kelola tingkat: Kota, Provinsi, Nasional</p>
                    </button>
                  </div>
                </div>

                {/* Kelola ODCB */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <h2 className="text-lg font-bold text-gray-800 mb-4">Kelola Pendaftaran ODCB</h2>
                  <p className="text-gray-600 mb-6">
                    Review dan kelola pendaftaran Objek Diduga Cagar Budaya dari masyarakat.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={() => onNavigate('kelola-odcb')}
                      className="p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left"
                    >
                      <span className="text-2xl block mb-2">📋</span>
                      <h3 className="font-bold text-gray-800">Review ODCB</h3>
                      <p className="text-sm text-gray-500 mt-1">Periksa dan update status pendaftaran</p>
                    </button>
                    <button
                      onClick={() => onNavigate('daftar-odcb')}
                      className="p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left"
                    >
                      <span className="text-2xl block mb-2">📝</span>
                      <h3 className="font-bold text-gray-800">Daftar ODCB Saya</h3>
                      <p className="text-sm text-gray-500 mt-1">Lihat pendaftaran ODCB Anda</p>
                    </button>
                  </div>
                </div>

                {/* Verifikasi Pembayaran (Admin only) */}
                {isAdmin() && (
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl shadow-sm border border-amber-200 p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                      <span className="mr-2">💰</span> Verifikasi Pembayaran
                    </h2>
                    <p className="text-gray-600 mb-6">
                      Verifikasi bukti pembayaran pendaftaran user baru (Manager & Member).
                    </p>
                    <button
                      onClick={() => onNavigate('verifikasi-pembayaran')}
                      className="w-full p-4 bg-white border border-amber-200 rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-all text-left"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-gray-800">Buka Panel Verifikasi</h3>
                          <p className="text-sm text-gray-500 mt-1">Setujui/tolak pendaftaran user baru</p>
                        </div>
                        <span className="text-2xl">→</span>
                      </div>
                    </button>
                  </div>
                )}
            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Ringkasan Konten</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-emerald-50 rounded-lg">
                  <p className="text-2xl font-bold text-emerald-600">10</p>
                  <p className="text-sm text-gray-600">Cagar Budaya</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">6</p>
                  <p className="text-sm text-gray-600">Artikel</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600">10</p>
                  <p className="text-sm text-gray-600">Foto Galeri</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg">
                  <p className="text-2xl font-bold text-amber-600">10</p>
                  <p className="text-sm text-gray-600">FAQ</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Pengaturan Akun</h2>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-3xl">{currentUser.avatar}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{currentUser.nama}</h3>
                    <p className="text-sm text-gray-500">{currentUser.email}</p>
                    <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${roleColors[currentUser.role]}`}>
                      {roleLabels[currentUser.role]}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('profil')}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                >
                  Edit Profil
                </button>
              </div>
            </div>

            {isAdmin() && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Pengaturan Sistem</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Registrasi Publik</p>
                      <p className="text-sm text-gray-500">Izinkan pengguna baru mendaftar</p>
                    </div>
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Notifikasi Email</p>
                      <p className="text-sm text-gray-500">Kirim email untuk aktivitas penting</p>
                    </div>
                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">Mode Maintenance</p>
                      <p className="text-sm text-gray-500">Nonaktifkan akses publik sementara</p>
                    </div>
                    <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-6">
            <div className="text-center">
              <span className="text-4xl block mb-3">⚠️</span>
              <h3 className="text-lg font-bold text-gray-800 mb-2">Hapus User?</h3>
              <p className="text-gray-600 text-sm mb-6">
                Apakah Anda yakin ingin menghapus user ini? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="flex-1 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={() => {
                    deleteUser(showDeleteConfirm);
                    setShowDeleteConfirm(null);
                  }}
                  className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
