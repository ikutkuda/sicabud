import { useState } from 'react';

interface TableInfo {
  name: string;
  icon: string;
  description: string;
  category: 'core' | 'relational' | 'transactional' | 'system';
  columns: { name: string; type: string; key?: string; description: string }[];
  relations: string[];
}

const tables: TableInfo[] = [
  {
    name: 'users',
    icon: '👥',
    description: 'Data pengguna sistem dengan 4 role (admin, manager, member, public)',
    category: 'core',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Primary Key' },
      { name: 'nama', type: 'VARCHAR(100)', description: 'Nama lengkap' },
      { name: 'email', type: 'VARCHAR(100)', key: 'UQ', description: 'Email unik' },
      { name: 'password', type: 'VARCHAR(255)', description: 'Hash bcrypt' },
      { name: 'role', type: 'ENUM', description: 'admin/manager/member/public' },
      { name: 'status_akun', type: 'ENUM', description: 'pending/approved/rejected' },
      { name: 'verified_by', type: 'INT', key: 'FK', description: 'Admin yang verifikasi' },
    ],
    relations: ['bukti_pembayaran', 'odcb', 'lampiran', 'bookmark', 'komentar', 'notifikasi']
  },
  {
    name: 'cagar_budaya',
    icon: '🏛️',
    description: 'Data utama cagar budaya dengan status penetapan',
    category: 'core',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Primary Key' },
      { name: 'nama', type: 'VARCHAR(200)', description: 'Nama cagar budaya' },
      { name: 'kategori_id', type: 'INT', key: 'FK', description: 'FK ke kategori' },
      { name: 'status_penetapan', type: 'ENUM', description: 'Kota/Provinsi/Nasional' },
      { name: 'nomor_sk', type: 'VARCHAR(100)', description: 'Nomor SK' },
      { name: 'latitude', type: 'DECIMAL(10,7)', description: 'Koordinat GPS' },
      { name: 'longitude', type: 'DECIMAL(10,7)', description: 'Koordinat GPS' },
    ],
    relations: ['kategori_cagar_budaya', 'fasilitas_cagar_budaya', 'lampiran', 'galeri', 'bookmark', 'komentar']
  },
  {
    name: 'odcb',
    icon: '📋',
    description: 'Objek Diduga Cagar Budaya - pendaftaran dari masyarakat',
    category: 'core',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Primary Key' },
      { name: 'nama_odcb', type: 'VARCHAR(200)', description: 'Nama objek' },
      { name: 'jenis_odcb', type: 'ENUM', description: 'Bangunan/Struktur/Situs/dll' },
      { name: 'pendaftar_id', type: 'INT', key: 'FK', description: 'FK ke users' },
      { name: 'jenis_identitas', type: 'ENUM', description: 'KTP/SIM' },
      { name: 'status', type: 'ENUM', description: 'Diajukan/Diperiksa/Revisi/dll' },
      { name: 'reviewed_by', type: 'INT', key: 'FK', description: 'Manager yang review' },
    ],
    relations: ['users (pendaftar)', 'users (reviewer)', 'odcb_foto_identitas', 'odcb_foto_objek']
  },
  {
    name: 'artikel',
    icon: '📰',
    description: 'Berita dan artikel tentang cagar budaya',
    category: 'core',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Primary Key' },
      { name: 'judul', type: 'VARCHAR(255)', description: 'Judul artikel' },
      { name: 'konten', type: 'LONGTEXT', description: 'Isi lengkap' },
      { name: 'kategori', type: 'VARCHAR(50)', description: 'Kategori artikel' },
      { name: 'status', type: 'ENUM', description: 'draft/published/archived' },
      { name: 'published_by', type: 'INT', key: 'FK', description: 'FK ke users' },
    ],
    relations: ['users (publisher)']
  },
  {
    name: 'bukti_pembayaran',
    icon: '💰',
    description: 'Bukti transfer pendaftaran user (Rp 110.000)',
    category: 'relational',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Primary Key' },
      { name: 'user_id', type: 'INT', key: 'FK', description: 'FK ke users' },
      { name: 'nominal', type: 'DECIMAL(12,2)', description: 'Nominal transfer' },
      { name: 'rekening_tujuan', type: 'VARCHAR(30)', description: 'No. rekening' },
      { name: 'status_verifikasi', type: 'ENUM', description: 'pending/valid/invalid' },
    ],
    relations: ['users']
  },
  {
    name: 'lampiran',
    icon: '📎',
    description: 'Dokumen lampiran cagar budaya (SK, sertifikat, foto, peta)',
    category: 'relational',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Primary Key' },
      { name: 'cagar_budaya_id', type: 'INT', key: 'FK', description: 'FK ke cagar_budaya' },
      { name: 'tipe_file', type: 'ENUM', description: 'pdf/doc/sk/foto/peta/sertifikat' },
      { name: 'uploaded_by', type: 'INT', key: 'FK', description: 'FK ke users' },
    ],
    relations: ['cagar_budaya', 'users']
  },
  {
    name: 'odcb_foto_identitas',
    icon: '🪪',
    description: 'Foto KTP/SIM pendaftar ODCB',
    category: 'relational',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Primary Key' },
      { name: 'odcb_id', type: 'INT', key: 'FK', description: 'FK ke odcb' },
      { name: 'nama_file', type: 'VARCHAR(255)', description: 'Nama file' },
      { name: 'path_file', type: 'VARCHAR(500)', description: 'Path penyimpanan' },
    ],
    relations: ['odcb']
  },
  {
    name: 'odcb_foto_objek',
    icon: '📸',
    description: 'Foto-foto objek ODCB (multiple)',
    category: 'relational',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Primary Key' },
      { name: 'odcb_id', type: 'INT', key: 'FK', description: 'FK ke odcb' },
      { name: 'nama_file', type: 'VARCHAR(255)', description: 'Nama file' },
      { name: 'deskripsi', type: 'VARCHAR(255)', description: 'Deskripsi foto' },
    ],
    relations: ['odcb']
  },
  {
    name: 'kategori_cagar_budaya',
    icon: '📂',
    description: 'Master kategori cagar budaya',
    category: 'relational',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Primary Key' },
      { name: 'nama_kategori', type: 'VARCHAR(50)', key: 'UQ', description: 'Nama kategori' },
      { name: 'ikon', type: 'VARCHAR(10)', description: 'Emoji ikon' },
    ],
    relations: ['cagar_budaya']
  },
  {
    name: 'fasilitas_cagar_budaya',
    icon: '🏢',
    description: 'Fasilitas yang tersedia di cagar budaya',
    category: 'relational',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Primary Key' },
      { name: 'cagar_budaya_id', type: 'INT', key: 'FK', description: 'FK ke cagar_budaya' },
      { name: 'nama_fasilitas', type: 'VARCHAR(100)', description: 'Nama fasilitas' },
    ],
    relations: ['cagar_budaya']
  },
  {
    name: 'galeri',
    icon: '🖼️',
    description: 'Koleksi foto cagar budaya',
    category: 'transactional',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Primary Key' },
      { name: 'cagar_budaya_id', type: 'INT', key: 'FK', description: 'FK ke cagar_budaya' },
      { name: 'judul', type: 'VARCHAR(200)', description: 'Judul foto' },
      { name: 'uploaded_by', type: 'INT', key: 'FK', description: 'FK ke users' },
    ],
    relations: ['cagar_budaya', 'users']
  },
  {
    name: 'bookmark',
    icon: '🔖',
    description: 'Favorit cagar budaya oleh user member',
    category: 'transactional',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Primary Key' },
      { name: 'user_id', type: 'INT', key: 'FK', description: 'FK ke users' },
      { name: 'cagar_budaya_id', type: 'INT', key: 'FK', description: 'FK ke cagar_budaya' },
    ],
    relations: ['users', 'cagar_budaya']
  },
  {
    name: 'komentar',
    icon: '💬',
    description: 'Review dan komentar user terhadap cagar budaya',
    category: 'transactional',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Primary Key' },
      { name: 'user_id', type: 'INT', key: 'FK', description: 'FK ke users' },
      { name: 'cagar_budaya_id', type: 'INT', key: 'FK', description: 'FK ke cagar_budaya' },
      { name: 'rating', type: 'TINYINT', description: 'Rating 1-5' },
    ],
    relations: ['users', 'cagar_budaya']
  },
  {
    name: 'faq',
    icon: '❓',
    description: 'Pertanyaan umum (FAQ)',
    category: 'transactional',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Primary Key' },
      { name: 'pertanyaan', type: 'TEXT', description: 'Pertanyaan' },
      { name: 'jawaban', type: 'TEXT', description: 'Jawaban' },
      { name: 'kategori', type: 'VARCHAR(50)', description: 'Kategori FAQ' },
    ],
    relations: ['users (creator)']
  },
  {
    name: 'notifikasi',
    icon: '🔔',
    description: 'Notifikasi untuk user',
    category: 'system',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Primary Key' },
      { name: 'user_id', type: 'INT', key: 'FK', description: 'FK ke users' },
      { name: 'tipe', type: 'ENUM', description: 'info/success/warning/error' },
      { name: 'is_read', type: 'BOOLEAN', description: 'Status dibaca' },
    ],
    relations: ['users']
  },
  {
    name: 'log_aktivitas',
    icon: '📝',
    description: 'Audit trail aktivitas user',
    category: 'system',
    columns: [
      { name: 'id', type: 'BIGINT', key: 'PK', description: 'Primary Key' },
      { name: 'user_id', type: 'INT', key: 'FK', description: 'FK ke users' },
      { name: 'aksi', type: 'VARCHAR(100)', description: 'Jenis aksi' },
      { name: 'ip_address', type: 'VARCHAR(45)', description: 'IP address' },
    ],
    relations: ['users']
  },
  {
    name: 'pengaturan_sistem',
    icon: '⚙️',
    description: 'Konfigurasi aplikasi',
    category: 'system',
    columns: [
      { name: 'id', type: 'INT', key: 'PK', description: 'Primary Key' },
      { name: 'nama_setting', type: 'VARCHAR(100)', key: 'UQ', description: 'Nama setting' },
      { name: 'nilai', type: 'TEXT', description: 'Nilai setting' },
      { name: 'kategori', type: 'VARCHAR(50)', description: 'Kategori setting' },
    ],
    relations: []
  },
];

