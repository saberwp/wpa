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
		function custom_tasks_template( $template ) {

			global $wp_query;

			echo '<pre>';
			var_dump($wp_query->query_vars);
			echo '</pre>';

		    if ( isset( $wp_query->query_vars['name'] ) && $wp_query->query_vars['name'] === 'tasks' ) {
		        $new_template = locate_template( array( 'template-tasks.php' ) );

		        if ( '' != $new_template ) {
		            return $new_template;
		        }
		    }
		    return $template;
		}


	}

	public function routes( $template ) {
		global $wp_query;
		if ( isset( $wp_query->query_vars['name'] ) && $wp_query->query_vars['name'] === 'tasks' ) {
			$new_template = WPA_PATH.'templates/app.php';
			return $new_template;
		}
		return $template;
	}

	// Activation hook.
	// Do install of apps folder under wp-content/uploads.
	public static function activate() {

		require_once(WPA_PATH.'inc/Activate.php');
		$activate = new \WPA\Activate;
		$activate->run();

	}

	public function deactivate() {


	}

	public function update() {



	}



	public static function app_path_root() {
		return WP_CONTENT_DIR . '/wpa/tasks/';
	}

}

new Plugin();

// Register activation hook.
register_activation_hook( __FILE__, array( '\WPA\Plugin', 'activate' ) );
