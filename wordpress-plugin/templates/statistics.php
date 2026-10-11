<?php
/**
 * Template: Statistics
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="sicaba-statistics">
    <h2><?php _e('Statistik Cagar Budaya', 'sicaba'); ?></h2>
    
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
    </div>
    
    <?php
    // Get cagar budaya by jenis
    $jenis_terms = get_terms(array(
        'taxonomy' => 'jenis_cagar_budaya',
        'hide_empty' => false
    ));
    
    if (!is_wp_error($jenis_terms) && !empty($jenis_terms)):
    ?>
    <div class="sicaba-widget">
        <h3><?php _e('Cagar Budaya per Jenis', 'sicaba'); ?></h3>
        <div class="sicaba-widget-content">
            <table class="sicaba-table">
                <thead>
                    <tr>
                        <th><?php _e('Jenis', 'sicaba'); ?></th>
                        <th><?php _e('Jumlah', 'sicaba'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($jenis_terms as $term): ?>
                        <tr>
                            <td><?php echo esc_html($term->name); ?></td>
                            <td><?php echo esc_html($term->count); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
    <?php endif; ?>
    
    <?php
    // Get cagar budaya by status penetapan
    $status_terms = get_terms(array(
        'taxonomy' => 'status_penetapan',
        'hide_empty' => false
    ));
    
    if (!is_wp_error($status_terms) && !empty($status_terms)):
    ?>
    <div class="sicaba-widget">
        <h3><?php _e('Cagar Budaya per Status Penetapan', 'sicaba'); ?></h3>
        <div class="sicaba-widget-content">
            <table class="sicaba-table">
                <thead>
                    <tr>
                        <th><?php _e('Status', 'sicaba'); ?></th>
                        <th><?php _e('Jumlah', 'sicaba'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($status_terms as $term): ?>
                        <tr>
                            <td><?php echo esc_html($term->name); ?></td>
                            <td><?php echo esc_html($term->count); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
    <?php endif; ?>
    
    <?php
    // Get cagar budaya by kecamatan
    $kecamatan_terms = get_terms(array(
        'taxonomy' => 'kecamatan',
        'hide_empty' => false
    ));
    
    if (!is_wp_error($kecamatan_terms) && !empty($kecamatan_terms)):
    ?>
    <div class="sicaba-widget">
        <h3><?php _e('Cagar Budaya per Kecamatan', 'sicaba'); ?></h3>
        <div class="sicaba-widget-content">
            <table class="sicaba-table">
                <thead>
                    <tr>
                        <th><?php _e('Kecamatan', 'sicaba'); ?></th>
                        <th><?php _e('Jumlah', 'sicaba'); ?></th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($kecamatan_terms as $term): ?>
                        <tr>
                            <td><?php echo esc_html($term->name); ?></td>
                            <td><?php echo esc_html($term->count); ?></td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>
    <?php endif; ?>
</div>
