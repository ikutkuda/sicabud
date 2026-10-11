import { useState } from 'react';
import { cagarBudayaData, kategoriList, statusPenetapanLabels, statusPenetapanIcons, statusPenetapanColors, CagarBudaya, StatusPenetapan } from '../data/cagarBudaya';
import Card from './Card';

interface DaftarProps {
  onSelectItem: (item: CagarBudaya) => void;
}

export default function Daftar({ onSelectItem }: DaftarProps) {
  const [selectedKategori, setSelectedKategori] = useState('Semua');
  const [selectedPenetapan, setSelectedPenetapan] = useState<StatusPenetapan | 'Semua'>('Semua');
  const [searchQuery, setSearchQuery] = useState('');

  const penetapanOptions: (StatusPenetapan | 'Semua')[] = ['Semua', 'Nasional', 'Provinsi', 'Kota/Kabupaten', 'Belum Ditetapkan'];

  const filteredData = cagarBudayaData.filter((item) => {
    const matchKategori = selectedKategori === 'Semua' || item.kategori === selectedKategori;
    const matchPenetapan = selectedPenetapan === 'Semua' || item.statusPenetapan === selectedPenetapan;
    const matchSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kecamatan.toLowerCase().includes(searchQuery.toLowerCase());
    return matchKategori && matchPenetapan && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Daftar Cagar Budaya
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan berbagai cagar budaya yang terdaftar di Kota Tasikmalaya. 
            Gunakan filter dan pencarian untuk menemukan cagar budaya yang Anda cari.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-8">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Cari cagar budaya berdasarkan nama, deskripsi, atau kecamatan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>

            {/* Status Penetapan Filter */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Filter Status Penetapan:</p>
              <div className="flex flex-wrap gap-2">
                {penetapanOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedPenetapan(opt)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                      selectedPenetapan === opt
                        ? opt === 'Nasional' ? 'bg-amber-100 text-amber-700 border-amber-300'
                        : opt === 'Provinsi' ? 'bg-purple-100 text-purple-700 border-purple-300'
                        : opt === 'Kota/Kabupaten' ? 'bg-blue-100 text-blue-700 border-blue-300'
                        : opt === 'Belum Ditetapkan' ? 'bg-gray-100 text-gray-700 border-gray-300'
                        : 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {opt === 'Semua' ? '📋 Semua Tingkat' : `${statusPenetapanIcons[opt as StatusPenetapan]} ${statusPenetapanLabels[opt as StatusPenetapan]}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Filter Kategori:</p>
              <div className="flex flex-wrap gap-2">
                {kategoriList.map((kategori) => (
                  <button
                    key={kategori}
                    onClick={() => setSelectedKategori(kategori)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedKategori === kategori
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {kategori}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500 flex items-center justify-between">
            <span>
              Menampilkan <span className="font-bold text-emerald-600">{filteredData.length}</span> dari{' '}
              <span className="font-bold">{cagarBudayaData.length}</span> cagar budaya
            </span>
            {(selectedKategori !== 'Semua' || selectedPenetapan !== 'Semua' || searchQuery) && (
              <button
                onClick={() => { setSelectedKategori('Semua'); setSelectedPenetapan('Semua'); setSearchQuery(''); }}
                className="text-emerald-600 hover:text-emerald-700 font-medium text-xs"
              >
                ✕ Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Grid */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.map((item) => (
              <Card key={item.id} item={item} onSelect={onSelectItem} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <span className="text-5xl block mb-4">🔍</span>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Tidak Ditemukan</h3>
            <p className="text-gray-500">
              Tidak ada cagar budaya yang sesuai dengan pencarian Anda. 
              Coba ubah kata kunci atau filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
