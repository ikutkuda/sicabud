interface KelolaODCBProps {
  onNavigate: (page: string) => void;
}

export default function KelolaODCB({ onNavigate }: KelolaODCBProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Kelola ODCB</h1>
            <p className="text-gray-600 text-sm">Review dan kelola pendaftaran Objek Diduga Cagar Budaya</p>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm transition-colors"
          >
            ← Dashboard
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <span className="text-5xl block mb-4">📋</span>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Belum Ada Pendaftaran ODCB</h3>
          <p className="text-gray-600">
            Belum ada pendaftaran ODCB yang masuk untuk direview.
          </p>
        </div>
      </div>
    </div>
  );
}
