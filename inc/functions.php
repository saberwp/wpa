<?php

function wpa_load_app_def($app_dir_name) {
	$filepath = WP_CONTENT_DIR . '/wpa/'.$app_dir_name. '/app.json';
	$app_def_json = file_get_contents($filepath);
	$app_def = json_decode($app_def_json);
	return $app_def;
}
