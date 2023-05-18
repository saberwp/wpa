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

function wpa_load_app_def($app_key) {
	$filepath = WP_CONTENT_DIR . '/wpa/'.$app_key. '/app.json';
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
