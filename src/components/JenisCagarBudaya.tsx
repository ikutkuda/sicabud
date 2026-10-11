import { jenisCagarBudayaList, cagarBudayaData } from '../data/cagarBudaya';

export default function JenisCagarBudaya() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            📚 Jenis Cagar Budaya
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Berdasarkan Undang-Undang No. 11 Tahun 2010 tentang Cagar Budaya, terdapat 5 jenis cagar budaya yang diakui di Indonesia.
          </p>
        </div>

        {/* UU Reference */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 mb-8">
          <div className="flex items-start">
            <span className="text-3xl mr-4">📜</span>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Dasar Hukum</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong>Undang-Undang Republik Indonesia Nomor 11 Tahun 2010 tentang Cagar Budaya</strong>
                <br />
                Pasal 1 menyatakan bahwa Cagar Budaya adalah warisan budaya bersifat kebendaan berupa Benda Cagar Budaya, 
                Bangunan Cagar Budaya, Struktur Cagar Budaya, Situs Cagar Budaya, dan/atau Kawasan Cagar Budaya di darat 
                dan/atau di air yang perlu dilestarikan keberadaannya karena memiliki nilai penting bagi sejarah, ilmu 
                pengetahuan, pendidikan, agama, dan/atau kebudayaan melalui proses penetapan.
              </p>
            </div>
          </div>
        </div>

        {/* Jenis Cards */}
        <div className="space-y-6">
          {jenisCagarBudayaList.map((jenis) => {
            const count = cagarBudayaData.filter(c => c.jenis === jenis.nama).length;
            return (
              <div key={jenis.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Header */}
                <div className={`bg-gradient-to-r ${jenis.warna} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-5xl mr-4">{jenis.ikon}</span>
                      <div>
                        <h2 className="text-2xl font-bold">{jenis.nama}</h2>
                        <p className="text-sm opacity-90">{jenis.deskripsi}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">{count}</p>
                      <p className="text-sm opacity-90">Cagar Budaya</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Definisi UU */}
                  <div className="mb-6">
                    <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                      <span className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center mr-2 text-blue-600 text-xs">📖</span>
                      Definisi Menurut UU
                    </h3>
                    <p className="text-gray-700 leading-relaxed bg-blue-50 p-4 rounded-lg border border-blue-100">
                      {jenis.definisiUU}
                    </p>
                  </div>

                  {/* Contoh */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                      <span className="w-6 h-6 bg-amber-100 rounded flex items-center justify-center mr-2 text-amber-600 text-xs">💡</span>
                      Contoh {jenis.nama} Cagar Budaya
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {jenis.contoh.map((contoh, index) => (
                        <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <span className="text-emerald-500 mr-2">✓</span>
                          <span className="text-sm text-gray-700">{contoh}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Cagar Budaya di Tasikmalaya */}
                  {count > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                        <span className="w-6 h-6 bg-emerald-100 rounded flex items-center justify-center mr-2 text-emerald-600 text-xs">🏛️</span>
                        {jenis.nama} Cagar Budaya di Kota Tasikmalaya
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {cagarBudayaData
                          .filter(c => c.jenis === jenis.nama)
                          .map((cb) => (
                            <div key={cb.id} className="flex items-center p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                              <span className="text-2xl mr-3">{jenis.ikon}</span>
                              <div className="flex-1">
                                <p className="font-medium text-gray-800 text-sm">{cb.nama}</p>
                                <p className="text-xs text-gray-500">{cb.kecamatan} • {cb.tahunBerdiri}</p>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Table */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 text-purple-600">📊</span>
            Ringkasan Jenis Cagar Budaya di Kota Tasikmalaya
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Jenis</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">Jumlah</th>
                  <th className="px-4 py-3 text-center text-xs font-bold text-gray-600 uppercase">Persentase</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-gray-600 uppercase">Contoh di Tasikmalaya</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {jenisCagarBudayaList.map((jenis) => {
                  const count = cagarBudayaData.filter(c => c.jenis === jenis.nama).length;
                  const percentage = ((count / cagarBudayaData.length) * 100).toFixed(1);
                  const contohCB = cagarBudayaData
                    .filter(c => c.jenis === jenis.nama)
                    .slice(0, 2)
                    .map(c => c.nama)
                    .join(', ');
                  
                  return (
                    <tr key={jenis.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <span className="text-xl mr-2">{jenis.ikon}</span>
                          <span className="font-medium text-gray-800">{jenis.nama}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-lg font-bold text-gray-800">{count}</span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-sm text-gray-600">{percentage}%</span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {contohCB || '-'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-200">
          <div className="flex items-start">
            <span className="text-3xl mr-4">💡</span>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Tahukah Anda?</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                Tidak semua benda, bangunan, struktur, situs, atau kawasan otomatis menjadi cagar budaya. 
                Untuk ditetapkan sebagai cagar budaya, objek tersebut harus melalui proses penilaian oleh 
                Tim Ahli Cagar Budaya dan memenuhi kriteria tertentu seperti usia minimal 50 tahun, memiliki 
                nilai penting bagi sejarah/ilmu pengetahuan/pendidikan/agama/kebudayaan, serta memiliki nilai 
                kebudayaan yang kuat. Setelah memenuhi kriteria, objek tersebut akan ditetapkan melalui 
                Surat Keputusan (SK) oleh pejabat yang berwenang sesuai tingkatannya (Kota/Kabupaten, Provinsi, atau Nasional).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
