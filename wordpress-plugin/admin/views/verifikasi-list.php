<?php
/**
 * Admin View: Verifikasi Pembayaran
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap">
    <h1><?php _e('Verifikasi Pembayaran', 'sicaba'); ?></h1>
    
    <?php if (empty($payments)): ?>
        <div class="sicaba-empty">
            <p><?php _e('Tidak ada pembayaran yang menunggu verifikasi.', 'sicaba'); ?></p>
        </div>
    <?php else: ?>
        <table class="sicaba-table wp-list-table widefat fixed striped">
            <thead>
                <tr>
                    <th><?php _e('User', 'sicaba'); ?></th>
                    <th><?php _e('Nominal', 'sicaba'); ?></th>
                    <th><?php _e('File Bukti', 'sicaba'); ?></th>
                    <th><?php _e('Tanggal Upload', 'sicaba'); ?></th>
                    <th><?php _e('Status', 'sicaba'); ?></th>
                    <th><?php _e('Aksi', 'sicaba'); ?></th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($payments as $payment): ?>
                    <tr>
                        <td>
                            <strong><?php echo esc_html($payment->display_name); ?></strong><br>
                            <small><?php echo esc_html($payment->user_email); ?></small>
                        </td>
                        <td>
                            <strong><?php echo esc_html(number_format($payment->nominal, 0, ',', '.')); ?></strong>
                        </td>
                        <td>
                            <a href="<?php echo esc_url(wp_get_upload_dir()['baseurl'] . '/' . $payment->path_file); ?>" target="_blank" class="button button-small">
                                <?php _e('Lihat Bukti', 'sicaba'); ?>
                            </a>
                            <br>
                            <small><?php echo esc_html($payment->nama_file); ?></small>
                        </td>
                        <td><?php echo esc_html(date_i18n(get_option('date_format'), strtotime($payment->tanggal_upload))); ?></td>
                        <td>
                            <span class="sicaba-status sicaba-status-<?php echo esc_attr($payment->status_verifikasi); ?>">
                                <?php echo esc_html(ucfirst($payment->status_verifikasi)); ?>
                            </span>
                        </td>
                        <td>
                            <form method="post" style="display: inline;">
                                <?php wp_nonce_field('sicaba_verify_payment', 'sicaba_payment_nonce'); ?>
                                <input type="hidden" name="payment_id" value="<?php echo esc_attr($payment->id); ?>">
                                <button type="submit" name="status" value="valid" class="button button-small button-primary">
                                    <?php _e('Setujui', 'sicaba'); ?>
                                </button>
                                <button type="submit" name="status" value="invalid" class="button button-small button-link-delete">
                                    <?php _e('Tolak', 'sicaba'); ?>
                                </button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php endif; ?>
</div>
