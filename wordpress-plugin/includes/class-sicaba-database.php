<?php
/**
 * Database Handler Class
 */

if (!defined('ABSPATH')) {
    exit;
}

class SICABA_Database {
    
    public function __construct() {
        // Database methods available for use
    }
    
    /**
     * Get ODCB by ID
     */
    public static function get_odcb($id) {
        global $wpdb;
        $table = $wpdb->prefix . 'sicaba_odcb';
        return $wpdb->get_row($wpdb->prepare("SELECT * FROM $table WHERE id = %d", $id));
    }
    
    /**
     * Get all ODCB
     */
    public static function get_all_odcb($args = array()) {
        global $wpdb;
        $table = $wpdb->prefix . 'sicaba_odcb';
        
        $defaults = array(
            'status' => '',
            'jenis' => '',
            'limit' => 20,
            'offset' => 0,
            'orderby' => 'created_at',
            'order' => 'DESC'
        );
        
        $args = wp_parse_args($args, $defaults);
        
        $where = array('1=1');
        $values = array();
        
        if (!empty($args['status'])) {
            $where[] = 'status = %s';
            $values[] = $args['status'];
        }
        
        if (!empty($args['jenis'])) {
            $where[] = 'jenis_odcb = %s';
            $values[] = $args['jenis'];
        }
        
        $where_clause = implode(' AND ', $where);
        $orderby = sanitize_sql_orderby($args['orderby'] . ' ' . $args['order']);
        
        $sql = "SELECT * FROM $table WHERE $where_clause ORDER BY $orderby LIMIT %d OFFSET %d";
        $values[] = $args['limit'];
        $values[] = $args['offset'];
        
        if (!empty($values)) {
            return $wpdb->get_results($wpdb->prepare($sql, $values));
        }
        
        return $wpdb->get_results($sql);
    }
    
    /**
     * Insert ODCB
     */
    public static function insert_odcb($data) {
        global $wpdb;
        $table = $wpdb->prefix . 'sicaba_odcb';
        
        $defaults = array(
            'tanggal_pengajuan' => current_time('Y-m-d'),
            'tanggal_update' => current_time('Y-m-d'),
            'status' => 'Terdaftar'
        );
        
        $data = wp_parse_args($data, $defaults);
        
        $result = $wpdb->insert($table, $data);
        
        if ($result) {
            return $wpdb->insert_id;
        }
        
        return false;
    }
    
    /**
     * Update ODCB
     */
    public static function update_odcb($id, $data) {
        global $wpdb;
        $table = $wpdb->prefix . 'sicaba_odcb';
        
        $data['tanggal_update'] = current_time('Y-m-d');
        
        return $wpdb->update($table, $data, array('id' => $id));
    }
    
    /**
     * Delete ODCB
     */
    public static function delete_odcb($id) {
        global $wpdb;
        $table = $wpdb->prefix . 'sicaba_odcb';
        
        return $wpdb->delete($table, array('id' => $id));
    }
    
    /**
     * Count ODCB by status
     */
    public static function count_odcb_by_status($status = '') {
        global $wpdb;
        $table = $wpdb->prefix . 'sicaba_odcb';
        
        if (empty($status)) {
            return $wpdb->get_var("SELECT COUNT(*) FROM $table");
        }
        
        return $wpdb->get_var($wpdb->prepare(
            "SELECT COUNT(*) FROM $table WHERE status = %s",
            $status
        ));
    }
    
    /**
     * Log activity
     */
    public static function log_activity($aksi, $tabel = '', $record_id = 0, $deskripsi = '') {
        global $wpdb;
        $table = $wpdb->prefix . 'sicaba_logs';
        
        $data = array(
            'user_id' => get_current_user_id(),
            'aksi' => $aksi,
            'tabel' => $tabel,
            'record_id' => $record_id,
            'deskripsi' => $deskripsi,
            'ip_address' => $_SERVER['REMOTE_ADDR'] ?? '',
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? ''
        );
        
        return $wpdb->insert($table, $data);
    }
    
    /**
     * Get recent logs
     */
    public static function get_recent_logs($limit = 50) {
        global $wpdb;
        $table = $wpdb->prefix . 'sicaba_logs';
        
        return $wpdb->get_results($wpdb->prepare(
            "SELECT l.*, u.display_name as user_name 
             FROM $table l 
             LEFT JOIN {$wpdb->users} u ON l.user_id = u.ID 
             ORDER BY l.created_at DESC 
             LIMIT %d",
            $limit
        ));
    }
    
    /**
     * Insert attachment
     */
    public static function insert_attachment($data) {
        global $wpdb;
        $table = $wpdb->prefix . 'sicaba_attachments';
        
        $result = $wpdb->insert($table, $data);
        
        if ($result) {
            return $wpdb->insert_id;
        }
        
        return false;
    }
    
    /**
     * Get attachments by cagar budaya ID
     */
    public static function get_attachments($cagar_budaya_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'sicaba_attachments';
        
        return $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $table WHERE cagar_budaya_id = %d ORDER BY created_at DESC",
            $cagar_budaya_id
        ));
    }
    
    /**
     * Get payment by user ID
     */
    public static function get_payment_by_user($user_id) {
        global $wpdb;
        $table = $wpdb->prefix . 'sicaba_payments';
        
        return $wpdb->get_row($wpdb->prepare(
            "SELECT * FROM $table WHERE user_id = %d ORDER BY created_at DESC LIMIT 1",
            $user_id
        ));
    }
    
    /**
     * Get all pending payments
     */
    public static function get_pending_payments() {
        global $wpdb;
        $table = $wpdb->prefix . 'sicaba_payments';
        
        return $wpdb->get_results($wpdb->prepare(
            "SELECT p.*, u.display_name, u.user_email 
             FROM $table p 
             LEFT JOIN {$wpdb->users} u ON p.user_id = u.ID 
             WHERE p.status_verifikasi = %s 
             ORDER BY p.created_at DESC",
            'pending'
        ));
    }
    
    /**
     * Update payment status
     */
    public static function update_payment_status($id, $status, $catatan = '') {
        global $wpdb;
        $table = $wpdb->prefix . 'sicaba_payments';
        
        $data = array(
            'status_verifikasi' => $status,
            'catatan' => $catatan
        );
        
        return $wpdb->update($table, $data, array('id' => $id));
    }
}
