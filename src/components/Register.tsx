import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { INFO_PEMBAYARAN, UserRole } from '../data/users';

interface RegisterProps {
  onNavigate: (page: string) => void;
  onSwitchToLogin: () => void;
}

export default function Register({ onNavigate, onSwitchToLogin }: RegisterProps) {
  const { register } = useAuth();
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole>('member');
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    alamat: '',
  });
  const [buktiBayar, setBuktiBayar] = useState<{
    namaFile: string;
    tipe: string;
    ukuran: string;
    tanggalUpload: string;
    nominal: number;
    rekeningTujuan: string;
    catatan: string;
  } | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const requiresPayment = selectedRole === 'manager' || selectedRole === 'member';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setBuktiBayar({
      namaFile: file.name,
      tipe: file.type.split('/')[1] || 'jpg',
      ukuran: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      tanggalUpload: new Date().toISOString().split('T')[0],
      nominal: INFO_PEMBAYARAN.nominal,
      rekeningTujuan: INFO_PEMBAYARAN.nomorRekening,
      catatan: '',
    });
  };

  const validateStep1 = () => {
    if (!formData.nama || !formData.email || !formData.password) {
      setError('Mohon lengkapi semua field yang wajib diisi!');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Password dan konfirmasi password tidak cocok!');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter!');
      return false;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2) {
      if (requiresPayment) {
        setStep(3);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    if (requiresPayment && !buktiBayar) {
      setError('Mohon upload bukti transfer terlebih dahulu!');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const result = register({
        nama: formData.nama,
        email: formData.email,
        password: formData.password,
        role: selectedRole,
        phone: formData.phone,
        alamat: formData.alamat,
        buktiBayar: buktiBayar ? {
          namaFile: buktiBayar.namaFile,
          tipe: buktiBayar.tipe,
          ukuran: buktiBayar.ukuran,
          tanggalUpload: buktiBayar.tanggalUpload,
          nominal: buktiBayar.nominal,
          rekeningTujuan: buktiBayar.rekeningTujuan,
        } : undefined,
      });
      if (result.success) {
        if (requiresPayment) {
          onNavigate('status-pendaftaran');
        } else {
          onNavigate('dashboard');
        }
      } else {
        setError(result.message);
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-2xl w-full">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-3xl">🏛️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Daftar Akun Baru</h1>
          <p className="text-gray-500 mt-1">Bergabung dengan SICABA Kota Tasikmalaya</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Data Akun' },
              { num: 2, label: 'Pilih Role' },
              { num: 3, label: 'Pembayaran' },
            ].filter(s => requiresPayment || s.num !== 3).map((s, index, arr) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs ${
                  step >= s.num ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > s.num ? '✓' : s.num}
                </div>
                <div className={`ml-2 text-xs font-medium ${step >= s.num ? 'text-emerald-600' : 'text-gray-500'}`}>
                  {s.label}
                </div>
                {index < arr.length - 1 && (
                  <div className={`flex-1 h-1 mx-3 rounded ${step > s.num ? 'bg-emerald-600' : 'bg-gray-200'}`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 text-sm">
              <span className="mr-2">⚠️</span>
              {error}
            </div>
          )}

          {/* Step 1: Data Akun */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Data Akun</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">👤</span>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="Nama lengkap Anda"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="nama@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">No. Telepon</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📱</span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Alamat</label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-400">📍</span>
                  <textarea
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    rows={2}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none resize-none"
                    placeholder="Alamat lengkap"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Password *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      placeholder="Min. 6 karakter"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Konfirmasi *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      placeholder="Ulangi password"
                      required
                    />
                  </div>
                </div>
              </div>

              <label className="flex items-center text-sm text-gray-600">
                <input type="checkbox" className="w-4 h-4 text-emerald-600 border-gray-300 rounded" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="ml-2 hover:text-emerald-600">
                  {showPassword ? '🙈 Sembunyikan password' : '👁️ Tampilkan password'}
                </button>
              </label>
            </div>
          )}

          {/* Step 2: Pilih Role */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Pilih Jenis Akun</h2>
              <p className="text-sm text-gray-600 mb-4">
                Pilih jenis akun yang sesuai dengan kebutuhan Anda.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* User Publik */}
                <button
                  onClick={() => setSelectedRole('public')}
                  className={`p-5 border-2 rounded-xl text-left transition-all ${
                    selectedRole === 'public'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-3xl mr-3">🌐</span>
                    <div>
                      <p className="font-bold text-gray-800">User Publik</p>
                      <p className="text-xs text-emerald-600 font-medium">GRATIS</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Akses dasar: lihat cagar budaya, peta, galeri</p>
                </button>

                {/* User Member */}
                <button
                  onClick={() => setSelectedRole('member')}
                  className={`p-5 border-2 rounded-xl text-left transition-all ${
                    selectedRole === 'member'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-3xl mr-3">👤</span>
                    <div>
                      <p className="font-bold text-gray-800">User Member</p>
                      <p className="text-xs text-amber-600 font-medium">{INFO_PEMBAYARAN.nominalFormatted}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Akses penuh: bookmark, komentar, daftar ODCB</p>
                </button>

                {/* Manager */}
                <button
                  onClick={() => setSelectedRole('manager')}
                  className={`p-5 border-2 rounded-xl text-left transition-all ${
                    selectedRole === 'manager'
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <span className="text-3xl mr-3">📋</span>
                    <div>
                      <p className="font-bold text-gray-800">User Manager</p>
                      <p className="text-xs text-amber-600 font-medium">{INFO_PEMBAYARAN.nominalFormatted}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Kelola konten, review ODCB, laporan</p>
                </button>

                {/* Admin - disabled */}
                <div className="p-5 border-2 border-gray-200 rounded-xl text-left opacity-50 cursor-not-allowed">
                  <div className="flex items-center mb-2">
                    <span className="text-3xl mr-3">👑</span>
                    <div>
                      <p className="font-bold text-gray-800">Administrator</p>
                      <p className="text-xs text-gray-500">Hanya via undangan</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Akses penuh sistem (tidak tersedia untuk pendaftaran umum)</p>
                </div>
              </div>

              {requiresPayment && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-amber-800 font-medium mb-1">💡 Informasi Pembayaran</p>
                  <p className="text-xs text-amber-700">
                    Untuk role <strong>{selectedRole === 'manager' ? 'Manager' : 'Member'}</strong>, 
                    diperlukan pembayaran sebesar <strong>{INFO_PEMBAYARAN.nominalFormatted}</strong>. 
                    Akun akan aktif setelah Administrator memverifikasi bukti pembayaran Anda.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Pembayaran */}
          {step === 3 && requiresPayment && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-gray-800 mb-2">Pembayaran & Bukti Transfer</h2>

              {/* Info Rekening */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">🏦</span> Informasi Rekening Pembayaran
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nominal:</span>
                    <span className="font-bold text-emerald-700 text-lg">{INFO_PEMBAYARAN.nominalFormatted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bank:</span>
                    <span className="font-medium text-gray-800">{INFO_PEMBAYARAN.bank}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">No. Rekening:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-gray-800">{INFO_PEMBAYARAN.nomorRekening}</span>
                      <button
                        onClick={() => navigator.clipboard.writeText(INFO_PEMBAYARAN.nomorRekening)}
                        className="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200"
                      >
                        📋 Salin
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Atas Nama:</span>
                    <span className="font-medium text-gray-800">{INFO_PEMBAYARAN.atasNama}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Keterangan:</span>
                    <span className="font-medium text-gray-800 text-xs">{INFO_PEMBAYARAN.keterangan}</span>
                  </div>
                </div>
              </div>

              {/* Instruksi */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-bold text-blue-800 text-sm mb-2">📋 Langkah Pembayaran:</h4>
                <ol className="text-xs text-blue-700 space-y-1 list-decimal list-inside">
                  <li>Transfer <strong>{INFO_PEMBAYARAN.nominalFormatted}</strong> ke rekening di atas</li>
                  <li>Gunakan keterangan: <strong>{INFO_PEMBAYARAN.keterangan}</strong></li>
                  <li>Simpan bukti transfer (screenshot/foto)</li>
                  <li>Upload bukti transfer di form bawah ini</li>
                  <li>Tunggu verifikasi dari Administrator (1x24 jam)</li>
                </ol>
              </div>

              {/* Upload Bukti */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Bukti Transfer *</label>
                <div className={`border-2 border-dashed rounded-lg p-6 text-center ${!buktiBayar ? 'border-gray-300' : 'border-emerald-300 bg-emerald-50'}`}>
                  {buktiBayar ? (
                    <div className="space-y-2">
                      <span className="text-4xl block">✅</span>
                      <p className="text-sm font-medium text-gray-800">{buktiBayar.namaFile}</p>
                      <p className="text-xs text-gray-500">{buktiBayar.ukuran}</p>
                      <button
                        onClick={() => setBuktiBayar(null)}
                        className="text-red-600 text-sm hover:underline"
                      >
                        Hapus & Upload Ulang
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-4xl block mb-2">📤</span>
                      <p className="text-sm text-gray-600 mb-2">Upload foto/screenshot bukti transfer</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="bukti-bayar"
                      />
                      <label htmlFor="bukti-bayar" className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium cursor-pointer hover:bg-emerald-700 inline-block">
                        Pilih File Bukti
                      </label>
                      <p className="text-xs text-gray-400 mt-2">Format: JPG, PNG. Max 5MB</p>
                    </>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <label className="flex items-start">
                  <input type="checkbox" className="w-4 h-4 mt-0.5 text-emerald-600 border-gray-300 rounded" required />
                  <span className="ml-2 text-xs text-gray-600">
                    Saya menyatakan bahwa bukti transfer yang saya upload adalah asli dan valid. 
                    Saya memahami bahwa akun akan diaktifkan setelah verifikasi oleh Administrator.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={() => {
                if (step === 1) {
                  onSwitchToLogin();
                } else {
                  setStep(step - 1);
                  setError('');
                }
              }}
              className="px-4 py-2 border border-gray-200 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50"
            >
              {step === 1 ? '← Sudah punya akun?' : '← Kembali'}
            </button>

            {step < 3 || (step === 2 && !requiresPayment) ? (
              <button
                onClick={step === 2 && !requiresPayment ? handleSubmit : handleNext}
                disabled={isLoading}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Memproses...' : (step === 2 && !requiresPayment ? 'Daftar' : 'Lanjut →')}
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isLoading || !buktiBayar}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Memproses...' : '✓ Ajukan Pendaftaran'}
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => onNavigate('beranda')}
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            ← Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}
