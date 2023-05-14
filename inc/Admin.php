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
		$available_apps = $am->available();

    echo '<div class="wpa-admin-wrap"><h1>WPA</h1></div>';

		// Find apps loaded.
		$wp_content_dir = WP_CONTENT_DIR;
		$wpa_dir = $wp_content_dir . '/wpa';

		$apps = array_filter( scandir( $wpa_dir ), function( $item ) use ( $wpa_dir ) {
		   return is_dir( $wpa_dir . '/' . $item ) && ! in_array( $item, array( '.', '..' ) );
		});

		foreach( $available_apps as $available_app ) {

			// Check if installed, then load app def from install if it is.
			$installed = wpa_app_installed($available_app);

			if($installed) {
				$app_def = wpa_load_app_def($available_app);
			}

			echo '<h2>'.$available_app->title.'</h2>';

			if($installed) {
				echo '<a href="'.site_url($app_def->location->path).'">Launch App</a>';
			}

			if(!$installed) {
				echo '<button class="wpa-app-install-button" app-key="'.$available_app->key.'">Install App</button>';
			}

		}

	}

}
