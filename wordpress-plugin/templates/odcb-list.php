<?php
/**
 * Template: ODCB List
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="sicaba-odcb-list">
    <h2><?php _e('Pendaftaran ODCB Saya', 'sicaba'); ?></h2>
    
    <?php if (empty($odcb_list)): ?>
        <div class="sicaba-empty">
            <p><?php _e('Anda belum mendaftarkan ODCB.', 'sicaba'); ?></p>
            <a href="<?php echo esc_url(home_url('/pendaftaran-odcb/')); ?>" class="sicaba-btn sicaba-btn-primary">
                <?php _e('Daftarkan ODCB Baru', 'sicaba'); ?>
            </a>
        </div>
    <?php else: ?>
        <table class="sicaba-table">
            <thead>
                <tr>
                    <th><?php _e('No. Induk', 'sicaba'); ?></th>
                    <th><?php _e('Nama ODCB', 'sicaba'); ?></th>
                    <th><?php _e('Jenis', 'sicaba'); ?></th>
                    <th><?php _e('Status', 'sicaba'); ?></th>
                    <th><?php _e('Tanggal Pengajuan', 'sicaba'); ?></th>
                    <th><?php _e('Aksi', 'sicaba'); ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($odcb_list as $odcb): ?>
                    <tr>
                        <td><?php echo esc_html($odcb->nomor_induk); ?></td>
                        <td><?php echo esc_html($odcb->nama_odcb); ?></td>
                        <td>
                            <span class="sicaba-badge">
                                <?php echo esc_html($odcb->jenis_odcb); ?>
                            </span>
                        </td>
                        <td>
                            <span class="sicaba-status sicaba-status-<?php echo sanitize_title($odcb->status); ?>">
                                <?php echo esc_html($odcb->status); ?>
                            </span>
                        </td>
                        <td><?php echo esc_html(date_i18n(get_option('date_format'), strtotime($odcb->tanggal_pengajuan))); ?></td>
                        <td>
                            <a href="<?php echo esc_url(add_query_arg(array('odcb_id' => $odcb->id), home_url('/status-odcb/'))); ?>" class="sicaba-btn sicaba-btn-small">
                                <?php _e('Lihat Detail', 'sicaba'); ?>
                            </a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>
</div>
