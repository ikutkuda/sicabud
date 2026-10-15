<?php
/**
 * Admin View: Dashboard
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap sicaba-dashboard">
    <h1><?php _e('Dashboard SICABA', 'sicaba'); ?></h1>
    
    <div class="sicaba-stats-grid">
        <div class="sicaba-stat-card">
            <h3><?php _e('Total Cagar Budaya', 'sicaba'); ?></h3>
            <div class="stat-number"><?php echo esc_html($total_cagar->publish ?? 0); ?></div>
            <div class="stat-label"><?php _e('Cagar Budaya Terdaftar', 'sicaba'); ?></div>
        </div>
        
        <div class="sicaba-stat-card">
            <h3><?php _e('Total ODCB', 'sicaba'); ?></h3>
            <div class="stat-number"><?php echo esc_html($total_odcb); ?></div>
            <div class="stat-label"><?php _e('Objek Diduga Cagar Budaya', 'sicaba'); ?></div>
        </div>
        
        <div class="sicaba-stat-card">
            <h3><?php _e('ODCB Pending', 'sicaba'); ?></h3>
            <div class="stat-number"><?php echo esc_html($total_pending); ?></div>
            <div class="stat-label"><?php _e('Menunggu Verifikasi', 'sicaba'); ?></div>
        </div>
        
        <div class="sicaba-stat-card">
            <h3><?php _e('Total Users', 'sicaba'); ?></h3>
            <div class="stat-number"><?php echo esc_html($total_users['total_users']); ?></div>
            <div class="stat-label"><?php _e('Pengguna Terdaftar', 'sicaba'); ?></div>
        </div>
    </div>
    
    <div class="sicaba-dashboard-widgets">
        <div class="sicaba-widget">
            <h2><?php _e('Aktivitas Terbaru', 'sicaba'); ?></h2>
            <div class="sicaba-widget-content">
                <?php
                $recent_logs = SICABA_Database::get_recent_logs(10);
                if (!empty($recent_logs)):
                ?>
                    <table class="sicaba-table">
                        <thead>
                            <tr>
                                <th><?php _e('Waktu', 'sicaba'); ?></th>
                                <th><?php _e('User', 'sicaba'); ?></th>
                                <th><?php _e('Aktivitas', 'sicaba'); ?></th>
                                <th><?php _e('Deskripsi', 'sicaba'); ?></th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($recent_logs as $log): ?>
                                <tr>
                                    <td><?php echo esc_html(date_i18n(get_option('date_format') . ' ' . get_option('time_format'), strtotime($log->created_at))); ?></td>
                                    <td><?php echo esc_html($log->user_name ?? 'System'); ?></td>
                                    <td><span class="sicaba-badge"><?php echo esc_html($log->aksi); ?></span></td>
                                    <td><?php echo esc_html($log->deskripsi); ?></td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php else: ?>
                    <p><?php _e('Belum ada aktivitas.', 'sicaba'); ?></p>
                <?php endif; ?>
            </div>
        </div>
        
        <div class="sicaba-widget">
            <h2><?php _e('Quick Links', 'sicaba'); ?></h2>
            <div class="sicaba-widget-content">
                <ul class="sicaba-quick-links">
                    <li><a href="<?php echo admin_url('post-new.php?post_type=cagar_budaya'); ?>" class="button button-primary"><?php _e('Tambah Cagar Budaya', 'sicaba'); ?></a></li>
                    <li><a href="<?php echo admin_url('admin.php?page=sicaba-odcb'); ?>" class="button"><?php _e('Lihat ODCB', 'sicaba'); ?></a></li>
                    <li><a href="<?php echo admin_url('admin.php?page=sicaba-verifikasi'); ?>" class="button"><?php _e('Verifikasi Pembayaran', 'sicaba'); ?></a></li>
                    <li><a href="<?php echo admin_url('admin.php?page=sicaba-statistik'); ?>" class="button"><?php _e('Lihat Statistik', 'sicaba'); ?></a></li>
                    <li><a href="<?php echo admin_url('admin.php?page=sicaba-pengaturan'); ?>" class="button"><?php _e('Pengaturan', 'sicaba'); ?></a></li>
                </ul>
            </div>
        </div>
    </div>
</div>
