import { useState } from 'react';
import { cagarBudayaData } from '../data/cagarBudaya';

const categoryIcons: Record<string, string> = {
  'Bangunan Keagamaan': '🕌',
  'Bangunan Publik': '🏢',
  'Bangunan Pemerintahan': '🏛️',
  'Bangunan Transportasi': '🚂',
  'Bangunan Tradisional': '🏠',
  'Situs Arkeologi': '🗿',
  'Museum': '🏛️',
};

const gradientColors = [
  'from-emerald-400 to-teal-600',
  'from-blue-400 to-indigo-600',
  'from-amber-400 to-orange-600',
  'from-purple-400 to-pink-600',
  'from-rose-400 to-red-600',
  'from-cyan-400 to-blue-600',
  'from-lime-400 to-green-600',
  'from-fuchsia-400 to-purple-600',
  'from-yellow-400 to-amber-600',
  'from-teal-400 to-emerald-600',
];

export default function Galeri() {
  const [selectedFilter, setSelectedFilter] = useState('Semua');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filters = ['Semua', 'Bangunan Keagamaan', 'Situs Arkeologi', 'Bangunan Tradisional', 'Bangunan Publik'];

  const filteredData = selectedFilter === 'Semua'
    ? cagarBudayaData
    : cagarBudayaData.filter(item => item.kategori === selectedFilter);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            📸 Galeri Cagar Budaya
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Koleksi visual cagar budaya Kota Tasikmalaya. Setiap gambar merepresentasikan 
            keindahan dan kekayaan warisan budaya daerah.
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedFilter === filter
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Masonry-like */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredData.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightbox(index)}
              className="break-inside-avoid cursor-pointer group"
            >
              <div className={`bg-gradient-to-br ${gradientColors[index % gradientColors.length]} rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}>
                <div className={`${index % 3 === 0 ? 'h-72' : index % 3 === 1 ? 'h-56' : 'h-64'} flex items-center justify-center relative`}>
                  <span className="text-7xl opacity-70 group-hover:scale-110 transition-transform duration-300">
                    {categoryIcons[item.kategori]}
                  </span>
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-end">
                    <div className="p-4 w-full transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="text-white font-bold text-sm">{item.nama}</h3>
                      <p className="text-white/80 text-xs mt-1">{item.kategori}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {lightbox !== null && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className={`h-64 bg-gradient-to-br ${gradientColors[lightbox % gradientColors.length]} flex items-center justify-center relative`}>
                <span className="text-8xl">
                  {categoryIcons[filteredData[lightbox].kategori]}
                </span>
                <button
                  onClick={() => setLightbox(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{filteredData[lightbox].nama}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-medium">
                    {filteredData[lightbox].kategori}
                  </span>
                  <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                    {filteredData[lightbox].tahunBerdiri}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{filteredData[lightbox].deskripsi}</p>
                <p className="text-gray-400 text-xs mt-3">📍 {filteredData[lightbox].lokasi}</p>
              </div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="mt-10 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
          <div className="flex items-start">
            <span className="text-2xl mr-4">📷</span>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Tentang Galeri</h3>
              <p className="text-sm text-gray-600">
                Galeri ini menampilkan representasi visual dari cagar budaya yang terdaftar di Kota Tasikmalaya. 
                Untuk dokumentasi foto asli, silakan kunjungi langsung lokasi atau hubungi Dinas Kebudayaan Kota Tasikmalaya.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
