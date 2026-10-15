<?php
/**
 * Plugin Deactivator
 */

if (!defined('ABSPATH')) {
    exit;
}

class SICABA_Deactivator {
    
    public static function deactivate() {
        // Flush rewrite rules
        flush_rewrite_rules();
        
        // Note: We don't delete tables or options on deactivation
        // to preserve user data. They can be deleted on uninstall if needed.
    }
}
