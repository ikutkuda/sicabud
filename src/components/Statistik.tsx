import { cagarBudayaData, statusPenetapanIcons, statusPenetapanLabels, jenisCagarBudayaIcons, StatusPenetapan, JenisCagarBudaya } from '../data/cagarBudaya';

export default function Statistik() {
  // Hitung statistik
  const totalCagar = cagarBudayaData.length;
  const nasional = cagarBudayaData.filter(c => c.statusPenetapan === 'Nasional').length;
  const provinsi = cagarBudayaData.filter(c => c.statusPenetapan === 'Provinsi').length;
  const kota = cagarBudayaData.filter(c => c.statusPenetapan === 'Kota/Kabupaten').length;
  const belum = cagarBudayaData.filter(c => c.statusPenetapan === 'Belum Ditetapkan').length;

  // Hitung per kategori
  const kategoriCount: Record<string, number> = {};
  cagarBudayaData.forEach(item => {
    kategoriCount[item.kategori] = (kategoriCount[item.kategori] || 0) + 1;
  });

  // Hitung per kecamatan
  const kecamatanCount: Record<string, number> = {};
  cagarBudayaData.forEach(item => {
    kecamatanCount[item.kecamatan] = (kecamatanCount[item.kecamatan] || 0) + 1;
  });

  // Hitung total lampiran
  const totalLampiran = cagarBudayaData.reduce((sum, item) => sum + item.lampiran.length, 0);

  const kategoriEntries = Object.entries(kategoriCount).sort((a, b) => b[1] - a[1]);
  const kecamatanEntries = Object.entries(kecamatanCount).sort((a, b) => b[1] - a[1]);
  const maxKategori = Math.max(...Object.values(kategoriCount));
  const maxKecamatan = Math.max(...Object.values(kecamatanCount));

  const categoryColors: Record<string, string> = {
    'Bangunan Keagamaan': 'bg-blue-500',
    'Bangunan Publik': 'bg-purple-500',
    'Bangunan Pemerintahan': 'bg-red-500',
    'Bangunan Transportasi': 'bg-orange-500',
    'Bangunan Tradisional': 'bg-amber-500',
    'Situs Arkeologi': 'bg-emerald-500',
    'Museum': 'bg-teal-500',
  };

  const categoryIcons: Record<string, string> = {
    'Bangunan Keagamaan': '🕌',
    'Bangunan Publik': '🏢',
    'Bangunan Pemerintahan': '🏛️',
    'Bangunan Transportasi': '🚂',
    'Bangunan Tradisional': '🏠',
    'Situs Arkeologi': '🗿',
    'Museum': '🏛️',
  };

  const statusPenetapanColors: Record<StatusPenetapan, string> = {
    'Belum Ditetapkan': 'bg-gray-400',
    'Kota/Kabupaten': 'bg-blue-500',
    'Provinsi': 'bg-purple-500',
    'Nasional': 'bg-amber-500',
  };

  // Timeline data
  const timelineData = [...cagarBudayaData]
    .sort((a, b) => {
      const getYear = (t: string) => {
        const match = t.match(/\d{4}/);
        return match ? parseInt(match[0]) : 0;
      };
      return getYear(a.tahunBerdiri) - getYear(b.tahunBerdiri);
    });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            📊 Statistik Cagar Budaya
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Data dan statistik cagar budaya yang terdaftar di Kota Tasikmalaya
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl mb-2">🏛️</div>
            <div className="text-3xl font-bold text-emerald-600">{totalCagar}</div>
            <div className="text-sm text-gray-500 mt-1">Total Cagar Budaya</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl mb-2">🇮🇩</div>
            <div className="text-3xl font-bold text-amber-500">{nasional}</div>
            <div className="text-sm text-gray-500 mt-1">Tingkat Nasional</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl mb-2">🏔️</div>
            <div className="text-3xl font-bold text-purple-500">{provinsi}</div>
            <div className="text-sm text-gray-500 mt-1">Tingkat Provinsi</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl mb-2">🏙️</div>
            <div className="text-3xl font-bold text-blue-500">{kota}</div>
            <div className="text-sm text-gray-500 mt-1">Tingkat Kota/Kab</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl mb-2">📎</div>
            <div className="text-3xl font-bold text-teal-500">{totalLampiran}</div>
            <div className="text-sm text-gray-500 mt-1">Total Lampiran</div>
          </div>
        </div>

        {/* Status Penetapan Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3 text-amber-600">🏷️</span>
            Distribusi Status Penetapan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Donut Chart */}
            <div className="flex items-center justify-center">
              <div className="relative w-56 h-56">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="12" />
                  {/* Nasional */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="12"
                    strokeDasharray={`${(nasional / totalCagar) * 251.2} 251.2`}
                    strokeDashoffset="0"
                    transform="rotate(-90 50 50)"
                    className="transition-all duration-1000"
                  />
                  {/* Provinsi */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="12"
                    strokeDasharray={`${(provinsi / totalCagar) * 251.2} 251.2`}
                    strokeDashoffset={`-${(nasional / totalCagar) * 251.2}`}
                    transform="rotate(-90 50 50)"
                    className="transition-all duration-1000"
                  />
                  {/* Kota */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="12"
                    strokeDasharray={`${(kota / totalCagar) * 251.2} 251.2`}
                    strokeDashoffset={`-${((nasional + provinsi) / totalCagar) * 251.2}`}
                    transform="rotate(-90 50 50)"
                    className="transition-all duration-1000"
                  />
                  {/* Belum */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="#9ca3af"
                    strokeWidth="12"
                    strokeDasharray={`${(belum / totalCagar) * 251.2} 251.2`}
                    strokeDashoffset={`-${((nasional + provinsi + kota) / totalCagar) * 251.2}`}
                    transform="rotate(-90 50 50)"
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800">{totalCagar}</div>
                    <div className="text-xs text-gray-500">Total</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-4">
              {[
                { label: 'Tingkat Nasional', count: nasional, color: 'bg-amber-400', icon: '🇮🇩' },
                { label: 'Tingkat Provinsi', count: provinsi, color: 'bg-purple-500', icon: '🏔️' },
                { label: 'Tingkat Kota/Kabupaten', count: kota, color: 'bg-blue-500', icon: '🏙️' },
                { label: 'Belum Ditetapkan', count: belum, color: 'bg-gray-400', icon: '⏳' },
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-4 h-4 ${item.color} rounded-full mr-3`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 flex items-center">
                      <span className="mr-2">{item.icon}</span>
                      {item.label}
                    </p>
                    <p className="text-sm text-gray-500">
                      {item.count} situs ({((item.count / totalCagar) * 100).toFixed(0)}%)
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-800">{item.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Jenis Cagar Budaya Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 text-blue-600">📊</span>
            Distribusi Jenis Cagar Budaya
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {(['Benda', 'Bangunan', 'Struktur', 'Situs', 'Kawasan'] as JenisCagarBudaya[]).map((jenis) => {
              const count = cagarBudayaData.filter(c => c.jenis === jenis).length;
              return (
                <div key={jenis} className="text-center p-4 bg-gray-50 rounded-lg">
                  <span className="text-3xl block mb-2">{jenisCagarBudayaIcons[jenis]}</span>
                  <p className="text-2xl font-bold text-gray-800">{count}</p>
                  <p className="text-sm text-gray-500">{jenis}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {((count / totalCagar) * 100).toFixed(0)}%
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Chart: Per Kategori */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 text-emerald-600">📂</span>
              Berdasarkan Kategori
            </h2>
            <div className="space-y-4">
              {kategoriEntries.map(([kategori, count]) => (
                <div key={kategori}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700 flex items-center">
                      <span className="mr-2">{categoryIcons[kategori]}</span>
                      {kategori}
                    </span>
                    <span className="text-sm font-bold text-gray-800">{count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${categoryColors[kategori] || 'bg-gray-400'} transition-all duration-1000`}
                      style={{ width: `${(count / maxKategori) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart: Per Kecamatan */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 text-blue-600">📍</span>
              Berdasarkan Kecamatan
            </h2>
            <div className="space-y-4">
              {kecamatanEntries.map(([kecamatan, count]) => (
                <div key={kecamatan}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{kecamatan}</span>
                    <span className="text-sm font-bold text-gray-800">{count}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-1000"
                      style={{ width: `${(count / maxKecamatan) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Lampiran Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-10">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center mr-3 text-teal-600">📎</span>
            Statistik Lampiran Dokumen
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {cagarBudayaData
              .sort((a, b) => b.lampiran.length - a.lampiran.length)
              .slice(0, 8)
              .map(cagar => (
                <div key={cagar.id} className="p-4 bg-gray-50 rounded-lg text-center">
                  <p className="text-2xl font-bold text-teal-600">{cagar.lampiran.length}</p>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{cagar.nama}</p>
                </div>
              ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 text-purple-600">📅</span>
            Timeline Cagar Budaya
          </h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-emerald-200 transform md:-translate-x-1/2"></div>

            {timelineData.map((item, index) => (
              <div
                key={item.id}
                className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-emerald-100 transform -translate-x-1/2 z-10"></div>

                <div className={`ml-12 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-emerald-300 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                        {item.tahunBerdiri}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                        {statusPenetapanIcons[item.statusPenetapan]} {item.statusPenetapan}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-800">{item.nama}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.kategori} • {item.kecamatan}</p>
                    <p className="text-xs text-gray-400 mt-1">📎 {item.lampiran.length} lampiran</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
