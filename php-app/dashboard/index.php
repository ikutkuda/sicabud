<?php
/**
 * SICABA - Dashboard
 */
require_once __DIR__ . '/../config/config.php';
requireLogin();

$user = currentUser();
$db = getDB();
$pageTitle = 'Dashboard';

// Statistics
$stats = [
    'total_cagar' => $db->query("SELECT COUNT(*) FROM cagar_budaya")->fetchColumn(),
    'total_user' => $db->query("SELECT COUNT(*) FROM users")->fetchColumn(),
    'pending_user' => $db->query("SELECT COUNT(*) FROM users WHERE status_akun = 'pending'")->fetchColumn(),
    'pending_odcb' => $db->query("SELECT COUNT(*) FROM odcb WHERE status = 'Diajukan'")->fetchColumn(),
];

include __DIR__ . '/../includes/header.php';
include __DIR__ . '/../includes/navbar.php';
?>

<div class="min-h-screen bg-gray-50">
    <!-- Dashboard Header -->
    <div class="bg-white border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
                    <p class="text-gray-500 text-sm mt-1">
                        Selamat datang, <span class="font-medium text-emerald-600"><?= e($user['nama']) ?></span>
                    </p>
                </div>
                <div class="mt-3 md:mt-0">
                    <span class="px-3 py-1.5 rounded-full text-xs font-bold border <?= $user['role'] === 'admin' ? 'bg-red-100 text-red-700 border-red-200' : ($user['role'] === 'manager' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-emerald-100 text-emerald-700 border-emerald-200') ?>">
                        <?= roleLabel($user['role']) ?>
                    </span>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <?php if ($user['status_akun'] === 'pending'): ?>
            <!-- Pending Status -->
            <div class="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6">
                <div class="flex items-start">
                    <span class="text-3xl mr-4">⏳</span>
                    <div>
                        <h3 class="font-bold text-amber-800 mb-1">Akun Menunggu Verifikasi</h3>
                        <p class="text-sm text-amber-700 mb-3">
                            Akun Anda sedang menunggu persetujuan dari Administrator. Silakan tunggu atau cek status pendaftaran Anda.
                        </p>
                        <a href="<?= BASE_URL ?>/auth/status-pendaftaran.php" class="text-sm font-bold text-amber-800 underline">
                            → Lihat Status Pendaftaran
                        </a>
                    </div>
                </div>
            </div>
        <?php endif; ?>

        <!-- Stats Cards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Cagar Budaya</p>
                        <p class="text-2xl font-bold text-gray-800 mt-1"><?= $stats['total_cagar'] ?></p>
                    </div>
                    <div class="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <span class="text-xl">🏛️</span>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Total User</p>
                        <p class="text-2xl font-bold text-gray-800 mt-1"><?= $stats['total_user'] ?></p>
                    </div>
                    <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                        <span class="text-xl">👥</span>
                    </div>
                </div>
            </div>
            <?php if (isAdmin()): ?>
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">Pending User</p>
                        <p class="text-2xl font-bold text-amber-600 mt-1"><?= $stats['pending_user'] ?></p>
                    </div>
                    <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                        <span class="text-xl">⏳</span>
                    </div>
                </div>
            </div>
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                <div class="flex items-center justify-between">
                    <div>
                        <p class="text-sm text-gray-500">ODCB Pending</p>
                        <p class="text-2xl font-bold text-purple-600 mt-1"><?= $stats['pending_odcb'] ?></p>
                    </div>
                    <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                        <span class="text-xl">📋</span>
                    </div>
                </div>
            </div>
            <?php endif; ?>
        </div>

        <!-- Quick Actions -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <a href="<?= BASE_URL ?>/pages/cagar-budaya.php" class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <span class="text-3xl block mb-3">🏛️</span>
                <h3 class="font-bold text-gray-800 mb-1">Cagar Budaya</h3>
                <p class="text-sm text-gray-500">Lihat daftar cagar budaya</p>
            </a>
            <a href="<?= BASE_URL ?>/pages/odcb.php" class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <span class="text-3xl block mb-3">📋</span>
                <h3 class="font-bold text-gray-800 mb-1">Daftar ODCB</h3>
                <p class="text-sm text-gray-500">Daftarkan objek diduga cagar budaya</p>
            </a>
            <a href="<?= BASE_URL ?>/pages/statistik.php" class="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <span class="text-3xl block mb-3">📊</span>
                <h3 class="font-bold text-gray-800 mb-1">Statistik</h3>
                <p class="text-sm text-gray-500">Lihat statistik dan grafik</p>
            </a>
        </div>

        <?php if (isAdmin() || isManager()): ?>
        <!-- Admin/Manager Features -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 class="text-lg font-bold text-gray-800 mb-4">Fitur Manajemen</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <?php if (isAdmin()): ?>
                    <a href="<?= BASE_URL ?>/admin/users.php" class="p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                        <span class="text-2xl block mb-2">👥</span>
                        <h3 class="font-bold text-gray-800">Kelola User</h3>
                        <p class="text-sm text-gray-500 mt-1">CRUD, ubah role & status</p>
                    </a>
                    <a href="<?= BASE_URL ?>/admin/verifikasi-pembayaran.php" class="p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                        <span class="text-2xl block mb-2">💰</span>
                        <h3 class="font-bold text-gray-800">Verifikasi Pembayaran</h3>
                        <p class="text-sm text-gray-500 mt-1">Approve/reject pendaftaran</p>
                    </a>
                <?php endif; ?>
                <a href="<?= BASE_URL ?>/admin/kelola-odcb.php" class="p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                    <span class="text-2xl block mb-2">📋</span>
                    <h3 class="font-bold text-gray-800">Review ODCB</h3>
                    <p class="text-sm text-gray-500 mt-1">Periksa pendaftaran ODCB</p>
                </a>
                <a href="<?= BASE_URL ?>/admin/kelola-lampiran.php" class="p-4 border border-gray-200 rounded-xl hover:border-emerald-300 hover:bg-emerald-50 transition-all">
                    <span class="text-2xl block mb-2">📎</span>
                    <h3 class="font-bold text-gray-800">Kelola Lampiran</h3>
                    <p class="text-sm text-gray-500 mt-1">Upload dokumen & foto</p>
                </a>
            </div>
        </div>
        <?php endif; ?>
    </div>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
