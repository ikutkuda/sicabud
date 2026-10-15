<?php
/**
 * Admin View: Statistik
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="wrap">
    <h1><?php _e('Statistik SICABA', 'sicaba'); ?></h1>
    
    <div class="sicaba-stats-grid">
        <div class="sicaba-stat-card">
            <h3><?php _e('Total Cagar Budaya', 'sicaba'); ?></h3>
            <div class="stat-number"><?php echo esc_html($stats['total_cagar']); ?></div>
            <div class="stat-label"><?php _e('Cagar Budaya Terdaftar', 'sicaba'); ?></div>
        </div>
        
        <div class="sicaba-stat-card">
            <h3><?php _e('Total ODCB', 'sicaba'); ?></h3>
            <div class="stat-number"><?php echo esc_html($stats['total_odcb']); ?></div>
            <div class="stat-label"><?php _e('Objek Diduga Cagar Budaya', 'sicaba'); ?></div>
        </div>
        
        <div class="sicaba-stat-card">
            <h3><?php _e('ODCB Terdaftar', 'sicaba'); ?></h3>
            <div class="stat-number"><?php echo esc_html($stats['odcb_terdaftar']); ?></div>
            <div class="stat-label"><?php _e('Menunggu Verifikasi', 'sicaba'); ?></div>
        </div>
        
        <div class="sicaba-stat-card">
            <h3><?php _e('ODCB Pengkajian', 'sicaba'); ?></h3>
            <div class="stat-number"><?php echo esc_html($stats['odcb_pengkajian']); ?></div>
            <div class="stat-label"><?php _e('Sedang Dikaji', 'sicaba'); ?></div>
        </div>
        
        <div class="sicaba-stat-card">
            <h3><?php _e('ODCB Ditetapkan', 'sicaba'); ?></h3>
            <div class="stat-number"><?php echo esc_html($stats['odcb_ditetapkan']); ?></div>
            <div class="stat-label"><?php _e('Berhasil Ditetapkan', 'sicaba'); ?></div>
        </div>
        
        <div class="sicaba-stat-card">
            <h3><?php _e('ODCB Ditolak', 'sicaba'); ?></h3>
            <div class="stat-number"><?php echo esc_html($stats['odcb_ditolak']); ?></div>
            <div class="stat-label"><?php _e('Tidak Memenuhi Kriteria', 'sicaba'); ?></div>
        </div>
    </div>
    
    <div class="sicaba-widget">
        <h2><?php _e('Aktivitas Terbaru', 'sicaba'); ?></h2>
        <div class="sicaba-widget-content">
            <?php if (!empty($stats['recent_logs'])): ?>
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
                        <?php foreach ($stats['recent_logs'] as $log): ?>
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
</div>
