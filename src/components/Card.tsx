import { CagarBudaya, statusPenetapanColors, statusPenetapanIcons, jenisCagarBudayaColors, jenisCagarBudayaIcons } from '../data/cagarBudaya';

interface CardProps {
  item: CagarBudaya;
  onSelect: (item: CagarBudaya) => void;
}

const categoryIcons: Record<string, string> = {
  'Bangunan Keagamaan': '🕌',
  'Bangunan Publik': '🏢',
  'Bangunan Pemerintahan': '🏛️',
  'Bangunan Transportasi': '🚂',
  'Bangunan Tradisional': '🏠',
  'Situs Arkeologi': '🗿',
  'Museum': '🏛️',
};

const categoryColors: Record<string, string> = {
  'Bangunan Keagamaan': 'bg-blue-100 text-blue-800',
  'Bangunan Publik': 'bg-purple-100 text-purple-800',
  'Bangunan Pemerintahan': 'bg-red-100 text-red-800',
  'Bangunan Transportasi': 'bg-orange-100 text-orange-800',
  'Bangunan Tradisional': 'bg-amber-100 text-amber-800',
  'Situs Arkeologi': 'bg-emerald-100 text-emerald-800',
  'Museum': 'bg-teal-100 text-teal-800',
};

export default function Card({ item, onSelect }: CardProps) {
  return (
    <div
      onClick={() => onSelect(item)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden border border-gray-100"
    >
      {/* Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-emerald-400 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl opacity-80">{categoryIcons[item.kategori] || '🏛️'}</span>
        </div>
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[item.kategori] || 'bg-gray-100 text-gray-800'}`}>
            {item.kategori}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${jenisCagarBudayaColors[item.jenis]}`}>
            {jenisCagarBudayaIcons[item.jenis]} {item.jenis}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusPenetapanColors[item.statusPenetapan]}`}>
            {statusPenetapanIcons[item.statusPenetapan]} {item.statusPenetapan}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          {item.lampiran.length > 0 && (
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-700">
              📎 {item.lampiran.length} file
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">{item.nama}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <svg className="w-4 h-4 mr-1 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="truncate">{item.kecamatan}, Tasikmalaya</span>
        </div>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{item.deskripsi}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            📅 {item.tahunBerdiri}
          </span>
          <span className="text-emerald-600 text-sm font-medium hover:text-emerald-700">
            Lihat Detail →
          </span>
        </div>
      </div>
    </div>
  );
}
