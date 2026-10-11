import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    question: "Apa itu Cagar Budaya?",
    answer: "Cagar Budaya adalah warisan budaya bersifat kebendaan berupa Benda Cagar Budaya, Bangunan Cagar Budaya, Struktur Cagar Budaya, Situs Cagar Budaya, dan Kawasan Cagar Budaya di darat dan/atau di air yang perlu dilestarikan keberadaannya karena memiliki nilai penting bagi sejarah, ilmu pengetahuan, pendidikan, agama, dan/atau kebudayaan.",
    category: "Umum"
  },
  {
    question: "Apa dasar hukum pelestarian cagar budaya di Indonesia?",
    answer: "Dasar hukum utama adalah Undang-Undang Nomor 11 Tahun 2010 tentang Cagar Budaya. UU ini mengatur tentang pendaftaran, penetapan, pengelolaan, dan pengembangan cagar budaya di Indonesia.",
    category: "Hukum"
  },
  {
    question: "Bagaimana cara suatu bangunan ditetapkan sebagai cagar budaya?",
    answer: "Suatu bangunan ditetapkan sebagai cagar budaya melalui proses pendaftaran, penelitian, dan penilaian oleh Tim Ahli Cagar Budaya. Jika memenuhi kriteria, maka akan ditetapkan melalui keputusan pejabat yang berwenang (Walikota/Bupati/Gubernur/Menteri).",
    category: "Prosedur"
  },
  {
    question: "Apa saja kriteria suatu benda/bangunan menjadi cagar budaya?",
    answer: "Kriteria cagar budaya meliputi: (1) Berusia minimal 50 tahun, (2) Memiliki nilai penting bagi sejarah, ilmu pengetahuan, pendidikan, agama, dan/atau kebudayaan, (3) Memiliki nilai kebudayaan yang kuat, dan (4) Memiliki keterkaitan dengan peristiwa sejarah penting.",
    category: "Kriteria"
  },
  {
    question: "Apakah masyarakat boleh merenovasi bangunan cagar budaya?",
    answer: "Renovasi bangunan cagar budaya harus mendapat izin dari instansi yang berwenang dan harus dilakukan oleh tenaga ahli yang kompeten. Renovasi tidak boleh mengubah bentuk asli dan nilai historis bangunan. Pemilik bangunan cagar budaya memiliki kewajiban untuk memelihara dan melestarikannya.",
    category: "Hukum"
  },
  {
    question: "Bagaimana cara mengunjungi cagar budaya di Tasikmalaya?",
    answer: "Anda dapat mengunjungi cagar budaya di Kota Tasikmalaya dengan melihat informasi lokasi di halaman Peta pada aplikasi ini. Beberapa situs memiliki jam operasional tertentu, disarankan untuk menghubungi pengelola setempat sebelum berkunjung.",
    category: "Kunjungan"
  },
  {
    question: "Apakah ada biaya masuk untuk mengunjungi cagar budaya?",
    answer: "Beberapa cagar budaya dapat dikunjungi secara gratis, sementara yang lain mungkin mengenakan biaya masuk yang relatif murah. Biaya ini biasanya digunakan untuk pemeliharaan dan pelestarian situs.",
    category: "Kunjungan"
  },
  {
    question: "Bagaimana cara melaporkan kerusakan pada cagar budaya?",
    answer: "Jika Anda menemukan kerusakan atau tindakan yang mengancam kelestarian cagar budaya, silakan laporkan kepada Dinas Kebudayaan Kota Tasikmalaya melalui telepon (0265) 321234 atau email disbud@tasikmalayakota.go.id. Anda juga dapat melaporkannya melalui aplikasi SICABA ini.",
    category: "Pelaporan"
  },
  {
    question: "Apa perbedaan Cagar Budaya Nasional dan Daerah?",
    answer: "Cagar Budaya Nasional ditetapkan oleh Menteri Pendidikan dan Kebudayaan karena memiliki nilai penting bagi bangsa secara keseluruhan. Cagar Budaya Daerah ditetapkan oleh Bupati/Walikota/Gubernur karena memiliki nilai penting bagi daerah tertentu.",
    category: "Umum"
  },
  {
    question: "Bagaimana peran masyarakat dalam pelestarian cagar budaya?",
    answer: "Masyarakat dapat berperan dengan: (1) Ikut menjaga dan melestarikan cagar budaya di lingkungannya, (2) Melaporkan kerusakan atau ancaman terhadap cagar budaya, (3) Mengikuti kegiatan edukasi tentang cagar budaya, (4) Mendukung program-program pelestarian yang diselenggarakan pemerintah.",
    category: "Umum"
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  const categories = ['Semua', ...new Set(faqData.map(f => f.category))];
  const filteredFAQ = selectedCategory === 'Semua'
    ? faqData
    : faqData.filter(f => f.category === selectedCategory);

  const categoryColors: Record<string, string> = {
    'Umum': 'bg-emerald-100 text-emerald-700',
    'Hukum': 'bg-red-100 text-red-700',
    'Prosedur': 'bg-blue-100 text-blue-700',
    'Kriteria': 'bg-purple-100 text-purple-700',
    'Kunjungan': 'bg-amber-100 text-amber-700',
    'Pelaporan': 'bg-orange-100 text-orange-700',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            ❓ Pertanyaan Umum (FAQ)
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan jawaban atas pertanyaan yang sering diajukan tentang cagar budaya 
            dan sistem informasi ini.
          </p>
        </div>

        {/* Category Filter */}
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

        {/* FAQ List */}
        <div className="space-y-3">
          {filteredFAQ.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium mr-3 ${categoryColors[faq.category] || 'bg-gray-100 text-gray-700'}`}>
                    {faq.category}
                  </span>
                  <span className="font-medium text-gray-800">{faq.question}</span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <p className="text-gray-600 leading-relaxed pt-4">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-10 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100 text-center">
          <span className="text-3xl block mb-3">💬</span>
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            Tidak menemukan jawaban yang Anda cari?
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Silakan hubungi kami untuk pertanyaan lebih lanjut
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:sicaba@tasikmalayakota.go.id"
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
            >
              📧 Kirim Email
            </a>
            <a
              href="tel:0265321234"
              className="px-6 py-2 bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-50 rounded-lg font-medium transition-colors"
            >
              📞 Hubungi Kami
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
