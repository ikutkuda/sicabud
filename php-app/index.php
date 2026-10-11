<?php
/**
 * SICABA - Homepage
 */
require_once __DIR__ . '/config/config.php';

$pageTitle = 'Beranda';
$db = getDB();

// Get featured cagar budaya
$stmt = $db->query("SELECT cb.*, k.nama_kategori, k.ikon 
                    FROM cagar_budaya cb 
                    JOIN kategori_cagar_budaya k ON cb.kategori_id = k.id 
                    ORDER BY cb.id DESC LIMIT 6");
$cagarBudayaList = $stmt->fetchAll();

// Get statistics
$stats = [
    'total' => $db->query("SELECT COUNT(*) FROM cagar_budaya")->fetchColumn(),
    'nasional' => $db->query("SELECT COUNT(*) FROM cagar_budaya WHERE status_penetapan = 'Nasional'")->fetchColumn(),
    'kategori' => $db->query("SELECT COUNT(*) FROM kategori_cagar_budaya")->fetchColumn(),
    'kecamatan' => $db->query("SELECT COUNT(DISTINCT kecamatan) FROM cagar_budaya")->fetchColumn(),
];

include __DIR__ . '/includes/header.php';
include __DIR__ . '/includes/navbar.php';
?>

<!-- Hero Section -->
<section class="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white">
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div class="text-center">
            <div class="mb-6">
                <span class="inline-block px-4 py-1 bg-emerald-600/30 rounded-full text-emerald-200 text-sm font-medium border border-emerald-500/30">
                    🏛️ Sistem Informasi Cagar Budaya
                </span>
            </div>
            <h1 class="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Cagar Budaya
                <span class="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">
                    <?= APP_CITY ?>
                </span>
            </h1>
            <p class="text-lg md:text-xl text-emerald-100 max-w-3xl mx-auto mb-10 leading-relaxed">
                Jelajahi warisan budaya dan situs bersejarah <?= APP_CITY ?>. 
                Temukan kekayaan sejarah, arsitektur, dan nilai-nilai luhur 
                yang tersimpan dalam setiap cagar budaya.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="<?= BASE_URL ?>/pages/cagar-budaya.php" class="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-emerald-900 font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    Jelajahi Cagar Budaya
                </a>
                <a href="<?= BASE_URL ?>/pages/peta.php" class="px-8 py-3 bg-transparent border-2 border-emerald-300 text-emerald-100 hover:bg-emerald-700 font-bold rounded-lg transition-all duration-300">
                    Lihat Peta Lokasi
                </a>
            </div>
        </div>

        <!-- Stats -->
        <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div class="text-2xl mb-1">🏛️</div>
                <div class="text-2xl md:text-3xl font-bold text-amber-300"><?= $stats['total'] ?></div>
                <div class="text-sm text-emerald-200">Cagar Budaya</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div class="text-2xl mb-1">📂</div>
                <div class="text-2xl md:text-3xl font-bold text-amber-300"><?= $stats['kategori'] ?></div>
                <div class="text-sm text-emerald-200">Kategori</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div class="text-2xl mb-1">📍</div>
                <div class="text-2xl md:text-3xl font-bold text-amber-300"><?= $stats['kecamatan'] ?></div>
                <div class="text-sm text-emerald-200">Kecamatan</div>
            </div>
            <div class="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
                <div class="text-2xl mb-1">⭐</div>
                <div class="text-2xl md:text-3xl font-bold text-amber-300"><?= $stats['nasional'] ?></div>
                <div class="text-sm text-emerald-200">Cagar Budaya Nasional</div>
            </div>
        </div>
    </div>
</section>

<!-- Featured Section -->
<section class="py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-3">Cagar Budaya Unggulan</h2>
            <p class="text-gray-600 max-w-2xl mx-auto">
                Beberapa cagar budaya pilihan yang menjadi kebanggaan <?= APP_CITY ?>
            </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <?php foreach ($cagarBudayaList as $cb): ?>
                <a href="<?= BASE_URL ?>/pages/detail-cagar-budaya.php?id=<?= $cb['id'] ?>" class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden border border-gray-100">
                    <div class="h-48 bg-gradient-to-br from-emerald-400 to-teal-600 relative overflow-hidden">
                        <div class="absolute inset-0 flex items-center justify-center">
                            <span class="text-6xl opacity-80"><?= $cb['ikon'] ?></span>
                        </div>
                        <div class="absolute top-3 left-3">
                            <span class="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                <?= e($cb['nama_kategori']) ?>
                            </span>
                        </div>
                        <div class="absolute bottom-3 right-3">
                            <span class="px-2 py-1 rounded-full text-xs font-medium <?= $cb['status_penetapan'] === 'Nasional' ? 'bg-amber-400 text-amber-900' : 'bg-white/90 text-gray-700' ?>">
                                <?= $cb['status_penetapan'] === 'Nasional' ? '⭐ Nasional' : '📋 Daerah' ?>
                            </span>
                        </div>
                    </div>
                    <div class="p-5">
                        <h3 class="text-lg font-bold text-gray-800 mb-2 line-clamp-2"><?= e($cb['nama']) ?></h3>
                        <div class="flex items-center text-sm text-gray-500 mb-2">
                            <svg class="w-4 h-4 mr-1 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            <span class="truncate"><?= e($cb['kecamatan']) ?></span>
                        </div>
                        <p class="text-sm text-gray-600 mb-3 line-clamp-3"><?= e($cb['deskripsi']) ?></p>
                        <div class="flex items-center justify-between">
                            <span class="text-xs text-gray-400">📅 <?= e($cb['tahun_berdiri']) ?></span>
                            <span class="text-emerald-600 text-sm font-medium">Lihat Detail →</span>
                        </div>
                    </div>
                </a>
            <?php endforeach; ?>
        </div>
        <div class="text-center mt-8">
            <a href="<?= BASE_URL ?>/pages/cagar-budaya.php" class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors">
                Lihat Semua Cagar Budaya →
            </a>
        </div>
    </div>
</section>

<!-- Features Section -->
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-3">Jelajahi Lebih Lanjut</h2>
            <p class="text-gray-600">Fitur-fitur yang tersedia di SICABA</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <?php
            $features = [
                ['icon' => '📊', 'title' => 'Statistik', 'desc' => 'Data dan grafik cagar budaya', 'url' => '/pages/statistik.php', 'color' => 'from-blue-50 to-indigo-50 border-blue-200'],
                ['icon' => '📸', 'title' => 'Galeri', 'desc' => 'Koleksi visual cagar budaya', 'url' => '/pages/galeri.php', 'color' => 'from-purple-50 to-pink-50 border-purple-200'],
                ['icon' => '📰', 'title' => 'Berita', 'desc' => 'Artikel & informasi terbaru', 'url' => '/pages/berita.php', 'color' => 'from-amber-50 to-orange-50 border-amber-200'],
                ['icon' => '🗺️', 'title' => 'Peta', 'desc' => 'Lokasi interaktif', 'url' => '/pages/peta.php', 'color' => 'from-emerald-50 to-teal-50 border-emerald-200'],
            ];
            foreach ($features as $feature):
            ?>
                <a href="<?= BASE_URL . $feature['url'] ?>" class="bg-gradient-to-br <?= $feature['color'] ?> rounded-xl p-6 border cursor-pointer hover:shadow-lg transition-all transform hover:-translate-y-1">
                    <span class="text-4xl block mb-3"><?= $feature['icon'] ?></span>
                    <h3 class="font-bold text-gray-800 mb-1"><?= $feature['title'] ?></h3>
                    <p class="text-sm text-gray-600"><?= $feature['desc'] ?></p>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- CTA Section -->
<section class="py-16 bg-gradient-to-r from-emerald-800 to-teal-800 text-white">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold mb-4">Jelajahi Warisan Budaya Kita</h2>
        <p class="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Mari bersama-sama mengenal, mencintai, dan melestarikan cagar budaya 
            <?= APP_CITY ?> untuk generasi mendatang.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="<?= BASE_URL ?>/pages/cagar-budaya.php" class="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-emerald-900 font-bold rounded-lg shadow-lg transition-all">
                Lihat Semua Cagar Budaya
            </a>
            <a href="<?= BASE_URL ?>/pages/peta.php" class="px-8 py-3 border-2 border-white text-white hover:bg-white/10 font-bold rounded-lg transition-all">
                Buka Peta Lokasi
            </a>
        </div>
    </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
