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

		});

	}

	public function main_content() {

		$am = new AppManager;
		$available_app_keys = wpa_get_available_app_keys();

		echo '<div id="wpa-admin-container" class="bg-gray-400 text-white wpa-admin-wrap">';

		// Find apps loaded.
		$wp_content_dir = WP_CONTENT_DIR;
		$wpa_dir = $wp_content_dir . '/wpa';

		$apps = array_filter( scandir( $wpa_dir ), function( $item ) use ( $wpa_dir ) {
		   return is_dir( $wpa_dir . '/' . $item ) && ! in_array( $item, array( '.', '..' ) );
		});

		$app_defs_with_install_flag = [];
		foreach( $available_app_keys as $available_app_key ) {

			// Check if installed, then load app def from install if it is.
			$installed = wpa_app_installed($available_app_key);

			if($installed) {
				$app_def = wpa_load_app_def($available_app_key);
			} else {
				$app_def = wpa_load_app_def_available($available_app_key);
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



}
