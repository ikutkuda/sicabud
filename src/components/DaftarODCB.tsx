import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { odcbData, statusODCBColors, statusODCBIcons, statusODCBLabels, ODCB, StatusODCB } from '../data/odcb';

interface DaftarODCBProps {
  onNavigate: (page: string) => void;
  onOpenForm: () => void;
}

export default function DaftarODCB({ onNavigate, onOpenForm }: DaftarODCBProps) {
  const { currentUser, isLoggedIn, isManager, isAdmin } = useAuth();
  const [selectedODCB, setSelectedODCB] = useState<ODCB | null>(null);
  const [filterStatus, setFilterStatus] = useState<StatusODCB | 'Semua'>('Semua');

  // Filter based on role
  const filteredData = isManager() || isAdmin()
    ? odcbData.filter(odcb => filterStatus === 'Semua' || odcb.status === filterStatus)
    : isLoggedIn()
    ? odcbData.filter(odcb => odcb.pendaftarId === currentUser?.id)
    : [];

  const statusOptions: (StatusODCB | 'Semua')[] = ['Semua', 'Diajukan', 'Diperiksa', 'Direvisi', 'Ditolak', 'Disetujui'];

  if (!isLoggedIn()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-md w-full mx-4 text-center">
          <span className="text-5xl block mb-4">🔒</span>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Login Diperlukan</h2>
          <p className="text-gray-600 mb-6">Silakan login terlebih dahulu untuk melihat pendaftaran ODCB Anda.</p>
          <button
            onClick={() => onNavigate('login')}
            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium"
          >
            Login Sekarang
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              {isManager() || isAdmin() ? 'Kelola Pendaftaran ODCB' : 'Pendaftaran ODCB Saya'}
            </h1>
            <p className="text-gray-600 text-sm mt-1">Objek Diduga Cagar Budaya</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            {(currentUser?.role === 'member' || currentUser?.role === 'public') && (
              <button
                onClick={onOpenForm}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors"
              >
                + Daftarkan ODCB Baru
              </button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {statusOptions.filter(s => s !== 'Semua').map(status => {
            const count = (isManager() || isAdmin() ? odcbData : filteredData).filter(o => o.status === status).length;
            return (
              <div key={status} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <span className="text-xl">{statusODCBIcons[status]}</span>
                <p className="text-2xl font-bold text-gray-800 mt-1">{count}</p>
                <p className="text-xs text-gray-500">{statusODCBLabels[status]}</p>
              </div>
            );
          })}
        </div>

        {/* Filter (for Manager/Admin) */}
        {(isManager() || isAdmin()) && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Filter Status:</p>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map(status => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    filterStatus === status
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status === 'Semua' ? '📋 Semua' : `${statusODCBIcons[status]} ${statusODCBLabels[status]}`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* List */}
        {filteredData.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <span className="text-5xl block mb-4">📋</span>
            <h3 className="text-lg font-bold text-gray-800 mb-2">Belum Ada Pendaftaran</h3>
            <p className="text-gray-600 mb-6">
              {(currentUser?.role === 'member' || currentUser?.role === 'public')
                ? 'Anda belum mendaftarkan ODCB. Klik tombol di atas untuk memulai.'
                : 'Belum ada pendaftaran ODCB yang masuk.'}
            </p>
            {(currentUser?.role === 'member' || currentUser?.role === 'public') && (
              <button
                onClick={onOpenForm}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium"
              >
                Daftarkan ODCB Pertama
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredData.map(odcb => (
              <div
                key={odcb.id}
                onClick={() => setSelectedODCB(odcb)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">🏛️</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-gray-800 truncate">{odcb.namaODCB}</h3>
                        <p className="text-sm text-gray-500">{odcb.jenisODCB} • {odcb.lokasi}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-xs text-gray-400">📅 {odcb.tanggalPengajuan}</span>
                          <span className="text-xs text-gray-400">👤 {odcb.pendaftarNama}</span>
                          <span className="text-xs text-gray-400">📷 {odcb.fotoODCB.length} foto</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${statusODCBColors[odcb.status]}`}>
                      {statusODCBIcons[odcb.status]} {statusODCBLabels[odcb.status]}
                    </span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedODCB && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full my-8">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Detail Pendaftaran ODCB</h2>
                  <button
                    onClick={() => setSelectedODCB(null)}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Status */}
                <div className={`p-4 rounded-lg border ${statusODCBColors[selectedODCB.status]}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm opacity-75">Status Pendaftaran</p>
                      <p className="text-lg font-bold">{statusODCBIcons[selectedODCB.status]} {statusODCBLabels[selectedODCB.status]}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-75">Diajukan</p>
                      <p className="font-medium">{selectedODCB.tanggalPengajuan}</p>
                    </div>
                  </div>
                  {selectedODCB.catatanManager && (
                    <div className="mt-3 pt-3 border-t border-current/20">
                      <p className="text-xs opacity-75 mb-1">Catatan Manager:</p>
                      <p className="text-sm">{selectedODCB.catatanManager}</p>
                      {selectedODCB.reviewedBy && (
                        <p className="text-xs opacity-75 mt-1">oleh: {selectedODCB.reviewedBy}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Data ODCB */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">Informasi ODCB</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-500">Nama:</span> <span className="font-medium">{selectedODCB.namaODCB}</span></div>
                    <div><span className="text-gray-500">Jenis:</span> <span className="font-medium">{selectedODCB.jenisODCB}</span></div>
                    <div><span className="text-gray-500">Lokasi:</span> <span className="font-medium">{selectedODCB.lokasi}</span></div>
                    <div><span className="text-gray-500">Kecamatan:</span> <span className="font-medium">{selectedODCB.kecamatan}</span></div>
                    <div><span className="text-gray-500">Perkiraan Umur:</span> <span className="font-medium">{selectedODCB.perkiraanUmur}</span></div>
                    <div><span className="text-gray-500">Kondisi:</span> <span className="font-medium">{selectedODCB.kondisi}</span></div>
                  </div>
                  <div className="mt-3">
                    <p className="text-gray-500 text-sm mb-1">Deskripsi:</p>
                    <p className="text-sm text-gray-700">{selectedODCB.deskripsi}</p>
                  </div>
                </div>

                {/* Data Pendaftar */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">Data Pendaftar</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div><span className="text-gray-500">Nama:</span> <span className="font-medium">{selectedODCB.pendaftarNama}</span></div>
                    <div><span className="text-gray-500">Email:</span> <span className="font-medium">{selectedODCB.pendaftarEmail}</span></div>
                    <div><span className="text-gray-500">Telepon:</span> <span className="font-medium">{selectedODCB.pendaftarPhone || '-'}</span></div>
                    <div><span className="text-gray-500">Identitas:</span> <span className="font-medium">{selectedODCB.jenisIdentitas} - {selectedODCB.nomorIdentitas}</span></div>
                  </div>
                </div>

                {/* Foto Identitas */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">Foto Identitas ({selectedODCB.jenisIdentitas})</h3>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🪪</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-800">{selectedODCB.fotoIdentitas.namaFile}</p>
                        <p className="text-xs text-gray-500">{selectedODCB.fotoIdentitas.ukuran} • {selectedODCB.fotoIdentitas.tanggalUpload}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Foto ODCB */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">Foto ODCB ({selectedODCB.fotoODCB.length})</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedODCB.fotoODCB.map(foto => (
                      <div key={foto.id} className="border border-gray-200 rounded-lg p-3">
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 h-20 rounded flex items-center justify-center mb-2">
                          <span className="text-2xl">🖼️</span>
                        </div>
                        <p className="text-xs font-medium text-gray-800 truncate">{foto.namaFile}</p>
                        <p className="text-xs text-gray-500">{foto.ukuran}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => setSelectedODCB(null)}
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
