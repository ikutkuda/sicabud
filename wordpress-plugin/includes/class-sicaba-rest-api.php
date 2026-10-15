<?php
/**
 * REST API
 */

if (!defined('ABSPATH')) {
    exit;
}

class SICABA_REST_API {
    
    public function __construct() {
        add_action('rest_api_init', array($this, 'register_routes'));
    }
    
    /**
     * Register REST routes
     */
    public function register_routes() {
        $namespace = 'sicaba/v1';
        
        // Cagar Budaya routes
        register_rest_route($namespace, '/cagar-budaya', array(
            array(
                'methods' => 'GET',
                'callback' => array($this, 'get_cagar_budaya_list'),
                'permission_callback' => '__return_true'
            )
        ));
        
        register_rest_route($namespace, '/cagar-budaya/(?P<id>\d+)', array(
            array(
                'methods' => 'GET',
                'callback' => array($this, 'get_cagar_budaya_detail'),
                'permission_callback' => '__return_true'
            )
        ));
        
        // ODCB routes
        register_rest_route($namespace, '/odcb', array(
            array(
                'methods' => 'GET',
                'callback' => array($this, 'get_odcb_list'),
                'permission_callback' => array($this, 'check_admin_permission')
            ),
            array(
                'methods' => 'POST',
                'callback' => array($this, 'create_odcb'),
                'permission_callback' => array($this, 'check_logged_in')
            )
        ));
        
        register_rest_route($namespace, '/odcb/(?P<id>\d+)', array(
            array(
                'methods' => 'GET',
                'callback' => array($this, 'get_odcb_detail'),
                'permission_callback' => array($this, 'check_admin_permission')
            ),
            array(
                'methods' => 'PUT',
                'callback' => array($this, 'update_odcb'),
                'permission_callback' => array($this, 'check_admin_permission')
            )
        ));
        
        // Statistics routes
        register_rest_route($namespace, '/statistics', array(
            array(
                'methods' => 'GET',
                'callback' => array($this, 'get_statistics'),
                'permission_callback' => '__return_true'
            )
        ));
    }
    
    /**
     * Check if user is logged in
     */
    public function check_logged_in() {
        return is_user_logged_in();
    }
    
    /**
     * Check if user is admin
     */
    public function check_admin_permission() {
        return current_user_can('manage_options');
    }
    
    /**
     * Get cagar budaya list
     */
    public function get_cagar_budaya_list($request) {
        $args = array(
            'posts_per_page' => $request->get_param('per_page') ?: 12,
            'paged' => $request->get_param('page') ?: 1
        );
        
        // Filter by jenis
        if ($jenis = $request->get_param('jenis')) {
            $args['tax_query'][] = array(
                'taxonomy' => 'jenis_cagar_budaya',
                'field' => 'slug',
                'terms' => $jenis
            );
        }
        
        // Filter by kategori
        if ($kategori = $request->get_param('kategori')) {
            $args['tax_query'][] = array(
                'taxonomy' => 'kategori_cagar_budaya',
                'field' => 'slug',
                'terms' => $kategori
            );
        }
        
        // Filter by kecamatan
        if ($kecamatan = $request->get_param('kecamatan')) {
            $args['tax_query'][] = array(
                'taxonomy' => 'kecamatan',
                'field' => 'slug',
                'terms' => $kecamatan
            );
        }
        
        // Search
        if ($search = $request->get_param('search')) {
            $args['s'] = $search;
        }
        
        $data = SICABA_Frontend::get_all_cagar_budaya($args);
        
        return new WP_REST_Response($data, 200);
    }
    
    /**
     * Get cagar budaya detail
     */
    public function get_cagar_budaya_detail($request) {
        $id = $request->get_param('id');
        $data = SICABA_Frontend::get_cagar_budaya($id);
        
        if (!$data) {
            return new WP_Error('not_found', 'Cagar budaya tidak ditemukan', array('status' => 404));
        }
        
        // Get attachments
        $data['lampiran'] = SICABA_Database::get_attachments($id);
        
        return new WP_REST_Response($data, 200);
    }
    
