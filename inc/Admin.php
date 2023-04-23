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

	    echo '<div class="wpa-admin-wrap"><h1>WPA</h1></div>';

			// Find apps loaded.
			$wp_content_dir = WP_CONTENT_DIR;
			$wpa_dir = $wp_content_dir . '/wpa';

			$apps = array_filter( scandir( $wpa_dir ), function( $item ) use ( $wpa_dir ) {
			   return is_dir( $wpa_dir . '/' . $item ) && ! in_array( $item, array( '.', '..' ) );
			});

			foreach( $apps as $app ) {

				echo $app . '<br />';

			}

	}


}
