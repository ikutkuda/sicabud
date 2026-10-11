<?php
/**
 * Admin Interface
 */

if (!defined('ABSPATH')) {
    exit;
}

class SICABA_Admin {
    
    private $plugin_name;
    private $version;
    
    public function __construct($plugin_name, $version) {
        $this->plugin_name = $plugin_name;
        $this->version = $version;
    }
    
    /**
     * Enqueue admin styles
     */
    public function enqueue_styles() {
        wp_enqueue_style($this->plugin_name . '-admin', SICABA_PLUGIN_URL . 'assets/css/admin.css', array(), $this->version, 'all');
    }
    
    /**
     * Enqueue admin scripts
     */
    public function enqueue_scripts() {
        wp_enqueue_script($this->plugin_name . '-admin', SICABA_PLUGIN_URL . 'assets/js/admin.js', array('jquery'), $this->version, false);
        
        wp_localize_script($this->plugin_name . '-admin', 'sicaba_admin', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('sicaba_admin_nonce')
        ));
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        // Main menu
        add_menu_page(
            __('SICABA', 'sicaba'),
            __('SICABA', 'sicaba'),
            'manage_options',
            'sicaba',
            array($this, 'render_dashboard_page'),
            'dashicons-building',
            5
        );
        
        // Dashboard submenu
        add_submenu_page(
            'sicaba',
            __('Dashboard', 'sicaba'),
            __('Dashboard', 'sicaba'),
            'manage_options',
            'sicaba',
            array($this, 'render_dashboard_page')
        );
        
        // Cagar Budaya submenu (auto-created by post type)
        
        // ODCB submenu
        add_submenu_page(
            'sicaba',
            __('Pendaftaran ODCB', 'sicaba'),
            __('Pendaftaran ODCB', 'sicaba'),
            'manage_options',
            'sicaba-odcb',
            array($this, 'render_odcb_page')
        );
        
        // Verifikasi Pembayaran submenu
        add_submenu_page(
            'sicaba',
            __('Verifikasi Pembayaran', 'sicaba'),
            __('Verifikasi Pembayaran', 'sicaba'),
            'manage_options',
            'sicaba-verifikasi',
            array($this, 'render_verifikasi_page')
        );
        
        // Statistik submenu
        add_submenu_page(
            'sicaba',
            __('Statistik', 'sicaba'),
            __('Statistik', 'sicaba'),
            'manage_options',
            'sicaba-statistik',
            array($this, 'render_statistik_page')
        );
        
        // Pengaturan submenu
        add_submenu_page(
            'sicaba',
            __('Pengaturan', 'sicaba'),
            __('Pengaturan', 'sicaba'),
            'manage_options',
            'sicaba-pengaturan',
            array($this, 'render_pengaturan_page')
        );
    }
    
    /**
     * Register settings
     */
    public function register_settings() {
        register_setting('sicaba_settings', 'sicaba_nominal_pendaftaran');
        register_setting('sicaba_settings', 'sicaba_bank_pembayaran');
        register_setting('sicaba_settings', 'sicaba_rekening_pembayaran');
        register_setting('sicaba_settings', 'sicaba_atas_nama_rekening');
        register_setting('sicaba_settings', 'sicaba_enable_registrasi');
        register_setting('sicaba_settings', 'sicaba_enable_odcb');
        register_setting('sicaba_settings', 'sicaba_items_per_page');
    }
    
    /**
     * Render dashboard page
     */
    public function render_dashboard_page() {
        $total_cagar = wp_count_posts('cagar_budaya');
        $total_odcb = SICABA_Database::count_odcb_by_status();
        $total_pending = SICABA_Database::count_odcb_by_status('Terdaftar');
        $total_users = count_users();
        
        include SICABA_PLUGIN_DIR . 'admin/views/dashboard.php';
    }
    
    /**
     * Render ODCB page
     */
    public function render_odcb_page() {
        $action = isset($_GET['action']) ? sanitize_text_field($_GET['action']) : 'list';
        
        switch ($action) {
            case 'view':
                $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
                $odcb = SICABA_Database::get_odcb($id);
                include SICABA_PLUGIN_DIR . 'admin/views/odcb-view.php';
                break;
                
            case 'update_status':
                if (isset($_POST['odcb_id']) && isset($_POST['status'])) {
                    $id = intval($_POST['odcb_id']);
                    $status = sanitize_text_field($_POST['status']);
                    $catatan = isset($_POST['catatan']) ? sanitize_textarea_field($_POST['catatan']) : '';
                    
                    SICABA_Database::update_odcb($id, array(
                        'status' => $status,
                        'catatan_manager' => $catatan,
                        'reviewed_by' => get_current_user_id()
                    ));
                    
                    SICABA_Database::log_activity('UPDATE_STATUS_ODCB', 'sicaba_odcb', $id, "Status diubah menjadi: $status");
                    
                    echo '<div class="notice notice-success"><p>Status ODCB berhasil diperbarui.</p></div>';
                }
                
                $id = isset($_GET['id']) ? intval($_GET['id']) : 0;
                $odcb = SICABA_Database::get_odcb($id);
                include SICABA_PLUGIN_DIR . 'admin/views/odcb-view.php';
                break;
                
            default:
                $odcb_list = SICABA_Database::get_all_odcb(array('limit' => 50));
                include SICABA_PLUGIN_DIR . 'admin/views/odcb-list.php';
                break;
        }
    }
    
    /**
     * Render verifikasi page
     */
    public function render_verifikasi_page() {
        $action = isset($_GET['action']) ? sanitize_text_field($_GET['action']) : 'list';
        
        if ($action === 'verify' && isset($_POST['payment_id'])) {
            $payment_id = intval($_POST['payment_id']);
            $status = sanitize_text_field($_POST['status']);
            $catatan = isset($_POST['catatan']) ? sanitize_textarea_field($_POST['catatan']) : '';
            
            SICABA_Database::update_payment_status($payment_id, $status, $catatan);
            
            // Update user status if approved
            if ($status === 'valid') {
                $payment = SICABA_Database::get_payment_by_user($payment_id);
                if ($payment) {
                    update_user_meta($payment->user_id, 'sicaba_status_akun', 'approved');
                }
            }
            
            SICABA_Database::log_activity('VERIFY_PAYMENT', 'sicaba_payments', $payment_id, "Status verifikasi: $status");
            
            echo '<div class="notice notice-success"><p>Verifikasi pembayaran berhasil diperbarui.</p></div>';
        }
        
        $payments = SICABA_Database::get_pending_payments();
        include SICABA_PLUGIN_DIR . 'admin/views/verifikasi-list.php';
    }
    
    /**
     * Render statistik page
     */
    public function render_statistik_page() {
        $stats = array(
            'total_cagar' => wp_count_posts('cagar_budaya')->publish,
            'total_odcb' => SICABA_Database::count_odcb_by_status(),
            'odcb_terdaftar' => SICABA_Database::count_odcb_by_status('Terdaftar'),
            'odcb_pengkajian' => SICABA_Database::count_odcb_by_status('Pengkajian'),
            'odcb_ditetapkan' => SICABA_Database::count_odcb_by_status('Ditetapkan'),
            'odcb_ditolak' => SICABA_Database::count_odcb_by_status('Ditolak'),
            'total_users' => count_users()['total_users'],
            'recent_logs' => SICABA_Database::get_recent_logs(20)
        );
        
        include SICABA_PLUGIN_DIR . 'admin/views/statistik.php';
    }
    
    /**
     * Render pengaturan page
     */
    public function render_pengaturan_page() {
        include SICABA_PLUGIN_DIR . 'admin/views/pengaturan.php';
    }
}