    /**
     * Get ODCB list
     */
    public function get_odcb_list($request) {
        $args = array(
            'limit' => $request->get_param('limit') ?: 20,
            'offset' => $request->get_param('offset') ?: 0
        );
        
        if ($status = $request->get_param('status')) {
            $args['status'] = $status;
        }
        
        if ($jenis = $request->get_param('jenis')) {
            $args['jenis'] = $jenis;
        }
        
        $data = SICABA_Database::get_all_odcb($args);
        
        return new WP_REST_Response($data, 200);
    }
    
    /**
     * Get ODCB detail
     */
    public function get_odcb_detail($request) {
        $id = $request->get_param('id');
        $data = SICABA_Database::get_odcb($id);
        
        if (!$data) {
            return new WP_Error('not_found', 'ODCB tidak ditemukan', array('status' => 404));
        }
        
        return new WP_REST_Response($data, 200);
    }
    
    /**
     * Create ODCB
     */
    public function create_odcb($request) {
        $data = $request->get_json_params();
        
        // Validate required fields
        $required = array('nama_odcb', 'jenis_odcb', 'alamat_odcb', 'deskripsi', 'sejarah', 'kondisi');
        foreach ($required as $field) {
            if (empty($data[$field])) {
                return new WP_Error('missing_field', "Field $field wajib diisi", array('status' => 400));
            }
        }
        
        // Add pendaftar info
        $user = wp_get_current_user();
        $data['pendaftar_id'] = $user->ID;
        $data['nama_pendaftar'] = $user->display_name;
        $data['email_pendaftar'] = $user->user_email;
        
        // Generate nomor induk
        $data['nomor_induk'] = 'ODCB-' . date('Y') . '-' . str_pad(SICABA_Database::count_odcb_by_status() + 1, 4, '0', STR_PAD_LEFT);
        
        $id = SICABA_Database::insert_odcb($data);
        
        if (!$id) {
            return new WP_Error('db_error', 'Gagal menyimpan ODCB', array('status' => 500));
        }
        
        SICABA_Database::log_activity('CREATE_ODCB', 'sicaba_odcb', $id, 'ODCB baru dibuat: ' . $data['nama_odcb']);
        
        $odcb = SICABA_Database::get_odcb($id);
        
        return new WP_REST_Response($odcb, 201);
    }
    
    /**
     * Update ODCB
     */
    public function update_odcb($request) {
        $id = $request->get_param('id');
        $data = $request->get_json_params();
        
        $odcb = SICABA_Database::get_odcb($id);
        if (!$odcb) {
            return new WP_Error('not_found', 'ODCB tidak ditemukan', array('status' => 404));
        }
        
        $result = SICABA_Database::update_odcb($id, $data);
        
        if (!$result) {
            return new WP_Error('db_error', 'Gagal mengupdate ODCB', array('status' => 500));
        }
        
        SICABA_Database::log_activity('UPDATE_ODCB', 'sicaba_odcb', $id, 'ODCB diperbarui');
        
        $updated = SICABA_Database::get_odcb($id);
        
        return new WP_REST_Response($updated, 200);
    }
    
    /**
     * Get statistics
     */
    public function get_statistics($request) {
        $stats = array(
            'total_cagar' => wp_count_posts('cagar_budaya')->publish,
            'total_odcb' => SICABA_Database::count_odcb_by_status(),
            'odcb_terdaftar' => SICABA_Database::count_odcb_by_status('Terdaftar'),
            'odcb_pengkajian' => SICABA_Database::count_odcb_by_status('Pengkajian'),
            'odcb_ditetapkan' => SICABA_Database::count_odcb_by_status('Ditetapkan'),
            'odcb_ditolak' => SICABA_Database::count_odcb_by_status('Ditolak')
        );
        
        return new WP_REST_Response($stats, 200);
    }
}
