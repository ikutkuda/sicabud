<?php
/**
 * Template: Cagar Budaya List
 */

if (!defined('ABSPATH')) {
    exit;
}
?>

<div class="sicaba-container">
    <?php if (empty($data['items'])): ?>
        <div class="sicaba-empty">
            <p><?php _e('Tidak ada cagar budaya ditemukan.', 'sicaba'); ?></p>
        </div>
    <?php else: ?>
        <div class="sicaba-grid sicaba-grid-3">
            <?php foreach ($data['items'] as $item): ?>
                <article class="sicaba-card">
                    <?php if ($item['thumbnail']): ?>
                        <div class="sicaba-card-image">
                            <a href="<?php echo esc_url(get_permalink($item['id'])); ?>">
                                <img src="<?php echo esc_url($item['thumbnail']); ?>" alt="<?php echo esc_attr($item['nama']); ?>">
                            </a>
                        </div>
                    <?php endif; ?>
                    
                    <div class="sicaba-card-content">
                        <h3 class="sicaba-card-title">
                            <a href="<?php echo esc_url(get_permalink($item['id'])); ?>">
                                <?php echo esc_html($item['nama']); ?>
                            </a>
                        </h3>
                        
                        <?php if (!empty($item['jenis'])): ?>
                            <div class="sicaba-card-meta">
                                <span class="sicaba-badge sicaba-badge-jenis">
                                    <?php echo esc_html(implode(', ', $item['jenis'])); ?>
                                </span>
                            </div>
                        <?php endif; ?>
                        
                        <?php if (!empty($item['kategori'])): ?>
                            <div class="sicaba-card-meta">
                                <span class="sicaba-badge sicaba-badge-kategori">
                                    <?php echo esc_html(implode(', ', $item['kategori'])); ?>
                                </span>
                            </div>
                        <?php endif; ?>
                        
                        <?php if (!empty($item['status_penetapan'])): ?>
                            <div class="sicaba-card-meta">
                                <span class="sicaba-badge sicaba-badge-status">
                                    <?php echo esc_html(implode(', ', $item['status_penetapan'])); ?>
                                </span>
                            </div>
                        <?php endif; ?>
                        
                        <?php if (!empty($item['lokasi'])): ?>
                            <div class="sicaba-card-location">
                                <span class="dashicons dashicons-location"></span>
                                <?php echo esc_html($item['lokasi']); ?>
                            </div>
                        <?php endif; ?>
                        
                        <p class="sicaba-card-excerpt">
                            <?php echo esc_html(wp_trim_words($item['excerpt'] ?: $item['deskripsi'], 25)); ?>
                        </p>
                        
                        <a href="<?php echo esc_url(get_permalink($item['id'])); ?>" class="sicaba-btn sicaba-btn-primary">
                            <?php _e('Lihat Detail', 'sicaba'); ?>
                        </a>
                    </div>
                </article>
            <?php endforeach; ?>
        </div>
        
        <?php if ($data['pages'] > 1): ?>
            <div class="sicaba-pagination">
                <?php
                echo paginate_links(array(
                    'total' => $data['pages'],
                    'current' => max(1, get_query_var('paged')),
                    'prev_text' => __('&laquo; Sebelumnya', 'sicaba'),
                    'next_text' => __('Selanjutnya &raquo;', 'sicaba')
                ));
                ?>
            </div>
        <?php endif; ?>
    <?php endif; ?>
</div>
