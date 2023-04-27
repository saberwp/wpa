<?php

function wpa_app_installed($app_key) {
	return is_dir(WP_CONTENT_DIR . '/wpa/'.$app_key);
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
