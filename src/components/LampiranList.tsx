import { Lampiran, tipeFileIcons, tipeFileLabels } from '../data/cagarBudaya';

interface LampiranListProps {
  lampiran: Lampiran[];
  title?: string;
}

export default function LampiranList({ lampiran, title = 'Lampiran Dokumen' }: LampiranListProps) {
  const getTipeColor = (tipe: string) => {
    switch (tipe) {
      case 'sk': return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'sertifikat': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      case 'pdf': return 'bg-red-50 border-red-200 text-red-700';
      case 'doc': return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'foto': return 'bg-green-50 border-green-200 text-green-700';
      case 'peta': return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'jpg': return 'bg-indigo-50 border-indigo-200 text-indigo-700';
      case 'png': return 'bg-indigo-50 border-indigo-200 text-indigo-700';
      default: return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  const getTipeBadge = (tipe: string) => {
    switch (tipe) {
      case 'sk': return 'bg-amber-100 text-amber-800';
      case 'sertifikat': return 'bg-yellow-100 text-yellow-800';
      case 'pdf': return 'bg-red-100 text-red-800';
      case 'doc': return 'bg-blue-100 text-blue-800';
      case 'foto': return 'bg-green-100 text-green-800';
      case 'peta': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (lampiran.length === 0) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mr-3 text-gray-600">📎</span>
          {title}
        </h3>
        <div className="text-center py-8 text-gray-400">
          <span className="text-4xl block mb-3">📂</span>
          <p className="text-sm">Belum ada lampiran untuk cagar budaya ini</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
        <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 text-emerald-600">📎</span>
        {title}
        <span className="ml-2 px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
          {lampiran.length} file
        </span>
      </h3>

      <div className="space-y-3">
        {lampiran.map((file) => (
          <div
            key={file.id}
            className={`flex items-center p-3 rounded-lg border ${getTipeColor(file.tipe)} hover:shadow-sm transition-all cursor-pointer group`}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 bg-white/60">
              <span className="text-xl">{tipeFileIcons[file.tipe] || '📄'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-800 text-sm truncate group-hover:text-emerald-700">
                {file.namaFile}
              </p>
              <p className="text-xs text-gray-500 truncate mt-0.5">{file.deskripsi}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${getTipeBadge(file.tipe)}`}>
                  {tipeFileLabels[file.tipe] || file.tipe.toUpperCase()}
                </span>
                <span className="text-xs text-gray-400">📦 {file.ukuran}</span>
                <span className="text-xs text-gray-400">📅 {file.tanggalUpload}</span>
              </div>
            </div>
            <div className="ml-3 flex-shrink-0">
              <button className="p-2 rounded-lg bg-white/60 hover:bg-white text-emerald-600 transition-colors">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>Total: {lampiran.length} dokumen</span>
        <span>Upload terakhir: {lampiran[lampiran.length - 1]?.tanggalUpload}</span>
      </div>
    </div>
  );
}
