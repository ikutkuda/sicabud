interface DaftarODCBProps {
  onNavigate: (page: string) => void;
  onOpenForm: () => void;
}

export default function DaftarODCB({ onNavigate, onOpenForm }: DaftarODCBProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Pendaftaran ODCB</h1>
          <p className="text-gray-600">Objek Diduga Cagar Budaya</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
          <span className="text-5xl block mb-4">📋</span>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Belum Ada Pendaftaran ODCB</h3>
          <p className="text-gray-600 mb-6">
            Anda belum mendaftarkan ODCB. Klik tombol di bawah untuk memulai pendaftaran sesuai Permendikbudristek No. 36 Tahun 2023.
          </p>
          <button
            onClick={onOpenForm}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
          >
            + Daftarkan ODCB Baru
          </button>
        </div>
      </div>
    </div>
  );
}
