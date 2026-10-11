<?php
/**
 * SICABA - Navbar Template
 */
$currentPage = basename($_SERVER['PHP_SELF']);
$currentUser = currentUser();
?>
<nav class="bg-gradient-to-r from-emerald-800 to-emerald-900 text-white shadow-lg sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
            <!-- Logo -->
            <a href="<?= BASE_URL ?>/index.php" class="flex items-center">
                <span class="text-2xl">🏛️</span>
                <div class="ml-3">
                    <p class="text-sm font-bold leading-tight">SICABA</p>
                    <p class="text-xs text-emerald-200 leading-tight"><?= APP_CITY ?></p>
                </div>
            </a>

            <!-- Desktop Navigation -->
            <div class="hidden lg:flex items-center space-x-1">
                <?php
                $navItems = [
                    ['url' => '/index.php', 'label' => 'Beranda', 'file' => 'index.php'],
                    ['url' => '/pages/cagar-budaya.php', 'label' => 'Cagar Budaya', 'file' => 'cagar-budaya.php'],
                    ['url' => '/pages/peta.php', 'label' => 'Peta', 'file' => 'peta.php'],
                    ['url' => '/pages/galeri.php', 'label' => 'Galeri', 'file' => 'galeri.php'],
                    ['url' => '/pages/statistik.php', 'label' => 'Statistik', 'file' => 'statistik.php'],
                    ['url' => '/pages/berita.php', 'label' => 'Berita', 'file' => 'berita.php'],
                    ['url' => '/pages/odcb.php', 'label' => 'ODCB', 'file' => 'odcb.php'],
                    ['url' => '/pages/faq.php', 'label' => 'FAQ', 'file' => 'faq.php'],
                    ['url' => '/pages/database.php', 'label' => 'Database', 'file' => 'database.php'],
                ];
                foreach ($navItems as $item):
                    $active = $currentPage === $item['file'] ? 'bg-emerald-600 text-white' : 'text-emerald-100 hover:bg-emerald-700';
                ?>
                    <a href="<?= BASE_URL . $item['url'] ?>" class="px-3 py-2 rounded-md text-sm font-medium <?= $active ?>">
                        <?= $item['label'] ?>
                    </a>
                <?php endforeach; ?>
            </div>

            <!-- User Menu / Login -->
            <div class="hidden lg:flex items-center">
                <?php if (isLoggedIn()): ?>
                    <div class="relative" x-data="{ open: false }">
                        <button onclick="document.getElementById('userMenu').classList.toggle('hidden')" 
                                class="flex items-center space-x-2 px-3 py-2 rounded-lg <?= $currentUser['status_akun'] === 'pending' ? 'bg-amber-600' : 'bg-emerald-700' ?> hover:opacity-90 transition">
                            <span class="text-lg"><?= $currentUser['avatar'] ?></span>
                            <div class="text-left">
                                <p class="text-xs font-medium leading-tight"><?= e($currentUser['nama']) ?></p>
                                <p class="text-xs opacity-80 leading-tight">
                                    <?= $currentUser['status_akun'] === 'pending' ? '⏳ Menunggu Verifikasi' : roleLabel($currentUser['role']) ?>
                                </p>
                            </div>
                        </button>
                        <div id="userMenu" class="hidden absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                            <div class="px-4 py-3 border-b border-gray-100">
                                <p class="text-sm font-bold text-gray-800"><?= e($currentUser['nama']) ?></p>
                                <p class="text-xs text-gray-500"><?= e($currentUser['email']) ?></p>
                            </div>
                            <div class="py-1">
                                <?php if ($currentUser['status_akun'] === 'pending'): ?>
                                    <a href="<?= BASE_URL ?>/auth/status-pendaftaran.php" class="block px-4 py-2 text-sm text-amber-700 hover:bg-amber-50">⏳ Status Pendaftaran</a>
                                <?php endif; ?>
                                <a href="<?= BASE_URL ?>/dashboard/index.php" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">📊 Dashboard</a>
                                <a href="<?= BASE_URL ?>/auth/profil.php" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">👤 Profil Saya</a>
                            </div>
                            <div class="border-t border-gray-100 py-1">
                                <a href="<?= BASE_URL ?>/auth/logout.php" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-50">🚪 Keluar</a>
                            </div>
                        </div>
                    </div>
                <?php else: ?>
                    <a href="<?= BASE_URL ?>/auth/login.php" class="px-4 py-2 text-sm font-medium text-emerald-100 hover:text-white hover:bg-emerald-700 rounded-lg">Masuk</a>
                    <a href="<?= BASE_URL ?>/auth/register.php" class="px-4 py-2 text-sm font-bold bg-amber-500 hover:bg-amber-400 text-emerald-900 rounded-lg ml-2">Daftar</a>
                <?php endif; ?>
            </div>

            <!-- Mobile menu button -->
            <div class="lg:hidden flex items-center space-x-2">
                <?php if (isLoggedIn()): ?>
                    <a href="<?= BASE_URL ?>/dashboard/index.php" class="px-3 py-1.5 rounded-lg bg-emerald-700 text-sm">
                        <span><?= $currentUser['avatar'] ?></span>
                    </a>
                <?php else: ?>
                    <a href="<?= BASE_URL ?>/auth/login.php" class="px-3 py-1.5 text-sm font-medium bg-amber-500 text-emerald-900 rounded-lg">Masuk</a>
                <?php endif; ?>
                <button onclick="document.getElementById('mobileMenu').classList.toggle('hidden')" class="p-2 rounded-md text-emerald-200 hover:bg-emerald-700">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Navigation -->
    <div id="mobileMenu" class="hidden lg:hidden bg-emerald-800 border-t border-emerald-700">
        <div class="px-2 pt-2 pb-3 space-y-1">
            <?php foreach ($navItems as $item): ?>
                <a href="<?= BASE_URL . $item['url'] ?>" class="block px-3 py-2 rounded-md text-base font-medium text-emerald-100 hover:bg-emerald-700">
                    <?= $item['label'] ?>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</nav>
