<?php
/**
 * SICABA - Verifikasi Pembayaran
 */
require_once __DIR__ . '/../config/config.php';
requireAdmin();

$db = getDB();
$pageTitle = 'Verifikasi Pembayaran';

// Handle approve/reject
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userId = $_POST['user_id'] ?? 0;
    $action = $_POST['action'] ?? '';
    $catatan = trim($_POST['catatan'] ?? '');
    
    if ($action === 'approve') {
        $stmt = $db->prepare("UPDATE users SET status_akun = 'approved', tanggal_verifikasi = CURDATE(), verified_by = ?, catatan_admin = ? WHERE id = ?");
        $stmt->execute([$_SESSION['user_id'], $catatan ?: 'Pendaftaran disetujui', $userId]);
        
        // Update bukti pembayaran
        $stmt = $db->prepare("UPDATE bukti_pembayaran SET status_verifikasi = 'valid' WHERE user_id = ?");
        $stmt->execute([$userId]);
        
        logActivity('APPROVE_USER', 'users', $userId, 'Menyetujui user ID: ' . $userId);
        setFlash('success', 'User berhasil disetujui!');
    } elseif ($action === 'reject') {
        if (empty($catatan)) {
            setFlash('error', 'Mohon isi alasan penolakan!');
        } else {
            $stmt = $db->prepare("UPDATE users SET status_akun = 'rejected', tanggal_verifikasi = CURDATE(), verified_by = ?, catatan_admin = ? WHERE id = ?");
            $stmt->execute([$_SESSION['user_id'], $catatan, $userId]);
            
            $stmt = $db->prepare("UPDATE bukti_pembayaran SET status_verifikasi = 'invalid' WHERE user_id = ?");
            $stmt->execute([$userId]);
            
            logActivity('REJECT_USER', 'users', $userId, 'Menolak user ID: ' . $userId);
            setFlash('success', 'User ditolak.');
        }
    }
    
    redirect(BASE_URL . '/admin/verifikasi-pembayaran.php');
}

// Get users
$filter = $_GET['filter'] ?? 'all';
$where = "WHERE role IN ('manager', 'member')";
if ($filter === 'pending') $where .= " AND status_akun = 'pending'";
elseif ($filter === 'approved') $where .= " AND status_akun = 'approved'";
elseif ($filter === 'rejected') $where .= " AND status_akun = 'rejected'";

$stmt = $db->prepare("SELECT u.*, bp.nama_file as bukti_file, bp.ukuran_file as bukti_size FROM users u LEFT JOIN bukti_pembayaran bp ON u.id = bp.user_id $where ORDER BY u.tanggal_daftar DESC");
$stmt->execute();
$users = $stmt->fetchAll();

// Stats
$stats = [
    'total' => $db->query("SELECT COUNT(*) FROM users WHERE role IN ('manager', 'member')")->fetchColumn(),
    'pending' => $db->query("SELECT COUNT(*) FROM users WHERE role IN ('manager', 'member') AND status_akun = 'pending'")->fetchColumn(),
    'approved' => $db->query("SELECT COUNT(*) FROM users WHERE role IN ('manager', 'member') AND status_akun = 'approved'")->fetchColumn(),
    'rejected' => $db->query("SELECT COUNT(*) FROM users WHERE role IN ('manager', 'member') AND status_akun = 'rejected'")->fetchColumn(),
];

$pendapatan = $stats['approved'] * NOMINAL_PENDAFTARAN;

include __DIR__ . '/../includes/header.php';
include __DIR__ . '/../includes/navbar.php';
?>

