import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { statusAkunColors, statusAkunIcons, statusAkunLabels, User } from '../data/users';

interface VerifikasiPembayaranProps {
  onNavigate: (page: string) => void;
}

export default function VerifikasiPembayaran({ onNavigate }: VerifikasiPembayaranProps) {
  const { isAdmin, users, approveUser, rejectUser } = useAuth();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [catatan, setCatatan] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  if (!isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl block mb-4">🔒</span>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Akses Ditolak</h2>
          <p className="text-gray-600 mb-4">Hanya Administrator yang dapat mengakses halaman ini.</p>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-medium"
          >
            Kembali ke Dashboard
          </button>
        </div>
      </div>
    );
  }

  const pendingUsers = users.filter(u => u.statusAkun === 'pending');
  const approvedUsers = users.filter(u => u.statusAkun === 'approved' && (u.role === 'manager' || u.role === 'member'));
  const rejectedUsers = users.filter(u => u.statusAkun === 'rejected');

  const filteredUsers = filterStatus === 'all' 
    ? [...pendingUsers, ...approvedUsers, ...rejectedUsers]
    : filterStatus === 'pending' ? pendingUsers
    : filterStatus === 'approved' ? approvedUsers
    : rejectedUsers;

  const handleAction = () => {
    if (!selectedUser) return;
    
    if (actionType === 'approve') {
      approveUser(selectedUser.id, catatan || 'Pendaftaran disetujui');
      setSuccessMsg(`Akun "${selectedUser.nama}" berhasil disetujui!`);
    } else {
      if (!catatan.trim()) {
        alert('Mohon isi alasan penolakan!');
        return;
      }
      rejectUser(selectedUser.id, catatan);
      setSuccessMsg(`Akun "${selectedUser.nama}" ditolak.`);
    }
    
    setSelectedUser(null);
    setActionType(null);
    setCatatan('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Verifikasi Pembayaran</h1>
            <p className="text-gray-600 text-sm">Kelola persetujuan pendaftaran user baru</p>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm"
          >
            ← Dashboard
          </button>
        </div>

        {successMsg && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center text-green-700 text-sm">
            <span className="mr-2">✅</span> {successMsg}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Pendaftar</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">
                  {pendingUsers.length + approvedUsers.length + rejectedUsers.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">👥</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Menunggu Verifikasi</p>
                <p className="text-2xl font-bold text-amber-600 mt-1">{pendingUsers.length}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">⏳</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Disetujui</p>
                <p className="text-2xl font-bold text-green-600 mt-1">{approvedUsers.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">✅</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Ditolak</p>
                <p className="text-2xl font-bold text-red-600 mt-1">{rejectedUsers.length}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">❌</span>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Summary */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm">Total Pendapatan Pendaftaran</p>
              <p className="text-3xl font-bold mt-1">
                Rp {((approvedUsers.length) * 110000).toLocaleString('id-ID')},-
              </p>
              <p className="text-emerald-100 text-xs mt-1">
                {approvedUsers.length} user × Rp 110.000
              </p>
            </div>
            <div className="text-right">
              <p className="text-emerald-100 text-sm">Potensi Pendapatan</p>
              <p className="text-2xl font-bold mt-1">
                Rp {((pendingUsers.length + approvedUsers.length) * 110000).toLocaleString('id-ID')},-
              </p>
              <p className="text-emerald-100 text-xs mt-1">
                Termasuk {pendingUsers.length} pending
              </p>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Filter Status:</p>
          <div className="flex flex-wrap gap-2">
            {[
              { key: 'all', label: '📋 Semua', count: filteredUsers.length },
              { key: 'pending', label: '⏳ Menunggu', count: pendingUsers.length },
              { key: 'approved', label: '✅ Disetujui', count: approvedUsers.length },
              { key: 'rejected', label: '❌ Ditolak', count: rejectedUsers.length },
            ].map(f => (
              <button
                key={f.key}
                onClick={() => setFilterStatus(f.key as any)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterStatus === f.key
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f.label} ({f.count})
              </button>
            ))}
          </div>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {filteredUsers.length === 0 ? (
            <div className="p-12 text-center text-gray-400">
              <span className="text-4xl block mb-3">📋</span>
              <p>Tidak ada data pada filter ini</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredUsers.map(user => (
                <div key={user.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">{user.avatar}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-bold text-gray-800">{user.nama}</p>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium border ${statusAkunColors[user.statusAkun]}`}>
                            {statusAkunIcons[user.statusAkun]} {statusAkunLabels[user.statusAkun]}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                            {user.role === 'manager' ? '📋 Manager' : '👤 Member'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">{user.email}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                          <span>📅 Daftar: {user.tanggalDaftar}</span>
                          <span>💰 Rp 110.000</span>
                          {user.buktiBayar && <span>📎 {user.buktiBayar.namaFile}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setSelectedUser(user); setActionType(null); }}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium transition-colors"
                      >
                        👁️ Lihat Detail
                      </button>
                      {user.statusAkun === 'pending' && (
                        <>
                          <button
                            onClick={() => { setSelectedUser(user); setActionType('approve'); }}
                            className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-medium transition-colors"
                          >
                            ✓ Setujui
                          </button>
                          <button
                            onClick={() => { setSelectedUser(user); setActionType('reject'); }}
                            className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-medium transition-colors"
                          >
                            ✕ Tolak
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail Modal */}
        {selectedUser && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full my-8">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Detail Pendaftaran</h2>
                  <button
                    onClick={() => { setSelectedUser(null); setActionType(null); setCatatan(''); }}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                {/* Status */}
                <div className={`p-4 rounded-lg border ${statusAkunColors[selectedUser.statusAkun]}`}>
                  <p className="text-sm opacity-75">Status Saat Ini</p>
                  <p className="text-lg font-bold">
                    {statusAkunIcons[selectedUser.statusAkun]} {statusAkunLabels[selectedUser.statusAkun]}
                  </p>
                </div>

                {/* User Info */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Data Pendaftar</h3>
                  <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Nama:</span>
                      <span className="font-medium">{selectedUser.nama}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span className="font-medium">{selectedUser.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Telepon:</span>
                      <span className="font-medium">{selectedUser.phone || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Alamat:</span>
                      <span className="font-medium">{selectedUser.alamat || '-'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Role:</span>
                      <span className="font-medium">{selectedUser.role === 'manager' ? '📋 Manager' : '👤 Member'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Tanggal Daftar:</span>
                      <span className="font-medium">{selectedUser.tanggalDaftar}</span>
                    </div>
                  </div>
                </div>

                {/* Bukti Bayar */}
                {selectedUser.buktiBayar && (
                  <div>
                    <h3 className="font-bold text-gray-800 mb-2">Bukti Pembayaran</h3>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center border border-emerald-200">
                          <span className="text-3xl">🖼️</span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">{selectedUser.buktiBayar.namaFile}</p>
                          <p className="text-xs text-gray-500">{selectedUser.buktiBayar.ukuran} • {selectedUser.buktiBayar.tanggalUpload}</p>
                          <div className="mt-2 pt-2 border-t border-emerald-200">
                            <p className="text-xs text-gray-600">
                              Nominal: <strong className="text-emerald-700">Rp {selectedUser.buktiBayar.nominal.toLocaleString('id-ID')},-</strong>
                            </p>
                            <p className="text-xs text-gray-600">
                              Rekening Tujuan: <strong>{selectedUser.buktiBayar.rekeningTujuan}</strong>
                            </p>
                          </div>
                        </div>
                      </div>
                      <button className="w-full mt-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-medium">
                        📥 Download Bukti Transfer
                      </button>
                    </div>
                  </div>
                )}

                {/* Catatan Admin */}
                {selectedUser.catatanAdmin && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <p className="text-sm font-bold text-amber-800 mb-1">💬 Catatan Sebelumnya:</p>
                    <p className="text-sm text-amber-700">{selectedUser.catatanAdmin}</p>
                    <p className="text-xs text-amber-600 mt-1">oleh: {selectedUser.verifiedBy} • {selectedUser.tanggalVerifikasi}</p>
                  </div>
                )}

                {/* Action Form */}
                {(actionType || selectedUser.statusAkun === 'pending') && (
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-bold text-gray-800 mb-3">
                      {actionType === 'approve' ? '✅ Setujui Pendaftaran' : 
                       actionType === 'reject' ? '❌ Tolak Pendaftaran' : 
                       '📝 Tindakan Verifikasi'}
                    </h3>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {actionType === 'reject' ? 'Alasan Penolakan *' : 'Catatan (opsional)'}
                      </label>
                      <textarea
                        value={catatan}
                        onChange={(e) => setCatatan(e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
                        placeholder={actionType === 'reject' ? 'Jelaskan alasan penolakan...' : 'Tambahkan catatan untuk pendaftar...'}
                      />
                    </div>

                    <div className="flex gap-2">
                      {!actionType && selectedUser.statusAkun === 'pending' && (
                        <>
                          <button
                            onClick={() => setActionType('approve')}
                            className="flex-1 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium text-sm"
                          >
                            ✓ Setujui
                          </button>
                          <button
                            onClick={() => setActionType('reject')}
                            className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium text-sm"
                          >
                            ✕ Tolak
                          </button>
                        </>
                      )}
                      {actionType && (
                        <>
                          <button
                            onClick={() => setActionType(null)}
                            className="flex-1 py-2 border border-gray-200 rounded-lg font-medium text-sm text-gray-700"
                          >
                            Batal
                          </button>
                          <button
                            onClick={handleAction}
                            className={`flex-1 py-2 ${actionType === 'approve' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white rounded-lg font-medium text-sm`}
                          >
                            {actionType === 'approve' ? '✓ Konfirmasi Setujui' : '✕ Konfirmasi Tolak'}
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => { setSelectedUser(null); setActionType(null); setCatatan(''); }}
                  className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
