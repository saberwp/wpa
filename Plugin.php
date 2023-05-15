<?php

/*
 * Plugin Name: WPA (WordPress Application Framework)
 * Version: 1.0.6
 */

namespace WPA;

define( 'WPA_PATH', plugin_dir_path( __FILE__ ) . '/' );
define( 'WPA_URL', plugin_dir_url( __FILE__ ) );

class Plugin {

	public function __construct() {

		// Admin enqueue scripts.
		add_action( 'admin_enqueue_scripts', [$this, 'admin_scripts'] );

		// Require functional API.
		require_once(WPA_PATH.'inc/functions.php');

		// Init app manager.
		require_once(WPA_PATH.'inc/DatabaseManager.php');
		require_once(WPA_PATH.'inc/App.php');
		require_once(WPA_PATH.'inc/AppManager.php');
		$am = new AppManager();
		$am->init();

		// App Repo include
		require_once(WPA_PATH.'inc/AppRepo.php');

		// Admin init.
		require_once(WPA_PATH.'inc/Admin.php');
		$api = new \WPA\Admin();
		$api->init();

		add_action( 'init', function() {

			if ( wp_doing_ajax() || wp_doing_cron() ) {
	        return;
	    }

	    if ( false !== strpos( $_SERVER['REQUEST_URI'], '/wp-json/' ) ) {
	        return;
	    }

		});


		/*****

		API Init.

		*********/
		require_once(WPA_PATH.'inc/Api.php');
		$api = new Api();
		$api->init();

		// Routes init.
		require_once(WPA_PATH.'inc/Router.php');
		$r = new \WPA\Router();
		$r->init();

	}



	// Activation hook.
	// Do install of apps folder under wp-content/uploads.
	public static function activate() {

		$plugin = new Plugin;

		require_once(WPA_PATH.'inc/Activate.php');

		// Loop over apps and call activate run for each one.
		$app_keys = $plugin->installed_apps();
		foreach( $app_keys as $app_key ) {
			$activate = new \WPA\Activate;
			$activate->init( $app_key );
			$activate->run();
		}

	}

	public function deactivate() {


	}

	public function update() {



	}

	public function installed_apps() {

		// Find apps loaded.
		$wp_content_dir = WP_CONTENT_DIR;
		$wpa_dir = $wp_content_dir . '/wpa';

		$app_keys = array_filter( scandir( $wpa_dir ), function( $item ) use ( $wpa_dir ) {
			return is_dir( $wpa_dir . '/' . $item ) && ! in_array( $item, array( '.', '..' ) );
		});

		return $app_keys;

	}

	public function admin_scripts() {
		wp_enqueue_script( 'wpa-admin', WPA_URL.'js/admin.js', array(), '1.0.0', true );
		wp_enqueue_style( 'wpa-admin', WPA_URL.'/styles/admin.css', array(), '1.0.0', 'all' );
	}

}

new Plugin();

// Register activation hook.
register_activation_hook( __FILE__, array( '\WPA\Plugin', 'activate' ) );
