import { cagarBudayaData } from '../data/cagarBudaya';

export default function Statistik() {
  // Hitung statistik
  const totalCagar = cagarBudayaData.length;
  const nasional = cagarBudayaData.filter(c => c.status === 'Cagar Budaya Nasional').length;
  const daerah = cagarBudayaData.filter(c => c.status === 'Cagar Budaya Daerah').length;

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl mb-2">🏛️</div>
            <div className="text-3xl font-bold text-emerald-600">{totalCagar}</div>
            <div className="text-sm text-gray-500 mt-1">Total Cagar Budaya</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl mb-2">⭐</div>
            <div className="text-3xl font-bold text-amber-500">{nasional}</div>
            <div className="text-sm text-gray-500 mt-1">Cagar Budaya Nasional</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl mb-2">📋</div>
            <div className="text-3xl font-bold text-blue-500">{daerah}</div>
            <div className="text-sm text-gray-500 mt-1">Cagar Budaya Daerah</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
            <div className="text-3xl mb-2">📍</div>
            <div className="text-3xl font-bold text-purple-500">{Object.keys(kecamatanCount).length}</div>
            <div className="text-sm text-gray-500 mt-1">Kecamatan</div>
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

        {/* Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-10">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center mr-3 text-amber-600">🏷️</span>
            Distribusi Status Cagar Budaya
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {/* Donut Chart Visual */}
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="12"
                />
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
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="12"
                  strokeDasharray={`${(daerah / totalCagar) * 251.2} 251.2`}
                  strokeDashoffset={`-${(nasional / totalCagar) * 251.2}`}
                  transform="rotate(-90 50 50)"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{totalCagar}</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-amber-400 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-gray-800">Cagar Budaya Nasional</p>
                  <p className="text-sm text-gray-500">{nasional} situs ({((nasional / totalCagar) * 100).toFixed(0)}%)</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium text-gray-800">Cagar Budaya Daerah</p>
                  <p className="text-sm text-gray-500">{daerah} situs ({((daerah / totalCagar) * 100).toFixed(0)}%)</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 text-purple-600">📅</span>
            Timeline Cagar Budaya
          </h2>
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-emerald-200 transform md:-translate-x-1/2"></div>

            {timelineData.map((item, index) => (
              <div
                key={item.id}
                className={`relative flex items-center mb-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-emerald-100 transform -translate-x-1/2 z-10"></div>

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                }`}>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 hover:border-emerald-300 transition-colors">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                      {item.tahunBerdiri}
                    </span>
                    <h3 className="font-bold text-gray-800 mt-2">{item.nama}</h3>
                    <p className="text-sm text-gray-500 mt-1">{item.kategori} • {item.kecamatan}</p>
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
