<?php

namespace WPA;

class Admin {

	public function init() {

		add_action( 'admin_menu', function() {

			// Main page.
			add_menu_page(
	        'WPA',
	        'WPA',
	        'manage_options',
	        'wpa',
	        [$this, 'main_content'],
	        'dashicons-admin-generic',
	        20
	    );

			add_submenu_page(
	      'wpa',                  // The slug of the parent menu item
	      'Dashboard',            // The title of the submenu item
	      'Dashboard',            // The menu title (shown in the admin menu)
	      'manage_options',       // The capability required to access the page
	      'wpa',        // The unique slug for the submenu item
	      [$this, 'main_content'],   // The callback function to render the page
		  );

			add_submenu_page(
	      'wpa',          // The slug of the parent page
	      'API Keys',     // The title of the submenu page
	      'API Keys',     // The menu title (shown in the admin menu)
	      'manage_options',// The capability required to access the page
	      'wpa-keys', // The unique slug for the submenu page
	      array( $this, 'keys_page' ) // The callback function to render the page
		  );

			add_submenu_page(
	      'wpa',          // The slug of the parent page
	      'Debug',     // The title of the submenu page
	      'Debug',     // The menu title (shown in the admin menu)
	      'manage_options',// The capability required to access the page
	      'wpa-debug', // The unique slug for the submenu page
	      array( $this, 'debug_page' ) // The callback function to render the page
		  );

		});

	}

	public function main_content() {

		$am = new AppManager;
		$available_app_keys = wpa_get_available_app_keys();

		echo '<div id="wpa-admin-container" class="-ml-[20px] bg-gray-600 text-white wpa-admin-wrap">';

		// Find apps installed, this includes custom apps created.
		$wp_content_dir = WP_CONTENT_DIR;
		$wpa_dir = $wp_content_dir . '/wpa';
		$apps_installed = array_filter( scandir( $wpa_dir ), function( $item ) use ( $wpa_dir ) {
		   return is_dir( $wpa_dir . '/' . $item ) && ! in_array( $item, array( '.', '..' ) );
		});

		// Merge all prebuilt available apps with current installed apps.
		$app_list_merged = array_merge($available_app_keys, $apps_installed);
		$app_list        = array_unique($app_list_merged);


		$app_defs_with_install_flag = [];
		foreach( $app_list as $app_key ) {

			// Check if installed, then load app def from install if it is.
			$installed = wpa_app_installed($app_key);

			if($installed) {
				$app_def = wpa_load_app_def($app_key);
			} else {
				$app_def = wpa_load_app_def_available($app_key);
			}

			$app_def->installed = $installed;
			$app_def->site_url  = site_url($app_def->location->path);
			$app_defs_with_install_flag[] = $app_def;

		}

		echo '</div>';

		echo '<script>';
		echo 'var wpaAppDefsWithInstallFlag = ';
		echo json_encode($app_defs_with_install_flag);
		echo '</script>';

	}

	public function keys_page() {

		echo 'KEYS PAGE';

		// Enq ApiKeys.js
		// Fetch existing keys from DB.
		$app_main_json = \file_get_contents(WPA_PATH . '/apps-internal/api_keys/app.json');
		$app_main_def = json_decode( $app_main_json );
		$app = new App();
		$storage_path = wpa_app_storage_path_by_type('internal');
		$app->set_storage_path($storage_path);
		$app->set_app_key('api_keys');
		$app->init();


		// @TODO init by key but it needs to find the app under wpa/apps-internal, optionals $dir_path?
		// $app->init($app_key);
		echo '<div class="wpa-app-loader" app-key="api_keys"></div>';
		$app->render_app_def_script();

		// Render base URL for the API.
		$rest_url = rest_url();
		$api_url = $rest_url . 'wp/v2/';
		echo '<script>';
		echo 'var WPA_ApiUrl = "' . $api_url . '"';
		echo '</script>';

	}

	public function debug_page() {

		echo 'DEBUG PAGE';

	}

}
