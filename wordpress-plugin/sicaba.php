<?php
/**
 * Plugin Name: SICABA - Sistem Informasi Cagar Budaya
 * Plugin URI: https://tasikmalayakota.go.id/sicaba
 * Description: Sistem Informasi Cagar Budaya Kota Tasikmalaya untuk mendokumentasikan dan mengelola cagar budaya sesuai UU No. 11 Tahun 2010 dan Permendikbudristek No. 36 Tahun 2023
 * Version: 1.0.0
 * Author: Dinas Kebudayaan Kota Tasikmalaya
 * Author URI: https://tasikmalayakota.go.id
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: sicaba
 * Domain Path: /languages
 * Requires at least: 5.8
 * Requires PHP: 7.4
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('SICABA_VERSION', '1.0.0');
define('SICABA_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('SICABA_PLUGIN_URL', plugin_dir_url(__FILE__));
define('SICABA_PLUGIN_BASENAME', plugin_basename(__FILE__));

// Include required files
require_once SICABA_PLUGIN_DIR . 'includes/class-sicaba-activator.php';
require_once SICABA_PLUGIN_DIR . 'includes/class-sicaba-deactivator.php';
require_once SICABA_PLUGIN_DIR . 'includes/class-sicaba.php';
require_once SICABA_PLUGIN_DIR . 'includes/class-sicaba-database.php';
require_once SICABA_PLUGIN_DIR . 'includes/class-sicaba-post-types.php';
require_once SICABA_PLUGIN_DIR . 'includes/class-sicaba-admin.php';
require_once SICABA_PLUGIN_DIR . 'includes/class-sicaba-frontend.php';
require_once SICABA_PLUGIN_DIR . 'includes/class-sicaba-rest-api.php';
require_once SICABA_PLUGIN_DIR . 'includes/class-sicaba-shortcodes.php';

// Activation hook
register_activation_hook(__FILE__, array('SICABA_Activator', 'activate'));

// Deactivation hook
register_deactivation_hook(__FILE__, array('SICABA_Deactivator', 'deactivate'));

// Initialize plugin
function sicaba_run() {
    $plugin = new SICABA();
    $plugin->run();
}
add_action('plugins_loaded', 'sicaba_run');
