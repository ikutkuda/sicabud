import { useState } from 'react';
import { CagarBudaya } from './data/cagarBudaya';
import { ODCB } from './data/odcb';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Daftar from './components/Daftar';
import Detail from './components/Detail';
import Peta from './components/Peta';
import Tentang from './components/Tentang';
import Statistik from './components/Statistik';
import Galeri from './components/Galeri';
import Berita from './components/Berita';
import FAQ from './components/FAQ';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Profil from './components/Profil';
import KelolaLampiran from './components/KelolaLampiran';
import KelolaPenetapan from './components/KelolaPenetapan';
import JenisCagarBudaya from './components/JenisCagarBudaya';
import FormODCB from './components/FormODCB';
import DaftarODCB from './components/DaftarODCB';
import KelolaODCB from './components/KelolaODCB';
import StatusPendaftaran from './components/StatusPendaftaran';
import VerifikasiPembayaran from './components/VerifikasiPembayaran';
import DatabaseSchema from './components/DatabaseSchema';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';

type Page = 'beranda' | 'daftar' | 'peta' | 'tentang' | 'detail' | 'statistik' | 'galeri' | 'berita' | 'faq' | 'login' | 'register' | 'dashboard' | 'profil' | 'kelola-lampiran' | 'kelola-penetapan' | 'jenis-cagar-budaya' | 'form-odcb' | 'daftar-odcb' | 'kelola-odcb' | 'status-pendaftaran' | 'verifikasi-pembayaran' | 'database';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('beranda');
  const [selectedItem, setSelectedItem] = useState<CagarBudaya | null>(null);
  const { isLoggedIn } = useAuth();

  const handleNavigate = (page: string) => {
    // Role-based access control
    if (page === 'dashboard' && !isLoggedIn()) {
      setCurrentPage('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (page === 'profil' && !isLoggedIn()) {
      setCurrentPage('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if ((page === 'kelola-lampiran' || page === 'kelola-penetapan' || page === 'kelola-odcb') && !isLoggedIn()) {
      setCurrentPage('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if ((page === 'daftar-odcb' || page === 'form-odcb') && !isLoggedIn()) {
      setCurrentPage('login');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectItem = (item: CagarBudaya) => {
    setSelectedItem(item);
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromDetail = () => {
    setCurrentPage('daftar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleODCBSubmit = (data: ODCB) => {
    // In a real app, this would save to backend
    alert('Pendaftaran ODCB berhasil diajukan! Tim kami akan segera mereview pendaftaran Anda.');
    setCurrentPage('daftar-odcb');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'beranda':
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            {/* Featured Section */}
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">Cagar Budaya Unggulan</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Beberapa cagar budaya pilihan yang menjadi kebanggaan Kota Tasikmalaya
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      icon: '🕌',
                      title: 'Masjid Agung',
                      desc: 'Masjid tertua di Kota Tasikmalaya dengan arsitektur tradisional Sunda yang memukau',
                      color: 'from-blue-500 to-indigo-600'
                    },
                    {
                      icon: '🗿',
                      title: 'Situs Megalitikum',
                      desc: 'Situs arkeologi dengan peninggalan batu megalitikum dari peradaban kuno',
                      color: 'from-emerald-500 to-teal-600'
                    },
                    {
                      icon: '🏠',
                      title: 'Rumah Adat Sunda',
                      desc: 'Arsitektur tradisional Sunda yang masih terjaga keasliannya hingga kini',
                      color: 'from-amber-500 to-orange-600'
                    }
                  ].map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleNavigate('daftar')}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
                    >
                      <div className={`h-40 bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                        <span className="text-6xl">{item.icon}</span>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Quick Features */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">Jelajahi Lebih Lanjut</h2>
                  <p className="text-gray-600">Fitur-fitur yang tersedia di SICABA</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: '📊', title: 'Statistik', desc: 'Data dan grafik cagar budaya', page: 'statistik', color: 'from-blue-50 to-indigo-50 border-blue-200' },
                    { icon: '📸', title: 'Galeri', desc: 'Koleksi visual cagar budaya', page: 'galeri', color: 'from-purple-50 to-pink-50 border-purple-200' },
                    { icon: '📰', title: 'Berita', desc: 'Artikel & informasi terbaru', page: 'berita', color: 'from-amber-50 to-orange-50 border-amber-200' },
                    { icon: '🗺️', title: 'Peta', desc: 'Lokasi interaktif', page: 'peta', color: 'from-emerald-50 to-teal-50 border-emerald-200' },
                  ].map((feature, index) => (
                    <div
                      key={index}
                      onClick={() => handleNavigate(feature.page)}
                      className={`bg-gradient-to-br ${feature.color} rounded-xl p-6 border cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1`}
                    >
                      <span className="text-4xl block mb-3">{feature.icon}</span>
                      <h3 className="font-bold text-gray-800 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-600">{feature.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Role Info Section */}
            <section className="py-16 bg-gray-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-800 mb-3">Sistem Manajemen User</h2>
                  <p className="text-gray-600">4 level akses untuk pengelolaan yang terstruktur</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { icon: '👑', role: 'Administrator', desc: 'Akses penuh: kelola user, konten, dan pengaturan sistem', color: 'border-red-200 bg-red-50' },
                    { icon: '📋', role: 'Manager', desc: 'Kelola konten, approve artikel, dan lihat statistik', color: 'border-blue-200 bg-blue-50' },
                    { icon: '👤', role: 'User Member', desc: 'Akses semua konten, bookmark, dan komentar', color: 'border-emerald-200 bg-emerald-50' },
                    { icon: '🌐', role: 'User Publik', desc: 'Akses terbatas: lihat beranda dan daftar cagar budaya', color: 'border-gray-200 bg-gray-50' },
                  ].map((item, index) => (
                    <div key={index} className={`rounded-xl p-5 border ${item.color} hover:shadow-md transition-all`}>
                      <span className="text-3xl block mb-3">{item.icon}</span>
                      <h3 className="font-bold text-gray-800 mb-2">{item.role}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <button
                    onClick={() => handleNavigate('register')}
                    className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-lg transition-all"
                  >
                    Daftar Sekarang →
                  </button>
                </div>
              </div>
            </section>

            {/* Info Section */}
            <section className="py-16 bg-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                      Mengapa Cagar Budaya Penting?
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      Cagar budaya merupakan warisan budaya yang memiliki nilai penting bagi sejarah, 
                      ilmu pengetahuan, pendidikan, dan kebudayaan. Pelestarian cagar budaya merupakan 
                      tanggung jawab bersama antara pemerintah dan masyarakat.
                    </p>
                    <div className="space-y-4">
                      {[
                        { icon: '📖', text: 'Memiliki nilai sejarah yang tinggi' },
                        { icon: '🎓', text: 'Sebagai sarana pendidikan dan penelitian' },
                        { icon: '🌍', text: 'Identitas dan jati diri bangsa' },
                        { icon: '💰', text: 'Potensi pariwisata dan ekonomi kreatif' },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center">
                          <span className="text-xl mr-3">{item.icon}</span>
                          <span className="text-gray-700">{item.text}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => handleNavigate('tentang')}
                      className="mt-8 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Pelajari Lebih Lanjut →
                    </button>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-8 border border-emerald-100">
                    <div className="text-center">
                      <span className="text-6xl block mb-4">🏛️</span>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">UU No. 11 Tahun 2010</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        "Cagar Budaya adalah warisan budaya bersifat kebendaan berupa Benda Cagar Budaya, 
                        Bangunan Cagar Budaya, Struktur Cagar Budaya, Situs Cagar Budaya, dan Kawasan 
                        Cagar Budaya di darat dan/atau di air yang perlu dilestarikan."
                      </p>
                      <span className="text-xs text-gray-400">— Pasal 1, UU No. 11 Tahun 2010 tentang Cagar Budaya</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-bold mb-4">Jelajahi Warisan Budaya Kita</h2>
                <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
                  Mari bersama-sama mengenal, mencintai, dan melestarikan cagar budaya 
                  Kota Tasikmalaya untuk generasi mendatang.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => handleNavigate('daftar')}
                    className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-emerald-900 font-bold rounded-lg shadow-lg transition-all"
                  >
                    Lihat Semua Cagar Budaya
                  </button>
                  <button
                    onClick={() => handleNavigate('peta')}
                    className="px-8 py-3 border-2 border-white text-white hover:bg-white/10 font-bold rounded-lg transition-all"
                  >
                    Buka Peta Lokasi
                  </button>
                </div>
              </div>
            </section>
          </>
        );
      case 'daftar':
        return <Daftar onSelectItem={handleSelectItem} />;
      case 'detail':
        return selectedItem ? (
          <Detail item={selectedItem} onBack={handleBackFromDetail} />
        ) : (
          <Daftar onSelectItem={handleSelectItem} />
        );
      case 'peta':
        return <Peta onSelectItem={handleSelectItem} />;
      case 'tentang':
        return <Tentang />;
      case 'statistik':
        return <Statistik />;
      case 'galeri':
        return <Galeri />;
      case 'berita':
        return <Berita />;
      case 'faq':
        return <FAQ />;
      case 'login':
        return <Login onNavigate={handleNavigate} onSwitchToRegister={() => setCurrentPage('register')} />;
      case 'register':
        return <Register onNavigate={handleNavigate} onSwitchToLogin={() => setCurrentPage('login')} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'profil':
        return <Profil onNavigate={handleNavigate} />;
      case 'kelola-lampiran':
        return <KelolaLampiran onNavigate={handleNavigate} />;
      case 'kelola-penetapan':
        return <KelolaPenetapan onNavigate={handleNavigate} />;
      case 'jenis-cagar-budaya':
        return <JenisCagarBudaya />;
      case 'form-odcb':
        return <FormODCB onSubmit={handleODCBSubmit} onCancel={() => setCurrentPage('daftar-odcb')} />;
      case 'daftar-odcb':
        return <DaftarODCB onNavigate={handleNavigate} onOpenForm={() => setCurrentPage('form-odcb')} />;
      case 'kelola-odcb':
        return <KelolaODCB onNavigate={handleNavigate} />;
      case 'status-pendaftaran':
        return <StatusPendaftaran onNavigate={handleNavigate} />;
      case 'verifikasi-pembayaran':
        return <VerifikasiPembayaran onNavigate={handleNavigate} />;
      case 'database':
        return <DatabaseSchema />;
      default:
        return <Hero onNavigate={handleNavigate} />;
    }
  };

  // Hide Navbar and Footer on login/register pages
  const hideNav = currentPage === 'login' || currentPage === 'register';

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNav && <Navbar currentPage={currentPage} onNavigate={handleNavigate} />}
      <main className="flex-1">
        {renderPage()}
      </main>
      {!hideNav && <Footer onNavigate={handleNavigate} />}
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
