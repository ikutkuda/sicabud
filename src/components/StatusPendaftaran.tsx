import { useAuth } from '../context/AuthContext';
import { statusAkunColors, statusAkunIcons, statusAkunLabels, INFO_PEMBAYARAN } from '../data/users';

interface StatusPendaftaranProps {
  onNavigate: (page: string) => void;
}

export default function StatusPendaftaran({ onNavigate }: StatusPendaftaranProps) {
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    onNavigate('login');
    return null;
  }

  const handleLogout = () => {
    logout();
    onNavigate('beranda');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white text-center">
            <span className="text-5xl block mb-3">⏳</span>
            <h1 className="text-2xl font-bold">Pendaftaran Berhasil Diajukan</h1>
            <p className="text-amber-100 mt-2">Terima kasih telah mendaftar di SICABA</p>
          </div>

          <div className="p-6 md:p-8">
            {/* Status Card */}
            <div className={`p-5 rounded-xl border-2 ${statusAkunColors[currentUser.statusAkun]} mb-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-75">Status Pendaftaran</p>
                  <p className="text-xl font-bold flex items-center">
                    <span className="mr-2">{statusAkunIcons[currentUser.statusAkun]}</span>
                    {statusAkunLabels[currentUser.statusAkun]}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-75">Tanggal Daftar</p>
                  <p className="font-medium">{currentUser.tanggalDaftar}</p>
                </div>
              </div>
            </div>

            {/* Info Akun */}
            <div className="bg-gray-50 rounded-xl p-5 mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Informasi Akun Anda</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-gray-500">Nama</p>
                  <p className="font-medium text-gray-800">{currentUser.nama}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium text-gray-800">{currentUser.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Role</p>
                  <p className="font-medium text-gray-800">{currentUser.role === 'manager' ? '📋 Manager' : '👤 Member'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Nominal Bayar</p>
                  <p className="font-bold text-emerald-600">{INFO_PEMBAYARAN.nominalFormatted}</p>
                </div>
              </div>
            </div>

            {/* Info Pembayaran */}
            {currentUser.buktiBayar && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-6">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">📤</span> Bukti Pembayaran
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border border-emerald-200">
                    <span className="text-2xl">🖼️</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">{currentUser.buktiBayar.namaFile}</p>
                    <p className="text-xs text-gray-500">{currentUser.buktiBayar.ukuran} • {currentUser.buktiBayar.tanggalUpload}</p>
                    <p className="text-xs text-emerald-600 font-medium mt-1">
                      ✓ Transfer ke {currentUser.buktiBayar.rekeningTujuan}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-3">Alur Verifikasi</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800 text-sm">Pendaftaran Diajukan</p>
                    <p className="text-xs text-gray-500">{currentUser.tanggalDaftar}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className={`w-8 h-8 ${currentUser.statusAkun === 'pending' ? 'bg-amber-500 animate-pulse' : currentUser.statusAkun === 'approved' ? 'bg-green-500' : 'bg-red-500'} text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold`}>
                    {currentUser.statusAkun === 'pending' ? '⏳' : currentUser.statusAkun === 'approved' ? '✓' : '✕'}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800 text-sm">Verifikasi Administrator</p>
                    <p className="text-xs text-gray-500">
                      {currentUser.statusAkun === 'pending' ? 'Menunggu verifikasi (estimasi 1x24 jam)' :
                       currentUser.statusAkun === 'approved' ? `Disetujui pada ${currentUser.tanggalVerifikasi}` :
                       `Ditolak pada ${currentUser.tanggalVerifikasi}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className={`w-8 h-8 ${currentUser.statusAkun === 'approved' ? 'bg-green-500' : 'bg-gray-300'} text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold`}>
                    {currentUser.statusAkun === 'approved' ? '✓' : '○'}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-gray-800 text-sm">Akun Aktif</p>
                    <p className="text-xs text-gray-500">
                      {currentUser.statusAkun === 'approved' ? 'Akun Anda sudah aktif dan bisa login' : 'Akan aktif setelah disetujui'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Catatan Admin (jika ada) */}
            {currentUser.catatanAdmin && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                <p className="text-sm font-bold text-amber-800 mb-1">💬 Catatan dari Administrator:</p>
                <p className="text-sm text-amber-700">{currentUser.catatanAdmin}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
              >
                🔑 Login
              </button>
              <button
                onClick={() => onNavigate('beranda')}
                className="flex-1 py-2.5 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              >
                🏠 Ke Beranda
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Anda akan menerima notifikasi via email setelah akun diverifikasi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
