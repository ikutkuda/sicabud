<?php
/**
 * Admin View: Pengaturan
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap">
    <h1><?php _e('Pengaturan SICABA', 'sicaba'); ?></h1>
    
    <form method="post" action="options.php">
        <?php settings_fields('sicaba_settings'); ?>
        <?php do_settings_sections('sicaba_settings'); ?>
        
        <table class="form-table">
            <tr>
                <th scope="row"><?php _e('Nominal Pendaftaran', 'sicaba'); ?></th>
                <td>
                    <input type="number" name="sicaba_nominal_pendaftaran" value="<?php echo esc_attr(get_option('sicaba_nominal_pendaftaran', 110000)); ?>" class="regular-text" min="0" step="1000">
                    <p class="description"><?php _e('Nominal pembayaran untuk pendaftaran Member/Manager (dalam Rupiah)', 'sicaba'); ?></p>
                </td>
            </tr>
            
            <tr>
                <th scope="row"><?php _e('Bank Pembayaran', 'sicaba'); ?></th>
                <td>
                    <input type="text" name="sicaba_bank_pembayaran" value="<?php echo esc_attr(get_option('sicaba_bank_pembayaran', 'BRI (Bank Rakyat Indonesia)')); ?>" class="regular-text">
                    <p class="description"><?php _e('Nama bank untuk pembayaran', 'sicaba'); ?></p>
                </td>
            </tr>
            
            <tr>
                <th scope="row"><?php _e('Nomor Rekening', 'sicaba'); ?></th>
                <td>
                    <input type="text" name="sicaba_rekening_pembayaran" value="<?php echo esc_attr(get_option('sicaba_rekening_pembayaran', '445301021768537')); ?>" class="regular-text">
                    <p class="description"><?php _e('Nomor rekening untuk pembayaran', 'sicaba'); ?></p>
                </td>
            </tr>
            
            <tr>
                <th scope="row"><?php _e('Atas Nama Rekening', 'sicaba'); ?></th>
                <td>
                    <input type="text" name="sicaba_atas_nama_rekening" value="<?php echo esc_attr(get_option('sicaba_atas_nama_rekening', 'Agus Wirabudiman')); ?>" class="regular-text">
                    <p class="description"><?php _e('Nama pemilik rekening', 'sicaba'); ?></p>
                </td>
            </tr>
            
            <tr>
                <th scope="row"><?php _e('Aktifkan Registrasi', 'sicaba'); ?></th>
                <td>
                    <label>
                        <input type="checkbox" name="sicaba_enable_registrasi" value="1" <?php checked(get_option('sicaba_enable_registrasi', 1), 1); ?>>
                        <?php _e('Izinkan pengguna baru mendaftar', 'sicaba'); ?>
                    </label>
                </td>
            </tr>
            
            <tr>
                <th scope="row"><?php _e('Aktifkan ODCB', 'sicaba'); ?></th>
                <td>
                    <label>
                        <input type="checkbox" name="sicaba_enable_odcb" value="1" <?php checked(get_option('sicaba_enable_odcb', 1), 1); ?>>
                        <?php _e('Izinkan pendaftaran ODCB', 'sicaba'); ?>
                    </label>
                </td>
            </tr>
            
            <tr>
                <th scope="row"><?php _e('Item Per Halaman', 'sicaba'); ?></th>
                <td>
                    <input type="number" name="sicaba_items_per_page" value="<?php echo esc_attr(get_option('sicaba_items_per_page', 12)); ?>" class="small-text" min="1" max="100">
                    <p class="description"><?php _e('Jumlah item yang ditampilkan per halaman', 'sicaba'); ?></p>
                </td>
            </tr>
        </table>
        
        <?php submit_button(); ?>
    </form>
    
    <hr>
    
    <h2><?php _e('Informasi Plugin', 'sicaba'); ?></h2>
    <table class="form-table">
        <tr>
            <th><?php _e('Versi', 'sicaba'); ?></th>
            <td><?php echo esc_html(SICABA_VERSION); ?></td>
        </tr>
        <tr>
            <th><?php _e('Database Tables', 'sicaba'); ?></th>
            <td>
                <ul>
                    <li><?php echo esc_html($GLOBALS['wpdb']->prefix . 'sicaba_odcb'); ?></li>
                    <li><?php echo esc_html($GLOBALS['wpdb']->prefix . 'sicaba_payments'); ?></li>
                    <li><?php echo esc_html($GLOBALS['wpdb']->prefix . 'sicaba_attachments'); ?></li>
                    <li><?php echo esc_html($GLOBALS['wpdb']->prefix . 'sicaba_logs'); ?></li>
                </ul>
            </td>
        </tr>
        <tr>
            <th><?php _e('Upload Directory', 'sicaba'); ?></th>
            <td>
                <code><?php echo esc_html(wp_upload_dir()['basedir'] . '/sicaba'); ?></code>
            </td>
        </tr>
    </table>
</div>
