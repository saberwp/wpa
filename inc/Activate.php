<?php

// FQN: \WPA\Activate

namespace WPA;

class Activate {

	function run() {

		// Check if WPA content directory exists, create if not already existing.
		$this->local_storage_dir();

		$this->internal_app_installs();

		// Install Tasker as a sample app.
		$this->app_prebuilt_install();

	}

	function local_storage_dir() {

		$local_storage_path = WP_CONTENT_DIR . '/wpa';
		if( ! is_dir($local_storage_path) ) {
			$make_dir_result = mkdir($local_storage_path, 0755);
			if( ! $make_dir_result ) {
				error_log('WPA could not create the main local storage folder at /wp-content/wpa/.');
			}
		}

	}

	function app_prebuilt_install() {
		$app_manager = new AppManager;
		$app_manager->activate('wpa_tasker');
	}

	// Install internal apps such as API Key manager.
	function internal_app_installs() {
		$internal_app_keys = wpa_get_app_keys('internal');
		$storage_path = wpa_app_storage_path_by_type('internal');
		$app_defs = [];
		if(!empty($internal_app_keys)) {
			foreach($internal_app_keys as $internal_app_key) {
				$app_defs[] = wpa_load_app_def($internal_app_key, $storage_path);
			}
		}
		foreach($app_defs as $app_def) {
			$app_manager = new AppManager;
			$app_manager->app_refresh_routine($app_def->key, 'internal');
		}
	}

}