const categoryConfig = {
  core: { label: 'Core Tables', color: 'bg-emerald-500', bgLight: 'bg-emerald-50 border-emerald-200', textColor: 'text-emerald-700' },
  relational: { label: 'Relational Tables', color: 'bg-blue-500', bgLight: 'bg-blue-50 border-blue-200', textColor: 'text-blue-700' },
  transactional: { label: 'Transactional Tables', color: 'bg-purple-500', bgLight: 'bg-purple-50 border-purple-200', textColor: 'text-purple-700' },
  system: { label: 'System Tables', color: 'bg-amber-500', bgLight: 'bg-amber-50 border-amber-200', textColor: 'text-amber-700' },
};

export default function DatabaseSchema() {
  const [selectedTable, setSelectedTable] = useState<TableInfo | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTables = tables.filter(t => {
    const matchCategory = filterCategory === 'all' || t.category === filterCategory;
    const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const stats = {
    total: tables.length,
    core: tables.filter(t => t.category === 'core').length,
    relational: tables.filter(t => t.category === 'relational').length,
    transactional: tables.filter(t => t.category === 'transactional').length,
    system: tables.filter(t => t.category === 'system').length,
    totalColumns: tables.reduce((sum, t) => sum + t.columns.length, 0),
    totalRelations: tables.reduce((sum, t) => sum + t.relations.length, 0),
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            🗄️ Struktur Database MySQL
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Skema database SICABA - Sistem Informasi Cagar Budaya Kota Tasikmalaya
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-emerald-600">{stats.total}</p>
            <p className="text-sm text-gray-500">Total Tabel</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-blue-600">{stats.totalColumns}</p>
            <p className="text-sm text-gray-500">Total Kolom</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-purple-600">{stats.totalRelations}</p>
            <p className="text-sm text-gray-500">Total Relasi</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
            <p className="text-2xl font-bold text-amber-600">4</p>
            <p className="text-sm text-gray-500">Kategori Tabel</p>
          </div>
        </div>

        {/* Category Legend */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Kategori:</span>
            {Object.entries(categoryConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setFilterCategory(filterCategory === key ? 'all' : key)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  filterCategory === key ? `${config.bgLight} border ${config.textColor}` : 'bg-gray-100 text-gray-600'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${config.color}`}></span>
                {config.label} ({tables.filter(t => t.category === key).length})
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Cari tabel..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        {/* Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredTables.map((table) => (
            <div
              key={table.name}
              onClick={() => setSelectedTable(table)}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 p-4 cursor-pointer hover:shadow-md transition-all hover:-translate-y-0.5`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{table.icon}</span>
                  <h3 className="font-bold text-gray-800 text-sm font-mono">{table.name}</h3>
                </div>
                <span className={`w-2 h-2 rounded-full ${categoryConfig[table.category].color}`}></span>
              </div>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{table.description}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span>📊 {table.columns.length} kolom</span>
                <span>🔗 {table.relations.length} relasi</span>
              </div>
            </div>
          ))}
        </div>

        {/* ERD Diagram (Text) */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3 text-emerald-600">🔗</span>
            Diagram Relasi Utama
          </h2>
          <div className="bg-gray-900 rounded-lg p-6 overflow-x-auto">
            <pre className="text-xs text-emerald-300 font-mono whitespace-pre">
{`┌─────────────────────────────────────────────────────────────────────────────┐
│                              USERS                                           │
│  id(PK), nama, email(UQ), password, role, status_akun                       │
└─────────────────────────────────────────────────────────────────────────────┘
         │                    │                    │                    │
         │ 1:N                │ 1:N                │ 1:N                │ 1:N
         ▼                    ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│BUKTI_PEMBAYARAN │  │     ODCB        │  │   LAMPIRAN      │  │   BOOKMARK      │
│ user_id(FK)     │  │ pendaftar_id(FK)│  │ uploaded_by(FK) │  │  user_id(FK)    │
└─────────────────┘  └─────────────────┘  └─────────────────┘  └─────────────────┘
                            │                                            │
                            │ 1:N                                        │ N:1
                            ▼                                            ▼
                   ┌─────────────────┐                        ┌─────────────────┐
                   │ODCB_FOTO_ID     │                        │  CAGAR_BUDAYA   │
                   │ odcb_id(FK)     │                        │  id(PK), nama   │
                   └─────────────────┘                        └─────────────────┘
                                                                    │
                                                          ┌─────────┼─────────┐
                                                          ▼         ▼         ▼
                                                    ┌──────────┐┌────────┐┌────────┐
                                                    │FASILITAS ││GALERI  ││KOMENTAR│
                                                    └──────────┘└────────┘└────────┘`}
            </pre>
          </div>
        </div>

        {/* SQL File Info */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
          <div className="flex items-start">
            <span className="text-3xl mr-4">📄</span>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">File SQL Schema</h3>
              <p className="text-sm text-gray-600 mb-3">
                File SQL lengkap tersedia di <code className="bg-white px-2 py-0.5 rounded text-emerald-700 font-mono text-xs">database/schema.sql</code>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-white p-3 rounded-lg border border-emerald-100">
                  <p className="font-medium text-gray-800">✅ Fitur yang Disertakan:</p>
                  <ul className="mt-1 space-y-0.5 text-gray-600">
                    <li>• 17 tabel dengan relasi lengkap</li>
                    <li>• Index untuk optimasi query</li>
                    <li>• Full-text search</li>
                    <li>• Stored procedures</li>
                    <li>• Triggers otomatis</li>
                    <li>• Views untuk laporan</li>
                    <li>• Sample data</li>
                  </ul>
                </div>
                <div className="bg-white p-3 rounded-lg border border-emerald-100">
                  <p className="font-medium text-gray-800">📋 Cara Import:</p>
                  <div className="mt-1 bg-gray-900 rounded p-2 text-emerald-300 font-mono">
                    <p>$ mysql -u root -p &lt; schema.sql</p>
                  </div>
                  <p className="mt-2 font-medium text-gray-800">📦 Backup:</p>
                  <div className="mt-1 bg-gray-900 rounded p-2 text-emerald-300 font-mono">
                    <p>$ mysqldump -u root -p \</p>
                    <p>  sicaba_db &gt; backup.sql</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedTable && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full my-8">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedTable.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800 font-mono">{selectedTable.name}</h2>
                    <p className="text-sm text-gray-500">{selectedTable.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTable(null)}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 max-h-[70vh] overflow-y-auto">
              {/* Category Badge */}
              <div className="mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryConfig[selectedTable.category].bgLight} border ${categoryConfig[selectedTable.category].textColor}`}>
                  {categoryConfig[selectedTable.category].label}
                </span>
              </div>

              {/* Columns */}
              <h3 className="font-bold text-gray-800 mb-3">Struktur Kolom</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 py-2 text-left text-xs font-bold text-gray-600">Kolom</th>
                      <th className="px-3 py-2 text-left text-xs font-bold text-gray-600">Tipe</th>
                      <th className="px-3 py-2 text-left text-xs font-bold text-gray-600">Key</th>
                      <th className="px-3 py-2 text-left text-xs font-bold text-gray-600">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {selectedTable.columns.map((col, i) => (
                      <tr key={i} className="hover:bg-gray-50">
                        <td className="px-3 py-2 font-mono text-xs text-gray-800">{col.name}</td>
                        <td className="px-3 py-2 font-mono text-xs text-blue-600">{col.type}</td>
                        <td className="px-3 py-2">
                          {col.key && (
                            <span className={`px-1.5 py-0.5 rounded text-xs font-bold ${
                              col.key === 'PK' ? 'bg-amber-100 text-amber-700' :
                              col.key === 'FK' ? 'bg-blue-100 text-blue-700' :
                              'bg-green-100 text-green-700'
                            }`}>
                              {col.key}
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-xs text-gray-600">{col.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Relations */}
              {selectedTable.relations.length > 0 && (
                <div className="mt-6">
                  <h3 className="font-bold text-gray-800 mb-3">Relasi</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTable.relations.map((rel, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        🔗 {rel}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setSelectedTable(null)}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
