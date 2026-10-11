import { useState } from 'react';

interface Article {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Pelestarian Masjid Agung Tasikmalaya: Menjaga Warisan Spiritual",
    excerpt: "Upaya pelestarian Masjid Agung yang telah berdiri sejak 1832 menjadi contoh nyata komitmen pemerintah daerah dalam menjaga warisan budaya.",
    content: "Masjid Agung Kota Tasikmalaya yang telah berdiri sejak tahun 1832 terus menjadi pusat kegiatan keagamaan dan budaya masyarakat. Renovasi yang dilakukan tetap mempertahankan arsitektur asli dengan atap tumpang tiga tingkat yang menjadi ciri khas.",
    date: "15 Januari 2024",
    category: "Pelestarian",
    author: "Tim Redaksi SICABA",
    readTime: "5 menit"
  },
  {
    id: 2,
    title: "Situs Cipari: Menyingkap Peradaban Megalitikum di Tasikmalaya",
    excerpt: "Penelitian terbaru di Situs Cipari mengungkap lebih banyak tentang kehidupan masyarakat prasejarah di wilayah Priangan Timur.",
    content: "Tim arkeolog dari Universitas Padjadjaran melakukan penelitian lanjutan di Situs Cipari dan menemukan artefak baru yang menunjukkan kompleksitas kehidupan masyarakat megalitikum di kawasan ini. Temuan ini memperkuat posisi Tasikmalaya sebagai salah satu kawasan penting dalam sejarah prasejarah Jawa Barat.",
    date: "28 Desember 2023",
    category: "Arkeologi",
    author: "Dr. Ahmad Suryadi",
    readTime: "7 menit"
  },
  {
    id: 3,
    title: "Festival Budaya Tasikmalaya 2024: Merayakan Warisan Leluhur",
    excerpt: "Festival budaya tahunan kembali digelar dengan tema 'Menjaga Tradisi, Membangun Masa Depan' yang menampilkan berbagai kesenian tradisional.",
    content: "Festival Budaya Tasikmalaya 2024 akan menampilkan berbagai pertunjukan seni tradisional, pameran cagar budaya, workshop kerajinan tangan, serta kuliner khas daerah. Acara ini bertujuan untuk mengenalkan warisan budaya kepada generasi muda.",
    date: "10 Februari 2024",
    category: "Event",
    author: "Dinas Kebudayaan",
    readTime: "4 menit"
  },
  {
    id: 4,
    title: "Digitalisasi Cagar Budaya: Langkah Modern Melestarikan Tradisi",
    excerpt: "Pemerintah Kota Tasikmalaya meluncurkan sistem informasi digital untuk mendokumentasikan dan mempromosikan cagar budaya.",
    content: "Sistem Informasi Cagar Budaya (SICABA) diluncurkan sebagai upaya modernisasi pendokumentasian warisan budaya. Platform ini memungkinkan masyarakat mengakses informasi lengkap tentang cagar budaya, termasuk lokasi, sejarah, dan status pelestarian.",
    date: "5 Januari 2024",
    category: "Teknologi",
    author: "Tim IT Pemkot",
    readTime: "6 menit"
  },
  {
    id: 5,
    title: "Rumah Adat Julang Ngapak: Filosofi Arsitektur Sunda",
    excerpt: "Bentuk atap yang menyerupai burung julang menyimpan makna filosofis mendalam tentang kehidupan masyarakat Sunda.",
    content: "Arsitektur rumah adat Sunda tipe Julang Ngapak mencerminkan kearifan lokal dalam beradaptasi dengan lingkungan. Bentuk atap yang melebar seperti sayap burung julang tidak hanya estetis tetapi juga fungsional untuk mengalirkan air hujan dan memberikan sirkulasi udara yang baik.",
    date: "20 November 2023",
    category: "Arsitektur",
    author: "Prof. Iman Sudirman",
    readTime: "8 menit"
  },
  {
    id: 6,
    title: "Wisata Edukasi: Mengenal Sejarah Melalui Cagar Budaya",
    excerpt: "Sekolah-sekolah di Tasikmalaya mulai mengintegrasikan kunjungan ke cagar budaya sebagai bagian dari kurikulum pembelajaran.",
    content: "Program wisata edukasi ke cagar budaya semakin diminati oleh sekolah-sekolah di Kota Tasikmalaya. Kunjungan ke situs-situs bersejarah memberikan pengalaman belajar langsung yang tidak bisa didapat di dalam kelas.",
    date: "12 Desember 2023",
    category: "Pendidikan",
    author: "Dinas Pendidikan",
    readTime: "5 menit"
  }
];

