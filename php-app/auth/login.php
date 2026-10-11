<?php
/**
 * SICABA - Login Page
 */
require_once __DIR__ . '/../config/config.php';

// Redirect if already logged in
if (isLoggedIn()) {
    redirect(BASE_URL . '/dashboard/index.php');
}

$error = '';
$errorType = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';
    
    if (empty($email) || empty($password)) {
        $error = 'Email dan password wajib diisi!';
    } else {
        $db = getDB();
        $stmt = $db->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        if (!$user || !verifyPassword($password, $user['password'])) {
            $error = 'Email atau password salah!';
            $errorType = 'INVALID_CREDENTIALS';
        } elseif ($user['status'] === 'nonaktif') {
            $error = 'Akun Anda telah dinonaktifkan. Hubungi administrator.';
            $errorType = 'ACCOUNT_DISABLED';
        } elseif (($user['role'] === 'manager' || $user['role'] === 'member') && $user['status_akun'] === 'pending') {
            $error = 'Akun Anda masih menunggu persetujuan Administrator. Silakan cek status pendaftaran Anda.';
            $errorType = 'PENDING_APPROVAL';
        } elseif (($user['role'] === 'manager' || $user['role'] === 'member') && $user['status_akun'] === 'rejected') {
            $error = 'Pendaftaran Anda ditolak. ' . ($user['catatan_admin'] ?: 'Silakan hubungi administrator.');
            $errorType = 'REJECTED';
        } else {
            // Login success
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['user_role'] = $user['role'];
            $_SESSION['user_name'] = $user['nama'];
            
            // Update last login
            $stmt = $db->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
            $stmt->execute([$user['id']]);
            
            logActivity('LOGIN', 'users', $user['id'], 'User login: ' . $user['email']);
            
            redirect(BASE_URL . '/dashboard/index.php');
        }
    }
}

$pageTitle = 'Login';
include __DIR__ . '/../includes/header.php';
?>

<div class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center py-12 px-4">
    <div class="max-w-md w-full">
        <!-- Logo -->
        <div class="text-center mb-6">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-4 shadow-lg">
                <span class="text-3xl">🏛️</span>
            </div>
            <h1 class="text-2xl font-bold text-gray-800">Masuk ke SICABA</h1>
            <p class="text-gray-500 mt-1">Sistem Informasi Cagar Budaya <?= APP_CITY ?></p>
        </div>

        <!-- Form -->
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            <?php if ($error): ?>
                <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start text-red-700 text-sm">
                    <span class="mr-2 text-lg">⚠️</span>
                    <div class="flex-1">
                        <p><?= e($error) ?></p>
                        <?php if ($errorType === 'PENDING_APPROVAL'): ?>
                            <a href="<?= BASE_URL ?>/auth/status-pendaftaran.php" class="mt-2 text-xs font-bold underline hover:no-underline block">→ Lihat Status Pendaftaran</a>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endif; ?>

            <form method="POST" class="space-y-5">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">📧</span>
                        <input type="email" name="email" value="<?= e($_POST['email'] ?? '') ?>" class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="nama@email.com" required>
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                    <div class="relative">
                        <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔒</span>
                        <input type="password" name="password" class="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" placeholder="••••••••" required>
                    </div>
                </div>

                <button type="submit" class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    Masuk
                </button>
            </form>

            <div class="mt-6 text-center">
                <p class="text-sm text-gray-600">
                    Belum punya akun? 
                    <a href="<?= BASE_URL ?>/auth/register.php" class="text-emerald-600 hover:text-emerald-700 font-bold">Daftar Sekarang</a>
                </p>
            </div>
        </div>

        <!-- Demo Accounts -->
        <div class="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 class="text-sm font-bold text-gray-700 mb-3 flex items-center">
                <span class="mr-2">💡</span> Akun Demo (Klik untuk mengisi)
            </h3>
            <div class="grid grid-cols-2 gap-2">
                <?php
                $demoAccounts = [
                    ['role' => 'Admin', 'email' => 'admin@sicaba.go.id', 'pass' => 'admin123', 'icon' => '👑', 'color' => 'border-red-200 bg-red-50'],
                    ['role' => 'Manager', 'email' => 'manager@sicaba.go.id', 'pass' => 'manager123', 'icon' => '📋', 'color' => 'border-blue-200 bg-blue-50'],
                    ['role' => 'Member', 'email' => 'member@sicaba.go.id', 'pass' => 'member123', 'icon' => '👤', 'color' => 'border-emerald-200 bg-emerald-50'],
                    ['role' => 'Public', 'email' => 'public@sicaba.go.id', 'pass' => 'public123', 'icon' => '🌐', 'color' => 'border-gray-200 bg-gray-50'],
                ];
                foreach ($demoAccounts as $acc):
                ?>
                    <button onclick="document.querySelector('[name=email]').value='<?= $acc['email'] ?>'; document.querySelector('[name=password]').value='<?= $acc['pass'] ?>';" class="flex items-center p-2.5 rounded-lg border <?= $acc['color'] ?> hover:shadow-sm transition-all text-left">
                        <span class="text-lg mr-2"><?= $acc['icon'] ?></span>
                        <div>
                            <p class="text-xs font-bold text-gray-700"><?= $acc['role'] ?></p>
                            <p class="text-xs text-gray-400 truncate"><?= $acc['email'] ?></p>
                        </div>
                    </button>
                <?php endforeach; ?>
            </div>
        </div>

        <div class="mt-4 text-center">
            <a href="<?= BASE_URL ?>/index.php" class="text-sm text-gray-500 hover:text-gray-700">← Kembali ke Beranda</a>
        </div>
    </div>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
