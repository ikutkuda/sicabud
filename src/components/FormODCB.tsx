import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { jenisODCBList, jenisODCBIcons, kondisiList, ODCB, FileAttachment, JenisODCB } from '../data/odcb';

interface FormODCBProps {
  onSubmit: (data: ODCB) => void;
  onCancel: () => void;
}

export default function FormODCB({ onSubmit, onCancel }: FormODCBProps) {
  const { currentUser } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    namaODCB: '',
    jenisODCB: '' as JenisODCB | '',
    lokasi: '',
    kecamatan: '',
    deskripsi: '',
    perkiraanUmur: '',
    kondisi: '',
    lat: '',
    lng: '',
    pendaftarNama: currentUser?.nama || '',
    pendaftarEmail: currentUser?.email || '',
    pendaftarPhone: currentUser?.phone || '',
    pendaftarAlamat: currentUser?.alamat || '',
    jenisIdentitas: 'KTP' as 'KTP' | 'SIM',
    nomorIdentitas: '',
  });
  const [fotoIdentitas, setFotoIdentitas] = useState<FileAttachment | null>(null);
  const [fotoODCBList, setFotoODCBList] = useState<FileAttachment[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileUpload = (type: 'identitas' | 'odcb', file: File) => {
    const attachment: FileAttachment = {
      id: Date.now() + Math.random(),
      namaFile: file.name,
      tipe: file.type.split('/')[1] || 'jpg',
      ukuran: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      tanggalUpload: new Date().toISOString().split('T')[0],
      deskripsi: type === 'identitas' ? `Foto ${formData.jenisIdentitas}` : 'Foto ODCB'
    };

    if (type === 'identitas') {
      setFotoIdentitas(attachment);
    } else {
      setFotoODCBList(prev => [...prev, attachment]);
    }
  };

  const removeFotoODCB = (id: number) => {
    setFotoODCBList(prev => prev.filter(f => f.id !== id));
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.namaODCB) newErrors.namaODCB = 'Nama ODCB wajib diisi';
    if (!formData.jenisODCB) newErrors.jenisODCB = 'Jenis ODCB wajib dipilih';
    if (!formData.lokasi) newErrors.lokasi = 'Lokasi wajib diisi';
    if (!formData.kecamatan) newErrors.kecamatan = 'Kecamatan wajib diisi';
    if (!formData.deskripsi) newErrors.deskripsi = 'Deskripsi wajib diisi';
    if (!formData.perkiraanUmur) newErrors.perkiraanUmur = 'Perkiraan umur wajib diisi';
    if (!formData.kondisi) newErrors.kondisi = 'Kondisi wajib dipilih';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.pendaftarNama) newErrors.pendaftarNama = 'Nama wajib diisi';
    if (!formData.pendaftarEmail) newErrors.pendaftarEmail = 'Email wajib diisi';
    if (!formData.nomorIdentitas) newErrors.nomorIdentitas = 'Nomor identitas wajib diisi';
    if (!fotoIdentitas) newErrors.fotoIdentitas = 'Foto identitas wajib diupload';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (fotoODCBList.length === 0) {
      newErrors.fotoODCB = 'Minimal 1 foto ODCB wajib diupload';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    if (!validateStep3()) return;

    const newODCB: ODCB = {
      id: Date.now(),
      namaODCB: formData.namaODCB,
      jenisODCB: formData.jenisODCB as JenisODCB,
      lokasi: formData.lokasi,
      kecamatan: formData.kecamatan,
      deskripsi: formData.deskripsi,
      perkiraanUmur: formData.perkiraanUmur,
      kondisi: formData.kondisi,
      koordinat: formData.lat && formData.lng ? { lat: parseFloat(formData.lat), lng: parseFloat(formData.lng) } : null,
      pendaftarId: currentUser?.id || 0,
      pendaftarNama: formData.pendaftarNama,
      pendaftarEmail: formData.pendaftarEmail,
      pendaftarPhone: formData.pendaftarPhone,
      pendaftarAlamat: formData.pendaftarAlamat,
      jenisIdentitas: formData.jenisIdentitas,
      nomorIdentitas: formData.nomorIdentitas,
      fotoIdentitas: fotoIdentitas!,
      fotoODCB: fotoODCBList,
      status: 'Diajukan',
      tanggalPengajuan: new Date().toISOString().split('T')[0],
      tanggalUpdate: new Date().toISOString().split('T')[0],
    };

    onSubmit(newODCB);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Pendaftaran ODCB</h1>
          <p className="text-gray-600 text-sm mt-1">Objek Diduga Cagar Budaya</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Data ODCB' },
              { num: 2, label: 'Data Pendaftar' },
              { num: 3, label: 'Upload Foto' },
            ].map((s, index) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm ${
                  step >= s.num ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > s.num ? '✓' : s.num}
                </div>
                <div className={`ml-3 text-sm font-medium ${step >= s.num ? 'text-emerald-600' : 'text-gray-500'}`}>
                  {s.label}
                </div>
                {index < 2 && (
                  <div className={`flex-1 h-1 mx-4 rounded ${step > s.num ? 'bg-emerald-600' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {/* Step 1: Data ODCB */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Informasi Objek Diduga Cagar Budaya</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama ODCB *</label>
                <input
                  type="text"
                  name="namaODCB"
                  value={formData.namaODCB}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${errors.namaODCB ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="Contoh: Rumah Tua Peninggalan Kolonial"
                />
                {errors.namaODCB && <p className="text-red-500 text-xs mt-1">{errors.namaODCB}</p>}
              </div>

              {/* Jenis ODCB - Card Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jenis ODCB * <span className="text-xs text-gray-500">(Sesuai UU No. 11 Tahun 2010)</span>
                </label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {jenisODCBList.map((jenis) => (
                    <button
                      key={jenis.nama}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ ...prev, jenisODCB: jenis.nama }));
                        if (errors.jenisODCB) {
                          setErrors(prev => ({ ...prev, jenisODCB: '' }));
                        }
                      }}
                      className={`p-4 rounded-xl border-2 transition-all text-center ${
                        formData.jenisODCB === jenis.nama
                          ? 'border-emerald-500 bg-emerald-50 shadow-md'
                          : 'border-gray-200 hover:border-emerald-300 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-3xl block mb-2">{jenis.ikon}</span>
                      <p className="font-bold text-sm text-gray-800">{jenis.nama}</p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{jenis.deskripsi}</p>
                    </button>
                  ))}
                </div>
                {errors.jenisODCB && <p className="text-red-500 text-xs mt-2">{errors.jenisODCB}</p>}
                
                {/* Info box */}
                {formData.jenisODCB && (
                  <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800">
                      <strong>💡 Definisi:</strong> {jenisODCBList.find(j => j.nama === formData.jenisODCB)?.definisiUU}
                    </p>
                  </div>
                )}
              </div>

              {/* Kondisi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kondisi *</label>
                <select
                  name="kondisi"
                  value={formData.kondisi}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${errors.kondisi ? 'border-red-500' : 'border-gray-200'}`}
                >
                  <option value="">Pilih Kondisi</option>
                  {kondisiList.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
                {errors.kondisi && <p className="text-red-500 text-xs mt-1">{errors.kondisi}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi Lengkap *</label>
                <input
                  type="text"
                  name="lokasi"
                  value={formData.lokasi}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${errors.lokasi ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="Alamat lengkap lokasi ODCB"
                />
                {errors.lokasi && <p className="text-red-500 text-xs mt-1">{errors.lokasi}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kecamatan *</label>
                <input
                  type="text"
                  name="kecamatan"
                  value={formData.kecamatan}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${errors.kecamatan ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="Nama kecamatan"
                />
                {errors.kecamatan && <p className="text-red-500 text-xs mt-1">{errors.kecamatan}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi ODCB *</label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none ${errors.deskripsi ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="Jelaskan objek secara detail: bentuk, material, ukuran, ciri khas, dll"
                />
                {errors.deskripsi && <p className="text-red-500 text-xs mt-1">{errors.deskripsi}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Perkiraan Umur *</label>
                <input
                  type="text"
                  name="perkiraanUmur"
                  value={formData.perkiraanUmur}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${errors.perkiraanUmur ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="Contoh: ±100 tahun, Abad ke-18, dll"
                />
                {errors.perkiraanUmur && <p className="text-red-500 text-xs mt-1">{errors.perkiraanUmur}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitude (opsional)</label>
                  <input
                    type="number"
                    step="0.0001"
                    name="lat"
                    value={formData.lat}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="-7.3274"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitude (opsional)</label>
                  <input
                    type="number"
                    step="0.0001"
                    name="lng"
                    value={formData.lng}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="108.2217"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Data Pendaftar */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Data Pendaftar & Identitas</h2>
              
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-emerald-700">
                  💡 Data pendaftar telah diisi otomatis dari profil Anda. Silakan lengkapi jika ada yang kosong.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    name="pendaftarNama"
                    value={formData.pendaftarNama}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${errors.pendaftarNama ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {errors.pendaftarNama && <p className="text-red-500 text-xs mt-1">{errors.pendaftarNama}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="pendaftarEmail"
                    value={formData.pendaftarEmail}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${errors.pendaftarEmail ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {errors.pendaftarEmail && <p className="text-red-500 text-xs mt-1">{errors.pendaftarEmail}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">No. Telepon</label>
                  <input
                    type="tel"
                    name="pendaftarPhone"
                    value={formData.pendaftarPhone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alamat</label>
                  <input
                    type="text"
                    name="pendaftarAlamat"
                    value={formData.pendaftarAlamat}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="Alamat lengkap"
                  />
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mt-6">
                <h3 className="font-bold text-gray-800 mb-3">Identitas Diri</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Identitas *</label>
                    <select
                      name="jenisIdentitas"
                      value={formData.jenisIdentitas}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    >
                      <option value="KTP">KTP (Kartu Tanda Penduduk)</option>
                      <option value="SIM">SIM (Surat Izin Mengemudi)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Identitas *</label>
                    <input
                      type="text"
                      name="nomorIdentitas"
                      value={formData.nomorIdentitas}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none ${errors.nomorIdentitas ? 'border-red-500' : 'border-gray-200'}`}
                      placeholder="Nomor KTP/SIM"
                    />
                    {errors.nomorIdentitas && <p className="text-red-500 text-xs mt-1">{errors.nomorIdentitas}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Foto {formData.jenisIdentitas} *</label>
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center ${errors.fotoIdentitas ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}>
                    {fotoIdentitas ? (
                      <div className="space-y-2">
                        <span className="text-3xl block">✅</span>
                        <p className="text-sm font-medium text-gray-800">{fotoIdentitas.namaFile}</p>
                        <p className="text-xs text-gray-500">{fotoIdentitas.ukuran}</p>
                        <button
                          onClick={() => setFotoIdentitas(null)}
                          className="text-red-600 text-sm hover:underline"
                        >
                          Hapus & Upload Ulang
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="text-3xl block mb-2">📷</span>
                        <p className="text-sm text-gray-600 mb-2">Klik untuk upload foto {formData.jenisIdentitas}</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload('identitas', e.target.files[0])}
                          className="hidden"
                          id="foto-identitas"
                        />
                        <label htmlFor="foto-identitas" className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium cursor-pointer hover:bg-emerald-100">
                          Pilih File
                        </label>
                        <p className="text-xs text-gray-400 mt-2">Format: JPG, PNG. Max 5MB</p>
                      </>
                    )}
                  </div>
                  {errors.fotoIdentitas && <p className="text-red-500 text-xs mt-1">{errors.fotoIdentitas}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Upload Foto ODCB */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Upload Foto ODCB</h2>
              
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <p className="text-sm text-amber-700">
                  💡 Upload minimal 1 foto ODCB. Disarankan upload beberapa foto dari sudut berbeda untuk dokumentasi yang lengkap.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Foto ODCB *</label>
                <div className={`border-2 border-dashed rounded-lg p-8 text-center ${errors.fotoODCB ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}>
                  <span className="text-4xl block mb-3">📸</span>
                  <p className="text-sm text-gray-600 mb-3">Upload foto-foto objek diduga cagar budaya</p>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                      if (e.target.files) {
                        Array.from(e.target.files).forEach(file => handleFileUpload('odcb', file));
                      }
                    }}
                    className="hidden"
                    id="foto-odcb"
                  />
                  <label htmlFor="foto-odcb" className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-emerald-700">
                    Pilih Foto
                  </label>
                  <p className="text-xs text-gray-400 mt-2">Format: JPG, PNG. Max 10MB per file. Bisa pilih multiple files.</p>
                </div>
                {errors.fotoODCB && <p className="text-red-500 text-xs mt-1">{errors.fotoODCB}</p>}
              </div>

              {fotoODCBList.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-800 mb-3">Foto yang Diupload ({fotoODCBList.length})</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {fotoODCBList.map((foto) => (
                      <div key={foto.id} className="border border-gray-200 rounded-lg p-3 relative group">
                        <div className="bg-gradient-to-br from-emerald-100 to-teal-100 h-24 rounded flex items-center justify-center mb-2">
                          <span className="text-3xl">🖼️</span>
                        </div>
                        <p className="text-xs font-medium text-gray-800 truncate">{foto.namaFile}</p>
                        <p className="text-xs text-gray-500">{foto.ukuran}</p>
                        <button
                          onClick={() => removeFotoODCB(foto.id)}
                          className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={step === 1 ? onCancel : handleBack}
              className="px-6 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {step === 1 ? 'Batal' : '← Kembali'}
            </button>

            {step < 3 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
              >
                Lanjut →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
              >
                ✓ Ajukan Pendaftaran
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
