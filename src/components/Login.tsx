import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface LoginProps {
  onNavigate: (page: string) => void;
  onSwitchToRegister: () => void;
}

export default function Login({ onNavigate, onSwitchToRegister }: LoginProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [errorType, setErrorType] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setErrorType('');
    setIsLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        onNavigate('dashboard');
      } else {
        setError(result.message);
        setErrorType(result.code || '');
      }
      setIsLoading(false);
    }, 800);
  };

  const demoAccounts = [
    { role: 'Admin', email: 'admin@sicaba.go.id', pass: 'admin123', icon: '👑', color: 'border-red-200 bg-red-50' },
    { role: 'Manager', email: 'manager@sicaba.go.id', pass: 'manager123', icon: '📋', color: 'border-blue-200 bg-blue-50' },
    { role: 'Member', email: 'member@sicaba.go.id', pass: 'member123', icon: '👤', color: 'border-emerald-200 bg-emerald-50' },
    { role: 'Public', email: 'public@sicaba.go.id', pass: 'public123', icon: '🌐', color: 'border-gray-200 bg-gray-50' },
  ];

  const getErrorIcon = () => {
    switch (errorType) {
      case 'PENDING_APPROVAL': return '⏳';
      case 'REJECTED': return '❌';
      case 'ACCOUNT_DISABLED': return '⛔';
      default: return '⚠️';
    }
  };

  const getErrorColor = () => {
    switch (errorType) {
      case 'PENDING_APPROVAL': return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'REJECTED': return 'bg-red-50 border-red-200 text-red-700';
      default: return 'bg-red-50 border-red-200 text-red-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-3xl">🏛️</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Masuk ke SICABA</h1>
          <p className="text-gray-500 mt-1">Sistem Informasi Cagar Budaya Kota Tasikmalaya</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {error && (
            <div className={`mb-4 p-3 border rounded-lg flex items-start text-sm ${getErrorColor()}`}>
              <span className="mr-2 text-lg">{getErrorIcon()}</span>
              <div className="flex-1">
                <p>{error}</p>
                {errorType === 'PENDING_APPROVAL' && (
                  <button
                    onClick={() => onNavigate('status-pendaftaran')}
                    className="mt-2 text-xs font-bold underline hover:no-underline"
                  >
                    → Lihat Status Pendaftaran
                  </button>
                )}
                {errorType === 'REJECTED' && (
                  <button
                    onClick={onSwitchToRegister}
                    className="mt-2 text-xs font-bold underline hover:no-underline"
                  >
                    → Daftar Ulang
                  </button>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="nama@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </>
              ) : (
                'Masuk'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Belum punya akun?{' '}
              <button onClick={onSwitchToRegister} className="text-emerald-600 hover:text-emerald-700 font-bold">
                Daftar Sekarang
              </button>
            </p>
          </div>
        </div>

        {/* Demo Accounts */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center">
            <span className="mr-2">💡</span> Akun Demo (Klik untuk mengisi)
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.role}
                onClick={() => { setEmail(acc.email); setPassword(acc.pass); }}
                className={`flex items-center p-2.5 rounded-lg border ${acc.color} hover:shadow-sm transition-all text-left`}
              >
                <span className="text-lg mr-2">{acc.icon}</span>
                <div>
                  <p className="text-xs font-bold text-gray-700">{acc.role}</p>
                  <p className="text-xs text-gray-400 truncate">{acc.email}</p>
                </div>
              </button>
            ))}
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
