<?php

/*
 * Plugin Name: WPA
 * Author: Saber Technical Ukraine
 * Description: WPA (WordPress Apps) provides app development within WordPress with a no-code or low-code approach. The plugin ships prebuilt apps as examples or for install and usage. Users can create their own apps using entirely JSON configuration files. Developers can extend WPA apps using hooks and standardized PHP and Javascript classes.
 * Donate link: https://saberwp.com/donate/
 * Version: 1.0.8
 */

namespace WPA;

define( 'WPA_PATH', plugin_dir_path( __FILE__ ) . '/' );
define( 'WPA_URL', plugin_dir_url( __FILE__ ) );
define( 'WPA_VERSION', '1.0.8' );

class Plugin {

	public function __construct() {

		// Require functional API.
		require_once(WPA_PATH.'inc/functions.php');

		// Init app manager.
		require_once(WPA_PATH.'inc/Model.php');
		require_once(WPA_PATH.'inc/DatabaseManager.php');
		require_once(WPA_PATH.'inc/App.php');
		require_once(WPA_PATH.'inc/AppManager.php');
		$am = new AppManager();
		$am->init();

		// Init app loader.
		require_once(WPA_PATH.'inc/AppLoader.php');
		$al = new AppLoader();
		$al->init();


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

	// Plugin activation callback.
	public static function activate() {

		$plugin = new Plugin;

		require_once(WPA_PATH.'inc/Activate.php');
		$activate = new Activate();
		$activate->run();

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

}

new Plugin();

// Register activation hook.
register_activation_hook( __FILE__, array( '\WPA\Plugin', 'activate' ) );
