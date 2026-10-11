import { cagarBudayaData, CagarBudaya } from '../data/cagarBudaya';

interface PetaProps {
  onSelectItem: (item: CagarBudaya) => void;
}

export default function Peta({ onSelectItem }: PetaProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Peta Lokasi Cagar Budaya
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Lihat persebaran lokasi cagar budaya di Kota Tasikmalaya melalui peta interaktif. 
            Klik pada lokasi untuk melihat detail informasi.
          </p>
        </div>

        {/* Map */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="h-[500px] w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d31680.5!2d108.22!3d-7.33!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMTknNDguNiJTIDEwOMKwMTMnMTIuMCJF!5e0!3m2!1sid!2sid!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Cagar Budaya Tasikmalaya"
            ></iframe>
          </div>
        </div>

        {/* Location List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 text-emerald-600">📍</span>
            Daftar Lokasi Cagar Budaya
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cagarBudayaData.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="flex items-center p-4 rounded-lg border border-gray-100 hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer transition-all"
              >
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <span className="text-emerald-600 font-bold text-sm">{item.id}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 truncate">{item.nama}</h3>
                  <p className="text-sm text-gray-500 truncate">{item.lokasi}</p>
                </div>
                <div className="ml-3 flex-shrink-0">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
          <div className="flex items-start">
            <span className="text-2xl mr-4">💡</span>
            <div>
              <h3 className="font-bold text-gray-800 mb-1">Tips Berkunjung</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Beberapa lokasi cagar budaya memiliki jam operasional tertentu</li>
                <li>• Hubungi pengelola setempat sebelum berkunjung untuk memastikan ketersediaan</li>
                <li>• Jaga kebersihan dan kelestarian cagar budaya selama kunjungan</li>
                <li>• Patuhi aturan dan larangan yang berlaku di setiap lokasi</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
