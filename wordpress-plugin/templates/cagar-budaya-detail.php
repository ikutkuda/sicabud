<?php
/**
 * Template: Cagar Budaya Detail
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="sicaba-detail">
    <div class="sicaba-detail-header">
        <?php if ($cagar_budaya['thumbnail']): ?>
            <div class="sicaba-detail-image">
                <img src="<?php echo esc_url($cagar_budaya['thumbnail']); ?>" alt="<?php echo esc_attr($cagar_budaya['nama']); ?>">
            </div>
        <?php endif; ?>
        
        <div class="sicaba-detail-info">
            <h1 class="sicaba-detail-title"><?php echo esc_html($cagar_budaya['nama']); ?></h1>
            
            <div class="sicaba-detail-meta">
                <?php if (!empty($cagar_budaya['jenis'])): ?>
                    <span class="sicaba-badge sicaba-badge-jenis">
                        <?php echo esc_html(implode(', ', $cagar_budaya['jenis'])); ?>
                    </span>
                <?php endif; ?>
                
                <?php if (!empty($cagar_budaya['kategori'])): ?>
                    <span class="sicaba-badge sicaba-badge-kategori">
                        <?php echo esc_html(implode(', ', $cagar_budaya['kategori'])); ?>
                    </span>
                <?php endif; ?>
                
                <?php if (!empty($cagar_budaya['status_penetapan'])): ?>
                    <span class="sicaba-badge sicaba-badge-status">
                        <?php echo esc_html(implode(', ', $cagar_budaya['status_penetapan'])); ?>
                    </span>
                <?php endif; ?>
            </div>
            
            <?php if (!empty($cagar_budaya['lokasi'])): ?>
                <div class="sicaba-detail-location">
                    <span class="dashicons dashicons-location"></span>
                    <strong><?php _e('Lokasi:', 'sicaba'); ?></strong>
                    <?php echo esc_html($cagar_budaya['lokasi']); ?>
                </div>
            <?php endif; ?>
            
            <?php if (!empty($cagar_budaya['tahun_berdiri'])): ?>
                <div class="sicaba-detail-year">
                    <span class="dashicons dashicons-calendar"></span>
                    <strong><?php _e('Tahun Berdiri:', 'sicaba'); ?></strong>
                    <?php echo esc_html($cagar_budaya['tahun_berdiri']); ?>
                </div>
            <?php endif; ?>
        </div>
    </div>
    
    <div class="sicaba-detail-content">
        <div class="sicaba-detail-section">
            <h2><?php _e('Deskripsi', 'sicaba'); ?></h2>
            <div class="sicaba-detail-text">
                <?php echo wpautop($cagar_budaya['deskripsi']); ?>
            </div>
        </div>
        
        <?php if (!empty($cagar_budaya['sejarah'])): ?>
            <div class="sicaba-detail-section">
                <h2><?php _e('Sejarah', 'sicaba'); ?></h2>
                <div class="sicaba-detail-text">
                    <?php echo wpautop($cagar_budaya['sejarah']); ?>
                </div>
            </div>
        <?php endif; ?>
        
        <?php if (!empty($cagar_budaya['arsitektur'])): ?>
            <div class="sicaba-detail-section">
                <h2><?php _e('Arsitektur', 'sicaba'); ?></h2>
                <div class="sicaba-detail-text">
                    <?php echo wpautop($cagar_budaya['arsitektur']); ?>
                </div>
            </div>
        <?php endif; ?>
        
        <?php if (!empty($cagar_budaya['nomor_sk']) || !empty($cagar_budaya['tanggal_penetapan'])): ?>
            <div class="sicaba-detail-section">
                <h2><?php _e('Informasi Penetapan', 'sicaba'); ?></h2>
                <table class="sicaba-info-table">
                    <?php if (!empty($cagar_budaya['nomor_sk'])): ?>
                        <tr>
                            <th><?php _e('Nomor SK', 'sicaba'); ?></th>
                            <td><?php echo esc_html($cagar_budaya['nomor_sk']); ?></td>
                        </tr>
                    <?php endif; ?>
                    
                    <?php if (!empty($cagar_budaya['tanggal_penetapan'])): ?>
                        <tr>
                            <th><?php _e('Tanggal Penetapan', 'sicaba'); ?></th>
                            <td><?php echo esc_html(date_i18n(get_option('date_format'), strtotime($cagar_budaya['tanggal_penetapan']))); ?></td>
                        </tr>
                    <?php endif; ?>
                </table>
            </div>
        <?php endif; ?>
        
        <?php if (!empty($cagar_budaya['latitude']) && !empty($cagar_budaya['longitude'])): ?>
            <div class="sicaba-detail-section">
                <h2><?php _e('Lokasi Peta', 'sicaba'); ?></h2>
                <div class="sicaba-map-container" 
                     data-lat="<?php echo esc_attr($cagar_budaya['latitude']); ?>" 
                     data-lng="<?php echo esc_attr($cagar_budaya['longitude']); ?>"
                     data-title="<?php echo esc_attr($cagar_budaya['nama']); ?>">
                </div>
            </div>
        <?php endif; ?>
    </div>
    
    <div class="sicaba-detail-footer">
        <a href="<?php echo esc_url(get_post_type_archive_link('cagar_budaya')); ?>" class="sicaba-btn sicaba-btn-secondary">
            <?php _e('Kembali ke Daftar', 'sicaba'); ?>
        </a>
    </div>
</div>
