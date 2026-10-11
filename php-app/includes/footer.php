<?php
/**
 * SICABA - Footer Template
 */
?>
<footer class="bg-gray-900 text-white mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <!-- Brand -->
            <div class="md:col-span-2">
                <div class="flex items-center mb-4">
                    <span class="text-3xl mr-3">🏛️</span>
                    <div>
                        <h3 class="text-lg font-bold">SICABA</h3>
                        <p class="text-sm text-gray-400">Sistem Informasi Cagar Budaya</p>
                    </div>
                </div>
                <p class="text-gray-400 text-sm leading-relaxed max-w-md">
                    Platform digital untuk mendokumentasikan dan menginformasikan cagar budaya 
                    di Kota Tasikmalaya. Bersama kita lestarikan warisan budaya untuk generasi mendatang.
                </p>
            </div>

            <!-- Quick Links -->
            <div>
                <h4 class="font-bold mb-4 text-emerald-400">Navigasi</h4>
                <ul class="space-y-2 text-sm text-gray-400">
                    <li><a href="<?= BASE_URL ?>/index.php" class="hover:text-white">Beranda</a></li>
                    <li><a href="<?= BASE_URL ?>/pages/cagar-budaya.php" class="hover:text-white">Cagar Budaya</a></li>
                    <li><a href="<?= BASE_URL ?>/pages/peta.php" class="hover:text-white">Peta Lokasi</a></li>
                    <li><a href="<?= BASE_URL ?>/pages/galeri.php" class="hover:text-white">Galeri</a></li>
                    <li><a href="<?= BASE_URL ?>/pages/statistik.php" class="hover:text-white">Statistik</a></li>
                    <li><a href="<?= BASE_URL ?>/pages/berita.php" class="hover:text-white">Berita</a></li>
                </ul>
            </div>

            <!-- Contact -->
            <div>
                <h4 class="font-bold mb-4 text-emerald-400">Kontak</h4>
                <ul class="space-y-3 text-sm text-gray-400">
                    <li class="flex items-start">
                        <span class="mr-2 mt-0.5">📍</span>
                        <span>Jl. Ir. H. Juanda No. 1<br>Tasikmalaya 46111</span>
                    </li>
                    <li class="flex items-center">
                        <span class="mr-2">📧</span> sicaba@tasikmalayakota.go.id
                    </li>
                    <li class="flex items-center">
                        <span class="mr-2">📞</span> (0265) 321234
                    </li>
                </ul>
            </div>
        </div>

        <!-- Bottom -->
        <div class="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p class="text-sm text-gray-500">
                © <?= date('Y') ?> SICABA - Dinas Kebudayaan Kota Tasikmalaya. All rights reserved.
            </p>
            <p class="text-xs text-gray-500 mt-4 md:mt-0">
                Dibuat dengan ❤️ untuk pelestarian budaya
            </p>
        </div>
    </div>
</footer>

<script src="<?= BASE_URL ?>/assets/js/app.js"></script>
</body>
</html>
