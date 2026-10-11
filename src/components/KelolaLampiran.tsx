import { useState } from 'react';
import { cagarBudayaData, tipeFileIcons, tipeFileLabels, StatusPenetapan } from '../data/cagarBudaya';
import { useAuth } from '../context/AuthContext';

interface KelolaLampiranProps {
  onNavigate: (page: string) => void;
}

export default function KelolaLampiran({ onNavigate }: KelolaLampiranProps) {
  const { isAdmin, isManager } = useAuth();
  const [selectedCagar, setSelectedCagar] = useState<number | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    namaFile: '',
    tipe: 'pdf' as 'pdf' | 'doc' | 'jpg' | 'png' | 'sk' | 'foto' | 'peta' | 'sertifikat',
    deskripsi: '',
  });
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAdmin() && !isManager()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl block mb-4">🔒</span>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Akses Ditolak</h2>
          <p className="text-gray-600 mb-4">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
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

  const selectedData = selectedCagar ? cagarBudayaData.find(c => c.id === selectedCagar) : null;

  const handleUpload = () => {
    if (!uploadForm.namaFile || !uploadForm.deskripsi) {
      alert('Mohon lengkapi semua field!');
      return;
    }
    setSuccessMsg(`File "${uploadForm.namaFile}" berhasil diunggah!`);
    setShowUploadModal(false);
    setUploadForm({ namaFile: '', tipe: 'pdf', deskripsi: '' });
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Kelola Lampiran</h1>
            <p className="text-gray-600 text-sm">Upload dan kelola dokumen lampiran cagar budaya</p>
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

        {/* Select Cagar Budaya */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Pilih Cagar Budaya</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {cagarBudayaData.map(cagar => (
              <button
                key={cagar.id}
                onClick={() => setSelectedCagar(cagar.id)}
                className={`p-4 rounded-lg border text-left transition-all ${
                  selectedCagar === cagar.id
                    ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                    : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                }`}
              >
                <p className="font-medium text-gray-800 text-sm">{cagar.nama}</p>
                <p className="text-xs text-gray-500 mt-1">{cagar.kategori}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">📎 {cagar.lampiran.length} file</span>
                  <span className="text-xs text-emerald-600 font-medium">
                    {selectedCagar === cagar.id ? '✓ Dipilih' : 'Pilih'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Lampiran List */}
        {selectedData && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-800">
                Lampiran: {selectedData.nama}
              </h2>
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center"
              >
                <span className="mr-2">📤</span> Upload File Baru
              </button>
            </div>

            {selectedData.lampiran.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <span className="text-5xl block mb-4">📂</span>
                <p className="font-medium">Belum ada lampiran</p>
                <p className="text-sm">Klik tombol "Upload File Baru" untuk menambahkan dokumen</p>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedData.lampiran.map(file => (
                  <div key={file.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:border-emerald-300 transition-all">
                    <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-2xl">{tipeFileIcons[file.tipe]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 text-sm">{file.namaFile}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{file.deskripsi}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="px-2 py-0.5 bg-gray-100 rounded text-xs font-medium text-gray-600">
                          {tipeFileLabels[file.tipe]}
                        </span>
                        <span className="text-xs text-gray-400">📦 {file.ukuran}</span>
                        <span className="text-xs text-gray-400">📅 {file.tanggalUpload}</span>
                        <span className="text-xs text-gray-400">👤 {file.uploader}</span>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center space-x-2 flex-shrink-0">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Download">
                        📥
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Hapus">
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">📤</span> Upload Lampiran Baru
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama File</label>
                  <input
                    type="text"
                    value={uploadForm.namaFile}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, namaFile: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="Contoh: SK_Penetapan.pdf"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipe Dokumen</label>
                  <select
                    value={uploadForm.tipe}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, tipe: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  >
                    <option value="pdf">📄 Dokumen PDF</option>
                    <option value="doc">📝 Dokumen Word</option>
                    <option value="sk">📜 Surat Keputusan</option>
                    <option value="sertifikat">🏅 Sertifikat</option>
                    <option value="foto">📷 Foto Dokumentasi</option>
                    <option value="peta">🗺️ Peta Lokasi</option>
                    <option value="jpg">🖼️ Foto JPEG</option>
                    <option value="png">🖼️ Foto PNG</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea
                    value={uploadForm.deskripsi}
                    onChange={(e) => setUploadForm(prev => ({ ...prev, deskripsi: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
                    placeholder="Deskripsi singkat tentang file ini"
                  />
                </div>
                <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                  <span className="text-3xl block mb-2">📁</span>
                  <p className="text-sm text-gray-600 mb-1">Drag & drop file atau</p>
                  <button className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100">
                    Pilih File
                  </button>
                  <p className="text-xs text-gray-400 mt-2">Max. 10MB per file</p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  onClick={handleUpload}
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium"
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
