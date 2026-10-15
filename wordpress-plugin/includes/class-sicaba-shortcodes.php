<?php
/**
 * Shortcodes
 */

if (!defined('ABSPATH')) {
    exit;
}

class SICABA_Shortcodes {
    
    public function __construct() {
        add_shortcode('sicaba_list', array($this, 'shortcode_list'));
        add_shortcode('sicaba_detail', array($this, 'shortcode_detail'));
        add_shortcode('sicaba_map', array($this, 'shortcode_map'));
        add_shortcode('sicaba_statistics', array($this, 'shortcode_statistics'));
        add_shortcode('sicaba_odcb_form', array($this, 'shortcode_odcb_form'));
        add_shortcode('sicaba_odcb_list', array($this, 'shortcode_odcb_list'));
    }
    
    /**
     * Shortcode: [sicaba_list]
     * Display list of cagar budaya
     */
    public function shortcode_list($atts) {
        $atts = shortcode_atts(array(
            'limit' => 12,
            'jenis' => '',
            'kategori' => '',
            'kecamatan' => '',
            'columns' => 3
        ), $atts, 'sicaba_list');
        
        $args = array(
            'posts_per_page' => intval($atts['limit'])
        );
        
        // Taxonomy queries
        $tax_query = array();
        
        if (!empty($atts['jenis'])) {
            $tax_query[] = array(
                'taxonomy' => 'jenis_cagar_budaya',
                'field' => 'slug',
                'terms' => explode(',', $atts['jenis'])
            );
        }
        
        if (!empty($atts['kategori'])) {
            $tax_query[] = array(
                'taxonomy' => 'kategori_cagar_budaya',
                'field' => 'slug',
                'terms' => explode(',', $atts['kategori'])
            );
        }
        
        if (!empty($atts['kecamatan'])) {
            $tax_query[] = array(
                'taxonomy' => 'kecamatan',
                'field' => 'slug',
                'terms' => explode(',', $atts['kecamatan'])
            );
        }
        
        if (!empty($tax_query)) {
            $args['tax_query'] = $tax_query;
        }
        
        $data = SICABA_Frontend::get_all_cagar_budaya($args);
        
        ob_start();
        ?>
        <div class="sicaba-list" data-columns="<?php echo esc_attr($atts['columns']); ?>">
            <div class="sicaba-grid sicaba-grid-<?php echo esc_attr($atts['columns']); ?>">
                <?php foreach ($data['items'] as $item): ?>
                    <div class="sicaba-card">
                        <?php if ($item['thumbnail']): ?>
                            <div class="sicaba-card-image">
                                <img src="<?php echo esc_url($item['thumbnail']); ?>" alt="<?php echo esc_attr($item['nama']); ?>">
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
                                    <span class="sicaba-badge"><?php echo esc_html(implode(', ', $item['jenis'])); ?></span>
                                </div>
                            <?php endif; ?>
                            <p class="sicaba-card-excerpt">
                                <?php echo esc_html(wp_trim_words($item['excerpt'] ?: $item['deskripsi'], 20)); ?>
                            </p>
                            <a href="<?php echo esc_url(get_permalink($item['id'])); ?>" class="sicaba-btn">
                                <?php _e('Lihat Detail', 'sicaba'); ?>
                            </a>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }
    
    /**
     * Shortcode: [sicaba_detail id="123"]
     * Display single cagar budaya detail
     */
    public function shortcode_detail($atts) {
        $atts = shortcode_atts(array(
            'id' => 0
        ), $atts, 'sicaba_detail');
        
        if (empty($atts['id'])) {
            return '<p>' . __('ID cagar budaya harus diisi.', 'sicaba') . '</p>';
        }
        
        return SICABA_Frontend::render_detail(intval($atts['id']));
    }
    
    /**
     * Shortcode: [sicaba_map]
     * Display map of cagar budaya
     */
    public function shortcode_map($atts) {
        $atts = shortcode_atts(array(
            'height' => '500px',
            'zoom' => 12
        ), $atts, 'sicaba_map');
        
        return SICABA_Frontend::render_map($atts);
    }
    
    /**
     * Shortcode: [sicaba_statistics]
     * Display statistics
     */
    public function shortcode_statistics($atts) {
        return SICABA_Frontend::render_statistics();
    }
    
    /**
     * Shortcode: [sicaba_odcb_form]
     * Display ODCB registration form
     */
    public function shortcode_odcb_form($atts) {
        return SICABA_Frontend::render_odcb_form();
    }
    
    /**
     * Shortcode: [sicaba_odcb_list]
     * Display user's ODCB list
     */
    public function shortcode_odcb_list($atts) {
        return SICABA_Frontend::render_odcb_list();
    }
}
