<?php
/**
 * Admin View: ODCB Detail
 */

if (!defined('ABSPATH')) {
    exit;
}

if (!$odcb) {
    echo '<div class="notice notice-error"><p>' . __('ODCB tidak ditemukan.', 'sicaba') . '</p></div>';
    return;
}
?>

<div class="wrap">
    <h1>
        <?php _e('Detail ODCB', 'sicaba'); ?>
        <a href="<?php echo admin_url('admin.php?page=sicaba-odcb'); ?>" class="page-title-action">
            <?php _e('Kembali', 'sicaba'); ?>
        </a>
    </h1>
    
    <div class="sicaba-odcb-detail">
        <div class="sicaba-detail-header">
            <h2><?php echo esc_html($odcb->nama_odcb); ?></h2>
            <p class="sicaba-detail-meta">
                <strong><?php _e('No. Induk:', 'sicaba'); ?></strong> <?php echo esc_html($odcb->nomor_induk); ?> |
                <strong><?php _e('Status:', 'sicaba'); ?></strong> 
                <span class="sicaba-status sicaba-status-<?php echo sanitize_title($odcb->status); ?>">
                    <?php echo esc_html($odcb->status); ?>
                </span>
            </p>
        </div>
        
        <div class="sicaba-detail-content">
            <div class="sicaba-detail-section">
                <h3><?php _e('Identitas ODCB', 'sicaba'); ?></h3>
                <table class="sicaba-info-table">
                    <tr>
                        <th><?php _e('Jenis', 'sicaba'); ?></th>
                        <td><?php echo esc_html($odcb->jenis_odcb); ?></td>
                    </tr>
                    <tr>
                        <th><?php _e('Alamat', 'sicaba'); ?></th>
                        <td><?php echo esc_html($odcb->alamat_odcb); ?></td>
                    </tr>
                    <tr>
                        <th><?php _e('Desa/Kelurahan', 'sicaba'); ?></th>
                        <td><?php echo esc_html($odcb->desa_kelurahan); ?></td>
                    </tr>
                    <tr>
                        <th><?php _e('Kecamatan', 'sicaba'); ?></th>
                        <td><?php echo esc_html($odcb->kecamatan); ?></td>
                    </tr>
                    <tr>
                        <th><?php _e('Kabupaten/Kota', 'sicaba'); ?></th>
                        <td><?php echo esc_html($odcb->kabupaten_kota); ?></td>
                    </tr>
                    <tr>
                        <th><?php _e('Provinsi', 'sicaba'); ?></th>
                        <td><?php echo esc_html($odcb->provinsi); ?></td>
                    </tr>
                    <?php if ($odcb->latitude && $odcb->longitude): ?>
                    <tr>
                        <th><?php _e('Koordinat', 'sicaba'); ?></th>
                        <td><?php echo esc_html($odcb->latitude . ', ' . $odcb->longitude); ?></td>
                    </tr>
                    <?php endif; ?>
                </table>
            </div>
            
            <div class="sicaba-detail-section">
                <h3><?php _e('Uraian ODCB', 'sicaba'); ?></h3>
                <table class="sicaba-info-table">
                    <tr>
                        <th><?php _e('Deskripsi', 'sicaba'); ?></th>
                        <td><?php echo wpautop($odcb->deskripsi); ?></td>
                    </tr>
                    <tr>
                        <th><?php _e('Sejarah', 'sicaba'); ?></th>
                        <td><?php echo wpautop($odcb->sejarah); ?></td>
                    </tr>
                    <tr>
                        <th><?php _e('Kondisi', 'sicaba'); ?></th>
                        <td><?php echo esc_html($odcb->kondisi); ?></td>
                    </tr>
                    <?php if ($odcb->periode_masa): ?>
                    <tr>
                        <th><?php _e('Periode/Masa', 'sicaba'); ?></th>
                        <td><?php echo esc_html($odcb->periode_masa); ?></td>
                    </tr>
                    <?php endif; ?>
                    <?php if ($odcb->tahun_pembuatan): ?>
                    <tr>
                        <th><?php _e('Tahun Pembuatan', 'sicaba'); ?></th>
                        <td><?php echo esc_html($odcb->tahun_pembuatan); ?></td>
                    </tr>
                    <?php endif; ?>
                    <tr>
                        <th><?php _e('Status Kepemilikan', 'sicaba'); ?></th>
                        <td><?php echo esc_html($odcb->status_kepemilikan); ?></td>
                    </tr>
                    <tr>
                        <th><?php _e('Status Pengelolaan', 'sicaba'); ?></th>
                        <td><?php echo esc_html($odcb->status_pengelolaan); ?></td>
                    </tr>
                </table>
            </div>
            
            <div class="sicaba-detail-section">
                <h3><?php _e('Data Pendaftar', 'sicaba'); ?></h3>
                <table class="sicaba-info-table">
                    <tr>
                        <th><?php _e('Nama', 'sicaba'); ?></th>
                        <td><?php echo esc_html($odcb->nama_pendaftar); ?></td>
                    </tr>
                    <tr>
                        <th><?php _e('NIK', 'sicaba'); ?></th>
                        <td><?php echo esc_html($odcb->nik_pendaftar); ?></td>
                    </tr>
                    <tr>
                        <th><?php _e('Email', 'sicaba'); ?></th>
                        <td><?php echo esc_html($odcb->email_pendaftar); ?></td>
                    </tr>
                    <tr>
                        <th><?php _e('Telepon', 'sicaba'); ?></th>
                        <td><?php echo esc_html($odcb->nomor_ponsel); ?></td>
                    </tr>
                    <tr>
                        <th><?php _e('Asal', 'sicaba'); ?></th>
                        <td><?php echo esc_html($odcb->asal_pendaftar); ?></td>
                    </tr>
                </table>
            </div>
            
            <div class="sicaba-detail-section">
                <h3><?php _e('Dokumen', 'sicaba'); ?></h3>
                <p><strong><?php _e('Foto Identitas:', 'sicaba'); ?></strong></p>
                <?php
                $foto_identitas = json_decode($odcb->foto_identitas, true);
                if ($foto_identitas):
                ?>
                    <div class="sicaba-document-list">
                        <a href="<?php echo esc_url(wp_get_upload_dir()['baseurl'] . '/' . $foto_identitas['path_file']); ?>" target="_blank" class="button">
                            <?php _e('Lihat Foto', 'sicaba'); ?>
                        </a>
                    </div>
                <?php endif; ?>
                
                <p><strong><?php _e('Foto ODCB:', 'sicaba'); ?></strong></p>
                <?php
                $foto_odcb = json_decode($odcb->foto_odcb, true);
                if ($foto_odcb):
                ?>
                    <div class="sicaba-document-list">
                        <?php foreach ($foto_odcb as $foto): ?>
                            <a href="<?php echo esc_url(wp_get_upload_dir()['baseurl'] . '/' . $foto['path_file']); ?>" target="_blank" class="button">
                                <?php echo esc_html($foto['nama_file']); ?>
                            </a>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>
            
            <?php if (current_user_can('manage_options')): ?>
            <div class="sicaba-detail-section">
                <h3><?php _e('Update Status', 'sicaba'); ?></h3>
                <form method="post" action="<?php echo admin_url('admin.php?page=sicaba-odcb&action=update_status&id=' . $odcb->id); ?>">
                    <?php wp_nonce_field('sicaba_update_odcb_status', 'sicaba_odcb_status_nonce'); ?>
                    <input type="hidden" name="odcb_id" value="<?php echo esc_attr($odcb->id); ?>">
                    
                    <div class="sicaba-form-group">
                        <label for="status"><?php _e('Status Baru', 'sicaba'); ?></label>
                        <select name="status" id="status" class="sicaba-form-control" required>
                            <option value="Terdaftar" <?php selected($odcb->status, 'Terdaftar'); ?>>Terdaftar</option>
                            <option value="Lolos Verifikasi" <?php selected($odcb->status, 'Lolos Verifikasi'); ?>>Lolos Verifikasi</option>
                            <option value="Tidak Lolos Verifikasi" <?php selected($odcb->status, 'Tidak Lolos Verifikasi'); ?>>Tidak Lolos Verifikasi</option>
                            <option value="Pengkajian" <?php selected($odcb->status, 'Pengkajian'); ?>>Pengkajian</option>
                            <option value="Direkomendasikan" <?php selected($odcb->status, 'Direkomendasikan'); ?>>Direkomendasikan</option>
                            <option value="Ditetapkan" <?php selected($odcb->status, 'Ditetapkan'); ?>>Ditetapkan</option>
                            <option value="Ditolak" <?php selected($odcb->status, 'Ditolak'); ?>>Ditolak</option>
                        </select>
                    </div>
                    
                    <div class="sicaba-form-group">
                        <label for="catatan"><?php _e('Catatan', 'sicaba'); ?></label>
                        <textarea name="catatan" id="catatan" class="sicaba-form-control" rows="4"><?php echo esc_textarea($odcb->catatan_manager); ?></textarea>
                    </div>
                    
                    <button type="submit" class="button button-primary"><?php _e('Update Status', 'sicaba'); ?></button>
                </form>
            </div>
            <?php endif; ?>
        </div>
    </div>
</div>
