<?php

namespace WPA;

class AppManager {

    public function init() {
        add_action( 'rest_api_init', array( $this, 'register_routes' ) );
    }

    public function register_routes() {
      register_rest_route( 'wpa/app', '/install', array(
        'methods' => 'POST',
        'callback' => array( $this, 'app_install_callback' ),
      ));
    }

    public function app_install_callback( $request ) {
			$resp = new \stdClass;
      $params = $request->get_json_params();

      // Check if app_key parameter is set
      if ( isset( $params['app_key'] ) ) {

        $app_key = $params['app_key'];

				// Load available app definition from /available.json.
				$available_app = $this->available_app_by_key($app_key);

				// Activate app by it's available_app data.
				$this->activate($available_app);

        $this->message = 'App install successful for app_key: '. $app_key.'.';
      } else {
        $this->message = 'App_key parameter missing';
      }

			return rest_ensure_response($resp);
    }

	public function available() {
		$available_json = file_get_contents(WPA_PATH.'available.json');
		$available = json_decode( $available_json );
		return $available;
	}

	function available_app_by_key( $app_key ) {
	    $apps = $this->available();
	    foreach ( $apps as $app ) {
        if ( $app->key === $app_key ) {
          return $app;
        }
	    }
	    return false;
	}

	function activate($app_data) {

		var_dump( $app_data );
		// @TODO copy files from /apps into wp-content/wpa/

		$app_source_path = WPA_PATH.'apps/'.$app_data->local_dir;

		$wp_content_dir = WP_CONTENT_DIR;
		$wpa_dir = $wp_content_dir . '/wpa';

		$save_path = $wpa_dir . '/' . $app_data->local_dir;

		$this->rcopy($app_source_path, $save_path);

	}

	function rcopy($src, $dst) {
	  if (file_exists($dst)) $this->rrmdir($dst);
	  if (is_dir($src)) {
	    mkdir($dst);
	    $files = scandir($src);
	    foreach ($files as $file)
	    if ($file != "." && $file != "..") $this->rcopy("$src/$file", "$dst/$file");
	  }
	  else if (file_exists($src)) copy($src, $dst);
	}

	function rrmdir($dir) {
	  if (is_dir($dir)) {
	    $files = scandir($dir);
	    foreach ($files as $file)
	    if ($file != "." && $file != "..") $this->rrmdir("$dir/$file");
	    rmdir($dir);
	  }
	  else if (file_exists($dir)) unlink($dir);
	}

}
