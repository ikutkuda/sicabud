import { useState } from 'react';
import { cagarBudayaData, statusPenetapanColors, statusPenetapanIcons, statusPenetapanLabels, StatusPenetapan } from '../data/cagarBudaya';
import { useAuth } from '../context/AuthContext';

interface KelolaPenetapanProps {
  onNavigate: (page: string) => void;
}

export default function KelolaPenetapan({ onNavigate }: KelolaPenetapanProps) {
  const { isAdmin } = useAuth();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAdmin()) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-5xl block mb-4">🔒</span>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Akses Ditolak</h2>
          <p className="text-gray-600 mb-4">Hanya Administrator yang dapat mengelola status penetapan.</p>
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

  const handleSave = (id: number) => {
    setSuccessMsg('Status penetapan berhasil diperbarui!');
    setEditingId(null);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Kelola Status Penetapan</h1>
            <p className="text-gray-600 text-sm">Atur tingkat penetapan cagar budaya: Kota/Kabupaten, Provinsi, atau Nasional</p>
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

        {/* Info */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-6 border border-amber-200 mb-6">
          <h3 className="font-bold text-gray-800 mb-2 flex items-center">
            <span className="mr-2">ℹ️</span> Tentang Status Penetapan
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Status penetapan menunjukkan tingkat pengesahan cagar budaya berdasarkan UU No. 11 Tahun 2010:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-white p-3 rounded-lg border border-amber-100">
              <p className="font-bold text-sm text-gray-800">🏙️ Kota/Kabupaten</p>
              <p className="text-xs text-gray-500 mt-1">Ditetapkan oleh Walikota/Bupati melalui SK Daerah</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-100">
              <p className="font-bold text-sm text-gray-800">🏔️ Provinsi</p>
              <p className="text-xs text-gray-500 mt-1">Ditetapkan oleh Gubernur melalui SK Provinsi</p>
            </div>
            <div className="bg-white p-3 rounded-lg border border-amber-100">
              <p className="font-bold text-sm text-gray-800">🇮🇩 Nasional</p>
              <p className="text-xs text-gray-500 mt-1">Ditetapkan oleh Menteri melalui SK Nasional</p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Cagar Budaya</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Kategori</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Status Penetapan</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase hidden md:table-cell">No. SK</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase hidden lg:table-cell">Tgl Penetapan</th>
                  <th className="px-4 py-3 text-right text-xs font-bold text-gray-600 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cagarBudayaData.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800 text-sm">{item.nama}</p>
                      <p className="text-xs text-gray-500">{item.kecamatan}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">{item.kategori}</span>
                    </td>
                    <td className="px-4 py-3">
                      {editingId === item.id ? (
                        <select
                          defaultValue={item.statusPenetapan}
                          className="text-xs px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="Belum Ditetapkan">⏳ Belum Ditetapkan</option>
                          <option value="Kota/Kabupaten">🏙️ Kota/Kabupaten</option>
                          <option value="Provinsi">🏔️ Provinsi</option>
                          <option value="Nasional">🇮🇩 Nasional</option>
                        </select>
                      ) : (
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusPenetapanColors[item.statusPenetapan]}`}>
                          {statusPenetapanIcons[item.statusPenetapan]} {statusPenetapanLabels[item.statusPenetapan]}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {editingId === item.id ? (
                        <input
                          type="text"
                          defaultValue={item.nomorSK || ''}
                          placeholder="Nomor SK"
                          className="text-xs px-2 py-1.5 border rounded-lg w-full focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <span className="text-xs font-mono text-gray-600">{item.nomorSK || '-'}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {editingId === item.id ? (
                        <input
                          type="date"
                          defaultValue={item.tanggalPenetapan ? '2024-01-15' : ''}
                          className="text-xs px-2 py-1.5 border rounded-lg focus:ring-2 focus:ring-emerald-500"
                        />
                      ) : (
                        <span className="text-xs text-gray-600">{item.tanggalPenetapan || '-'}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {editingId === item.id ? (
                        <div className="flex items-center justify-end space-x-1">
                          <button
                            onClick={() => handleSave(item.id)}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Simpan"
                          >
                            💾
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="p-1.5 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            title="Batal"
                          >
                            ✖️
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setEditingId(item.id)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          ✏️
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <span className="text-2xl">🇮🇩</span>
            <p className="text-xl font-bold text-amber-600 mt-1">
              {cagarBudayaData.filter(c => c.statusPenetapan === 'Nasional').length}
            </p>
            <p className="text-xs text-gray-500">Nasional</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <span className="text-2xl">🏔️</span>
            <p className="text-xl font-bold text-purple-600 mt-1">
              {cagarBudayaData.filter(c => c.statusPenetapan === 'Provinsi').length}
            </p>
            <p className="text-xs text-gray-500">Provinsi</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <span className="text-2xl">🏙️</span>
            <p className="text-xl font-bold text-blue-600 mt-1">
              {cagarBudayaData.filter(c => c.statusPenetapan === 'Kota/Kabupaten').length}
            </p>
            <p className="text-xs text-gray-500">Kota/Kab</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <span className="text-2xl">⏳</span>
            <p className="text-xl font-bold text-gray-600 mt-1">
              {cagarBudayaData.filter(c => c.statusPenetapan === 'Belum Ditetapkan').length}
            </p>
            <p className="text-xs text-gray-500">Belum Ditetapkan</p>
          </div>
        </div>
      </div>
    </div>
  );
}
