<?php
/**
 * Custom Post Types
 */

if (!defined('ABSPATH')) {
    exit;
}

class SICABA_Post_Types {
    
    public function __construct() {
        add_action('init', array($this, 'register_post_types'));
        add_action('init', array($this, 'register_taxonomies'));
    }
    
    /**
     * Register Custom Post Types
     */
    public function register_post_types() {
        // Cagar Budaya Post Type
        $labels = array(
            'name' => __('Cagar Budaya', 'sicaba'),
            'singular_name' => __('Cagar Budaya', 'sicaba'),
            'menu_name' => __('Cagar Budaya', 'sicaba'),
            'add_new' => __('Tambah Baru', 'sicaba'),
            'add_new_item' => __('Tambah Cagar Budaya Baru', 'sicaba'),
            'edit_item' => __('Edit Cagar Budaya', 'sicaba'),
            'new_item' => __('Cagar Budaya Baru', 'sicaba'),
            'view_item' => __('Lihat Cagar Budaya', 'sicaba'),
            'search_items' => __('Cari Cagar Budaya', 'sicaba'),
            'not_found' => __('Tidak ada cagar budaya ditemukan', 'sicaba'),
            'not_found_in_trash' => __('Tidak ada cagar budaya di trash', 'sicaba')
        );
        
        $args = array(
            'labels' => $labels,
            'public' => true,
            'publicly_queryable' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'query_var' => true,
            'rewrite' => array('slug' => 'cagar-budaya'),
            'capability_type' => 'post',
            'has_archive' => true,
            'hierarchical' => false,
            'menu_position' => 5,
            'menu_icon' => 'dashicons-building',
            'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
            'show_in_rest' => true
        );
        
        register_post_type('cagar_budaya', $args);
    }
    
    /**
     * Register Custom Taxonomies
     */
    public function register_taxonomies() {
        // Jenis Cagar Budaya
        $labels = array(
            'name' => __('Jenis Cagar Budaya', 'sicaba'),
            'singular_name' => __('Jenis', 'sicaba'),
            'search_items' => __('Cari Jenis', 'sicaba'),
            'all_items' => __('Semua Jenis', 'sicaba'),
            'parent_item' => __('Jenis Induk', 'sicaba'),
            'parent_item_colon' => __('Jenis Induk:', 'sicaba'),
            'edit_item' => __('Edit Jenis', 'sicaba'),
            'update_item' => __('Update Jenis', 'sicaba'),
            'add_new_item' => __('Tambah Jenis Baru', 'sicaba'),
            'new_item_name' => __('Nama Jenis Baru', 'sicaba'),
            'menu_name' => __('Jenis', 'sicaba')
        );
        
        register_taxonomy('jenis_cagar_budaya', array('cagar_budaya'), array(
            'hierarchical' => true,
            'labels' => $labels,
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var' => true,
            'rewrite' => array('slug' => 'jenis'),
            'show_in_rest' => true
        ));
        
        // Kategori Cagar Budaya
        $labels = array(
            'name' => __('Kategori', 'sicaba'),
            'singular_name' => __('Kategori', 'sicaba'),
            'search_items' => __('Cari Kategori', 'sicaba'),
            'all_items' => __('Semua Kategori', 'sicaba'),
            'edit_item' => __('Edit Kategori', 'sicaba'),
            'update_item' => __('Update Kategori', 'sicaba'),
            'add_new_item' => __('Tambah Kategori Baru', 'sicaba'),
            'new_item_name' => __('Nama Kategori Baru', 'sicaba'),
            'menu_name' => __('Kategori', 'sicaba')
        );
        
        register_taxonomy('kategori_cagar_budaya', array('cagar_budaya'), array(
            'hierarchical' => true,
            'labels' => $labels,
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var' => true,
            'rewrite' => array('slug' => 'kategori'),
            'show_in_rest' => true
        ));
        
        // Status Penetapan
        $labels = array(
            'name' => __('Status Penetapan', 'sicaba'),
            'singular_name' => __('Status', 'sicaba'),
            'search_items' => __('Cari Status', 'sicaba'),
            'all_items' => __('Semua Status', 'sicaba'),
            'edit_item' => __('Edit Status', 'sicaba'),
            'update_item' => __('Update Status', 'sicaba'),
            'add_new_item' => __('Tambah Status Baru', 'sicaba'),
            'new_item_name' => __('Nama Status Baru', 'sicaba'),
            'menu_name' => __('Status Penetapan', 'sicaba')
        );
        
        register_taxonomy('status_penetapan', array('cagar_budaya'), array(
            'hierarchical' => false,
            'labels' => $labels,
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var' => true,
            'rewrite' => array('slug' => 'status'),
            'show_in_rest' => true
        ));
        
        // Kecamatan
        $labels = array(
            'name' => __('Kecamatan', 'sicaba'),
            'singular_name' => __('Kecamatan', 'sicaba'),
            'search_items' => __('Cari Kecamatan', 'sicaba'),
            'all_items' => __('Semua Kecamatan', 'sicaba'),
            'edit_item' => __('Edit Kecamatan', 'sicaba'),
            'update_item' => __('Update Kecamatan', 'sicaba'),
            'add_new_item' => __('Tambah Kecamatan Baru', 'sicaba'),
            'new_item_name' => __('Nama Kecamatan Baru', 'sicaba'),
            'menu_name' => __('Kecamatan', 'sicaba')
        );
        
        register_taxonomy('kecamatan', array('cagar_budaya'), array(
            'hierarchical' => false,
            'labels' => $labels,
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var' => true,
            'rewrite' => array('slug' => 'kecamatan'),
            'show_in_rest' => true
        ));
    }
    
