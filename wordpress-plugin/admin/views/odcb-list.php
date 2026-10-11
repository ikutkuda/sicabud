<?php
/**
 * Admin View: ODCB List
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap">
    <h1>
        <?php _e('Pendaftaran ODCB', 'sicaba'); ?>
        <a href="<?php echo admin_url('admin.php?page=sicaba-odcb&action=add'); ?>" class="page-title-action">
            <?php _e('Tambah Baru', 'sicaba'); ?>
        </a>
    </h1>
    
    <?php if (empty($odcb_list)): ?>
        <div class="sicaba-empty">
            <p><?php _e('Belum ada pendaftaran ODCB.', 'sicaba'); ?></p>
        </div>
    <?php else: ?>
        <table class="sicaba-table wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th><?php _e('No. Induk', 'sicaba'); ?></th>
                    <th><?php _e('Nama ODCB', 'sicaba'); ?></th>
                    <th><?php _e('Jenis', 'sicaba'); ?></th>
                    <th><?php _e('Pendaftar', 'sicaba'); ?></th>
                    <th><?php _e('Status', 'sicaba'); ?></th>
                    <th><?php _e('Tanggal', 'sicaba'); ?></th>
                    <th><?php _e('Aksi', 'sicaba'); ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($odcb_list as $odcb): ?>
                    <tr>
                        <td><strong><?php echo esc_html($odcb->nomor_induk); ?></strong></td>
                        <td>
                            <a href="<?php echo admin_url('admin.php?page=sicaba-odcb&action=view&id=' . $odcb->id); ?>">
                                <?php echo esc_html($odcb->nama_odcb); ?>
                            </a>
                        </td>
                        <td>
                            <span class="sicaba-badge sicaba-badge-jenis">
                                <?php echo esc_html($odcb->jenis_odcb); ?>
                            </span>
                        </td>
                        <td>
                            <?php echo esc_html($odcb->nama_pendaftar); ?><br>
                            <small><?php echo esc_html($odcb->email_pendaftar); ?></small>
                        </td>
                        <td>
                            <span class="sicaba-status sicaba-status-<?php echo sanitize_title($odcb->status); ?>">
                                <?php echo esc_html($odcb->status); ?>
                            </span>
                        </td>
                        <td><?php echo esc_html(date_i18n(get_option('date_format'), strtotime($odcb->tanggal_pengajuan))); ?></td>
                        <td>
                            <a href="<?php echo admin_url('admin.php?page=sicaba-odcb&action=view&id=' . $odcb->id); ?>" class="button button-small">
                                <?php _e('Lihat', 'sicaba'); ?>
                            </a>
                            <a href="<?php echo admin_url('admin.php?page=sicaba-odcb&action=edit&id=' . $odcb->id); ?>" class="button button-small">
                                <?php _e('Edit', 'sicaba'); ?>
                            </a>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>
</div>
