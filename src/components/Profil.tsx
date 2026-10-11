import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { roleLabels, roleColors, roleIcons } from '../data/users';

interface ProfilProps {
  onNavigate: (page: string) => void;
}

export default function Profil({ onNavigate }: ProfilProps) {
  const { currentUser, updateUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    nama: currentUser?.nama || '',
    phone: currentUser?.phone || '',
    alamat: currentUser?.alamat || '',
  });
  const [successMsg, setSuccessMsg] = useState('');

  if (!currentUser) {
    onNavigate('login');
    return null;
  }

  const handleSave = () => {
    updateUser(currentUser.id, formData);
    setIsEditing(false);
    setSuccessMsg('Profil berhasil diperbarui!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleLogout = () => {
    logout();
    onNavigate('beranda');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center text-emerald-600 hover:text-emerald-700 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg font-medium text-sm transition-colors"
          >
            🚪 Keluar
          </button>
        </div>

        {successMsg && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700 text-sm">
            <span className="mr-2">✅</span>
            {successMsg}
          </div>
        )}

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          {/* Banner */}
          <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-600 relative">
            <div className="absolute -bottom-12 left-6">
              <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white">
                <span className="text-5xl">{currentUser.avatar}</span>
              </div>
            </div>
          </div>

          <div className="pt-16 pb-6 px-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{currentUser.nama}</h1>
                <p className="text-gray-500">{currentUser.email}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${roleColors[currentUser.role]}`}>
                    {roleIcons[currentUser.role]} {roleLabels[currentUser.role]}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    currentUser.status === 'aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {currentUser.status === 'aktif' ? '✅ Aktif' : '⛔ Nonaktif'}
                  </span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors"
                  >
                    ✏️ Edit Profil
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors"
                    >
                      💾 Simpan
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      Batal
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 text-emerald-600">👤</span>
              Informasi Pribadi
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 block mb-1">Nama Lengkap</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.nama}
                    onChange={(e) => setFormData(prev => ({ ...prev, nama: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{currentUser.nama}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">Email</label>
                <p className="text-gray-800 font-medium">{currentUser.email}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">No. Telepon</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{currentUser.phone || '-'}</p>
                )}
              </div>
              <div>
                <label className="text-sm text-gray-500 block mb-1">Alamat</label>
                {isEditing ? (
                  <textarea
                    value={formData.alamat}
                    onChange={(e) => setFormData(prev => ({ ...prev, alamat: e.target.value }))}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
                  />
                ) : (
                  <p className="text-gray-800 font-medium">{currentUser.alamat || '-'}</p>
                )}
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 text-blue-600">📋</span>
                Informasi Akun
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Role</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${roleColors[currentUser.role]}`}>
                    {roleLabels[currentUser.role]}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Tanggal Daftar</span>
                  <span className="text-sm font-medium text-gray-800">{currentUser.tanggalDaftar}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Login Terakhir</span>
                  <span className="text-sm font-medium text-gray-800">{currentUser.lastLogin}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-sm text-gray-500">Status</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    currentUser.status === 'aktif' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {currentUser.status === 'aktif' ? 'Aktif' : 'Nonaktif'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3 text-amber-600">⚡</span>
                Aksi Cepat
              </h2>
              <div className="space-y-2">
                <button
                  onClick={() => onNavigate('daftar')}
                  className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="mr-3">🏛️</span>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Lihat Cagar Budaya</p>
                    <p className="text-xs text-gray-500">Jelajahi daftar cagar budaya</p>
                  </div>
                </button>
                <button
                  onClick={() => onNavigate('peta')}
                  className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="mr-3">🗺️</span>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Peta Lokasi</p>
                    <p className="text-xs text-gray-500">Lihat lokasi cagar budaya</p>
                  </div>
                </button>
                <button
                  onClick={() => onNavigate('berita')}
                  className="w-full flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="mr-3">📰</span>
                  <div>
                    <p className="font-medium text-gray-800 text-sm">Berita Terbaru</p>
                    <p className="text-xs text-gray-500">Baca artikel terkini</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Role Privileges */}
        <div className="mt-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
            <span className="mr-2">🔐</span> Privileges Anda sebagai {roleLabels[currentUser.role]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {currentUser.role === 'admin' && (
              <>
                <div className="bg-white p-3 rounded-lg border border-emerald-100">
                  <p className="font-medium text-sm text-gray-800">👥 Kelola User</p>
                  <p className="text-xs text-gray-500">CRUD, ubah role & status</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-100">
                  <p className="font-medium text-sm text-gray-800">📝 Kelola Konten</p>
                  <p className="text-xs text-gray-500">Cagar budaya, berita, galeri</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-100">
                  <p className="font-medium text-sm text-gray-800">⚙️ Pengaturan Sistem</p>
                  <p className="text-xs text-gray-500">Konfigurasi aplikasi</p>
                </div>
              </>
            )}
            {currentUser.role === 'manager' && (
              <>
                <div className="bg-white p-3 rounded-lg border border-emerald-100">
                  <p className="font-medium text-sm text-gray-800">📝 Kelola Konten</p>
                  <p className="text-xs text-gray-500">Cagar budaya, berita, galeri</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-100">
                  <p className="font-medium text-sm text-gray-800">✅ Approve Konten</p>
                  <p className="text-xs text-gray-500">Setujui konten baru</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-100">
                  <p className="font-medium text-sm text-gray-800">📊 Lihat Statistik</p>
                  <p className="text-xs text-gray-500">Data & laporan</p>
                </div>
              </>
            )}
            {currentUser.role === 'member' && (
              <>
                <div className="bg-white p-3 rounded-lg border border-emerald-100">
                  <p className="font-medium text-sm text-gray-800">👁️ Akses Penuh</p>
                  <p className="text-xs text-gray-500">Semua konten & fitur</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-100">
                  <p className="font-medium text-sm text-gray-800">💬 Komentar</p>
                  <p className="text-xs text-gray-500">Beri review & komentar</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-100">
                  <p className="font-medium text-sm text-gray-800">🔖 Bookmark</p>
                  <p className="text-xs text-gray-500">Simpan cagar budaya favorit</p>
                </div>
              </>
            )}
            {currentUser.role === 'public' && (
              <>
                <div className="bg-white p-3 rounded-lg border border-emerald-100">
                  <p className="font-medium text-sm text-gray-800">👁️ Lihat Konten</p>
                  <p className="text-xs text-gray-500">Beranda, daftar, peta</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-100">
                  <p className="font-medium text-sm text-gray-800">📖 Informasi</p>
                  <p className="text-xs text-gray-500">Detail cagar budaya</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-100">
                  <p className="font-medium text-sm text-gray-800">📰 Baca Berita</p>
                  <p className="text-xs text-gray-500">Artikel & informasi</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