<div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
            <div>
                <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Verifikasi Pembayaran</h1>
                <p class="text-gray-600 text-sm">Kelola persetujuan pendaftaran user baru</p>
            </div>
            <a href="<?= BASE_URL ?>/dashboard/index.php" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium text-sm">← Dashboard</a>
        </div>

        <?= displayFlash() ?>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                <p class="text-2xl font-bold text-gray-800"><?= $stats['total'] ?></p>
                <p class="text-sm text-gray-500">Total Pendaftar</p>
            </div>
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                <p class="text-2xl font-bold text-amber-600"><?= $stats['pending'] ?></p>
                <p class="text-sm text-gray-500">Menunggu Verifikasi</p>
            </div>
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                <p class="text-2xl font-bold text-green-600"><?= $stats['approved'] ?></p>
                <p class="text-sm text-gray-500">Disetujui</p>
            </div>
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 text-center">
                <p class="text-2xl font-bold text-red-600"><?= $stats['rejected'] ?></p>
                <p class="text-sm text-gray-500">Ditolak</p>
            </div>
        </div>

        <!-- Revenue -->
        <div class="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white mb-6">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-emerald-100 text-sm">Total Pendapatan Pendaftaran</p>
                    <p class="text-3xl font-bold mt-1"><?= formatRupiah($pendapatan) ?></p>
                    <p class="text-emerald-100 text-xs mt-1"><?= $stats['approved'] ?> user × <?= NOMINAL_FORMATTED ?></p>
                </div>
                <div class="text-right">
                    <p class="text-emerald-100 text-sm">Potensi Pendapatan</p>
                    <p class="text-2xl font-bold mt-1"><?= formatRupiah(($stats['approved'] + $stats['pending']) * NOMINAL_PENDAFTARAN) ?></p>
                    <p class="text-emerald-100 text-xs mt-1">Termasuk <?= $stats['pending'] ?> pending</p>
                </div>
            </div>
        </div>

        <!-- Filter -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
            <p class="text-sm font-medium text-gray-700 mb-2">Filter Status:</p>
            <div class="flex flex-wrap gap-2">
                <?php
                $filters = [
                    'all' => '📋 Semua',
                    'pending' => '⏳ Menunggu',
                    'approved' => '✅ Disetujui',
                    'rejected' => '❌ Ditolak'
                ];
                foreach ($filters as $key => $label):
                    $active = $filter === $key ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200';
                ?>
                    <a href="?filter=<?= $key ?>" class="px-3 py-1.5 rounded-full text-xs font-medium <?= $active ?>">
                        <?= $label ?>
                    </a>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- Users List -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <?php if (count($users) === 0): ?>
                <div class="p-12 text-center text-gray-400">
                    <span class="text-4xl block mb-3">📋</span>
                    <p>Tidak ada data pada filter ini</p>
                </div>
            <?php else: ?>
                <div class="divide-y divide-gray-100">
                    <?php foreach ($users as $u): ?>
                        <div class="p-4 hover:bg-gray-50 transition-colors">
                            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div class="flex items-start gap-3 flex-1">
                                    <div class="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span class="text-xl"><?= $u['avatar'] ?></span>
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <div class="flex items-center gap-2 flex-wrap">
                                            <p class="font-bold text-gray-800"><?= e($u['nama']) ?></p>
                                            <span class="px-2 py-0.5 rounded-full text-xs font-medium border <?= $u['status_akun'] === 'pending' ? 'bg-amber-100 text-amber-700 border-amber-300' : ($u['status_akun'] === 'approved' ? 'bg-green-100 text-green-700 border-green-300' : 'bg-red-100 text-red-700 border-red-300') ?>">
                                                <?= statusAkunLabel($u['status_akun']) ?>
                                            </span>
                                            <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 border border-blue-200">
                                                <?= roleLabel($u['role']) ?>
                                            </span>
                                        </div>
                                        <p class="text-sm text-gray-500 mt-0.5"><?= e($u['email']) ?></p>
                                        <div class="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                            <span>📅 Daftar: <?= formatTanggal($u['tanggal_daftar']) ?></span>
                                            <span>💰 <?= NOMINAL_FORMATTED ?></span>
                                            <?php if ($u['bukti_file']): ?>
                                                <span>📎 <?= e($u['bukti_file']) ?></span>
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                </div>
                                <div class="flex items-center gap-2">
                                    <?php if ($u['status_akun'] === 'pending'): ?>
                                        <form method="POST" class="inline">
                                            <input type="hidden" name="user_id" value="<?= $u['id'] ?>">
                                            <input type="hidden" name="action" value="approve">
                                            <button type="submit" class="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-medium">✓ Setujui</button>
                                        </form>
                                        <form method="POST" class="inline" onsubmit="return confirm('Yakin ingin menolak user ini?');">
                                            <input type="hidden" name="user_id" value="<?= $u['id'] ?>">
                                            <input type="hidden" name="action" value="reject">
                                            <input type="text" name="catatan" placeholder="Alasan penolakan..." class="px-2 py-1.5 border rounded-lg text-xs w-40" required>
                                            <button type="submit" class="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs font-medium">✕ Tolak</button>
                                        </form>
                                    <?php else: ?>
                                        <span class="text-xs text-gray-400 italic">
                                            <?= $u['status_akun'] === 'approved' ? '✅ Disetujui' : '❌ Ditolak' ?>
                                            <?php if ($u['tanggal_verifikasi']): ?>
                                                pada <?= formatTanggal($u['tanggal_verifikasi']) ?>
                                            <?php endif; ?>
                                        </span>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
