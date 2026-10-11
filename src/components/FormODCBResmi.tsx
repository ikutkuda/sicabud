import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  jenisODCBList, jenisODCBIcons, kondisiODCBList, periodeMasaList, 
  asalPendaftarList, statusKepemilikanList, statusPengelolaanList,
  ODCB, FileAttachment, JenisODCB, AsalPendaftar, PeriodeMasa, KondisiODCB,
  StatusKepemilikan, StatusPengelolaan
} from '../data/odcb';

interface FormODCBResmiProps {
  onSubmit: (data: ODCB) => void;
  onCancel: () => void;
}

export default function FormODCBResmi({ onSubmit, onCancel }: FormODCBResmiProps) {
  const { currentUser } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // IDENTITAS ODCB
    namaODCB: '',
    jenisODCB: '' as JenisODCB | '',
    alamatODCB: '',
    desaKelurahan: '',
    kecamatan: '',
    kabupatenKota: 'Tasikmalaya',
    provinsi: 'Jawa Barat',
    lat: '',
    lng: '',
    
    // Data Teknis
    panjang: '',
    lebar: '',
    tinggi: '',
    luas: '',
    bahan: [] as string[],
    tahunPembuatan: '',
    periodeMasa: '' as PeriodeMasa | '',
    batasUtara: '',
    batasTimur: '',
    batasSelatan: '',
    batasBarat: '',
    
    // URAIAN
    deskripsi: '',
    sejarah: '',
    kondisiSaatIni: '' as KondisiODCB | '',
    penjelasanKondisi: '',
    pemeliharaan: 'Terpelihara' as 'Terpelihara' | 'Tidak Terpelihara',
    riwayatPemugaran: 'Belum Pernah Dipugar' as 'Pernah Dipugar' | 'Belum Pernah Dipugar',
    narasiNilaiPenting: '',
    
    // URGENSI
    latarBelakangUsulan: '',
    
    // STATUS
    statusKepemilikan: '' as StatusKepemilikan | '',
    statusPengelolaan: '' as StatusPengelolaan | '',
    riwayatKepemilikan: '',
    
    // Data Pendaftar
    namaPendaftar: currentUser?.nama || '',
    nikPendaftar: '',
    nomorTelepon: '',
    nomorPonsel: currentUser?.phone || '',
    asalPendaftar: 'Pendaftar Umum' as AsalPendaftar,
    namaInstansi: '',
    emailPendaftar: currentUser?.email || '',
    alamatPendaftar: currentUser?.alamat || '',
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

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.namaODCB) newErrors.namaODCB = 'Nama ODCB wajib diisi';
    if (!formData.jenisODCB) newErrors.jenisODCB = 'Jenis ODCB wajib dipilih';
    if (!formData.alamatODCB) newErrors.alamatODCB = 'Alamat wajib diisi';
    if (!formData.desaKelurahan) newErrors.desaKelurahan = 'Desa/Kelurahan wajib diisi';
    if (!formData.kecamatan) newErrors.kecamatan = 'Kecamatan wajib diisi';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.deskripsi) newErrors.deskripsi = 'Deskripsi wajib diisi';
    if (!formData.sejarah) newErrors.sejarah = 'Sejarah wajib diisi';
    if (!formData.kondisiSaatIni) newErrors.kondisiSaatIni = 'Kondisi wajib dipilih';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.namaPendaftar) newErrors.namaPendaftar = 'Nama pendaftar wajib diisi';
    if (!formData.nikPendaftar) newErrors.nikPendaftar = 'NIK wajib diisi';
    if (!formData.nomorIdentitas) newErrors.nomorIdentitas = 'Nomor identitas wajib diisi';
    if (!fotoIdentitas) newErrors.fotoIdentitas = 'Foto identitas wajib diupload';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors: Record<string, string> = {};
    if (fotoODCBList.length === 0) {
      newErrors.fotoODCB = 'Minimal 1 foto ODCB wajib diupload';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) setStep(4);
  };

  const handleSubmit = () => {
    if (!validateStep4()) return;

    const newODCB: ODCB = {
      id: Date.now(),
      nomorInduk: `ODCB-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
      namaODCB: formData.namaODCB,
      jenisODCB: formData.jenisODCB as JenisODCB,
      alamatODCB: formData.alamatODCB,
      desaKelurahan: formData.desaKelurahan,
      kecamatan: formData.kecamatan,
      kabupatenKota: formData.kabupatenKota,
      provinsi: formData.provinsi,
      koordinat: formData.lat && formData.lng ? { lat: parseFloat(formData.lat), lng: parseFloat(formData.lng) } : null,
      ukuran: {
        panjang: formData.panjang,
        lebar: formData.lebar,
        tinggi: formData.tinggi,
        luas: formData.luas,
      },
      bahan: formData.bahan,
      tahunPembuatan: formData.tahunPembuatan,
      periodeMasa: formData.periodeMasa as PeriodeMasa,
      batasUtara: formData.batasUtara,
      batasTimur: formData.batasTimur,
      batasSelatan: formData.batasSelatan,
      batasBarat: formData.batasBarat,
      deskripsi: formData.deskripsi,
      sejarah: formData.sejarah,
      kondisiSaatIni: formData.kondisiSaatIni as KondisiODCB,
      penjelasanKondisi: formData.penjelasanKondisi,
      pemeliharaan: formData.pemeliharaan,
      riwayatPemugaran: formData.riwayatPemugaran,
      narasiNilaiPenting: formData.narasiNilaiPenting,
      latarBelakangUsulan: formData.latarBelakangUsulan,
      statusKepemilikan: formData.statusKepemilikan as StatusKepemilikan,
      statusPengelolaan: formData.statusPengelolaan as StatusPengelolaan,
      riwayatKepemilikan: formData.riwayatKepemilikan,
      pendaftarId: currentUser?.id || 0,
      namaPendaftar: formData.namaPendaftar,
      nikPendaftar: formData.nikPendaftar,
      nomorTelepon: formData.nomorTelepon,
      nomorPonsel: formData.nomorPonsel,
      asalPendaftar: formData.asalPendaftar,
      namaInstansi: formData.namaInstansi,
      emailPendaftar: formData.emailPendaftar,
      alamatPendaftar: formData.alamatPendaftar,
      jenisIdentitas: formData.jenisIdentitas,
      nomorIdentitas: formData.nomorIdentitas,
      fotoIdentitas: fotoIdentitas!,
      fotoODCB: fotoODCBList,
      status: 'Terdaftar',
      tanggalPengajuan: new Date().toISOString().split('T')[0],
      tanggalUpdate: new Date().toISOString().split('T')[0],
    };

    onSubmit(newODCB);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">📋</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Formulir Pendaftaran ODCB</h1>
              <p className="text-sm text-gray-600">Sesuai Permendikbudristek No. 36 Tahun 2023</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Identitas ODCB' },
              { num: 2, label: 'Uraian ODCB' },
              { num: 3, label: 'Data Pendaftar' },
              { num: 4, label: 'Dokumen' },
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
                {index < 3 && (
                  <div className={`flex-1 h-1 mx-4 rounded ${step > s.num ? 'bg-emerald-600' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {/* Step 1: Identitas ODCB */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-3">
                <h2 className="text-xl font-bold text-gray-800">A. IDENTITAS ODCB</h2>
                <p className="text-sm text-gray-600 mt-1">Mengisi data identitas objek yang diduga cagar budaya</p>
              </div>

              {/* Nama ODCB */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama ODCB *</label>
                <input
                  type="text"
                  name="namaODCB"
                  value={formData.namaODCB}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${errors.namaODCB ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="Isi dengan nama ODCB yang akan didaftarkan"
                />
                {errors.namaODCB && <p className="text-red-500 text-xs mt-1">{errors.namaODCB}</p>}
              </div>

              {/* Jenis ODCB */}
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
                        if (errors.jenisODCB) setErrors(prev => ({ ...prev, jenisODCB: '' }));
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
              </div>

              {/* Alamat */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat ODCB *</label>
                <input
                  type="text"
                  name="alamatODCB"
                  value={formData.alamatODCB}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${errors.alamatODCB ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="Nama jalan, nomor, RT, RW, dusun/kampung/dukuh"
                />
                {errors.alamatODCB && <p className="text-red-500 text-xs mt-1">{errors.alamatODCB}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Desa/Kelurahan *</label>
                  <input
                    type="text"
                    name="desaKelurahan"
                    value={formData.desaKelurahan}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${errors.desaKelurahan ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Contoh: Desa Sukapura"
                  />
                  {errors.desaKelurahan && <p className="text-red-500 text-xs mt-1">{errors.desaKelurahan}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kecamatan *</label>
                  <input
                    type="text"
                    name="kecamatan"
                    value={formData.kecamatan}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${errors.kecamatan ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="Nama kecamatan"
                  />
                  {errors.kecamatan && <p className="text-red-500 text-xs mt-1">{errors.kecamatan}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kabupaten/Kota</label>
                  <input
                    type="text"
                    name="kabupatenKota"
                    value={formData.kabupatenKota}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                  <input
                    type="text"
                    name="provinsi"
                    value={formData.provinsi}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>

              {/* Koordinat */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Latitude (opsional)</label>
                  <input
                    type="number"
                    step="0.0000001"
                    name="lat"
                    value={formData.lat}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="-7.3274000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Longitude (opsional)</label>
                  <input
                    type="number"
                    step="0.0000001"
                    name="lng"
                    value={formData.lng}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="108.2217000"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Uraian ODCB */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-3">
                <h2 className="text-xl font-bold text-gray-800">B. URAIAN ODCB</h2>
                <p className="text-sm text-gray-600 mt-1">Mengisi deskripsi, sejarah, dan kondisi ODCB</p>
              </div>

              {/* Deskripsi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi ODCB *</label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none ${errors.deskripsi ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="Uraikan deskripsi ODCB secara lengkap: lokasi, bentuk, bahan, teknologi pembuatan, gaya/langgam, ornamen, warna, dll"
                />
                {errors.deskripsi && <p className="text-red-500 text-xs mt-1">{errors.deskripsi}</p>}
              </div>

              {/* Sejarah */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sejarah *</label>
                <textarea
                  name="sejarah"
                  value={formData.sejarah}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none ${errors.sejarah ? 'border-red-500' : 'border-gray-200'}`}
                  placeholder="Uraikan sejarah ODCB secara kronologis, lengkap dengan sumber data"
                />
                {errors.sejarah && <p className="text-red-500 text-xs mt-1">{errors.sejarah}</p>}
              </div>

              {/* Kondisi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kondisi Saat Ini *</label>
                <select
                  name="kondisiSaatIni"
                  value={formData.kondisiSaatIni}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${errors.kondisiSaatIni ? 'border-red-500' : 'border-gray-200'}`}
                >
                  <option value="">Pilih Kondisi</option>
                  {kondisiODCBList.map(k => <option key={k} value={k}>{k}</option>)}
                </select>
                {errors.kondisiSaatIni && <p className="text-red-500 text-xs mt-1">{errors.kondisiSaatIni}</p>}
              </div>

              {/* Periode */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Periode/Masa</label>
                <select
                  name="periodeMasa"
                  value={formData.periodeMasa}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option value="">Pilih Periode</option>
                  {periodeMasaList.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              {/* Tahun */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tahun Pembuatan/Pembangunan</label>
                <input
                  type="text"
                  name="tahunPembuatan"
                  value={formData.tahunPembuatan}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="Contoh: 1850 atau Abad ke-19"
                />
              </div>

              {/* Nilai Penting */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Narasi Nilai Penting/Keistimewaan</label>
                <textarea
                  name="narasiNilaiPenting"
                  value={formData.narasiNilaiPenting}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                  placeholder="Uraikan nilai penting/keistimewaan ODCB"
                />
              </div>

              {/* Status Kepemilikan & Pengelolaan */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status Kepemilikan</label>
                  <select
                    name="statusKepemilikan"
                    value={formData.statusKepemilikan}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="">Pilih Status</option>
                    {statusKepemilikanList.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status Pengelolaan</label>
                  <select
                    name="statusPengelolaan"
                    value={formData.statusPengelolaan}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  >
                    <option value="">Pilih Status</option>
                    {statusPengelolaanList.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Data Pendaftar */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-3">
                <h2 className="text-xl font-bold text-gray-800">C. DATA PENDAFTAR</h2>
                <p className="text-sm text-gray-600 mt-1">Mengisi data identitas pendaftar sesuai KTP</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <p className="text-sm text-emerald-700">
                  💡 Data pendaftar telah diisi otomatis dari profil Anda. Silakan lengkapi jika ada yang kosong.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nama Pendaftar *</label>
                  <input
                    type="text"
                    name="namaPendaftar"
                    value={formData.namaPendaftar}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${errors.namaPendaftar ? 'border-red-500' : 'border-gray-200'}`}
                  />
                  {errors.namaPendaftar && <p className="text-red-500 text-xs mt-1">{errors.namaPendaftar}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">NIK (Nomor Induk Kependudukan) *</label>
                  <input
                    type="text"
                    name="nikPendaftar"
                    value={formData.nikPendaftar}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${errors.nikPendaftar ? 'border-red-500' : 'border-gray-200'}`}
                    placeholder="16 digit NIK"
                  />
                  {errors.nikPendaftar && <p className="text-red-500 text-xs mt-1">{errors.nikPendaftar}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                  <input
                    type="tel"
                    name="nomorTelepon"
                    value={formData.nomorTelepon}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="0265-xxxxxx"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Ponsel (HP) *</label>
                  <input
                    type="tel"
                    name="nomorPonsel"
                    value={formData.nomorPonsel}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Asal/Latar Belakang Pendaftar</label>
                <select
                  name="asalPendaftar"
                  value={formData.asalPendaftar}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  {asalPendaftarList.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-bold text-gray-800 mb-3">Identitas Diri</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Jenis Identitas</label>
                    <select
                      name="jenisIdentitas"
                      value={formData.jenisIdentitas}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
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
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none ${errors.nomorIdentitas ? 'border-red-500' : 'border-gray-200'}`}
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

          {/* Step 4: Dokumen */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-3">
                <h2 className="text-xl font-bold text-gray-800">D. DOKUMEN PENDUKUNG</h2>
                <p className="text-sm text-gray-600 mt-1">Upload foto-foto ODCB dari berbagai sudut</p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
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
              onClick={step === 1 ? onCancel : () => setStep(step - 1)}
              className="px-6 py-2 border border-gray-200 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {step === 1 ? 'Batal' : '← Kembali'}
            </button>

            {step < 4 ? (
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
