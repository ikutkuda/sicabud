interface HeroProps {
  onNavigate: (page: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <div className="mb-6">
            <span className="inline-block px-4 py-1 bg-emerald-600/30 rounded-full text-emerald-200 text-sm font-medium border border-emerald-500/30">
              🏛️ Sistem Informasi Cagar Budaya
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Cagar Budaya
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">
              Kota Tasikmalaya
            </span>
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            Jelajahi warisan budaya dan situs bersejarah Kota Tasikmalaya. 
            Temukan kekayaan sejarah, arsitektur, dan nilai-nilai luhur 
            yang tersimpan dalam setiap cagar budaya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('daftar')}
              className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-emerald-900 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Jelajahi Cagar Budaya
            </button>
            <button
              onClick={() => onNavigate('peta')}
              className="px-8 py-3 bg-transparent border-2 border-emerald-300 text-emerald-100 hover:bg-emerald-700 font-bold rounded-lg transition-all duration-300"
            >
              Lihat Peta Lokasi
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { number: '10', label: 'Cagar Budaya', icon: '🏛️' },
            { number: '5', label: 'Kategori', icon: '📂' },
            { number: '8', label: 'Kecamatan', icon: '📍' },
            { number: '3', label: 'Cagar Budaya Nasional', icon: '⭐' },
          ].map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold text-amber-300">{stat.number}</div>
              <div className="text-sm text-emerald-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#f9fafb"/>
        </svg>
      </div>
    </section>
  );
}
