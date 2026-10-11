import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { odcbData, statusODCBColors, statusODCBIcons, statusODCBLabels, ODCB, StatusODCB } from '../data/odcb';

interface KelolaODCBProps {
  onNavigate: (page: string) => void;
}

export default function KelolaODCB({ onNavigate }: KelolaODCBProps) {
  const { currentUser, isManager, isAdmin } = useAuth();
  const [selectedODCB, setSelectedODCB] = useState<ODCB | null>(null);
  const [filterStatus, setFilterStatus] = useState<StatusODCB | 'Semua'>('Semua');
  const [reviewNote, setReviewNote] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isManager() && !isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl block mb-4">🔒</span>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Akses Ditolak</h2>
          <p className="text-gray-600 mb-4">Hanya Manager dan Administrator yang dapat mengakses halaman ini.</p>
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

  const filteredData = odcbData.filter(odcb => 
    filterStatus === 'Semua' || odcb.status === filterStatus
  );

  const statusOptions: (StatusODCB | 'Semua')[] = ['Semua', 'Diajukan', 'Diperiksa', 'Direvisi', 'Ditolak', 'Disetujui'];

  const handleUpdateStatus = (newStatus: StatusODCB) => {
    if (!selectedODCB) return;
    
    setSuccessMsg(`Status ODCB "${selectedODCB.namaODCB}" berhasil diubah menjadi "${statusODCBLabels[newStatus]}"`);
    setSelectedODCB(null);
    setReviewNote('');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Kelola ODCB</h1>
            <p className="text-gray-600 text-sm">Review dan kelola pendaftaran Objek Diduga Cagar Budaya</p>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors"
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
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {statusOptions.filter(s => s !== 'Semua').map(status => {
            const count = odcbData.filter(o => o.status === status).length;
            return (
              <div key={status} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
                <span className="text-xl">{statusODCBIcons[status]}</span>
                <p className="text-2xl font-bold text-gray-800 mt-1">{count}</p>
                <p className="text-xs text-gray-500">{statusODCBLabels[status]}</p>
              </div>
            );
          })}
        </div>

        {/* Filter */}
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

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">ODCB</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Pendaftar</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Tanggal</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map(odcb => (
                  <tr key={odcb.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800 text-sm">{odcb.namaODCB}</p>
                      <p className="text-xs text-gray-500">{odcb.jenisODCB} • {odcb.kecamatan}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-800">{odcb.pendaftarNama}</p>
                      <p className="text-xs text-gray-500">{odcb.pendaftarEmail}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-800">{odcb.tanggalPengajuan}</p>
                      <p className="text-xs text-gray-500">📷 {odcb.fotoODCB.length} foto</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusODCBColors[odcb.status]}`}>
                        {statusODCBIcons[odcb.status]} {statusODCBLabels[odcb.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => { setSelectedODCB(odcb); setReviewNote(odcb.catatanManager || ''); }}
                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium transition-colors"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Review Modal */}
        {selectedODCB && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full my-8">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Review Pendaftaran ODCB</h2>
                  <button
                    onClick={() => { setSelectedODCB(null); setReviewNote(''); }}
                    className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* Current Status */}
                <div className={`p-4 rounded-lg border ${statusODCBColors[selectedODCB.status]}`}>
                  <p className="text-sm opacity-75">Status Saat Ini</p>
                  <p className="text-lg font-bold">{statusODCBIcons[selectedODCB.status]} {statusODCBLabels[selectedODCB.status]}</p>
                </div>

                {/* Data ODCB */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">Informasi ODCB</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div><span className="text-gray-500">Nama:</span> <span className="font-medium">{selectedODCB.namaODCB}</span></div>
                      <div><span className="text-gray-500">Jenis:</span> <span className="font-medium">{selectedODCB.jenisODCB}</span></div>
                      <div><span className="text-gray-500">Lokasi:</span> <span className="font-medium">{selectedODCB.lokasi}</span></div>
                      <div><span className="text-gray-500">Kecamatan:</span> <span className="font-medium">{selectedODCB.kecamatan}</span></div>
                      <div><span className="text-gray-500">Umur:</span> <span className="font-medium">{selectedODCB.perkiraanUmur}</span></div>
                      <div><span className="text-gray-500">Kondisi:</span> <span className="font-medium">{selectedODCB.kondisi}</span></div>
                    </div>
                    <div className="mt-3">
                      <p className="text-gray-500 text-sm mb-1">Deskripsi:</p>
                      <p className="text-sm text-gray-700">{selectedODCB.deskripsi}</p>
                    </div>
                  </div>
                </div>

                {/* Data Pendaftar */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">Data Pendaftar</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                      <div><span className="text-gray-500">Nama:</span> <span className="font-medium">{selectedODCB.pendaftarNama}</span></div>
                      <div><span className="text-gray-500">Email:</span> <span className="font-medium">{selectedODCB.pendaftarEmail}</span></div>
                      <div><span className="text-gray-500">Telepon:</span> <span className="font-medium">{selectedODCB.pendaftarPhone || '-'}</span></div>
                      <div><span className="text-gray-500">Identitas:</span> <span className="font-medium">{selectedODCB.jenisIdentitas} - {selectedODCB.nomorIdentitas}</span></div>
                    </div>
                  </div>
                </div>

                {/* Foto Identitas */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">Foto Identitas</h3>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center">
                        <span className="text-2xl">🪪</span>
                      </div>
                      <div>
                        <p className="font-medium text-sm text-gray-800">{selectedODCB.fotoIdentitas.namaFile}</p>
                        <p className="text-xs text-gray-500">{selectedODCB.fotoIdentitas.ukuran}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Foto ODCB */}
                <div>
                  <h3 className="font-bold text-gray-800 mb-3">Foto ODCB ({selectedODCB.fotoODCB.length})</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {selectedODCB.fotoODCB.map(foto => (
                      <div key={foto.id} className="border border-gray-200 rounded-lg p-2">
                        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 h-16 rounded flex items-center justify-center mb-1">
                          <span className="text-xl">🖼️</span>
                        </div>
                        <p className="text-xs font-medium text-gray-800 truncate">{foto.namaFile}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Review Actions */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-bold text-gray-800 mb-3">Tindakan Review</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Catatan untuk Pendaftar</label>
                    <textarea
                      value={reviewNote}
                      onChange={(e) => setReviewNote(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
                      placeholder="Tulis catatan atau alasan untuk pendaftar..."
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <button
                      onClick={() => handleUpdateStatus('Diperiksa')}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium text-sm transition-colors"
                    >
                      🔍 Diperiksa
                    </button>
                    <button
                      onClick={() => handleUpdateStatus('Direvisi')}
                      className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium text-sm transition-colors"
                    >
                      ✏️ Perlu Revisi
                    </button>
                    <button
                      onClick={() => handleUpdateStatus('Ditolak')}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium text-sm transition-colors"
                    >
                      ❌ Tolak
                    </button>
                    <button
                      onClick={() => handleUpdateStatus('Disetujui')}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium text-sm transition-colors"
                    >
                      ✅ Setujui
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-gray-200 flex justify-end">
                <button
                  onClick={() => { setSelectedODCB(null); setReviewNote(''); }}
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
