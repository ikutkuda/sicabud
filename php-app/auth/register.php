<?php
/**
 * SICABA - Register Page
 */
require_once __DIR__ . '/../config/config.php';

// Redirect if already logged in
if (isLoggedIn()) {
    redirect(BASE_URL . '/dashboard/index.php');
}

$step = $_POST['step'] ?? 1;
$error = '';
$success = '';

// Step 1: Data Akun
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $step == 1) {
    $nama = trim($_POST['nama'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $phone = trim($_POST['phone'] ?? '');
    $alamat = trim($_POST['alamat'] ?? '');
    $password = $_POST['password'] ?? '';
    $confirmPassword = $_POST['confirmPassword'] ?? '';
    
    if (empty($nama) || empty($email) || empty($password)) {
        $error = 'Mohon lengkapi semua field yang wajib diisi!';
    } elseif ($password !== $confirmPassword) {
        $error = 'Password dan konfirmasi password tidak cocok!';
    } elseif (strlen($password) < 6) {
        $error = 'Password minimal 6 karakter!';
    } else {
        // Check if email exists
        $db = getDB();
        $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            $error = 'Email sudah terdaftar!';
        } else {
            // Store in session for next step
            $_SESSION['register_data'] = [
                'nama' => $nama,
                'email' => $email,
                'phone' => $phone,
                'alamat' => $alamat,
                'password' => $password,
            ];
            $step = 2;
        }
    }
}

// Step 2: Pilih Role
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $step == 2) {
    $role = $_POST['role'] ?? 'public';
    $_SESSION['register_data']['role'] = $role;
    
    if ($role === 'manager' || $role === 'member') {
        $step = 3;
    } else {
        // Langsung daftar untuk public
        $data = $_SESSION['register_data'];
        $db = getDB();
        
        $stmt = $db->prepare("INSERT INTO users (nama, email, password, role, phone, alamat, status, status_akun, tanggal_daftar) VALUES (?, ?, ?, ?, ?, ?, 'aktif', 'approved', CURDATE())");
        $stmt->execute([$data['nama'], $data['email'], hashPassword($data['password']), $data['role'], $data['phone'], $data['alamat']]);
        
        $userId = $db->lastInsertId();
        $_SESSION['user_id'] = $userId;
        $_SESSION['user_role'] = $data['role'];
        $_SESSION['user_name'] = $data['nama'];
        
        unset($_SESSION['register_data']);
        logActivity('REGISTER', 'users', $userId, 'User registered: ' . $data['email']);
        
        redirect(BASE_URL . '/dashboard/index.php');
    }
}

// Step 3: Pembayaran
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $step == 3) {
    if (!isset($_FILES['bukti_bayar']) || $_FILES['bukti_bayar']['error'] !== UPLOAD_ERR_OK) {
        $error = 'Mohon upload bukti transfer!';
    } else {
        $upload = uploadFile($_FILES['bukti_bayar'], 'bukti_pembayaran');
        
        if (!$upload['success']) {
            $error = $upload['message'];
        } else {
            $data = $_SESSION['register_data'];
            $db = getDB();
            
            // Insert user
            $stmt = $db->prepare("INSERT INTO users (nama, email, password, role, phone, alamat, status, status_akun, tanggal_daftar) VALUES (?, ?, ?, ?, ?, ?, 'aktif', 'pending', CURDATE())");
            $stmt->execute([$data['nama'], $data['email'], hashPassword($data['password']), $data['role'], $data['phone'], $data['alamat']]);
            
            $userId = $db->lastInsertId();
            
            // Insert bukti pembayaran
            $stmt = $db->prepare("INSERT INTO bukti_pembayaran (user_id, nama_file, path_file, tipe_file, ukuran_file, nominal, rekening_tujuan, tanggal_upload, status_verifikasi) VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE(), 'pending')");
            $stmt->execute([$userId, $upload['filename'], $upload['path'], $upload['type'], $upload['size'], NOMINAL_PENDAFTARAN, REKENING_PEMBAYARAN]);
            
            $_SESSION['user_id'] = $userId;
            $_SESSION['user_role'] = $data['role'];
            $_SESSION['user_name'] = $data['nama'];
            
            unset($_SESSION['register_data']);
            logActivity('REGISTER', 'users', $userId, 'User registered with payment: ' . $data['email']);
            
            redirect(BASE_URL . '/auth/status-pendaftaran.php');
        }
    }
}

$pageTitle = 'Daftar Akun';
include __DIR__ . '/../includes/header.php';
?>

