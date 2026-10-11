<?php
/**
 * SICABA - Status Pendaftaran
 */
require_once __DIR__ . '/../config/config.php';
requireLogin();

$user = currentUser();
$pageTitle = 'Status Pendaftaran';

include __DIR__ . '/../includes/header.php';
?>

<div class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center py-12 px-4">
    <div class="max-w-2xl w-full">
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <!-- Header -->
            <div class="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white text-center">
                <span class="text-5xl block mb-3">⏳</span>
                <h1 class="text-2xl font-bold">Pendaftaran Berhasil Diajukan</h1>
                <p class="text-amber-100 mt-2">Terima kasih telah mendaftar di SICABA</p>
            </div>

            <div class="p-6 md:p-8">
                <!-- Status Card -->
                <div class="p-5 rounded-xl border-2 <?= $user['status_akun'] === 'pending' ? 'bg-amber-50 border-amber-300 text-amber-700' : ($user['status_akun'] === 'approved' ? 'bg-green-50 border-green-300 text-green-700' : 'bg-red-50 border-red-300 text-red-700') ?> mb-6">
                    <div class="flex items-center justify-between">
                        <div>
                            <p class="text-sm opacity-75">Status Pendaftaran</p>
                            <p class="text-xl font-bold"><?= statusAkunLabel($user['status_akun']) ?></p>
                        </div>
                        <div class="text-right">
                            <p class="text-sm opacity-75">Tanggal Daftar</p>
                            <p class="font-medium"><?= formatTanggal($user['tanggal_daftar']) ?></p>
                        </div>
                    </div>
                </div>

                <!-- Info Akun -->
                <div class="bg-gray-50 rounded-xl p-5 mb-6">
                    <h3 class="font-bold text-gray-800 mb-3">Informasi Akun Anda</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                            <p class="text-gray-500">Nama</p>
                            <p class="font-medium text-gray-800"><?= e($user['nama']) ?></p>
                        </div>
                        <div>
                            <p class="text-gray-500">Email</p>
                            <p class="font-medium text-gray-800"><?= e($user['email']) ?></p>
                        </div>
                        <div>
                            <p class="text-gray-500">Role</p>
                            <p class="font-medium text-gray-800"><?= roleLabel($user['role']) ?></p>
                        </div>
                        <div>
                            <p class="text-gray-500">Nominal Bayar</p>
                            <p class="font-bold text-emerald-600"><?= NOMINAL_FORMATTED ?></p>
                        </div>
                    </div>
                </div>

                <!-- Timeline -->
                <div class="mb-6">
                    <h3 class="font-bold text-gray-800 mb-3">Alur Verifikasi</h3>
                    <div class="space-y-3">
                        <div class="flex items-start">
                            <div class="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">✓</div>
                            <div class="ml-3">
                                <p class="font-medium text-gray-800 text-sm">Pendaftaran Diajukan</p>
                                <p class="text-xs text-gray-500"><?= formatTanggal($user['tanggal_daftar']) ?></p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-8 h-8 <?= $user['status_akun'] === 'pending' ? 'bg-amber-500' : ($user['status_akun'] === 'approved' ? 'bg-green-500' : 'bg-red-500') ?> text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                                <?= $user['status_akun'] === 'pending' ? '⏳' : ($user['status_akun'] === 'approved' ? '✓' : '✕') ?>
                            </div>
                            <div class="ml-3">
                                <p class="font-medium text-gray-800 text-sm">Verifikasi Administrator</p>
                                <p class="text-xs text-gray-500">
                                    <?php if ($user['status_akun'] === 'pending'): ?>
                                        Menunggu verifikasi (estimasi 1x24 jam)
                                    <?php elseif ($user['status_akun'] === 'approved'): ?>
                                        Disetujui pada <?= formatTanggal($user['tanggal_verifikasi']) ?>
                                    <?php else: ?>
                                        Ditolak pada <?= formatTanggal($user['tanggal_verifikasi']) ?>
                                    <?php endif; ?>
                                </p>
                            </div>
                        </div>
                        <div class="flex items-start">
                            <div class="w-8 h-8 <?= $user['status_akun'] === 'approved' ? 'bg-green-500' : 'bg-gray-300' ?> text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                                <?= $user['status_akun'] === 'approved' ? '✓' : '○' ?>
                            </div>
                            <div class="ml-3">
                                <p class="font-medium text-gray-800 text-sm">Akun Aktif</p>
                                <p class="text-xs text-gray-500">
                                    <?= $user['status_akun'] === 'approved' ? 'Akun Anda sudah aktif dan bisa login' : 'Akan aktif setelah disetujui' ?>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Catatan Admin -->
                <?php if ($user['catatan_admin']): ?>
                    <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
                        <p class="text-sm font-bold text-amber-800 mb-1">💬 Catatan dari Administrator:</p>
                        <p class="text-sm text-amber-700"><?= e($user['catatan_admin']) ?></p>
                    </div>
                <?php endif; ?>

                <!-- Actions -->
                <div class="flex flex-col sm:flex-row gap-3">
                    <?php if ($user['status_akun'] === 'approved'): ?>
                        <a href="<?= BASE_URL ?>/dashboard/index.php" class="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-center">🔑 Masuk ke Dashboard</a>
                    <?php else: ?>
                        <a href="<?= BASE_URL ?>/auth/logout.php" class="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-center">🔑 Logout</a>
                    <?php endif; ?>
                    <a href="<?= BASE_URL ?>/index.php" class="flex-1 py-2.5 border border-gray-200 text-gray-700 hover:bg-gray-50 rounded-lg font-medium text-center">🏠 Ke Beranda</a>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
