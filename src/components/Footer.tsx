export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🏛️</span>
              <div>
                <h3 className="text-lg font-bold">SICABA</h3>
                <p className="text-sm text-gray-400">Sistem Informasi Cagar Budaya</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              Platform digital untuk mendokumentasikan dan menginformasikan cagar budaya 
              di Kota Tasikmalaya. Bersama kita lestarikan warisan budaya untuk generasi mendatang.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4 text-emerald-400">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white cursor-pointer transition-colors">Beranda</li>
              <li className="hover:text-white cursor-pointer transition-colors">Daftar Cagar Budaya</li>
              <li className="hover:text-white cursor-pointer transition-colors">Peta Lokasi</li>
              <li className="hover:text-white cursor-pointer transition-colors">Tentang Aplikasi</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4 text-emerald-400">Kontak</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center">
                <span className="mr-2">📍</span> Tasikmalaya, Jawa Barat
              </li>
              <li className="flex items-center">
                <span className="mr-2">📧</span> sicaba@tasikmalayakota.go.id
              </li>
              <li className="flex items-center">
                <span className="mr-2">📞</span> (0265) 321234
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-500">
            © 2024 SICABA - Dinas Kebudayaan Kota Tasikmalaya. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-xs text-gray-500">
              Dibuat dengan ❤️ untuk pelestarian budaya
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
