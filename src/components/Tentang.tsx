export default function Tentang() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Tentang Aplikasi
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Sistem Informasi Cagar Budaya (SICABA) Kota Tasikmalaya
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* About App */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 text-emerald-600">📱</span>
              Tentang SICABA
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Sistem Informasi Cagar Budaya (SICABA) Kota Tasikmalaya adalah platform digital 
              yang dirancang untuk mendokumentasikan, menginformasikan, dan melestarikan 
              cagar budaya yang ada di wilayah Kota Tasikmalaya, Jawa Barat.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Aplikasi ini menyediakan informasi lengkap mengenai cagar budaya termasuk 
              sejarah, arsitektur, lokasi, dan status pelestarian. SICABA bertujuan untuk 
              meningkatkan kesadaran masyarakat akan pentingnya pelestarian warisan budaya.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Dengan SICABA, masyarakat dapat dengan mudah mengakses informasi mengenai 
              cagar budaya, mengetahui lokasi, dan merencanakan kunjungan ke situs-situs 
              bersejarah di Kota Tasikmalaya.
            </p>
          </div>

          {/* Purpose */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center mr-3 text-amber-600">🎯</span>
              Tujuan
            </h2>
            <div className="space-y-4">
              {[
                { icon: '📚', title: 'Dokumentasi', desc: 'Mendokumentasikan seluruh cagar budaya di Kota Tasikmalaya secara digital' },
                { icon: '📢', title: 'Edukasi', desc: 'Memberikan informasi edukatif tentang sejarah dan nilai budaya' },
                { icon: '🛡️', title: 'Pelestarian', desc: 'Mendukung upaya pelestarian cagar budaya melalui kesadaran masyarakat' },
                { icon: '🗺️', title: 'Aksesibilitas', desc: 'Memudahkan masyarakat mengakses informasi lokasi cagar budaya' },
                { icon: '🤝', title: 'Kolaborasi', desc: 'Mendorong kolaborasi antara pemerintah, akademisi, dan masyarakat' },
                { icon: '📊', title: 'Inventarisasi', desc: 'Menyediakan data inventarisasi cagar budaya yang terstruktur' },
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-xl mr-3 mt-0.5">{item.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Basis */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 text-blue-600">⚖️</span>
            Dasar Hukum
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { no: '1', title: 'UU No. 11 Tahun 2010', desc: 'Tentang Cagar Budaya' },
              { no: '2', title: 'PP No. 1 Tahun 2022', desc: 'Tentang Pendaftaran dan Penghapusan Cagar Budaya' },
              { no: '3', title: 'Perpres No. 1 Tahun 2022', desc: 'Tentang Pendaftaran Cagar Budaya' },
              { no: '4', title: 'Perda Kota Tasikmalaya', desc: 'Tentang Pelestarian Cagar Budaya Daerah' },
            ].map((item, index) => (
              <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                <span className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                  {item.no}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mt-8 bg-gradient-to-r from-emerald-800 to-teal-800 rounded-xl p-6 md:p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">📞 Hubungi Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <span className="text-xl mr-3">🏢</span>
              <div>
                <h3 className="font-semibold mb-1">Alamat</h3>
                <p className="text-emerald-100 text-sm">
                  Dinas Kebudayaan Kota Tasikmalaya<br />
                  Jl. Ir. H. Juanda No. 1<br />
                  Tasikmalaya 46111
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-xl mr-3">📧</span>
              <div>
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-emerald-100 text-sm">
                  disbud@tasikmalayakota.go.id<br />
                  sicaba@tasikmalayakota.go.id
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-xl mr-3">📱</span>
              <div>
                <h3 className="font-semibold mb-1">Telepon</h3>
                <p className="text-emerald-100 text-sm">
                  (0265) 321234<br />
                  Fax: (0265) 321235
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Credits */}
        <div className="mt-8 text-center text-sm text-gray-500 pb-8">
          <p>© 2024 Sistem Informasi Cagar Budaya (SICABA) Kota Tasikmalaya</p>
          <p className="mt-1">Dikembangkan oleh Dinas Kebudayaan Kota Tasikmalaya</p>
        </div>
      </div>
    </div>
  );
}
