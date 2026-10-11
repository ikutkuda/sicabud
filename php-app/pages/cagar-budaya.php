<?php
/**
 * SICABA - Daftar Cagar Budaya
 */
require_once __DIR__ . '/../config/config.php';

$pageTitle = 'Daftar Cagar Budaya';
$db = getDB();

// Filter parameters
$kategori = $_GET['kategori'] ?? 'Semua';
$penetapan = $_GET['penetapan'] ?? 'Semua';
$search = $_GET['search'] ?? '';

// Build query
$where = [];
$params = [];

if ($kategori !== 'Semua') {
    $where[] = "k.nama_kategori = ?";
    $params[] = $kategori;
}

if ($penetapan !== 'Semua') {
    $where[] = "cb.status_penetapan = ?";
    $params[] = $penetapan;
}

if ($search) {
    $where[] = "(cb.nama LIKE ? OR cb.deskripsi LIKE ? OR cb.kecamatan LIKE ?)";
    $searchParam = "%$search%";
    $params[] = $searchParam;
    $params[] = $searchParam;
    $params[] = $searchParam;
}

$whereClause = $where ? 'WHERE ' . implode(' AND ', $where) : '';

// Get categories
$categories = $db->query("SELECT nama_kategori FROM kategori_cagar_budaya ORDER BY nama_kategori")->fetchAll(PDO::FETCH_COLUMN);

// Get data
$sql = "SELECT cb.*, k.nama_kategori, k.ikon 
        FROM cagar_budaya cb 
        JOIN kategori_cagar_budaya k ON cb.kategori_id = k.id 
        $whereClause 
        ORDER BY cb.id DESC";
$stmt = $db->prepare($sql);
$stmt->execute($params);
$cagarBudayaList = $stmt->fetchAll();

// Count
$countSql = "SELECT COUNT(*) FROM cagar_budaya cb JOIN kategori_cagar_budaya k ON cb.kategori_id = k.id $whereClause";
$countStmt = $db->prepare($countSql);
$countStmt->execute($params);
$total = $countStmt->fetchColumn();

include __DIR__ . '/../includes/header.php';
include __DIR__ . '/../includes/navbar.php';
?>

<div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="text-center mb-8">
            <h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Daftar Cagar Budaya</h1>
            <p class="text-gray-600 max-w-2xl mx-auto">
                Temukan berbagai cagar budaya yang terdaftar di <?= APP_CITY ?>.
            </p>
        </div>

        <!-- Search & Filter -->
        <form method="GET" class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 mb-8">
            <div class="flex flex-col gap-4">
                <!-- Search -->
                <div class="relative">
                    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input type="text" name="search" value="<?= e($search) ?>" placeholder="Cari cagar budaya..." class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none">
                </div>

                <!-- Status Penetapan Filter -->
                <div>
                    <p class="text-sm font-medium text-gray-700 mb-2">Filter Status Penetapan:</p>
                    <div class="flex flex-wrap gap-2">
                        <?php
                        $penetapanOptions = ['Semua', 'Nasional', 'Provinsi', 'Kota/Kabupaten', 'Belum Ditetapkan'];
                        foreach ($penetapanOptions as $opt):
                            $active = $penetapan === $opt ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200';
                        ?>
                            <button type="submit" name="penetapan" value="<?= $opt ?>" class="px-3 py-1.5 rounded-full text-xs font-medium <?= $active ?>">
                                <?= $opt === 'Semua' ? '📋 Semua' : statusPenetapanLabel($opt) ?>
                            </button>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- Category Filter -->
                <div>
                    <p class="text-sm font-medium text-gray-700 mb-2">Filter Kategori:</p>
                    <div class="flex flex-wrap gap-2">
                        <button type="submit" name="kategori" value="Semua" class="px-3 py-1.5 rounded-lg text-xs font-medium <?= $kategori === 'Semua' ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200' ?>">
                            Semua
                        </button>
                        <?php foreach ($categories as $cat): ?>
                            <button type="submit" name="kategori" value="<?= e($cat) ?>" class="px-3 py-1.5 rounded-lg text-xs font-medium <?= $kategori === $cat ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200' ?>">
                                <?= e($cat) ?>
                            </button>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                Menampilkan <span class="font-bold text-emerald-600"><?= count($cagarBudayaList) ?></span> dari <span class="font-bold"><?= $total ?></span> cagar budaya
            </div>
        </form>

        <!-- Grid -->
        <?php if (count($cagarBudayaList) > 0): ?>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <?php foreach ($cagarBudayaList as $cb): ?>
                    <a href="<?= BASE_URL ?>/pages/detail-cagar-budaya.php?id=<?= $cb['id'] ?>" class="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden border border-gray-100">
                        <div class="h-48 bg-gradient-to-br from-emerald-400 to-teal-600 relative overflow-hidden">
                            <div class="absolute inset-0 flex items-center justify-center">
                                <span class="text-6xl opacity-80"><?= $cb['ikon'] ?></span>
                            </div>
                            <div class="absolute top-3 left-3 flex flex-col gap-1">
                                <span class="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                    <?= e($cb['nama_kategori']) ?>
                                </span>
                                <span class="px-2 py-1 rounded-full text-xs font-medium border <?= $cb['status_penetapan'] === 'Nasional' ? 'bg-amber-100 text-amber-700 border-amber-300' : ($cb['status_penetapan'] === 'Provinsi' ? 'bg-purple-100 text-purple-700 border-purple-300' : 'bg-blue-100 text-blue-700 border-blue-300') ?>">
                                    <?= statusPenetapanLabel($cb['status_penetapan']) ?>
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
        <?php else: ?>
            <div class="text-center py-16">
                <span class="text-5xl block mb-4">🔍</span>
                <h3 class="text-xl font-bold text-gray-700 mb-2">Tidak Ditemukan</h3>
                <p class="text-gray-500">Tidak ada cagar budaya yang sesuai dengan pencarian Anda.</p>
            </div>
        <?php endif; ?>
    </div>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
