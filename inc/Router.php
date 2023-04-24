<?php

namespace WPA;

class Router {


	public function init() {

		add_filter( 'template_include', [$this, 'routes'] );

	}


	public function routes( $template ) {

		$plugin = new Plugin;
		$app_data  = $this->app_data();
		$app_paths = $app_data['app_paths'];

		global $wp_query;

		if ( isset( $wp_query->query_vars['name'] ) && in_array( $wp_query->query_vars['name'], $app_paths ) ) {

			// Set global to indicate the app key for the current app, because this is needed in the app template.
			$app_map = $app_data['app_map'];
			$GLOBALS['wpa_app_dir_name'] = $app_map->{$wp_query->query_vars['name']}['app_dir_name'];
			$GLOBALS['wpa_app_key'] = $app_map->{$wp_query->query_vars['name']}['app_key'];

			// Load template.
			$template = WPA_PATH.'templates/app.php';
			return $template;

		}

		return $template;
	}

	public function app_data() {

		// Find apps loaded.
		$wp_content_dir = WP_CONTENT_DIR;
		$wpa_dir = $wp_content_dir . '/wpa';

		// Get all app directories.
		$app_dirs = array_filter( scandir( $wpa_dir ), function( $item ) use ( $wpa_dir ) {
			return is_dir( $wpa_dir . '/' . $item ) && ! in_array( $item, array( '.', '..' ) );
		});

		$app_paths = [];
		$app_map   = new \stdClass;
		foreach( $app_dirs as $app_dir ) {

			// Load app def.
			$app_main_json = \file_get_contents(WP_CONTENT_DIR . '/wpa/' . $app_dir . '/app.json');
			$app_main_def  = json_decode( $app_main_json );

			// Store the app path in array.
			$app_paths[] = $app_main_def->location->path;

			// Map app path to app key and app dir.
			$app_path = $app_main_def->location->path;
			$app_map->{$app_path} = [
				'app_key'      => $app_main_def->key,
				'app_dir_name' => $app_dir
			];

		}

		// Assemble paths and map.
		$app_data = [
			'app_paths' => $app_paths,
			'app_map'   => $app_map
		];

		return $app_data;

	}


}
