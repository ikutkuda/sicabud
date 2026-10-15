<?php
/**
 * Plugin Activator
 */

if (!defined('ABSPATH')) {
    exit;
}

class SICABA_Activator {
    
    public static function activate() {
        // Create custom tables
        self::create_tables();
        
        // Create custom post types
        self::register_post_types();
        
        // Create default options
        self::create_options();
        
        // Create upload directories
        self::create_upload_dirs();
        
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    private static function create_tables() {
        global $wpdb;
        $charset_collate = $wpdb->get_charset_collate();
        
        // Table for ODCB (Objek Diduga Cagar Budaya)
        $table_odcb = $wpdb->prefix . 'sicaba_odcb';
        $sql_odcb = "CREATE TABLE IF NOT EXISTS $table_odcb (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            nomor_induk varchar(50) NOT NULL,
            nama_odcb varchar(255) NOT NULL,
            jenis_odcb enum('Benda','Bangunan','Struktur','Situs','Kawasan') NOT NULL,
            alamat_odcb text NOT NULL,
            desa_kelurahan varchar(100) NOT NULL,
            kecamatan varchar(100) NOT NULL,
            kabupaten_kota varchar(100) NOT NULL,
            provinsi varchar(100) NOT NULL,
            latitude decimal(10,7) DEFAULT NULL,
            longitude decimal(10,7) DEFAULT NULL,
            ukuran_panjang varchar(50) DEFAULT NULL,
            ukuran_lebar varchar(50) DEFAULT NULL,
            ukuran_tinggi varchar(50) DEFAULT NULL,
            ukuran_luas varchar(50) DEFAULT NULL,
            bahan text DEFAULT NULL,
            tahun_pembuatan varchar(100) DEFAULT NULL,
            periode_masa enum('Prasejarah','Klasik (Hindu-Buddha)','Islam','Kolonial','Kemerdekaan','Modern') DEFAULT NULL,
            batas_utara text DEFAULT NULL,
            batas_timur text DEFAULT NULL,
            batas_selatan text DEFAULT NULL,
            batas_barat text DEFAULT NULL,
            deskripsi text NOT NULL,
            sejarah text NOT NULL,
            kondisi enum('Utuh','Tinggal Sebagian','Musnah','Hilang','Berubah Wujud dan Gaya') NOT NULL,
            penjelasan_kondisi text DEFAULT NULL,
            pemeliharaan enum('Terpelihara','Tidak Terpelihara') NOT NULL,
            riwayat_pemugaran enum('Pernah Dipugar','Belum Pernah Dipugar') NOT NULL,
            narasi_nilai_penting text DEFAULT NULL,
            latar_belakang_usulan text DEFAULT NULL,
            status_kepemilikan enum('Milik Pribadi','Milik Negara','Milik Daerah','Milik Desa','Milik Badan Usaha','Milik Masyarakat Hukum Adat','Tidak Diketahui') NOT NULL,
            status_pengelolaan enum('Dikelola Sendiri','Dikelola Pemerintah','Dikelola Badan Usaha','Dikelola Masyarakat','Tidak Dikelola') NOT NULL,
            riwayat_kepemilikan text DEFAULT NULL,
            pendaftar_id bigint(20) NOT NULL,
            nama_pendaftar varchar(255) NOT NULL,
            nik_pendaftar varchar(20) NOT NULL,
            nomor_telepon varchar(20) DEFAULT NULL,
            nomor_ponsel varchar(20) NOT NULL,
            asal_pendaftar varchar(100) NOT NULL,
            nama_instansi varchar(255) DEFAULT NULL,
            email_pendaftar varchar(255) DEFAULT NULL,
            alamat_pendaftar text DEFAULT NULL,
            jenis_identitas enum('KTP','SIM') NOT NULL,
            nomor_identitas varchar(50) NOT NULL,
            foto_identitas text NOT NULL,
            foto_odcb text NOT NULL,
            dokumen_pendukung text DEFAULT NULL,
            status enum('Terdaftar','Lolos Verifikasi','Tidak Lolos Verifikasi','Pengkajian','Direkomendasikan','Ditetapkan','Ditolak') NOT NULL DEFAULT 'Terdaftar',
            tanggal_pengajuan date NOT NULL,
            tanggal_update date NOT NULL,
            catatan_manager text DEFAULT NULL,
            reviewed_by bigint(20) DEFAULT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY status (status),
            KEY jenis_odcb (jenis_odcb),
            KEY pendaftar_id (pendaftar_id)
        ) $charset_collate;";
        
        // Table for payment proofs
        $table_payments = $wpdb->prefix . 'sicaba_payments';
        $sql_payments = "CREATE TABLE IF NOT EXISTS $table_payments (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) NOT NULL,
            nama_file varchar(255) NOT NULL,
            path_file varchar(500) NOT NULL,
            tipe_file varchar(10) NOT NULL,
            ukuran_file varchar(20) NOT NULL,
            nominal decimal(12,2) NOT NULL DEFAULT 110000.00,
            rekening_tujuan varchar(30) NOT NULL,
            bank_tujuan varchar(50) NOT NULL DEFAULT 'BRI',
            atas_nama_rekening varchar(100) NOT NULL,
            tanggal_upload date NOT NULL,
            status_verifikasi enum('pending','valid','invalid') NOT NULL DEFAULT 'pending',
            catatan text DEFAULT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id),
            KEY status_verifikasi (status_verifikasi)
        ) $charset_collate;";
        
        // Table for attachments
        $table_attachments = $wpdb->prefix . 'sicaba_attachments';
        $sql_attachments = "CREATE TABLE IF NOT EXISTS $table_attachments (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            cagar_budaya_id bigint(20) NOT NULL,
            nama_file varchar(255) NOT NULL,
            path_file varchar(500) NOT NULL,
            tipe_file enum('pdf','doc','jpg','png','sk','foto','peta','sertifikat') NOT NULL,
            ukuran_file varchar(20) NOT NULL,
            deskripsi text NOT NULL,
            tanggal_upload date NOT NULL,
            uploaded_by bigint(20) NOT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY cagar_budaya_id (cagar_budaya_id),
            KEY tipe_file (tipe_file)
        ) $charset_collate;";
        
        // Table for activity logs
        $table_logs = $wpdb->prefix . 'sicaba_logs';
        $sql_logs = "CREATE TABLE IF NOT EXISTS $table_logs (
            id bigint(20) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) DEFAULT NULL,
            aksi varchar(100) NOT NULL,
            tabel varchar(50) DEFAULT NULL,
            record_id bigint(20) DEFAULT NULL,
            deskripsi text DEFAULT NULL,
            ip_address varchar(45) DEFAULT NULL,
            user_agent text DEFAULT NULL,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id),
            KEY aksi (aksi),
            KEY created_at (created_at)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql_odcb);
        dbDelta($sql_payments);
        dbDelta($sql_attachments);
        dbDelta($sql_logs);
    }
    
    private static function register_post_types() {
        // Post types will be registered in class-sicaba-post-types.php
    }
    
    private static function create_options() {
        // Payment information
        add_option('sicaba_nominal_pendaftaran', 110000);
        add_option('sicaba_bank_pembayaran', 'BRI (Bank Rakyat Indonesia)');
        add_option('sicaba_rekening_pembayaran', '445301021768537');
        add_option('sicaba_atas_nama_rekening', 'Agus Wirabudiman');
        
        // Plugin settings
        add_option('sicaba_enable_registrasi', 1);
        add_option('sicaba_enable_odcb', 1);
        add_option('sicaba_items_per_page', 12);
    }
    
    private static function create_upload_dirs() {
        $upload_dir = wp_upload_dir();
        $base_dir = $upload_dir['basedir'] . '/sicaba';
        
        $dirs = array(
            $base_dir,
            $base_dir . '/bukti-pembayaran',
            $base_dir . '/lampiran',
            $base_dir . '/odcb',
            $base_dir . '/galeri'
        );
        
        foreach ($dirs as $dir) {
            if (!file_exists($dir)) {
                wp_mkdir_p($dir);
                
                // Create .htaccess for security
                $htaccess = $dir . '/.htaccess';
                if (!file_exists($htaccess)) {
                    $htaccess_content = "Order deny,allow\nDeny from all\n<Files ~ '\.(jpg|jpeg|png|gif|pdf|doc|docx)$'>\nAllow from all\n</Files>";
                    file_put_contents($htaccess, $htaccess_content);
                }
                
                // Create index.php to prevent directory listing
                $index = $dir . '/index.php';
                if (!file_exists($index)) {
                    file_put_contents($index, '<?php // Silence is golden');
                }
            }
        }
    }
}
