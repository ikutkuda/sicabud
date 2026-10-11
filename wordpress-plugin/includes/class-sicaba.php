<?php
/**
 * Main Plugin Class
 */

if (!defined('ABSPATH')) {
    exit;
}

class SICABA {
    
    protected $loader;
    protected $plugin_name;
    protected $version;
    
    public function __construct() {
        $this->plugin_name = 'sicaba';
        $this->version = SICABA_VERSION;
        
        $this->load_dependencies();
        $this->set_locale();
        $this->define_admin_hooks();
        $this->define_public_hooks();
    }
    
    private function load_dependencies() {
        // Dependencies are already loaded in main plugin file
    }
    
    private function set_locale() {
        add_action('plugins_loaded', array($this, 'load_plugin_textdomain'));
    }
    
    public function load_plugin_textdomain() {
        load_plugin_textdomain(
            $this->plugin_name,
            false,
            dirname(dirname(plugin_basename(__FILE__))) . '/languages/'
        );
    }
    
    private function define_admin_hooks() {
        $plugin_admin = new SICABA_Admin($this->get_plugin_name(), $this->get_version());
        
        add_action('admin_enqueue_scripts', array($plugin_admin, 'enqueue_styles'));
        add_action('admin_enqueue_scripts', array($plugin_admin, 'enqueue_scripts'));
        add_action('admin_menu', array($plugin_admin, 'add_admin_menu'));
        add_action('admin_init', array($plugin_admin, 'register_settings'));
    }
    
    private function define_public_hooks() {
        $plugin_public = new SICABA_Frontend($this->get_plugin_name(), $this->get_version());
        
        add_action('wp_enqueue_scripts', array($plugin_public, 'enqueue_styles'));
        add_action('wp_enqueue_scripts', array($plugin_public, 'enqueue_scripts'));
    }
    
    public function run() {
        // Initialize all components
        $database = new SICABA_Database();
        $post_types = new SICABA_Post_Types();
        $rest_api = new SICABA_REST_API();
        $shortcodes = new SICABA_Shortcodes();
    }
    
    public function get_plugin_name() {
        return $this->plugin_name;
    }
    
    public function get_version() {
        return $this->version;
    }
}
