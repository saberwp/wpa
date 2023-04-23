<?php

/*
 * Plugin Name: WPA (WordPress Application Framework)
 * Version: 1.0.5
 */

namespace WPA;

define( 'WPA_PATH', plugin_dir_path( __FILE__ ) . '/' );
define( 'WPA_URL', plugin_dir_url( __FILE__ ) );

class Plugin {

	public function __construct() {

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

	    $rest_url = rest_url();
			$api_url = $rest_url . 'wp/v2/';
	    echo '<script>';
			echo 'var WPA_ApiUrl = "' . $api_url . '"';
			echo '</script>';

			// @TODO echo out base url in script so app init can add it to app.apiUrl.
		});

		// @TODO
		// Parse installed apps and if activated, do init process for each installed app.

		// Find 1+ apps, check activation status and then init.

		// Create the list of apps, included inactive apps for rendering in the admin.

		// Create the admin page for viewing all installed apps.



		/*****

		API Init.

		*********/
		require_once(WPA_PATH.'inc/Api.php');
		$api = new \WPA\Api();
		$api->init();

		// App routes.

		add_filter( 'template_include', [$this, 'routes'] );

	}

	public function routes( $template ) {

		$app_keys = $this->installed_apps();

		global $wp_query;

		if ( isset( $wp_query->query_vars['name'] ) && in_array( $wp_query->query_vars['name'], $app_keys ) ) {
			$new_template = WPA_PATH.'templates/app.php';
			return $new_template;
		}
		return $template;
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

}

new Plugin();

// Register activation hook.
register_activation_hook( __FILE__, array( '\WPA\Plugin', 'activate' ) );
