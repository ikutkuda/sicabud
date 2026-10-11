<?php
/**
 * SICABA - Sistem Informasi Cagar Budaya Kota Tasikmalaya
 * Konfigurasi Database & Helper Functions
 */

// Error reporting (development)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Session
session_start();

// Timezone
date_default_timezone_set('Asia/Jakarta');

// ============================================================================
// DATABASE CONFIGURATION
// ============================================================================
define('DB_HOST', 'localhost');
define('DB_NAME', 'sicaba_db');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// ============================================================================
// APP CONFIGURATION
// ============================================================================
define('APP_NAME', 'SICABA');
define('APP_FULLNAME', 'Sistem Informasi Cagar Budaya');
define('APP_CITY', 'Kota Tasikmalaya');
define('BASE_URL', 'http://localhost/sicaba');
define('UPLOAD_DIR', __DIR__ . '/../uploads/');

// Info Pembayaran
define('NOMINAL_PENDAFTARAN', 110000);
define('NOMINAL_FORMATTED', 'Rp 110.000,-');
define('BANK_PEMBAYARAN', 'BRI (Bank Rakyat Indonesia)');
define('REKENING_PEMBAYARAN', '445301021768537');
define('ATAS_NAMA_REKENING', 'Agus Wirabudiman');

// ============================================================================
// DATABASE CONNECTION
// ============================================================================
function getDB() {
    static $pdo = null;
    if ($pdo === null) {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            $pdo = new PDO($dsn, DB_USER, DB_PASS, [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
            ]);
        } catch (PDOException $e) {
            die("Koneksi database gagal: " . $e->getMessage());
        }
    }
    return $pdo;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Sanitize input
function e($string) {
    return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
}

// Redirect
function redirect($url) {
    header("Location: " . $url);
    exit;
}

// Check if user is logged in
function isLoggedIn() {
    return isset($_SESSION['user_id']);
}

// Get current user
function currentUser() {
    if (!isLoggedIn()) return null;
    $db = getDB();
    $stmt = $db->prepare("SELECT * FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['user_id']]);
    return $stmt->fetch();
}

// Check role
function isAdmin() {
    $user = currentUser();
    return $user && $user['role'] === 'admin';
}

function isManager() {
    $user = currentUser();
    return $user && $user['role'] === 'manager';
}

function isMember() {
    $user = currentUser();
    return $user && $user['role'] === 'member';
}

function isPublic() {
    $user = currentUser();
    return $user && $user['role'] === 'public';
}

// Require login
function requireLogin() {
    if (!isLoggedIn()) {
        $_SESSION['flash_error'] = 'Silakan login terlebih dahulu!';
        redirect(BASE_URL . '/auth/login.php');
    }
}

// Require admin
function requireAdmin() {
    requireLogin();
    if (!isAdmin()) {
        $_SESSION['flash_error'] = 'Akses ditolak!';
        redirect(BASE_URL . '/index.php');
    }
}

// Require manager or admin
function requireManager() {
    requireLogin();
    if (!isAdmin() && !isManager()) {
        $_SESSION['flash_error'] = 'Akses ditolak!';
        redirect(BASE_URL . '/index.php');
    }
}

// Flash messages
function setFlash($type, $message) {
    $_SESSION['flash_' . $type] = $message;
}

function getFlash($type) {
    if (isset($_SESSION['flash_' . $type])) {
        $msg = $_SESSION['flash_' . $type];
        unset($_SESSION['flash_' . $type]);
        return $msg;
    }
    return null;
}

function displayFlash() {
    $types = ['success' => 'bg-green-50 border-green-200 text-green-700',
              'error' => 'bg-red-50 border-red-200 text-red-700',
              'warning' => 'bg-amber-50 border-amber-200 text-amber-700',
              'info' => 'bg-blue-50 border-blue-200 text-blue-700'];
    $icons = ['success' => '✅', 'error' => '❌', 'warning' => '⚠️', 'info' => 'ℹ️'];
    
    foreach ($types as $type => $class) {
        $msg = getFlash($type);
        if ($msg) {
            echo "<div class='p-3 mb-4 border rounded-lg flex items-center text-sm {$class}'>";
            echo "<span class='mr-2'>{$icons[$type]}</span> {$msg}";
            echo "</div>";
        }
    }
}

// Format currency
function formatRupiah($amount) {
    return 'Rp ' . number_format($amount, 0, ',', '.');
}

// Format date
function formatTanggal($date) {
    if (!$date) return '-';
    $bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    $timestamp = strtotime($date);
    return date('d', $timestamp) . ' ' . $bulan[date('n', $timestamp) - 1] . ' ' . date('Y', $timestamp);
}

// Hash password
function hashPassword($password) {
    return password_hash($password, PASSWORD_BCRYPT);
}

// Verify password
function verifyPassword($password, $hash) {
    return password_verify($password, $hash);
}

// Generate CSRF token
function csrfToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

function csrfField() {
    return '<input type="hidden" name="csrf_token" value="' . csrfToken() . '">';
}

function verifyCsrf() {
    if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
        die('CSRF token invalid!');
    }
}

