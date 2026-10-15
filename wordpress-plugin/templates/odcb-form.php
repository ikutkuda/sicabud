<?php
/**
 * Template: ODCB Form
 */

if (!defined('ABSPATH')) {
    exit;
}

$user = wp_get_current_user();
?>

<div class="sicaba-odcb-form">
    <h2><?php _e('Formulir Pendaftaran ODCB', 'sicaba'); ?></h2>
    <p class="sicaba-form-description">
        <?php _e('Isi formulir berikut untuk mendaftarkan Objek Diduga Cagar Budaya (ODCB) sesuai Permendikbudristek No. 36 Tahun 2023.', 'sicaba'); ?>
    </p>
    
    <form id="sicaba-odcb-form" class="sicaba-form" method="post" enctype="multipart/form-data">
        <?php wp_nonce_field('sicaba_odcb_submit', 'sicaba_odcb_nonce'); ?>
        
        <!-- Section: Identitas ODCB -->
        <fieldset class="sicaba-form-section">
            <legend><?php _e('A. Identitas ODCB', 'sicaba'); ?></legend>
            
            <div class="sicaba-form-group">
                <label for="nama_odcb"><?php _e('Nama ODCB', 'sicaba'); ?> *</label>
                <input type="text" id="nama_odcb" name="nama_odcb" required class="sicaba-form-control">
            </div>
            
            <div class="sicaba-form-group">
                <label for="jenis_odcb"><?php _e('Jenis ODCB', 'sicaba'); ?> *</label>
                <select id="jenis_odcb" name="jenis_odcb" required class="sicaba-form-control">
                    <option value=""><?php _e('-- Pilih Jenis --', 'sicaba'); ?></option>
                    <option value="Benda"><?php _e('Benda', 'sicaba'); ?></option>
                    <option value="Bangunan"><?php _e('Bangunan', 'sicaba'); ?></option>
                    <option value="Struktur"><?php _e('Struktur', 'sicaba'); ?></option>
                    <option value="Situs"><?php _e('Situs', 'sicaba'); ?></option>
                    <option value="Kawasan"><?php _e('Kawasan', 'sicaba'); ?></option>
                </select>
            </div>
            
            <div class="sicaba-form-group">
                <label for="alamat_odcb"><?php _e('Alamat ODCB', 'sicaba'); ?> *</label>
                <textarea id="alamat_odcb" name="alamat_odcb" required class="sicaba-form-control" rows="3"></textarea>
            </div>
            
            <div class="sicaba-form-row">
                <div class="sicaba-form-group">
                    <label for="desa_kelurahan"><?php _e('Desa/Kelurahan', 'sicaba'); ?> *</label>
                    <input type="text" id="desa_kelurahan" name="desa_kelurahan" required class="sicaba-form-control">
                </div>
                
                <div class="sicaba-form-group">
                    <label for="kecamatan"><?php _e('Kecamatan', 'sicaba'); ?> *</label>
                    <input type="text" id="kecamatan" name="kecamatan" required class="sicaba-form-control">
                </div>
            </div>
            
            <div class="sicaba-form-row">
                <div class="sicaba-form-group">
                    <label for="kabupaten_kota"><?php _e('Kabupaten/Kota', 'sicaba'); ?></label>
                    <input type="text" id="kabupaten_kota" name="kabupaten_kota" value="Tasikmalaya" class="sicaba-form-control">
                </div>
                
                <div class="sicaba-form-group">
                    <label for="provinsi"><?php _e('Provinsi', 'sicaba'); ?></label>
                    <input type="text" id="provinsi" name="provinsi" value="Jawa Barat" class="sicaba-form-control">
                </div>
            </div>
            
            <div class="sicaba-form-row">
                <div class="sicaba-form-group">
                    <label for="latitude"><?php _e('Latitude', 'sicaba'); ?></label>
                    <input type="text" id="latitude" name="latitude" class="sicaba-form-control" placeholder="-7.3274000">
                </div>
                
                <div class="sicaba-form-group">
                    <label for="longitude"><?php _e('Longitude', 'sicaba'); ?></label>
                    <input type="text" id="longitude" name="longitude" class="sicaba-form-control" placeholder="108.2217000">
                </div>
            </div>
        </fieldset>
        
        <!-- Section: Uraian ODCB -->
        <fieldset class="sicaba-form-section">
            <legend><?php _e('B. Uraian ODCB', 'sicaba'); ?></legend>
            
            <div class="sicaba-form-group">
                <label for="deskripsi"><?php _e('Deskripsi ODCB', 'sicaba'); ?> *</label>
                <textarea id="deskripsi" name="deskripsi" required class="sicaba-form-control" rows="5"></textarea>
            </div>
            
            <div class="sicaba-form-group">
                <label for="sejarah"><?php _e('Sejarah', 'sicaba'); ?> *</label>
                <textarea id="sejarah" name="sejarah" required class="sicaba-form-control" rows="5"></textarea>
            </div>
            
            <div class="sicaba-form-group">
                <label for="kondisi"><?php _e('Kondisi Saat Ini', 'sicaba'); ?> *</label>
                <select id="kondisi" name="kondisi" required class="sicaba-form-control">
                    <option value=""><?php _e('-- Pilih Kondisi --', 'sicaba'); ?></option>
                    <option value="Utuh"><?php _e('Utuh', 'sicaba'); ?></option>
                    <option value="Tinggal Sebagian"><?php _e('Tinggal Sebagian', 'sicaba'); ?></option>
                    <option value="Musnah"><?php _e('Musnah', 'sicaba'); ?></option>
                    <option value="Hilang"><?php _e('Hilang', 'sicaba'); ?></option>
                    <option value="Berubah Wujud dan Gaya"><?php _e('Berubah Wujud dan Gaya', 'sicaba'); ?></option>
                </select>
            </div>
            
            <div class="sicaba-form-group">
                <label for="periode_masa"><?php _e('Periode/Masa', 'sicaba'); ?></label>
                <select id="periode_masa" name="periode_masa" class="sicaba-form-control">
                    <option value=""><?php _e('-- Pilih Periode --', 'sicaba'); ?></option>
                    <option value="Prasejarah"><?php _e('Prasejarah', 'sicaba'); ?></option>
                    <option value="Klasik (Hindu-Buddha)"><?php _e('Klasik (Hindu-Buddha)', 'sicaba'); ?></option>
                    <option value="Islam"><?php _e('Islam', 'sicaba'); ?></option>
                    <option value="Kolonial"><?php _e('Kolonial', 'sicaba'); ?></option>
                    <option value="Kemerdekaan"><?php _e('Kemerdekaan', 'sicaba'); ?></option>
                    <option value="Modern"><?php _e('Modern', 'sicaba'); ?></option>
                </select>
            </div>
            
            <div class="sicaba-form-group">
                <label for="tahun_pembuatan"><?php _e('Tahun Pembuatan/Pembangunan', 'sicaba'); ?></label>
                <input type="text" id="tahun_pembuatan" name="tahun_pembuatan" class="sicaba-form-control" placeholder="Contoh: 1850 atau Abad ke-19">
            </div>
            
            <div class="sicaba-form-group">
                <label for="status_kepemilikan"><?php _e('Status Kepemilikan', 'sicaba'); ?> *</label>
                <select id="status_kepemilikan" name="status_kepemilikan" required class="sicaba-form-control">
                    <option value=""><?php _e('-- Pilih Status --', 'sicaba'); ?></option>
                    <option value="Milik Pribadi"><?php _e('Milik Pribadi', 'sicaba'); ?></option>
                    <option value="Milik Negara"><?php _e('Milik Negara', 'sicaba'); ?></option>
                    <option value="Milik Daerah"><?php _e('Milik Daerah', 'sicaba'); ?></option>
                    <option value="Milik Desa"><?php _e('Milik Desa', 'sicaba'); ?></option>
                    <option value="Milik Badan Usaha"><?php _e('Milik Badan Usaha', 'sicaba'); ?></option>
                    <option value="Milik Masyarakat Hukum Adat"><?php _e('Milik Masyarakat Hukum Adat', 'sicaba'); ?></option>
                    <option value="Tidak Diketahui"><?php _e('Tidak Diketahui', 'sicaba'); ?></option>
                </select>
            </div>
            
            <div class="sicaba-form-group">
                <label for="status_pengelolaan"><?php _e('Status Pengelolaan', 'sicaba'); ?> *</label>
                <select id="status_pengelolaan" name="status_pengelolaan" required class="sicaba-form-control">
                    <option value=""><?php _e('-- Pilih Status --', 'sicaba'); ?></option>
                    <option value="Dikelola Sendiri"><?php _e('Dikelola Sendiri', 'sicaba'); ?></option>
                    <option value="Dikelola Pemerintah"><?php _e('Dikelola Pemerintah', 'sicaba'); ?></option>
                    <option value="Dikelola Badan Usaha"><?php _e('Dikelola Badan Usaha', 'sicaba'); ?></option>
                    <option value="Dikelola Masyarakat"><?php _e('Dikelola Masyarakat', 'sicaba'); ?></option>
                    <option value="Tidak Dikelola"><?php _e('Tidak Dikelola', 'sicaba'); ?></option>
                </select>
            </div>
        </fieldset>
        
        <!-- Section: Data Pendaftar -->
        <fieldset class="sicaba-form-section">
            <legend><?php _e('C. Data Pendaftar', 'sicaba'); ?></legend>
            
            <div class="sicaba-form-row">
                <div class="sicaba-form-group">
                    <label for="nama_pendaftar"><?php _e('Nama Pendaftar', 'sicaba'); ?> *</label>
                    <input type="text" id="nama_pendaftar" name="nama_pendaftar" value="<?php echo esc_attr($user->display_name); ?>" required class="sicaba-form-control">
                </div>
                
                <div class="sicaba-form-group">
                    <label for="nik_pendaftar"><?php _e('NIK', 'sicaba'); ?> *</label>
                    <input type="text" id="nik_pendaftar" name="nik_pendaftar" required class="sicaba-form-control" maxlength="16">
                </div>
            </div>
            
            <div class="sicaba-form-row">
                <div class="sicaba-form-group">
                    <label for="nomor_telepon"><?php _e('Nomor Telepon', 'sicaba'); ?></label>
                    <input type="tel" id="nomor_telepon" name="nomor_telepon" class="sicaba-form-control">
                </div>
                
                <div class="sicaba-form-group">
                    <label for="nomor_ponsel"><?php _e('Nomor Ponsel (HP)', 'sicaba'); ?> *</label>
                    <input type="tel" id="nomor_ponsel" name="nomor_ponsel" value="<?php echo esc_attr(get_user_meta($user->ID, 'phone', true)); ?>" required class="sicaba-form-control">
                </div>
            </div>
            
            <div class="sicaba-form-group">
                <label for="email_pendaftar"><?php _e('Email', 'sicaba'); ?></label>
                <input type="email" id="email_pendaftar" name="email_pendaftar" value="<?php echo esc_attr($user->user_email); ?>" class="sicaba-form-control">
            </div>
            
            <div class="sicaba-form-group">
                <label for="jenis_identitas"><?php _e('Jenis Identitas', 'sicaba'); ?> *</label>
                <select id="jenis_identitas" name="jenis_identitas" required class="sicaba-form-control">
                    <option value="KTP"><?php _e('KTP (Kartu Tanda Penduduk)', 'sicaba'); ?></option>
                    <option value="SIM"><?php _e('SIM (Surat Izin Mengemudi)', 'sicaba'); ?></option>
                </select>
            </div>
            
            <div class="sicaba-form-group">
                <label for="nomor_identitas"><?php _e('Nomor Identitas', 'sicaba'); ?> *</label>
                <input type="text" id="nomor_identitas" name="nomor_identitas" required class="sicaba-form-control">
            </div>
            
            <div class="sicaba-form-group">
                <label for="foto_identitas"><?php _e('Upload Foto KTP/SIM', 'sicaba'); ?> *</label>
                <input type="file" id="foto_identitas" name="foto_identitas" accept="image/*" required class="sicaba-form-control">
                <small><?php _e('Format: JPG, PNG. Max 5MB', 'sicaba'); ?></small>
            </div>
        </fieldset>
        
        <!-- Section: Dokumen Pendukung -->
        <fieldset class="sicaba-form-section">
            <legend><?php _e('D. Dokumen Pendukung', 'sicaba'); ?></legend>
            
            <div class="sicaba-form-group">
                <label for="foto_odcb"><?php _e('Foto ODCB', 'sicaba'); ?> *</label>
                <input type="file" id="foto_odcb" name="foto_odcb[]" accept="image/*" multiple required class="sicaba-form-control">
                <small><?php _e('Upload minimal 1 foto. Format: JPG, PNG. Max 10MB per file.', 'sicaba'); ?></small>
            </div>
        </fieldset>
        
        <div class="sicaba-form-actions">
            <button type="submit" class="sicaba-btn sicaba-btn-primary">
                <?php _e('Ajukan Pendaftaran', 'sicaba'); ?>
            </button>
            <button type="reset" class="sicaba-btn sicaba-btn-secondary">
                <?php _e('Reset', 'sicaba'); ?>
            </button>
        </div>
    </form>
</div>
