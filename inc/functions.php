<?php

// @TODO need function for getting the app_def for an available app before it's installed.

function wpa_app_installed($app_key) {
	return is_dir(WP_CONTENT_DIR . '/wpa/'.$app_key);
}

function wpa_get_available_app_keys() {
	$wpa_dir = WPA_PATH . '/apps';

	$app_keys = array_filter( scandir( $wpa_dir ), function( $item ) use ( $wpa_dir ) {
		return is_dir( $wpa_dir . '/' . $item ) && ! in_array( $item, array( '.', '..' ) );
	});

	return $app_keys;
}

function wpa_get_installed_app_keys() {
	$wp_content_dir = WP_CONTENT_DIR;
	$wpa_dir = $wp_content_dir . '/wpa';

	$app_keys = array_filter( scandir( $wpa_dir ), function( $item ) use ( $wpa_dir ) {
		return is_dir( $wpa_dir . '/' . $item ) && ! in_array( $item, array( '.', '..' ) );
	});

	return $app_keys;
}

function wpa_load_app_def_available($app_key) {
	$filepath = WPA_PATH . '/apps/'.$app_key. '/app.json';
	$app_def_json = file_get_contents($filepath);
	if(!$app_def_json) {
		return false;
	}
	$app_def = json_decode($app_def_json);
	return $app_def;
}

function wpa_load_app_def($app_key, $storage_path = false) {
	if(!$storage_path) {
		$storage_path = WP_CONTENT_DIR . '/wpa/';
	}
	$filepath = $storage_path.$app_key. '/app.json';
	$app_def_json = file_get_contents($filepath);
	if(!$app_def_json) {
		return false;
	}
	$app_def = json_decode($app_def_json);
	return $app_def;
}

function wpa_load_app_def_by_key($app_key) {
	$filepath = WP_CONTENT_DIR . '/wpa/'.$app_key. '/app.json';
	$app_def_json = file_get_contents($filepath);
	if(!$app_def_json) {
		return false;
	}
	$app_def = json_decode($app_def_json);
	return $app_def;
}

function wpa_model_make_table_name( $app_key, $model_key ) {
	global $wpdb;
	return $wpdb->prefix . $app_key . '_' . $model_key;
}

function wpa_app_storage_path_by_type($type) {
	switch($type) {
		case 'wpa':
			return WP_CONTENT_DIR . '/wpa/';
			break;
		case 'prebuilt':
			return WPA_PATH . 'apps/';
			break;
		case 'internal':
			return WPA_PATH . 'apps-internal/';
			break;
	}
}

function wpa_get_app_keys($storage_type) {
	$storage_path = wpa_app_storage_path_by_type($storage_type);
	$app_keys = array_filter( scandir( $storage_path ), function( $item ) use ( $storage_path ) {
		return is_dir( $storage_path . '/' . $item ) && ! in_array( $item, array( '.', '..' ) );
	});
	return $app_keys;
}

// Return the app main def of all registered apps, including "internal" apps.
function wpa_app_registry() {

	// Get all WPA installed apps (WPA content directory installed)
	$wp_content_dir = WP_CONTENT_DIR;
	$wpa_dir = $wp_content_dir . '/wpa';
	$app_keys = array_filter( scandir( $wpa_dir ), function( $item ) use ( $wpa_dir ) {
		return is_dir( $wpa_dir . '/' . $item ) && ! in_array( $item, array( '.', '..' ) );
	});

	$app_defs = [];
	if(!empty($app_keys)) {
		foreach($app_keys as $app_key) {
			$app_defs[] = wpa_load_app_def($app_key);
		}
	}

	// Get all WPA internal apps (installed to /wpa/apps-internal/)
	$internal_app_keys = wpa_get_app_keys('internal');
	$storage_path = wpa_app_storage_path_by_type('internal');
	if(!empty($internal_app_keys)) {
		foreach($internal_app_keys as $internal_app_key) {
			$app_defs[] = wpa_load_app_def($internal_app_key, $storage_path);
		}
	}

	return $app_defs;

}