<div class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center py-12 px-4">
    <div class="max-w-2xl w-full">
        <!-- Logo -->
        <div class="text-center mb-6">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-600 rounded-2xl mb-4 shadow-lg">
                <span class="text-3xl">🏛️</span>
            </div>
            <h1 class="text-2xl font-bold text-gray-800">Daftar Akun Baru</h1>
            <p class="text-gray-500 mt-1">Bergabung dengan SICABA <?= APP_CITY ?></p>
        </div>

        <!-- Progress Steps -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
            <div class="flex items-center justify-between">
                <?php
                $requiresPayment = isset($_SESSION['register_data']['role']) && in_array($_SESSION['register_data']['role'], ['manager', 'member']);
                $steps = [
                    ['num' => 1, 'label' => 'Data Akun'],
                    ['num' => 2, 'label' => 'Pilih Role'],
                ];
                if ($requiresPayment || $step >= 3) {
                    $steps[] = ['num' => 3, 'label' => 'Pembayaran'];
                }
                
                foreach ($steps as $index => $s):
                    $active = $step >= $s['num'] ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500';
                    $completed = $step > $s['num'];
                ?>
                    <div class="flex items-center flex-1">
                        <div class="flex items-center justify-center w-8 h-8 rounded-full font-bold text-xs <?= $active ?>">
                            <?= $completed ? '✓' : $s['num'] ?>
                        </div>
                        <div class="ml-2 text-xs font-medium <?= $step >= $s['num'] ? 'text-emerald-600' : 'text-gray-500' ?>">
                            <?= $s['label'] ?>
                        </div>
                        <?php if ($index < count($steps) - 1): ?>
                            <div class="flex-1 h-1 mx-3 rounded <?= $step > $s['num'] ? 'bg-emerald-600' : 'bg-gray-200' ?>"></div>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <!-- Form -->
        <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
            <?php if ($error): ?>
                <div class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700 text-sm">
                    <span class="mr-2">⚠️</span> <?= e($error) ?>
                </div>
            <?php endif; ?>

            <!-- Step 1: Data Akun -->
            <?php if ($step == 1): ?>
                <form method="POST" class="space-y-4">
                    <input type="hidden" name="step" value="1">
                    <h2 class="text-lg font-bold text-gray-800 mb-2">Data Akun</h2>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap *</label>
                        <input type="text" name="nama" value="<?= e($_POST['nama'] ?? '') ?>" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Nama lengkap Anda" required>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">Email *</label>
                        <input type="email" name="email" value="<?= e($_POST['email'] ?? '') ?>" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="nama@email.com" required>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">No. Telepon</label>
                        <input type="tel" name="phone" value="<?= e($_POST['phone'] ?? '') ?>" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="08xxxxxxxxxx">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">Alamat</label>
                        <textarea name="alamat" rows="2" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none resize-none" placeholder="Alamat lengkap"><?= e($_POST['alamat'] ?? '') ?></textarea>
                    </div>

                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1.5">Password *</label>
                            <input type="password" name="password" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Min. 6 karakter" required>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1.5">Konfirmasi *</label>
                            <input type="password" name="confirmPassword" class="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Ulangi password" required>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                        <a href="<?= BASE_URL ?>/auth/login.php" class="text-sm text-gray-600 hover:text-emerald-600">← Sudah punya akun?</a>
                        <button type="submit" class="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm">Lanjut →</button>
                    </div>
                </form>
            <?php endif; ?>

            <!-- Step 2: Pilih Role -->
            <?php if ($step == 2): ?>
                <form method="POST" class="space-y-4">
                    <input type="hidden" name="step" value="2">
                    <h2 class="text-lg font-bold text-gray-800 mb-2">Pilih Jenis Akun</h2>
                    <p class="text-sm text-gray-600 mb-4">Pilih jenis akun yang sesuai dengan kebutuhan Anda.</p>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <!-- User Publik -->
                        <label class="p-5 border-2 rounded-xl cursor-pointer transition-all hover:border-emerald-300 <?= (isset($_POST['role']) && $_POST['role'] === 'public') || (!isset($_POST['role'])) ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200' ?>">
                            <input type="radio" name="role" value="public" class="hidden" <?= (!isset($_POST['role']) || $_POST['role'] === 'public') ? 'checked' : '' ?>>
                            <div class="flex items-center mb-2">
                                <span class="text-3xl mr-3">🌐</span>
                                <div>
                                    <p class="font-bold text-gray-800">User Publik</p>
                                    <p class="text-xs text-emerald-600 font-medium">GRATIS</p>
                                </div>
                            </div>
                            <p class="text-xs text-gray-600">Akses dasar: lihat cagar budaya, peta, galeri</p>
                        </label>

                        <!-- User Member -->
                        <label class="p-5 border-2 rounded-xl cursor-pointer transition-all hover:border-emerald-300 <?= (isset($_POST['role']) && $_POST['role'] === 'member') ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200' ?>">
                            <input type="radio" name="role" value="member" class="hidden" <?= (isset($_POST['role']) && $_POST['role'] === 'member') ? 'checked' : '' ?>>
                            <div class="flex items-center mb-2">
                                <span class="text-3xl mr-3">👤</span>
                                <div>
                                    <p class="font-bold text-gray-800">User Member</p>
                                    <p class="text-xs text-amber-600 font-medium"><?= NOMINAL_FORMATTED ?></p>
                                </div>
                            </div>
                            <p class="text-xs text-gray-600">Akses penuh: bookmark, komentar, daftar ODCB</p>
                        </label>

                        <!-- Manager -->
                        <label class="p-5 border-2 rounded-xl cursor-pointer transition-all hover:border-emerald-300 <?= (isset($_POST['role']) && $_POST['role'] === 'manager') ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200' ?>">
                            <input type="radio" name="role" value="manager" class="hidden" <?= (isset($_POST['role']) && $_POST['role'] === 'manager') ? 'checked' : '' ?>>
                            <div class="flex items-center mb-2">
                                <span class="text-3xl mr-3">📋</span>
                                <div>
                                    <p class="font-bold text-gray-800">User Manager</p>
                                    <p class="text-xs text-amber-600 font-medium"><?= NOMINAL_FORMATTED ?></p>
                                </div>
                            </div>
                            <p class="text-xs text-gray-600">Kelola konten, review ODCB, laporan</p>
                        </label>

                        <!-- Admin (disabled) -->
                        <div class="p-5 border-2 border-gray-200 rounded-xl opacity-50 cursor-not-allowed">
                            <div class="flex items-center mb-2">
                                <span class="text-3xl mr-3">👑</span>
                                <div>
                                    <p class="font-bold text-gray-800">Administrator</p>
                                    <p class="text-xs text-gray-500">Hanya via undangan</p>
                                </div>
                            </div>
                            <p class="text-xs text-gray-500">Akses penuh sistem (tidak tersedia untuk pendaftaran umum)</p>
                        </div>
                    </div>

                    <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                        <button type="button" onclick="history.back()" class="px-4 py-2 border border-gray-200 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50">← Kembali</button>
                        <button type="submit" class="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm">Lanjut →</button>
                    </div>
                </form>
            <?php endif; ?>

            <!-- Step 3: Pembayaran -->
            <?php if ($step == 3): ?>
                <form method="POST" enctype="multipart/form-data" class="space-y-4">
                    <input type="hidden" name="step" value="3">
                    <h2 class="text-lg font-bold text-gray-800 mb-2">Pembayaran & Bukti Transfer</h2>

                    <!-- Info Rekening -->
                    <div class="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5">
                        <h3 class="font-bold text-gray-800 mb-3 flex items-center">
                            <span class="mr-2">🏦</span> Informasi Rekening Pembayaran
                        </h3>
                        <div class="space-y-2 text-sm">
                            <div class="flex justify-between">
                                <span class="text-gray-600">Nominal:</span>
                                <span class="font-bold text-emerald-700 text-lg"><?= NOMINAL_FORMATTED ?></span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Bank:</span>
                                <span class="font-medium text-gray-800"><?= BANK_PEMBAYARAN ?></span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-gray-600">No. Rekening:</span>
                                <div class="flex items-center gap-2">
                                    <span class="font-mono font-bold text-gray-800"><?= REKENING_PEMBAYARAN ?></span>
                                    <button type="button" onclick="navigator.clipboard.writeText('<?= REKENING_PEMBAYARAN ?>')" class="text-xs px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200">📋 Salin</button>
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-600">Atas Nama:</span>
                                <span class="font-medium text-gray-800"><?= ATAS_NAMA_REKENING ?></span>
                            </div>
                        </div>
                    </div>

                    <!-- Upload Bukti -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Upload Bukti Transfer *</label>
                        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <span class="text-4xl block mb-2">📤</span>
                            <p class="text-sm text-gray-600 mb-2">Upload foto/screenshot bukti transfer</p>
                            <input type="file" name="bukti_bayar" accept="image/*" class="block mx-auto text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" required>
                            <p class="text-xs text-gray-400 mt-2">Format: JPG, PNG. Max 5MB</p>
                        </div>
                    </div>

                    <div class="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <label class="flex items-start">
                            <input type="checkbox" required class="w-4 h-4 mt-0.5 text-emerald-600 border-gray-300 rounded">
                            <span class="ml-2 text-xs text-gray-600">
                                Saya menyatakan bahwa bukti transfer yang saya upload adalah asli dan valid. 
                                Saya memahami bahwa akun akan diaktifkan setelah verifikasi oleh Administrator.
                            </span>
                        </label>
                    </div>

                    <div class="flex items-center justify-between pt-4 border-t border-gray-200">
                        <button type="button" onclick="history.back()" class="px-4 py-2 border border-gray-200 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50">← Kembali</button>
                        <button type="submit" class="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm">✓ Ajukan Pendaftaran</button>
                    </div>
                </form>
            <?php endif; ?>
        </div>

        <div class="mt-4 text-center">
            <a href="<?= BASE_URL ?>/index.php" class="text-sm text-gray-500 hover:text-gray-700">← Kembali ke Beranda</a>
        </div>
    </div>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
