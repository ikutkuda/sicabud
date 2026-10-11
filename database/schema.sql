-- ============================================================================
-- SISTEM INFORMASI CAGAR BUDAYA (SICABA) KOTA TASIKMALAYA
-- Database Schema - MySQL 8.0+
-- Versi: 1.0.0
-- Tanggal: 2024
-- ============================================================================

-- Drop database jika sudah ada (untuk development)
DROP DATABASE IF EXISTS sicaba_db;
CREATE DATABASE sicaba_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sicaba_db;

-- ============================================================================
-- 1. TABEL USERS (Pengguna Sistem)
-- ============================================================================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL COMMENT 'Hash bcrypt',
    role ENUM('admin', 'manager', 'member', 'public') NOT NULL DEFAULT 'public',
    avatar VARCHAR(50) DEFAULT '👤',
    phone VARCHAR(20) DEFAULT NULL,
    alamat TEXT DEFAULT NULL,
    status ENUM('aktif', 'nonaktif') NOT NULL DEFAULT 'aktif',
    status_akun ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
    tanggal_daftar DATE NOT NULL,
    last_login DATETIME DEFAULT NULL,
    tanggal_verifikasi DATE DEFAULT NULL,
    catatan_admin TEXT DEFAULT NULL,
    verified_by INT DEFAULT NULL COMMENT 'FK ke users.id (admin yang verifikasi)',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_users_email (email),
    INDEX idx_users_role (role),
    INDEX idx_users_status_akun (status_akun),
    INDEX idx_users_status (status),
    
    CONSTRAINT fk_users_verified_by FOREIGN KEY (verified_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================================
-- 2. TABEL BUKTI_PEMBAYARAN (Bukti Transfer Pendaftaran)
-- ============================================================================
CREATE TABLE bukti_pembayaran (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    nama_file VARCHAR(255) NOT NULL,
    path_file VARCHAR(500) NOT NULL,
    tipe_file VARCHAR(10) NOT NULL DEFAULT 'jpg',
    ukuran_file VARCHAR(20) NOT NULL,
    nominal DECIMAL(12,2) NOT NULL DEFAULT 110000.00,
    rekening_tujuan VARCHAR(30) NOT NULL,
    bank_tujuan VARCHAR(50) NOT NULL DEFAULT 'BRI',
    atas_nama_rekening VARCHAR(100) NOT NULL DEFAULT 'Agus Wirabudiman',
    tanggal_upload DATE NOT NULL,
    status_verifikasi ENUM('pending', 'valid', 'invalid') NOT NULL DEFAULT 'pending',
    catatan VARCHAR(500) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_bukti_user (user_id),
    INDEX idx_bukti_status (status_verifikasi),
    
    CONSTRAINT fk_bukti_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================================
-- 3. TABEL JENIS_CAGAR_BUDAYA (Sesuai UU No. 11 Tahun 2010)
-- ============================================================================
CREATE TABLE jenis_cagar_budaya (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_jenis ENUM('Benda', 'Bangunan', 'Struktur', 'Situs', 'Kawasan') NOT NULL UNIQUE,
    ikon VARCHAR(10) DEFAULT '🏛️',
    deskripsi TEXT DEFAULT NULL,
    definisi_uu TEXT DEFAULT NULL COMMENT 'Definisi menurut UU No. 11 Tahun 2010',
    contoh TEXT DEFAULT NULL COMMENT 'Contoh-contoh dalam format JSON array',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================================
-- 4. TABEL KATEGORI_CAGAR_BUDAYA
-- ============================================================================
CREATE TABLE kategori_cagar_budaya (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_kategori VARCHAR(50) NOT NULL UNIQUE,
    ikon VARCHAR(10) DEFAULT '🏛️',
    deskripsi TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ============================================================================
-- 5. TABEL CAGAR_BUDAYA (Data Utama Cagar Budaya)
-- ============================================================================
CREATE TABLE cagar_budaya (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(200) NOT NULL,
    jenis_id INT NOT NULL COMMENT 'Jenis CB sesuai UU No. 11/2010: Benda/Bangunan/Struktur/Situs/Kawasan',
    kategori_id INT NOT NULL,
    lokasi TEXT NOT NULL,
    kecamatan VARCHAR(50) NOT NULL,
    tahun_berdiri VARCHAR(50) NOT NULL,
    deskripsi TEXT NOT NULL,
    sejarah TEXT NOT NULL,
    arsitektur TEXT NOT NULL,
    status_penetapan ENUM('Belum Ditetapkan', 'Kota/Kabupaten', 'Provinsi', 'Nasional') NOT NULL DEFAULT 'Belum Ditetapkan',
    nomor_sk VARCHAR(100) DEFAULT NULL,
    tanggal_penetapan DATE DEFAULT NULL,
    latitude DECIMAL(10, 7) DEFAULT NULL,
    longitude DECIMAL(10, 7) DEFAULT NULL,
    gambar VARCHAR(255) DEFAULT NULL,
    created_by INT DEFAULT NULL,
    updated_by INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_cb_kategori (kategori_id),
    INDEX idx_cb_status (status_penetapan),
    INDEX idx_cb_kecamatan (kecamatan),
    INDEX idx_cb_tahun (tahun_berdiri),
    INDEX idx_cb_koordinat (latitude, longitude),
    
    CONSTRAINT fk_cb_jenis FOREIGN KEY (jenis_id) REFERENCES jenis_cagar_budaya(id) ON DELETE RESTRICT,
    CONSTRAINT fk_cb_kategori FOREIGN KEY (kategori_id) REFERENCES kategori_cagar_budaya(id) ON DELETE RESTRICT,
    CONSTRAINT fk_cb_created_by FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_cb_updated_by FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================================
-- 5. TABEL FASILITAS_CAGAR_BUDAYA
-- ============================================================================
CREATE TABLE fasilitas_cagar_budaya (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cagar_budaya_id INT NOT NULL,
    nama_fasilitas VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_fasilitas_cb (cagar_budaya_id),
    
    CONSTRAINT fk_fasilitas_cb FOREIGN KEY (cagar_budaya_id) REFERENCES cagar_budaya(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================================
-- 6. TABEL LAMPIRAN (Dokumen Lampiran Cagar Budaya)
-- ============================================================================
CREATE TABLE lampiran (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cagar_budaya_id INT NOT NULL,
    nama_file VARCHAR(255) NOT NULL,
    path_file VARCHAR(500) NOT NULL,
    tipe_file ENUM('pdf', 'doc', 'jpg', 'png', 'sk', 'foto', 'peta', 'sertifikat') NOT NULL,
    ukuran_file VARCHAR(20) NOT NULL,
    deskripsi TEXT NOT NULL,
    tanggal_upload DATE NOT NULL,
    uploaded_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_lampiran_cb (cagar_budaya_id),
    INDEX idx_lampiran_tipe (tipe_file),
    INDEX idx_lampiran_uploader (uploaded_by),
    
    CONSTRAINT fk_lampiran_cb FOREIGN KEY (cagar_budaya_id) REFERENCES cagar_budaya(id) ON DELETE CASCADE,
    CONSTRAINT fk_lampiran_uploader FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ============================================================================
-- 7. TABEL ODCB (Objek Diduga Cagar Budaya)
-- ============================================================================
CREATE TABLE odcb (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_odcb VARCHAR(200) NOT NULL,
    jenis_odcb ENUM('Bangunan', 'Struktur', 'Situs Arkeologi', 'Benda Budaya', 'Kawasan Bersejarah', 'Lainnya') NOT NULL,
    lokasi TEXT NOT NULL,
    kecamatan VARCHAR(50) NOT NULL,
    deskripsi TEXT NOT NULL,
    perkiraan_umur VARCHAR(50) NOT NULL,
    kondisi ENUM('Baik', 'Cukup Baik', 'Kurang Baik', 'Rusak Ringan', 'Rusak Berat') NOT NULL,
    latitude DECIMAL(10, 7) DEFAULT NULL,
    longitude DECIMAL(10, 7) DEFAULT NULL,
    
    -- Data Pendaftar
    pendaftar_id INT NOT NULL,
    pendaftar_nama VARCHAR(100) NOT NULL,
    pendaftar_email VARCHAR(100) NOT NULL,
    pendaftar_phone VARCHAR(20) DEFAULT NULL,
    pendaftar_alamat TEXT DEFAULT NULL,
    
    -- Identitas
    jenis_identitas ENUM('KTP', 'SIM') NOT NULL,
    nomor_identitas VARCHAR(30) NOT NULL,
    
    -- Status
    status ENUM('Diajukan', 'Diperiksa', 'Direvisi', 'Ditolak', 'Disetujui') NOT NULL DEFAULT 'Diajukan',
    tanggal_pengajuan DATE NOT NULL,
    tanggal_update DATE NOT NULL,
    catatan_manager TEXT DEFAULT NULL,
    reviewed_by INT DEFAULT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_odcb_status (status),
    INDEX idx_odcb_pendaftar (pendaftar_id),
    INDEX idx_odcb_reviewer (reviewed_by),
    INDEX idx_odcb_jenis (jenis_odcb),
    INDEX idx_odcb_kecamatan (kecamatan),
    
    CONSTRAINT fk_odcb_pendaftar FOREIGN KEY (pendaftar_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_odcb_reviewer FOREIGN KEY (reviewed_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================================
-- 8. TABEL ODCB_FOTO_IDENTITAS (Foto KTP/SIM Pendaftar)
-- ============================================================================
CREATE TABLE odcb_foto_identitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    odcb_id INT NOT NULL,
    nama_file VARCHAR(255) NOT NULL,
    path_file VARCHAR(500) NOT NULL,
    tipe_file VARCHAR(10) NOT NULL DEFAULT 'jpg',
    ukuran_file VARCHAR(20) NOT NULL,
    deskripsi VARCHAR(255) DEFAULT NULL,
    tanggal_upload DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_foto_id_odcb (odcb_id),
    
    CONSTRAINT fk_foto_id_odcb FOREIGN KEY (odcb_id) REFERENCES odcb(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================================
-- 9. TABEL ODCB_FOTO_OBJEK (Foto-foto ODCB)
-- ============================================================================
CREATE TABLE odcb_foto_objek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    odcb_id INT NOT NULL,
    nama_file VARCHAR(255) NOT NULL,
    path_file VARCHAR(500) NOT NULL,
    tipe_file VARCHAR(10) NOT NULL DEFAULT 'jpg',
    ukuran_file VARCHAR(20) NOT NULL,
    deskripsi VARCHAR(255) DEFAULT NULL,
    tanggal_upload DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_foto_obj_odcb (odcb_id),
    
    CONSTRAINT fk_foto_obj_odcb FOREIGN KEY (odcb_id) REFERENCES odcb(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================================
-- 10. TABEL ARTIKEL (Berita & Artikel)
-- ============================================================================
CREATE TABLE artikel (
    id INT AUTO_INCREMENT PRIMARY KEY,
    judul VARCHAR(255) NOT NULL,
    excerpt TEXT NOT NULL,
    konten LONGTEXT NOT NULL,
    kategori VARCHAR(50) NOT NULL,
    author VARCHAR(100) NOT NULL,
    tanggal_publikasi DATE NOT NULL,
    waktu_baca VARCHAR(20) NOT NULL,
    gambar VARCHAR(255) DEFAULT NULL,
    views INT DEFAULT 0,
    published_by INT DEFAULT NULL,
    status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_artikel_kategori (kategori),
    INDEX idx_artikel_tanggal (tanggal_publikasi),
    INDEX idx_artikel_status (status),
    INDEX idx_artikel_author (author),
    
    CONSTRAINT fk_artikel_publisher FOREIGN KEY (published_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================================
-- 11. TABEL GALERI (Koleksi Foto Cagar Budaya)
-- ============================================================================
CREATE TABLE galeri (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cagar_budaya_id INT DEFAULT NULL,
    judul VARCHAR(200) NOT NULL,
    deskripsi TEXT DEFAULT NULL,
    path_file VARCHAR(500) NOT NULL,
    tipe_file VARCHAR(10) NOT NULL DEFAULT 'jpg',
    kategori VARCHAR(50) NOT NULL,
    uploaded_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_galeri_cb (cagar_budaya_id),
    INDEX idx_galeri_kategori (kategori),
    
    CONSTRAINT fk_galeri_cb FOREIGN KEY (cagar_budaya_id) REFERENCES cagar_budaya(id) ON DELETE SET NULL,
    CONSTRAINT fk_galeri_uploader FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ============================================================================
-- 12. TABEL FAQ (Pertanyaan Umum)
-- ============================================================================
CREATE TABLE faq (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pertanyaan TEXT NOT NULL,
    jawaban TEXT NOT NULL,
    kategori VARCHAR(50) NOT NULL,
    urutan INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_by INT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_faq_kategori (kategori),
    INDEX idx_faq_active (is_active),
    
    CONSTRAINT fk_faq_creator FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================================
-- 13. TABEL LOG_AKTIVITAS (Audit Trail)
-- ============================================================================
CREATE TABLE log_aktivitas (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id INT DEFAULT NULL,
    aksi VARCHAR(100) NOT NULL,
    tabel VARCHAR(50) DEFAULT NULL,
    record_id INT DEFAULT NULL,
    deskripsi TEXT DEFAULT NULL,
    ip_address VARCHAR(45) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_log_user (user_id),
    INDEX idx_log_aksi (aksi),
    INDEX idx_log_tabel (tabel),
    INDEX idx_log_tanggal (created_at),
    
    CONSTRAINT fk_log_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================================
-- 14. TABEL NOTIFIKASI
-- ============================================================================
CREATE TABLE notifikasi (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    judul VARCHAR(200) NOT NULL,
    pesan TEXT NOT NULL,
    tipe ENUM('info', 'success', 'warning', 'error') NOT NULL DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    link VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_notif_user (user_id),
    INDEX idx_notif_read (is_read),
    INDEX idx_notif_tanggal (created_at),
    
    CONSTRAINT fk_notif_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================================
-- 15. TABEL BOOKMARK (Favorit User Member)
-- ============================================================================
CREATE TABLE bookmark (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    cagar_budaya_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE KEY uk_bookmark (user_id, cagar_budaya_id),
    INDEX idx_bookmark_user (user_id),
    
    CONSTRAINT fk_bookmark_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_bookmark_cb FOREIGN KEY (cagar_budaya_id) REFERENCES cagar_budaya(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================================
-- 16. TABEL KOMENTAR (Review Cagar Budaya)
-- ============================================================================
CREATE TABLE komentar (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    cagar_budaya_id INT NOT NULL,
    isi_komentar TEXT NOT NULL,
    rating TINYINT DEFAULT NULL CHECK (rating BETWEEN 1 AND 5),
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_komentar_user (user_id),
    INDEX idx_komentar_cb (cagar_budaya_id),
    INDEX idx_komentar_approved (is_approved),
    
    CONSTRAINT fk_komentar_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_komentar_cb FOREIGN KEY (cagar_budaya_id) REFERENCES cagar_budaya(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================================
-- 17. TABEL PENGATURAN_SISTEM (Konfigurasi Aplikasi)
-- ============================================================================
CREATE TABLE pengaturan_sistem (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama_setting VARCHAR(100) NOT NULL UNIQUE,
    nilai TEXT NOT NULL,
    kategori VARCHAR(50) NOT NULL DEFAULT 'umum',
    deskripsi VARCHAR(255) DEFAULT NULL,
    updated_by INT DEFAULT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    INDEX idx_setting_kategori (kategori),
    
    CONSTRAINT fk_setting_updater FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ============================================================================
-- INSERT DATA SAMPLE
-- ============================================================================

-- Jenis Cagar Budaya (Sesuai UU No. 11 Tahun 2010)
INSERT INTO jenis_cagar_budaya (nama_jenis, ikon, deskripsi, definisi_uu, contoh) VALUES
('Benda', '🏺', 'Benda Cagar Budaya', 
 'Benda alam dan/atau benda buatan manusia, baik yang bergerak maupun yang tidak bergerak, yang berwujud kesatuan atau kelompok, atau bagian-bagiannya atau sisa-sisanya, yang memiliki usia sekurang-kurangnya 50 (lima puluh) tahun, serta dianggap memiliki nilai penting bagi sejarah, ilmu pengetahuan, dan kebudayaan.',
 '["Arca","Prasasti","Keris","Mata Uang Kuno","Gerabah","Perhiasan Kuno"]'),
('Bangunan', '🏛️', 'Bangunan Cagar Budaya',
 'Susunan binaan yang terbuat dari benda alam dan/atau benda buatan manusia untuk mewadahi kegiatan manusia, baik yang didirikan di atas tanah maupun di atas air.',
 '["Masjid","Gereja","Gedung Pemerintahan","Rumah Adat","Museum","Stasiun"]'),
('Struktur', '🏗️', 'Struktur Cagar Budaya',
 'Susunan binaan yang terbuat dari benda alam dan/atau benda buatan manusia untuk mendukung kegiatan konstruksi atau infrastruktur, yang tidak mewadahi kegiatan manusia secara langsung.',
 '["Jembatan Kuno","Benteng","Tembok Pertahanan","Sumur Kuno","Saluran Air","Menara"]'),
('Situs', '🗿', 'Situs Cagar Budaya',
 'Lokasi yang berada di darat dan/atau di air yang mengandung Benda Cagar Budaya, Bangunan Cagar Budaya, dan/atau Struktur Cagar Budaya sebagai hasil kegiatan manusia atau bukti kejadian pada masa lalu.',
 '["Situs Megalitikum","Situs Arkeologi","Situs Prasejarah","Situs Kerajaan Kuno","Situs Pertempuran"]'),
('Kawasan', '🌏', 'Kawasan Cagar Budaya',
 'Area di darat dan/atau di air yang memiliki dua Situs Cagar Budaya atau lebih yang letaknya berdekatan dan memperlihatkan ciri tata ruang yang khas.',
 '["Kawasan Kota Tua","Kawasan Pusat Kerajaan","Kawasan Pelabuhan Kuno","Kawasan Pemukiman Adat"]');

-- Kategori Cagar Budaya
INSERT INTO kategori_cagar_budaya (nama_kategori, ikon, deskripsi) VALUES
('Bangunan Keagamaan', '🕌', 'Masjid, gereja, pura, vihara, dan tempat ibadah lainnya'),
('Bangunan Publik', '🏢', 'Gedung pertemuan, kesenian, dan fasilitas publik'),
('Bangunan Pemerintahan', '🏛️', 'Kantor pemerintahan dan bangunan resmi'),
('Bangunan Transportasi', '🚂', 'Stasiun, terminal, pelabuhan, dan infrastruktur transportasi'),
('Bangunan Tradisional', '🏠', 'Rumah adat dan bangunan tradisional'),
('Situs Arkeologi', '🗿', 'Situs prasejarah dan arkeologi'),
('Museum', '🏛️', 'Museum dan tempat penyimpanan koleksi');

-- Users (password: bcrypt hash dari 'admin123', 'manager123', dll)
-- Untuk demo, password disimpan plain text. Di production gunakan bcrypt.
INSERT INTO users (nama, email, password, role, avatar, phone, alamat, status, status_akun, tanggal_daftar, last_login) VALUES
('Admin SICABA', 'admin@sicaba.go.id', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2u', 'admin', '👑', '081234567890', 'Jl. Ir. H. Juanda No. 1, Tasikmalaya', 'aktif', 'approved', '2024-01-01', '2024-01-15 08:30:00'),
('Agus Wirabudiman', 'agus.wirabudiman@gmail.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2u', 'admin', '👑', '081234567890', 'Tasikmalaya, Jawa Barat', 'aktif', 'approved', '2024-01-01', '2024-01-15 09:00:00'),
('Budi Santoso', 'manager@sicaba.go.id', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2u', 'manager', '📋', '081234567891', 'Jl. Sukapura No. 10, Tasikmalaya', 'aktif', 'approved', '2024-01-05', '2024-01-14 14:20:00'),
('Siti Nurhaliza', 'member@sicaba.go.id', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2u', 'member', '👤', '081234567892', 'Jl. Merdeka No. 5, Tasikmalaya', 'aktif', 'approved', '2024-01-10', '2024-01-13 09:15:00'),
('Ahmad Rizki', 'ahmad@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2u', 'member', '👤', '081234567893', 'Jl. Veteran No. 8, Tasikmalaya', 'aktif', 'approved', '2024-01-12', '2024-01-12 16:45:00'),
('Dewi Lestari', 'dewi@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2u', 'member', '👤', '081234567894', 'Jl. Diponegoro No. 3, Tasikmalaya', 'aktif', 'pending', '2024-01-08', NULL),
('Rudi Hermawan', 'rudi@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2u', 'manager', '📋', '081234567895', 'Jl. Asia Afrika No. 15, Tasikmalaya', 'aktif', 'pending', '2024-01-03', NULL),
('Pengunjung Umum', 'public@sicaba.go.id', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2u', 'public', '🌐', NULL, NULL, 'aktif', 'approved', '2024-01-14', '2024-01-14 07:00:00'),
('Hendra Wijaya', 'hendra@email.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2u', 'member', '👤', '081234567896', 'Jl. Samudra No. 7, Tasikmalaya', 'aktif', 'rejected', '2024-02-10', NULL);

-- Update verified_by untuk user yang sudah disetujui
UPDATE users SET verified_by = 1, tanggal_verifikasi = '2024-01-05' WHERE id = 3;
UPDATE users SET verified_by = 1, tanggal_verifikasi = '2024-01-10' WHERE id = 4;
UPDATE users SET verified_by = 1, tanggal_verifikasi = '2024-01-12' WHERE id = 5;
UPDATE users SET verified_by = 1, tanggal_verifikasi = '2024-01-14' WHERE id = 8;
UPDATE users SET verified_by = 1, tanggal_verifikasi = '2024-02-11', catatan_admin = 'Bukti transfer tidak jelas / blur. Mohon upload ulang.' WHERE id = 9;

-- Bukti Pembayaran
INSERT INTO bukti_pembayaran (user_id, nama_file, path_file, tipe_file, ukuran_file, nominal, rekening_tujuan, tanggal_upload, status_verifikasi) VALUES
(3, 'bukti_transfer_budi.jpg', '/uploads/bukti/budi.jpg', 'jpg', '1.5 MB', 110000.00, '445301021768537', '2024-01-04', 'valid'),
(4, 'bukti_transfer_siti.jpg', '/uploads/bukti/siti.jpg', 'jpg', '1.2 MB', 110000.00, '445301021768537', '2024-01-09', 'valid'),
(5, 'bukti_transfer_ahmad.jpg', '/uploads/bukti/ahmad.jpg', 'jpg', '980 KB', 110000.00, '445301021768537', '2024-01-11', 'valid'),
(6, 'bukti_transfer_dewi.jpg', '/uploads/bukti/dewi.jpg', 'jpg', '1.1 MB', 110000.00, '445301021768537', '2024-01-08', 'pending'),
(7, 'bukti_transfer_rudi.jpg', '/uploads/bukti/rudi.jpg', 'jpg', '1.3 MB', 110000.00, '445301021768537', '2024-01-03', 'pending'),
(9, 'bukti_transfer_hendra.jpg', '/uploads/bukti/hendra.jpg', 'jpg', '890 KB', 110000.00, '445301021768537', '2024-02-10', 'invalid');

-- Cagar Budaya (dengan jenis_id)
-- jenis_id: 1=Benda, 2=Bangunan, 3=Struktur, 4=Situs, 5=Kawasan
INSERT INTO cagar_budaya (nama, jenis_id, kategori_id, lokasi, kecamatan, tahun_berdiri, deskripsi, sejarah, arsitektur, status_penetapan, nomor_sk, tanggal_penetapan, latitude, longitude, gambar, created_by) VALUES
('Masjid Agung Kota Tasikmalaya', 2, 1, 'Jl. Masjid Agung, Kahuripan, Tawang', 'Tawang', '1832', 'Masjid tertua dan terbesar di Kota Tasikmalaya dengan nilai sejarah tinggi sebagai pusat penyebaran agama Islam.', 'Dibangun tahun 1832 oleh Bupati Sukapura ke-7, Wiradadaha VIII. Telah mengalami beberapa renovasi namun tetap mempertahankan arsitektur asli.', 'Arsitektur memadukan gaya tradisional Sunda dengan pengaruh Islam. Atap tumpang tiga tingkat menjadi ciri khas utama.', 'Nasional', 'SK/Mendikbud/2015/042', '2015-03-15', -7.3274000, 108.2217000, 'mosque', 1),
('Gedung Kesenian Kota Tasikmalaya', 2, 2, 'Jl. Sukapura, Yudanagara, Cihideung', 'Cihideung', '1920', 'Bangunan peninggalan kolonial Belanda yang digunakan sebagai pusat kegiatan seni dan budaya.', 'Dibangun sekitar tahun 1920 pada masa kolonial Belanda. Setelah kemerdekaan dialihfungsikan sebagai pusat kesenian.', 'Bangunan bergaya Art Deco dengan pilar-pilar besar, jendela tinggi dengan kaca patri, dan atap tinggi.', 'Kota/Kabupaten', 'SK/Walikota/2018/015', '2018-06-20', -7.3295000, 108.2195000, 'building', 1),
('Situs Batu Calung', 4, 6, 'Desa Sukarasa, Sukaratu', 'Sukaratu', 'Abad ke-8', 'Situs arkeologi dengan batu-batu megalitikum peninggalan zaman prasejarah.', 'Ditemukan awal abad ke-20 dan diteliti arkeolog Belanda. Batu diperkirakan berasal dari abad ke-8 Masehi.', 'Terdiri dari batu-batu besar tersusun teratur, termasuk menhir, dolmen, dan batu dakon.', 'Nasional', 'SK/Mendikbud/2013/078', '2013-09-08', -7.3450000, 108.2350000, 'archaeology', 1),
('Kantor Bupati Lama Tasikmalaya', 2, 3, 'Jl. Sukapura No. 1, Cihideung', 'Cihideung', '1860', 'Bangunan bersejarah yang pernah menjadi pusat pemerintahan Kabupaten Tasikmalaya.', 'Dibangun tahun 1860 sebagai pusat pemerintahan Kabupaten Sukapura.', 'Bangunan bergaya Indische Empire Style dengan pilar besar, beranda luas, dan atap tinggi.', 'Provinsi', 'SK/Gubernur_Jabar/2019/033', '2019-04-12', -7.3280000, 108.2200000, 'government', 1),
('Stasiun Tasikmalaya', 2, 4, 'Jl. Stasiun, Cihideung', 'Cihideung', '1916', 'Stasiun kereta api peninggalan kolonial Belanda untuk jalur kereta api Priangan.', 'Dibangun tahun 1916 sebagai bagian dari jalur Staatsspoorwegen.', 'Bangunan bergaya kolonial Belanda dengan atap pelana lebar dan kanopi besi tempa khas.', 'Kota/Kabupaten', 'SK/Walikota/2017/022', '2017-08-05', -7.3310000, 108.2240000, 'station', 1),
('Situs Cipari', 4, 6, 'Desa Cipari, Cigalon', 'Cigalon', 'Abad ke-8', 'Kompleks situs megalitikum di perbukitan dengan menhir, dolmen, dan batu dakon.', 'Diteliti sejak masa kolonial. Diperkirakan sebagai tempat pemujaan dan pemakaman prasejarah.', 'Kompleks batu megalitikum tersusun berteras dengan menhir setinggi 2 meter.', 'Nasional', 'SK/Mendikbud/2010/015', '2010-05-22', -7.3800000, 108.2600000, 'megalithic', 1),
('Gedung Gereja GPIB Immanuel', 2, 1, 'Jl. Gereja, Kahuripan, Tawang', 'Tawang', '1905', 'Gereja tertua di Kota Tasikmalaya, dibangun pada masa kolonial Belanda.', 'Dibangun tahun 1905 untuk melayani jemaat Protestan.', 'Bangunan bergaya Gothic Revival dengan menara lonceng dan kaca patri.', 'Provinsi', 'SK/Gubernur_Jabar/2020/045', '2020-10-18', -7.3265000, 108.2210000, 'church', 1),
('Museum Kota Tasikmalaya', 2, 7, 'Jl. Ir. H. Juanda, Cihideung', 'Cihideung', '1985', 'Museum yang menyimpan koleksi benda bersejarah dan budaya Tasikmalaya.', 'Didirikan tahun 1985 untuk melestarikan warisan budaya Tasikmalaya.', 'Bangunan modern dengan elemen tradisional Sunda dan ruang pamer luas.', 'Kota/Kabupaten', 'SK/Walikota/2016/008', '2016-02-03', -7.3290000, 108.2230000, 'museum', 1),
('Situs Karangkamulyan', 4, 6, 'Desa Karangkamulyan, Cijeungjing', 'Cijeungjing', 'Abad ke-12', 'Kompleks situs bersejarah berkaitan dengan Kerajaan Galuh.', 'Dipercaya sebagai bekas pusat Kerajaan Galuh abad ke-7 hingga ke-12.', 'Struktur batu, candi kecil, batu bertulis, dan situs pemandian kuno.', 'Nasional', 'SK/Mendikbud/2012/067', '2012-07-10', -7.3600000, 108.2800000, 'ruins', 1),
('Rumah Adat Sunda (Imah Julang Ngapak)', 2, 5, 'Kampung Adat, Cihideung', 'Cihideung', 'Abad ke-17', 'Contoh arsitektur tradisional Sunda yang masih terjaga keasliannya.', 'Peninggalan keluarga bangsawan Sukapura yang dijaga beberapa generasi.', 'Atap berbentuk seperti burung julang mengapak, terbuat dari ijuk, struktur kayu dan bambu.', 'Belum Ditetapkan', NULL, NULL, -7.3300000, 108.2180000, 'traditional', 1);

-- Fasilitas Cagar Budaya
INSERT INTO fasilitas_cagar_budaya (cagar_budaya_id, nama_fasilitas) VALUES
(1, 'Area Parkir'), (1, 'Tempat Wudhu'), (1, 'Perpustakaan'),
(2, 'Auditorium'), (2, 'Area Parkir'), (2, 'Toilet Umum'),
(3, 'Area Parkir'), (3, 'Papan Informasi'), (3, 'Jalur Pejalan Kaki'),
(6, 'Area Parkir'), (6, 'Museum Mini'), (6, 'Papan Informasi'),
(9, 'Pemandu Wisata'), (9, 'Mushola'), (9, 'Toilet');

-- Lampiran (contoh)
INSERT INTO lampiran (cagar_budaya_id, nama_file, path_file, tipe_file, ukuran_file, deskripsi, tanggal_upload, uploaded_by) VALUES
(1, 'SK_Penetapan_Nasional.pdf', '/uploads/lampiran/masjid_sk.pdf', 'sk', '2.4 MB', 'SK penetapan sebagai Cagar Budaya tingkat Nasional', '2024-01-10', 1),
(1, 'Sertifikat_Cagar_Budaya.pdf', '/uploads/lampiran/masjid_sert.pdf', 'sertifikat', '1.8 MB', 'Sertifikat resmi dari Kementerian', '2024-01-10', 1),
(1, 'Peta_Lokasi.png', '/uploads/lampiran/masjid_peta.png', 'peta', '856 KB', 'Peta detail lokasi', '2024-01-12', 2),
(3, 'SK_Nasional_Batu_Calung.pdf', '/uploads/lampiran/calung_sk.pdf', 'sk', '3.2 MB', 'SK penetapan nasional', '2024-01-05', 1),
(3, 'Laporan_Penelitian.pdf', '/uploads/lampiran/calung_laporan.pdf', 'pdf', '8.5 MB', 'Laporan penelitian arkeologi', '2024-01-06', 1),
(6, 'SK_Nasional_Cipari.pdf', '/uploads/lampiran/cipari_sk.pdf', 'sk', '2.9 MB', 'SK penetapan nasional', '2024-01-03', 1),
(6, 'Jurnal_Penelitian.pdf', '/uploads/lampiran/cipari_jurnal.pdf', 'pdf', '12.3 MB', 'Kumpulan jurnal penelitian', '2024-01-04', 1),
(9, 'SK_Nasional_Karangkamulyan.pdf', '/uploads/lampiran/karang_sk.pdf', 'sk', '3.5 MB', 'SK penetapan nasional', '2024-01-21', 1),
(10, 'Dokumen_Pengajuan.pdf', '/uploads/lampiran/rumah_pengajuan.pdf', 'pdf', '4.1 MB', 'Dokumen pengajuan penetapan (dalam proses)', '2024-02-01', 2);

-- ODCB
INSERT INTO odcb (nama_odcb, jenis_odcb, lokasi, kecamatan, deskripsi, perkiraan_umur, kondisi, latitude, longitude, pendaftar_id, pendaftar_nama, pendaftar_email, pendaftar_phone, pendaftar_alamat, jenis_identitas, nomor_identitas, status, tanggal_pengajuan, tanggal_update, catatan_manager, reviewed_by) VALUES
('Rumah Tua di Kampung Adat', 'Bangunan', 'Jl. Kampung Adat No. 15', 'Cihideung', 'Rumah tua peninggalan keluarga bangsawan yang masih terjaga keasliannya.', '±150 tahun', 'Cukup Baik', -7.3285000, 108.2195000, 3, 'Siti Nurhaliza', 'member@sicaba.go.id', '081234567892', 'Jl. Merdeka No. 5', 'KTP', '3206123456789001', 'Diperiksa', '2024-02-15', '2024-02-16', 'Sedang dalam proses verifikasi lapangan', 2),
('Sumur Kuno di Desa Sukarasa', 'Struktur', 'Desa Sukarasa', 'Sukaratu', 'Sumur kuno yang diduga berasal dari masa kerajaan.', '±200 tahun', 'Kurang Baik', -7.3420000, 108.2380000, 4, 'Ahmad Rizki', 'ahmad@email.com', '081234567893', 'Jl. Veteran No. 8', 'SIM', '3206123456789002', 'Direvisi', '2024-02-18', '2024-02-20', 'Mohon tambahkan foto dari sudut berbeda', 2),
('Pohon Beringin Tua', 'Benda Budaya', 'Alun-alun Kota Tasikmalaya', 'Tawang', 'Pohon beringin tua yang diperkirakan telah ada sejak masa kolonial.', '±180 tahun', 'Baik', -7.3270000, 108.2210000, 7, 'Pengunjung Umum', 'public@sicaba.go.id', NULL, NULL, 'KTP', '3206123456789003', 'Ditolak', '2024-02-22', '2024-02-24', 'Pohon tidak termasuk kategori benda cagar budaya', 2),
('Batu Prasasti di Perbukitan', 'Situs Arkeologi', 'Perbukitan Cipari', 'Cigalon', 'Batu dengan ukiran yang diduga merupakan prasasti kuno.', '±500 tahun', 'Cukup Baik', -7.3750000, 108.2550000, 3, 'Siti Nurhaliza', 'member@sicaba.go.id', '081234567892', 'Jl. Merdeka No. 5', 'KTP', '3206123456789001', 'Disetujui', '2024-02-25', '2024-02-28', 'Memenuhi kriteria, akan diproses sebagai cagar budaya tingkat kota', 2);

-- ODCB Foto Identitas
INSERT INTO odcb_foto_identitas (odcb_id, nama_file, path_file, tipe_file, ukuran_file, deskripsi, tanggal_upload) VALUES
(1, 'foto_ktp_siti.jpg', '/uploads/odcb/identitas/siti.jpg', 'jpg', '1.2 MB', 'Foto KTP pendaftar', '2024-02-15'),
(2, 'foto_sim_ahmad.jpg', '/uploads/odcb/identitas/ahmad.jpg', 'jpg', '980 KB', 'Foto SIM pendaftar', '2024-02-18'),
(3, 'foto_ktp_public.jpg', '/uploads/odcb/identitas/public.jpg', 'jpg', '1.1 MB', 'Foto KTP pendaftar', '2024-02-22'),
(4, 'foto_ktp_dewi.jpg', '/uploads/odcb/identitas/dewi.jpg', 'jpg', '1.3 MB', 'Foto KTP pendaftar', '2024-02-25');

-- ODCB Foto Objek
INSERT INTO odcb_foto_objek (odcb_id, nama_file, path_file, tipe_file, ukuran_file, deskripsi, tanggal_upload) VALUES
(1, 'foto_depan_rumah.jpg', '/uploads/odcb/objek/rumah1.jpg', 'jpg', '2.5 MB', 'Tampak depan rumah', '2024-02-15'),
(1, 'foto_samping_rumah.jpg', '/uploads/odcb/objek/rumah2.jpg', 'jpg', '2.3 MB', 'Tampak samping', '2024-02-15'),
(1, 'foto_detail_ukiran.jpg', '/uploads/odcb/objek/rumah3.jpg', 'jpg', '1.8 MB', 'Detail ukiran kayu', '2024-02-15'),
(2, 'foto_sumur_utuh.jpg', '/uploads/odcb/objek/sumur1.jpg', 'jpg', '3.1 MB', 'Kondisi sumur keseluruhan', '2024-02-18'),
(2, 'foto_detail_batu.jpg', '/uploads/odcb/objek/sumur2.jpg', 'jpg', '2.7 MB', 'Detail struktur batu', '2024-02-18'),
(3, 'foto_pohon_beringin.jpg', '/uploads/odcb/objek/pohon1.jpg', 'jpg', '4.2 MB', 'Pohon beringin keseluruhan', '2024-02-22'),
(4, 'foto_batu_prasasti.jpg', '/uploads/odcb/objek/prasasti1.jpg', 'jpg', '3.5 MB', 'Batu prasasti keseluruhan', '2024-02-25'),
(4, 'foto_detail_ukiran.jpg', '/uploads/odcb/objek/prasasti2.jpg', 'jpg', '2.8 MB', 'Detail ukiran pada batu', '2024-02-25'),
(4, 'foto_lokasi.jpg', '/uploads/odcb/objek/prasasti3.jpg', 'jpg', '2.1 MB', 'Kondisi lokasi sekitar', '2024-02-25'),
(4, 'foto_sketsa.jpg', '/uploads/odcb/objek/prasasti4.jpg', 'jpg', '1.5 MB', 'Sketsa ukiran', '2024-02-25');

-- Artikel
INSERT INTO artikel (judul, excerpt, konten, kategori, author, tanggal_publikasi, waktu_baca, published_by, status) VALUES
('Pelestarian Masjid Agung Tasikmalaya', 'Upaya pelestarian Masjid Agung yang telah berdiri sejak 1832.', 'Masjid Agung Kota Tasikmalaya terus menjadi pusat kegiatan keagamaan dan budaya.', 'Pelestarian', 'Tim Redaksi SICABA', '2024-01-15', '5 menit', 2, 'published'),
('Situs Cipari: Menyingkap Peradaban Megalitikum', 'Penelitian terbaru di Situs Cipari mengungkap lebih banyak.', 'Tim arkeolog melakukan penelitian lanjutan di Situs Cipari.', 'Arkeologi', 'Dr. Ahmad Suryadi', '2023-12-28', '7 menit', 2, 'published'),
('Festival Budaya Tasikmalaya 2024', 'Festival budaya tahunan kembali digelar.', 'Festival Budaya Tasikmalaya 2024 akan menampilkan berbagai pertunjukan.', 'Event', 'Dinas Kebudayaan', '2024-02-10', '4 menit', 1, 'published');

-- FAQ
INSERT INTO faq (pertanyaan, jawaban, kategori, urutan) VALUES
('Apa itu Cagar Budaya?', 'Cagar Budaya adalah warisan budaya bersifat kebendaan yang perlu dilestarikan keberadaannya.', 'Umum', 1),
('Apa dasar hukum pelestarian cagar budaya?', 'UU Nomor 11 Tahun 2010 tentang Cagar Budaya.', 'Hukum', 2),
('Bagaimana cara mendaftarkan ODCB?', 'Login sebagai Member/Public, isi form ODCB, upload foto dan identitas.', 'Prosedur', 3),
('Berapa biaya pendaftaran akun Member?', 'Rp 110.000,- yang ditransfer ke rekening BRI 445301021768537 a.n Agus Wirabudiman.', 'Umum', 4),
('Berapa lama proses verifikasi pendaftaran?', 'Estimasi 1x24 jam setelah bukti pembayaran diupload.', 'Prosedur', 5);

-- Pengaturan Sistem
INSERT INTO pengaturan_sistem (nama_setting, nilai, kategori, deskripsi) VALUES
('nama_aplikasi', 'SICABA - Sistem Informasi Cagar Budaya', 'umum', 'Nama aplikasi'),
('nominal_pendaftaran', '110000', 'pembayaran', 'Nominal pendaftaran Member/Manager'),
('bank_pembayaran', 'BRI', 'pembayaran', 'Bank tujuan pembayaran'),
('rekening_pembayaran', '445301021768537', 'pembayaran', 'Nomor rekening pembayaran'),
('atas_nama_rekening', 'Agus Wirabudiman', 'pembayaran', 'Nama pemilik rekening'),
('registrasi_publik', '1', 'sistem', 'Izinkan pendaftaran publik (1=ya, 0=tidak)'),
('maintenance_mode', '0', 'sistem', 'Mode maintenance (1=aktif, 0=nonaktif)'),
('max_upload_size', '10485760', 'sistem', 'Maksimal ukuran upload (bytes)');

-- Log Aktivitas
INSERT INTO log_aktivitas (user_id, aksi, tabel, record_id, deskripsi) VALUES
(1, 'LOGIN', 'users', 1, 'Admin login ke sistem'),
(1, 'APPROVE_USER', 'users', 3, 'Menyetujui pendaftaran member Siti Nurhaliza'),
(2, 'REVIEW_ODCB', 'odcb', 1, 'Review ODCB Rumah Tua di Kampung Adat'),
(1, 'UPDATE_STATUS', 'cagar_budaya', 1, 'Update status penetapan Masjid Agung'),
(1, 'CREATE_CB', 'cagar_budaya', 10, 'Menambahkan data Rumah Adat Sunda');

-- Notifikasi
INSERT INTO notifikasi (user_id, judul, pesan, tipe) VALUES
(5, 'Pendaftaran Sedang Diproses', 'Pendaftaran Anda sedang menunggu verifikasi oleh Administrator.', 'info'),
(8, 'Pendaftaran Ditolak', 'Pendaftaran Anda ditolak. Silakan hubungi administrator untuk informasi lebih lanjut.', 'error'),
(3, 'Selamat Datang!', 'Akun Anda telah disetujui. Selamat menggunakan SICABA.', 'success');

-- ============================================================================
-- VIEWS (Untuk Laporan)
-- ============================================================================

-- View: Statistik Cagar Budaya per Status Penetapan
CREATE VIEW v_statistik_penetapan AS
SELECT 
    status_penetapan,
    COUNT(*) as jumlah,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM cagar_budaya), 2) as persentase
FROM cagar_budaya
GROUP BY status_penetapan;

-- View: Statistik User per Role
CREATE VIEW v_statistik_user AS
SELECT 
    role,
    COUNT(*) as total,
    SUM(CASE WHEN status_akun = 'approved' THEN 1 ELSE 0 END) as disetujui,
    SUM(CASE WHEN status_akun = 'pending' THEN 1 ELSE 0 END) as pending,
    SUM(CASE WHEN status_akun = 'rejected' THEN 1 ELSE 0 END) as ditolak
FROM users
GROUP BY role;

-- View: Pendapatan Pendaftaran
CREATE VIEW v_pendapatan AS
SELECT 
    COUNT(CASE WHEN u.status_akun = 'approved' AND u.role IN ('manager', 'member') THEN 1 END) as user_disetujui,
    COUNT(CASE WHEN u.status_akun = 'pending' AND u.role IN ('manager', 'member') THEN 1 END) as user_pending,
    COUNT(CASE WHEN u.status_akun = 'approved' AND u.role IN ('manager', 'member') THEN 1 END) * 110000 as pendapatan_realisasi,
    (COUNT(CASE WHEN u.status_akun IN ('approved', 'pending') AND u.role IN ('manager', 'member') THEN 1 END)) * 110000 as pendapatan_potensi
FROM users u;

-- View: Detail ODCB dengan Pendaftar
CREATE VIEW v_detail_odcb AS
SELECT 
    o.id,
    o.nama_odcb,
    o.jenis_odcb,
    o.lokasi,
    o.kecamatan,
    o.status,
    o.tanggal_pengajuan,
    o.catatan_manager,
    u.nama as pendaftar_nama,
    u.email as pendaftar_email,
    u.role as pendaftar_role,
    r.nama as reviewer_nama
FROM odcb o
JOIN users u ON o.pendaftar_id = u.id
LEFT JOIN users r ON o.reviewed_by = r.id;

-- ============================================================================
-- STORED PROCEDURES (Untuk Operasi Kompleks)
-- ============================================================================

DELIMITER //

-- Procedure: Approve User
CREATE PROCEDURE sp_approve_user(
    IN p_user_id INT,
    IN p_admin_id INT,
    IN p_catatan TEXT
)
BEGIN
    UPDATE users 
    SET status_akun = 'approved',
        tanggal_verifikasi = CURDATE(),
        verified_by = p_admin_id,
        catatan_admin = p_catatan
    WHERE id = p_user_id;
    
    INSERT INTO notifikasi (user_id, judul, pesan, tipe)
    VALUES (p_user_id, 'Pendaftaran Disetujui', 'Akun Anda telah disetujui oleh Administrator. Silakan login untuk mengakses fitur.', 'success');
    
    INSERT INTO log_aktivitas (user_id, aksi, tabel, record_id, deskripsi)
    VALUES (p_admin_id, 'APPROVE_USER', 'users', p_user_id, CONCAT('Menyetujui user ID: ', p_user_id));
END //

-- Procedure: Reject User
CREATE PROCEDURE sp_reject_user(
    IN p_user_id INT,
    IN p_admin_id INT,
    IN p_alasan TEXT
)
BEGIN
    UPDATE users 
    SET status_akun = 'rejected',
        tanggal_verifikasi = CURDATE(),
        verified_by = p_admin_id,
        catatan_admin = p_alasan
    WHERE id = p_user_id;
    
    INSERT INTO notifikasi (user_id, judul, pesan, tipe)
    VALUES (p_user_id, 'Pendaftaran Ditolak', CONCAT('Pendaftaran Anda ditolak. Alasan: ', p_alasan), 'error');
    
    INSERT INTO log_aktivitas (user_id, aksi, tabel, record_id, deskripsi)
    VALUES (p_admin_id, 'REJECT_USER', 'users', p_user_id, CONCAT('Menolak user ID: ', p_user_id));
END //

-- Procedure: Update Status ODCB
CREATE PROCEDURE sp_update_status_odcb(
    IN p_odcb_id INT,
    IN p_status VARCHAR(20),
    IN p_manager_id INT,
    IN p_catatan TEXT
)
BEGIN
    UPDATE odcb 
    SET status = p_status,
        tanggal_update = CURDATE(),
        catatan_manager = p_catatan,
        reviewed_by = p_manager_id
    WHERE id = p_odcb_id;
    
    INSERT INTO notifikasi (user_id, judul, pesan, tipe)
    SELECT pendaftar_id, 
           CONCAT('Status ODCB Diperbarui: ', p_status),
           CONCAT('Status ODCB "', nama_odcb, '" telah diubah menjadi: ', p_status, '. Catatan: ', p_catatan),
           CASE p_status 
               WHEN 'Disetujui' THEN 'success'
               WHEN 'Ditolak' THEN 'error'
               WHEN 'Direvisi' THEN 'warning'
               ELSE 'info'
           END
    FROM odcb WHERE id = p_odcb_id;
END //

DELIMITER ;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

DELIMITER //

-- Trigger: Auto update last_login
CREATE TRIGGER trg_before_login
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    IF NEW.last_login IS NOT NULL AND OLD.last_login != NEW.last_login THEN
        INSERT INTO log_aktivitas (user_id, aksi, tabel, record_id, deskripsi)
        VALUES (NEW.id, 'LOGIN', 'users', NEW.id, CONCAT('User login: ', NEW.email));
    END IF;
END //

-- Trigger: Auto create notifikasi saat ODCB baru
CREATE TRIGGER trg_after_odcb_insert
AFTER INSERT ON odcb
FOR EACH ROW
BEGIN
    INSERT INTO notifikasi (user_id, judul, pesan, tipe)
    SELECT id, 'ODCB Baru Diajukan', CONCAT('Pendaftaran ODCB "', NEW.nama_odcb, '" telah diterima dan menunggu review.'), 'info'
    FROM users WHERE role IN ('admin', 'manager') AND status_akun = 'approved';
END //

DELIMITER ;

-- ============================================================================
-- INDEX TAMBAHAN UNTUK OPTIMASI
-- ============================================================================

-- Full-text search untuk pencarian cepat
ALTER TABLE cagar_budaya ADD FULLTEXT INDEX ft_cb_search (nama, deskripsi, sejarah, arsitektur);
ALTER TABLE artikel ADD FULLTEXT INDEX ft_artikel_search (judul, excerpt, konten);
ALTER TABLE odcb ADD FULLTEXT INDEX ft_odcb_search (nama_odcb, deskripsi, lokasi);

-- ============================================================================
-- SELESAI - Database Schema SICABA v1.0.0
-- ============================================================================