// Upload file
function uploadFile($file, $folder = 'general') {
    $uploadDir = UPLOAD_DIR . $folder . '/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowed = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx'];
    
    if (!in_array($ext, $allowed)) {
        return ['success' => false, 'message' => 'Format file tidak didukung!'];
    }
    
    if ($file['size'] > 10 * 1024 * 1024) {
        return ['success' => false, 'message' => 'Ukuran file maksimal 10MB!'];
    }
    
    $filename = uniqid() . '_' . time() . '.' . $ext;
    $path = $uploadDir . $filename;
    
    if (move_uploaded_file($file['tmp_name'], $path)) {
        return [
            'success' => true,
            'filename' => $filename,
            'path' => 'uploads/' . $folder . '/' . $filename,
            'size' => number_format($file['size'] / 1024 / 1024, 2) . ' MB',
            'type' => $ext
        ];
    }
    
    return ['success' => false, 'message' => 'Gagal mengupload file!'];
}

// Log activity
function logActivity($aksi, $tabel = null, $recordId = null, $deskripsi = null) {
    $db = getDB();
    $userId = isLoggedIn() ? $_SESSION['user_id'] : null;
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    
    $stmt = $db->prepare("INSERT INTO log_aktivitas (user_id, aksi, tabel, record_id, deskripsi, ip_address, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([$userId, $aksi, $tabel, $recordId, $deskripsi, $ip, $userAgent]);
}

// Pagination
function paginate($total, $perPage = 10, $currentPage = 1) {
    $totalPages = ceil($total / $perPage);
    return [
        'total' => $total,
        'per_page' => $perPage,
        'current_page' => $currentPage,
        'total_pages' => $totalPages,
        'offset' => ($currentPage - 1) * $perPage
    ];
}

// Status labels
function statusPenetapanLabel($status) {
    $labels = [
        'Belum Ditetapkan' => '⏳ Belum Ditetapkan',
        'Kota/Kabupaten' => '🏙️ Tingkat Kota/Kabupaten',
        'Provinsi' => '🏔️ Tingkat Provinsi',
        'Nasional' => '🇮🇩 Tingkat Nasional',
    ];
    return $labels[$status] ?? $status;
}

function statusAkunLabel($status) {
    $labels = [
        'pending' => '⏳ Menunggu Persetujuan',
        'approved' => '✅ Disetujui',
        'rejected' => '❌ Ditolak',
    ];
    return $labels[$status] ?? $status;
}

function statusODCBLabel($status) {
    $labels = [
        'Diajukan' => '📤 Diajukan',
        'Diperiksa' => '🔍 Sedang Diperiksa',
        'Direvisi' => '✏️ Perlu Revisi',
        'Ditolak' => '❌ Ditolak',
        'Disetujui' => '✅ Disetujui',
    ];
    return $labels[$status] ?? $status;
}

function roleLabel($role) {
    $labels = [
        'admin' => '👑 Administrator',
        'manager' => '📋 Manager',
        'member' => '👤 User Member',
        'public' => '🌐 User Publik',
    ];
    return $labels[$role] ?? $role;
}