const categoryColors: Record<string, string> = {
  'Pelestarian': 'bg-emerald-100 text-emerald-700',
  'Arkeologi': 'bg-amber-100 text-amber-700',
  'Event': 'bg-purple-100 text-purple-700',
  'Teknologi': 'bg-blue-100 text-blue-700',
  'Arsitektur': 'bg-orange-100 text-orange-700',
  'Pendidikan': 'bg-pink-100 text-pink-700',
};

const categoryEmojis: Record<string, string> = {
  'Pelestarian': '🛡️',
  'Arkeologi': '🗿',
  'Event': '🎉',
  'Teknologi': '💻',
  'Arsitektur': '🏗️',
  'Pendidikan': '📚',
};

export default function Berita() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', ...new Set(articles.map(a => a.category))];
  const filteredArticles = selectedCategory === 'Semua'
    ? articles
    : articles.filter(a => a.category === selectedCategory);

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => setSelectedArticle(null)}
            className="flex items-center text-emerald-600 hover:text-emerald-700 mb-6 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali ke Berita
          </button>

          <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="h-48 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <span className="text-6xl">{categoryEmojis[selectedArticle.category]}</span>
            </div>
            <div className="p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[selectedArticle.category]}`}>
                  {selectedArticle.category}
                </span>
                <span className="text-sm text-gray-500">📅 {selectedArticle.date}</span>
                <span className="text-sm text-gray-500">⏱️ {selectedArticle.readTime}</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">{selectedArticle.title}</h1>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-emerald-600 font-bold text-sm">
                    {selectedArticle.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{selectedArticle.author}</p>
                  <p className="text-xs text-gray-500">{selectedArticle.date}</p>
                </div>
              </div>
              <div className="prose prose-emerald max-w-none">
                <p className="text-gray-600 leading-relaxed text-lg mb-4 font-medium">
                  {selectedArticle.excerpt}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {selectedArticle.content}
                </p>
                <p className="text-gray-600 leading-relaxed mt-4">
                  Pelestarian cagar budaya merupakan tanggung jawab bersama. Mari kita jaga warisan budaya 
                  Kota Tasikmalaya agar tetap lestari untuk generasi mendatang. Dengan memahami sejarah dan 
                  nilai-nilai yang terkandung di dalamnya, kita dapat menghargai perjuangan dan kearifan 
                  para leluhur kita.
                </p>
              </div>

              {/* Share */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-3">Bagikan artikel ini:</p>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors">
                    Facebook
                  </button>
                  <button className="px-4 py-2 bg-sky-400 text-white rounded-lg text-sm hover:bg-sky-500 transition-colors">
                    Twitter
                  </button>
                  <button className="px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 transition-colors">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            📰 Berita & Artikel
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Informasi terbaru seputar cagar budaya, pelestarian, dan kegiatan budaya di Kota Tasikmalaya
          </p>
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {filteredArticles.length > 0 && (
          <div
            onClick={() => setSelectedArticle(filteredArticles[0])}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8 cursor-pointer hover:shadow-lg transition-all group"
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-48 md:h-auto bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <span className="text-7xl group-hover:scale-110 transition-transform duration-300">
                  {categoryEmojis[filteredArticles[0].category]}
                </span>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[filteredArticles[0].category]}`}>
                    {filteredArticles[0].category}
                  </span>
                  <span className="text-xs text-gray-400">⭐ Artikel Utama</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                  {filteredArticles[0].title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {filteredArticles[0].excerpt}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <span>{filteredArticles[0].author}</span>
                  <span className="mx-2">•</span>
                  <span>{filteredArticles[0].date}</span>
                  <span className="mx-2">•</span>
                  <span>{filteredArticles[0].readTime}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.slice(1).map((article) => (
            <div
              key={article.id}
              onClick={() => setSelectedArticle(article)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all group"
            >
              <div className="h-36 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300">
                  {categoryEmojis[article.category]}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[article.category]}`}>
                    {article.category}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{article.excerpt}</p>
                <div className="flex items-center text-xs text-gray-400">
                  <span>{article.date}</span>
                  <span className="mx-2">•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
