<?php
/**
 * Frontend Display
 */

if (!defined('ABSPATH')) {
    exit;
}

class SICABA_Frontend {
    
    private $plugin_name;
    private $version;
    
    public function __construct($plugin_name, $version) {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
    }
    
    /**
     * Enqueue frontend styles
     */
    public function enqueue_styles() {
        wp_enqueue_style($this->plugin_name . '-frontend', SICABA_PLUGIN_URL . 'assets/css/frontend.css', array(), $this->version, 'all');
    }
    
    /**
     * Enqueue frontend scripts
     */
    public function enqueue_scripts() {
        wp_enqueue_script($this->plugin_name . '-frontend', SICABA_PLUGIN_URL . 'assets/js/frontend.js', array('jquery'), $this->version, false);
        
        wp_localize_script($this->plugin_name . '-frontend', 'sicaba_frontend', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('sicaba_frontend_nonce'),
            'plugin_url' => SICABA_PLUGIN_URL
        ));
    }
    
    /**
     * Get cagar budaya by ID
     */
    public static function get_cagar_budaya($id) {
        $post = get_post($id);
        
        if (!$post || $post->post_type !== 'cagar_budaya') {
            return null;
        }
        
        $data = array(
            'id' => $post->ID,
            'nama' => $post->post_title,
            'deskripsi' => $post->post_content,
            'excerpt' => $post->post_excerpt,
            'thumbnail' => get_the_post_thumbnail_url($post->ID, 'large'),
            'lokasi' => get_post_meta($post->ID, '_sicaba_lokasi', true),
            'tahun_berdiri' => get_post_meta($post->ID, '_sicaba_tahun_berdiri', true),
            'sejarah' => get_post_meta($post->ID, '_sicaba_sejarah', true),
            'arsitektur' => get_post_meta($post->ID, '_sicaba_arsitektur', true),
            'nomor_sk' => get_post_meta($post->ID, '_sicaba_nomor_sk', true),
            'tanggal_penetapan' => get_post_meta($post->ID, '_sicaba_tanggal_penetapan', true),
            'latitude' => get_post_meta($post->ID, '_sicaba_latitude', true),
            'longitude' => get_post_meta($post->ID, '_sicaba_longitude', true),
            'jenis' => wp_get_post_terms($post->ID, 'jenis_cagar_budaya', array('fields' => 'names')),
            'kategori' => wp_get_post_terms($post->ID, 'kategori_cagar_budaya', array('fields' => 'names')),
            'status_penetapan' => wp_get_post_terms($post->ID, 'status_penetapan', array('fields' => 'names')),
            'kecamatan' => wp_get_post_terms($post->ID, 'kecamatan', array('fields' => 'names'))
        );
        
        return $data;
    }
    
    /**
     * Get all cagar budaya
     */
    public static function get_all_cagar_budaya($args = array()) {
        $defaults = array(
            'post_type' => 'cagar_budaya',
            'posts_per_page' => get_option('sicaba_items_per_page', 12),
            'post_status' => 'publish',
            'orderby' => 'date',
            'order' => 'DESC'
        );
        
        $args = wp_parse_args($args, $defaults);
        
        $query = new WP_Query($args);
        $results = array();
        
        if ($query->have_posts()) {
            while ($query->have_posts()) {
                $query->the_post();
                $results[] = self::get_cagar_budaya(get_the_ID());
            }
            wp_reset_postdata();
        }
        
        return array(
            'items' => $results,
            'total' => $query->found_posts,
            'pages' => $query->max_num_pages
        );
    }
    
    /**
     * Render cagar budaya list
     */
    public static function render_list($args = array()) {
        $data = self::get_all_cagar_budaya($args);
        
        ob_start();
        include SICABA_PLUGIN_DIR . 'templates/cagar-budaya-list.php';
        return ob_get_clean();
    }
    
    /**
     * Render cagar budaya detail
     */
    public static function render_detail($id) {
        $cagar_budaya = self::get_cagar_budaya($id);
        
        if (!$cagar_budaya) {
            return '<p>' . __('Cagar budaya tidak ditemukan.', 'sicaba') . '</p>';
        }
        
        ob_start();
        include SICABA_PLUGIN_DIR . 'templates/cagar-budaya-detail.php';
        return ob_get_clean();
    }
    
    /**
     * Render ODCB form
     */
    public static function render_odcb_form() {
        if (!is_user_logged_in()) {
            return '<p>' . __('Anda harus login untuk mendaftar ODCB.', 'sicaba') . '</p>';
        }
        
        ob_start();
        include SICABA_PLUGIN_DIR . 'templates/odcb-form.php';
        return ob_get_clean();
    }
    
    /**
     * Render ODCB list for current user
     */
    public static function render_odcb_list() {
        if (!is_user_logged_in()) {
            return '<p>' . __('Anda harus login untuk melihat pendaftaran ODCB Anda.', 'sicaba') . '</p>';
        }
        
        $user_id = get_current_user_id();
        $odcb_list = SICABA_Database::get_all_odcb(array(
            'pendaftar_id' => $user_id,
            'limit' => 50
        ));
        
        ob_start();
        include SICABA_PLUGIN_DIR . 'templates/odcb-list.php';
        return ob_get_clean();
    }
    
    /**
     * Render map
     */
    public static function render_map($args = array()) {
        ob_start();
        include SICABA_PLUGIN_DIR . 'templates/map.php';
        return ob_get_clean();
    }
    
    /**
     * Render statistics
     */
    public static function render_statistics() {
        $stats = array(
            'total_cagar' => wp_count_posts('cagar_budaya')->publish,
            'total_odcb' => SICABA_Database::count_odcb_by_status(),
            'odcb_terdaftar' => SICABA_Database::count_odcb_by_status('Terdaftar'),
            'odcb_pengkajian' => SICABA_Database::count_odcb_by_status('Pengkajian'),
            'odcb_ditetapkan' => SICABA_Database::count_odcb_by_status('Ditetapkan')
        );
        
        ob_start();
        include SICABA_PLUGIN_DIR . 'templates/statistics.php';
        return ob_get_clean();
    }
}
