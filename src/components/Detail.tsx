import { CagarBudaya, statusPenetapanColors, statusPenetapanIcons, statusPenetapanLabels, jenisCagarBudayaColors, jenisCagarBudayaIcons } from '../data/cagarBudaya';
import LampiranList from './LampiranList';

interface DetailProps {
  item: CagarBudaya;
  onBack: () => void;
}

export default function Detail({ item, onBack }: DetailProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBack}
            className="flex items-center text-emerald-200 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Daftar
          </button>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{item.nama}</h1>
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="px-3 py-1 bg-white/20 rounded-full text-sm">{item.kategori}</span>
            <span className={`px-3 py-1 rounded-full text-sm border ${statusPenetapanColors[item.statusPenetapan]}`}>
              {statusPenetapanIcons[item.statusPenetapan]} {statusPenetapanLabels[item.statusPenetapan]}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Placeholder */}
            <div className="bg-gradient-to-br from-emerald-400 to-teal-600 rounded-xl h-64 md:h-80 flex items-center justify-center shadow-lg">
              <div className="text-center text-white">
                <span className="text-7xl block mb-4">🏛️</span>
                <p className="text-lg font-medium opacity-80">{item.nama}</p>
              </div>
            </div>

            {/* Status Penetapan Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3 text-amber-600">🏷️</span>
                Status Penetapan
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg border ${statusPenetapanColors[item.statusPenetapan]}`}>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{statusPenetapanIcons[item.statusPenetapan]}</span>
                    <div>
                      <p className="text-xs opacity-75">Status Penetapan</p>
                      <p className="font-bold">{statusPenetapanLabels[item.statusPenetapan]}</p>
                    </div>
                  </div>
                </div>
                <div className={`p-4 rounded-lg border ${jenisCagarBudayaColors[item.jenis]}`}>
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{jenisCagarBudayaIcons[item.jenis]}</span>
                    <div>
                      <p className="text-xs opacity-75">Jenis Cagar Budaya</p>
                      <p className="font-bold">{item.jenis}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 p-4 rounded-lg bg-gray-50 border border-gray-200">
                <p className="text-xs text-gray-500 mb-1">Nomor SK</p>
                <p className="font-medium text-gray-800 font-mono text-sm">{item.nomorSK || 'Belum tersedia'}</p>
                <p className="text-xs text-gray-500 mt-2 mb-1">Tanggal Penetapan</p>
                <p className="font-medium text-gray-800 text-sm">{item.tanggalPenetapan || 'Belum tersedia'}</p>
              </div>
            </div>

            {/* Deskripsi */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 text-emerald-600">📖</span>
                Deskripsi
              </h2>
              <p className="text-gray-600 leading-relaxed">{item.deskripsi}</p>
            </div>

            {/* Sejarah */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3 text-amber-600">📜</span>
                Sejarah
              </h2>
              <p className="text-gray-600 leading-relaxed">{item.sejarah}</p>
            </div>

            {/* Arsitektur */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 text-blue-600">🏗️</span>
                Arsitektur
              </h2>
              <p className="text-gray-600 leading-relaxed">{item.arsitektur}</p>
            </div>

            {/* Lampiran */}
            <LampiranList lampiran={item.lampiran} />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Info Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Informasi Umum</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-emerald-500 mr-3 mt-0.5">📍</span>
                  <div>
                    <p className="text-sm text-gray-500">Lokasi</p>
                    <p className="text-gray-700 font-medium">{item.lokasi}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-emerald-500 mr-3 mt-0.5">🏘️</span>
                  <div>
                    <p className="text-sm text-gray-500">Kecamatan</p>
                    <p className="text-gray-700 font-medium">{item.kecamatan}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-emerald-500 mr-3 mt-0.5">📅</span>
                  <div>
                    <p className="text-sm text-gray-500">Tahun Berdiri</p>
                    <p className="text-gray-700 font-medium">{item.tahunBerdiri}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-emerald-500 mr-3 mt-0.5">🏷️</span>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="text-gray-700 font-medium">{item.status}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-emerald-500 mr-3 mt-0.5">🗂️</span>
                  <div>
                    <p className="text-sm text-gray-500">Kategori</p>
                    <p className="text-gray-700 font-medium">{item.kategori}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Penetapan Summary */}
            <div className={`rounded-xl p-6 shadow-sm border ${statusPenetapanColors[item.statusPenetapan]}`}>
              <h3 className="text-lg font-bold mb-3 flex items-center">
                {statusPenetapanIcons[item.statusPenetapan]} Status Penetapan
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Tingkat</span>
                  <span className="font-bold text-sm">{statusPenetapanLabels[item.statusPenetapan]}</span>
                </div>
                {item.nomorSK && (
                  <div className="flex justify-between">
                    <span className="text-sm">No. SK</span>
                    <span className="font-bold text-sm font-mono">{item.nomorSK}</span>
                  </div>
                )}
                {item.tanggalPenetapan && (
                  <div className="flex justify-between">
                    <span className="text-sm">Tanggal</span>
                    <span className="font-bold text-sm">{item.tanggalPenetapan}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Lampiran Summary */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center">
                <span className="mr-2">📎</span> Lampiran
              </h3>
              <div className="text-center py-4">
                <span className="text-3xl block mb-2">📁</span>
                <p className="text-2xl font-bold text-emerald-600">{item.lampiran.length}</p>
                <p className="text-sm text-gray-500">Dokumen Terlampir</p>
              </div>
              {item.lampiran.length > 0 && (
                <div className="mt-3 space-y-1">
                  {item.lampiran.slice(0, 3).map(file => (
                    <div key={file.id} className="flex items-center text-xs text-gray-600 p-2 bg-gray-50 rounded">
                      <span className="mr-2">📄</span>
                      <span className="truncate">{file.namaFile}</span>
                    </div>
                  ))}
                  {item.lampiran.length > 3 && (
                    <p className="text-xs text-gray-400 text-center mt-2">
                      +{item.lampiran.length - 3} file lainnya
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Fasilitas */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Fasilitas</h3>
              <div className="flex flex-wrap gap-2">
                {item.fasilitas.map((fasilitas, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm border border-emerald-200"
                  >
                    ✓ {fasilitas}
                  </span>
                ))}
              </div>
            </div>

            {/* Koordinat */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Koordinat GPS</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500 mb-1">Latitude</p>
                <p className="text-gray-700 font-mono font-medium">{item.koordinat.lat}° S</p>
                <p className="text-sm text-gray-500 mb-1 mt-2">Longitude</p>
                <p className="text-gray-700 font-mono font-medium">{item.koordinat.lng}° E</p>
              </div>
              <a
                href={`https://www.google.com/maps?q=${item.koordinat.lat},${item.koordinat.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full block text-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
              >
                🗺️ Buka di Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
