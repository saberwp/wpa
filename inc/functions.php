<?php

function wpa_app_installed($app_main_def) {
	return is_dir(WP_CONTENT_DIR . '/wpa/'.$app_main_def->key);
}

function wpa_load_app_def($app_main_def) {
	$filepath = WP_CONTENT_DIR . '/wpa/'.$app_main_def->key. '/app.json';
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
