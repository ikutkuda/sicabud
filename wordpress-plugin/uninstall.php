<?php
/**
 * Uninstall SICABA Plugin
 */

// If uninstall not called from WordPress, then exit
if (!defined('WP_UNINSTALL_PLUGIN')) {
    exit;
}

global $wpdb;

// Delete custom tables
$tables = array(
    $wpdb->prefix . 'sicaba_odcb',
    $wpdb->prefix . 'sicaba_payments',
    $wpdb->prefix . 'sicaba_attachments',
    $wpdb->prefix . 'sicaba_logs'
);

foreach ($tables as $table) {
    $wpdb->query("DROP TABLE IF EXISTS $table");
}

// Delete custom post types
$posts = get_posts(array(
    'post_type' => 'cagar_budaya',
    'numberposts' => -1,
    'post_status' => 'any'
));

foreach ($posts as $post) {
    wp_delete_post($post->ID, true);
}

// Delete plugin options
delete_option('sicaba_nominal_pendaftaran');
delete_option('sicaba_bank_pembayaran');
delete_option('sicaba_rekening_pembayaran');
delete_option('sicaba_atas_nama_rekening');
delete_option('sicaba_enable_registrasi');
delete_option('sicaba_enable_odcb');
delete_option('sicaba_items_per_page');

// Delete user meta
$wpdb->query("DELETE FROM {$wpdb->usermeta} WHERE meta_key LIKE 'sicaba_%'");

// Delete upload directory
$upload_dir = wp_upload_dir();
$sicaba_dir = $upload_dir['basedir'] . '/sicaba';

if (file_exists($sicaba_dir)) {
    // Recursively delete directory
    $files = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($sicaba_dir, RecursiveDirectoryIterator::SKIP_DOTS),
        RecursiveIteratorIterator::CHILD_FIRST
    );
    
    foreach ($files as $fileinfo) {
        $todo = ($fileinfo->isDir() ? 'rmdir' : 'unlink');
        $todo($fileinfo->getRealPath());
    }
    rmdir($sicaba_dir);
}

// Clear any cached data
wp_cache_flush();
