import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { roleLabels, roleColors, roleIcons } from '../data/users';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { currentUser, isLoggedIn, logout } = useAuth();

  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'daftar', label: 'Cagar Budaya' },
    { id: 'peta', label: 'Peta' },
    { id: 'galeri', label: 'Galeri' },
    { id: 'statistik', label: 'Statistik' },
    { id: 'berita', label: 'Berita' },
    { id: 'daftar-odcb', label: 'ODCB' },
    { id: 'faq', label: 'FAQ' },
    { id: 'database', label: 'Database' },
    { id: 'tentang', label: 'Tentang' },
  ];

  const handleLogout = () => {
    logout();
    onNavigate('beranda');
    setShowUserMenu(false);
  };

  return (
    <nav className="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('beranda')}>
            <div className="flex-shrink-0">
              <span className="text-2xl">🏛️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-bold leading-tight">SICABA</p>
              <p className="text-xs text-emerald-200 leading-tight">Kota Tasikmalaya</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  currentPage === item.id
                    ? 'bg-emerald-600 text-white shadow-inner'
                    : 'text-emerald-100 hover:bg-emerald-700 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* User Menu / Login Button */}
          <div className="hidden lg:flex items-center">
            {isLoggedIn() && currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    currentUser.statusAkun === 'pending' ? 'bg-amber-600 hover:bg-amber-500 animate-pulse' : 'bg-emerald-700 hover:bg-emerald-600'
                  }`}
                >
                  <span className="text-lg">{currentUser.avatar}</span>
                  <div className="text-left">
                    <p className="text-xs font-medium leading-tight">{currentUser.nama}</p>
                    <p className="text-xs leading-tight opacity-80">
                      {currentUser.statusAkun === 'pending' ? '⏳ Menunggu Verifikasi' : roleLabels[currentUser.role]}
                    </p>
                  </div>
                  <svg className={`w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-800">{currentUser.nama}</p>
                      <p className="text-xs text-gray-500">{currentUser.email}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium border ${roleColors[currentUser.role]}`}>
                        {roleIcons[currentUser.role]} {roleLabels[currentUser.role]}
                      </span>
                    </div>
                    <div className="py-1">
                      {currentUser.statusAkun === 'pending' && (
                        <button
                          onClick={() => { onNavigate('status-pendaftaran'); setShowUserMenu(false); }}
                          className="w-full flex items-center px-4 py-2 text-sm text-amber-700 hover:bg-amber-50 font-medium"
                        >
                          <span className="mr-3">⏳</span> Status Pendaftaran
                        </button>
                      )}
                      <button
                        onClick={() => { onNavigate('dashboard'); setShowUserMenu(false); }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <span className="mr-3">📊</span> Dashboard
                      </button>
                      <button
                        onClick={() => { onNavigate('profil'); setShowUserMenu(false); }}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <span className="mr-3">👤</span> Profil Saya
                      </button>
                    </div>
                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <span className="mr-3">🚪</span> Keluar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onNavigate('login')}
                  className="px-4 py-2 text-sm font-medium text-emerald-100 hover:text-white hover:bg-emerald-700 rounded-lg transition-colors"
                >
                  Masuk
                </button>
                <button
                  onClick={() => onNavigate('register')}
                  className="px-4 py-2 text-sm font-bold bg-amber-500 hover:bg-amber-400 text-emerald-900 rounded-lg transition-colors"
                >
                  Daftar
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            {isLoggedIn() && currentUser ? (
              <button
                onClick={() => onNavigate('dashboard')}
                className="flex items-center px-3 py-1.5 rounded-lg bg-emerald-700 text-sm"
              >
                <span className="mr-1">{currentUser.avatar}</span>
                <span className="text-xs font-medium">{roleLabels[currentUser.role]}</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="px-3 py-1.5 text-sm font-medium bg-amber-500 text-emerald-900 rounded-lg"
              >
                Masuk
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-emerald-200 hover:text-white hover:bg-emerald-700"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-emerald-800 border-t border-emerald-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === item.id
                    ? 'bg-emerald-600 text-white'
                    : 'text-emerald-100 hover:bg-emerald-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="border-t border-emerald-700 pt-2 mt-2">
              {isLoggedIn() ? (
                <>
                  <button
                    onClick={() => { onNavigate('dashboard'); setIsOpen(false); }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:bg-emerald-700"
                  >
                    📊 Dashboard
                  </button>
                  <button
                    onClick={() => { onNavigate('profil'); setIsOpen(false); }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:bg-emerald-700"
                  >
                    👤 Profil Saya
                  </button>
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false); }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-300 hover:bg-red-900/30"
                  >
                    🚪 Keluar
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { onNavigate('login'); setIsOpen(false); }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:bg-emerald-700"
                  >
                    🔑 Masuk
                  </button>
                  <button
                    onClick={() => { onNavigate('register'); setIsOpen(false); }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-amber-300 hover:bg-emerald-700"
                  >
                    ✨ Daftar Akun Baru
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