    /**
     * Add custom meta boxes
     */
    public function add_meta_boxes() {
        add_meta_box(
            'sicaba_cagar_budaya_details',
            __('Detail Cagar Budaya', 'sicaba'),
            array($this, 'render_meta_box'),
            'cagar_budaya',
            'normal',
            'high'
        );
    }
    
    /**
     * Render meta box
     */
    public function render_meta_box($post) {
        wp_nonce_field('sicaba_save_meta_box', 'sicaba_meta_box_nonce');
        
        $lokasi = get_post_meta($post->ID, '_sicaba_lokasi', true);
        $tahun = get_post_meta($post->ID, '_sicaba_tahun_berdiri', true);
        $sejarah = get_post_meta($post->ID, '_sicaba_sejarah', true);
        $arsitektur = get_post_meta($post->ID, '_sicaba_arsitektur', true);
        $nomor_sk = get_post_meta($post->ID, '_sicaba_nomor_sk', true);
        $tanggal_penetapan = get_post_meta($post->ID, '_sicaba_tanggal_penetapan', true);
        $latitude = get_post_meta($post->ID, '_sicaba_latitude', true);
        $longitude = get_post_meta($post->ID, '_sicaba_longitude', true);
        
        ?>
        <table class="form-table">
            <tr>
                <th><label for="sicaba_lokasi"><?php _e('Lokasi', 'sicaba'); ?></label></th>
                <td><input type="text" id="sicaba_lokasi" name="sicaba_lokasi" value="<?php echo esc_attr($lokasi); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="sicaba_tahun_berdiri"><?php _e('Tahun Berdiri', 'sicaba'); ?></label></th>
                <td><input type="text" id="sicaba_tahun_berdiri" name="sicaba_tahun_berdiri" value="<?php echo esc_attr($tahun); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="sicaba_sejarah"><?php _e('Sejarah', 'sicaba'); ?></label></th>
                <td><textarea id="sicaba_sejarah" name="sicaba_sejarah" rows="5" class="large-text"><?php echo esc_textarea($sejarah); ?></textarea></td>
            </tr>
            <tr>
                <th><label for="sicaba_arsitektur"><?php _e('Arsitektur', 'sicaba'); ?></label></th>
                <td><textarea id="sicaba_arsitektur" name="sicaba_arsitektur" rows="5" class="large-text"><?php echo esc_textarea($arsitektur); ?></textarea></td>
            </tr>
            <tr>
                <th><label for="sicaba_nomor_sk"><?php _e('Nomor SK', 'sicaba'); ?></label></th>
                <td><input type="text" id="sicaba_nomor_sk" name="sicaba_nomor_sk" value="<?php echo esc_attr($nomor_sk); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="sicaba_tanggal_penetapan"><?php _e('Tanggal Penetapan', 'sicaba'); ?></label></th>
                <td><input type="date" id="sicaba_tanggal_penetapan" name="sicaba_tanggal_penetapan" value="<?php echo esc_attr($tanggal_penetapan); ?>" /></td>
            </tr>
            <tr>
                <th><label for="sicaba_latitude"><?php _e('Latitude', 'sicaba'); ?></label></th>
                <td><input type="text" id="sicaba_latitude" name="sicaba_latitude" value="<?php echo esc_attr($latitude); ?>" class="regular-text" /></td>
            </tr>
            <tr>
                <th><label for="sicaba_longitude"><?php _e('Longitude', 'sicaba'); ?></label></th>
                <td><input type="text" id="sicaba_longitude" name="sicaba_longitude" value="<?php echo esc_attr($longitude); ?>" class="regular-text" /></td>
            </tr>
        </table>
        <?php
    }
    
    /**
     * Save meta box data
     */
    public function save_meta_box($post_id) {
        if (!isset($_POST['sicaba_meta_box_nonce']) || !wp_verify_nonce($_POST['sicaba_meta_box_nonce'], 'sicaba_save_meta_box')) {
            return;
        }
        
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
        
        $fields = array('lokasi', 'tahun_berdiri', 'sejarah', 'arsitektur', 'nomor_sk', 'tanggal_penetapan', 'latitude', 'longitude');
        
        foreach ($fields as $field) {
            if (isset($_POST['sicaba_' . $field])) {
                update_post_meta($post_id, '_sicaba_' . $field, sanitize_text_field($_POST['sicaba_' . $field]));
            }
        }
    }
}
