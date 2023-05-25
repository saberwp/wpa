<?php

namespace WPA;

class AppManager {

	public $log = array();

  public function init() {
      add_action( 'rest_api_init', array( $this, 'register_routes' ) );
  }

  public function register_routes() {
		// Route for app install.
    register_rest_route( 'wpa/app', '/install', array(
      'methods' => 'POST',
      'callback' => array( $this, 'app_install_callback' ),
    ));

		// Route for app refresh.
		register_rest_route( 'wpa/app', '/refresh', array(
      'methods' => 'POST',
      'callback' => array( $this, 'app_refresh_callback' ),
    ));

		// Route for app uninstall.
		register_rest_route( 'wpa/app', '/uninstall', array(
      'methods' => 'POST',
      'callback' => array( $this, 'app_uninstall_callback' ),
    ));
  }

  public function app_install_callback( $request ) {
		$resp = new \stdClass;
    $params = $request->get_json_params();

		$this->log[] = 'App installer called.';

    // Check if app_key parameter is set
    if ( isset( $params['app_key'] ) ) {

      $app_key = $params['app_key'];

			$this->log[] = 'App installer called for app key ' . $app_key . '.';

			// Activate app by it's available_app data.
			$this->activate($app_key);

      $this->message = 'App install successful for app_key: '. $app_key.'.';
    } else {
      $this->message = 'App_key parameter missing';
    }

		$resp->log = $this->log;
		return rest_ensure_response($resp);
  }

	public function app_uninstall_callback( $request ) {
		$resp = new \stdClass;
		$params = $request->get_json_params();

		$this->log[] = 'App uninstaller called.';

		// Check if app_key parameter is set
		if ( isset( $params['app_key'] ) ) {

			$app_key = $params['app_key'];

			$this->log[] = 'App installer called for app key ' . $app_key . '.';

			// Delete app.
			$this->uninstall($app_key);

			$this->message = 'App uninstall successful for app_key: '. $app_key.'.';
		} else {
			$this->message = 'App key parameter missing';
		}

	$resp->log = $this->log;
	return rest_ensure_response($resp);
}

	public function app_refresh_callback( $request ) {
		$resp = new \stdClass;
		$params = $request->get_json_params();

		// Check if app_key parameter is set
		if ( isset( $params['app_key'] ) ) {

			$app_key = $params['app_key'];

			$resp->result = $this->app_refresh_routine($app_key);

		} else {
			$this->message = 'App key parameter missing';
		}

		$resp->log = $this->log;
		return rest_ensure_response($resp);
	}

	public function app_refresh_routine($app_key, $app_type = 'wpa') {

		$resp = new \stdClass;

		// Load app definition.
		$app = new App();
		$storage_path = wpa_app_storage_path_by_type($app_type);
		$app->set_app_key($app_key);
		$app->set_storage_path($storage_path);
		$app->init();

		foreach( $app->def->models as $model_key ) {
			$this->log[] = 'AppManager::app_refresh_routine() run for model_key: '.$model_key.'.';
			$model_def = $app->def->{$model_key};
			$table_name = $app_key . '_' . $model_def->key;
			$db_manager = new DatabaseManager;
			$db_manager->refresh($table_name, $model_def);
		}

		return $resp;

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

	function activate($app_key) {

		$this->log[] = 'AppManager::activate() run.';

		// File copy.
		$app_source_path = WPA_PATH.'apps/'.$app_key;
		$wp_content_dir = WP_CONTENT_DIR;
		$wpa_dir = $wp_content_dir . '/wpa';
		$save_path = $wpa_dir . '/' . $app_key;
		$this->rcopy($app_source_path, $save_path);

		// Do database updates with refresh routine.
		$this->app_refresh_routine($app_key);

	}

	function uninstall($app_key) {

		global $wpdb;
		$this->log[] = 'AppManager::uninstall() run.';

		// Remove database tables.
		$app_main_def = wpa_load_app_def($app_key);
		if(!empty($app_main_def->models)) {
			foreach($app_main_def->models as $model_key) {
				$table_name = wpa_model_make_table_name($app_key, $model_key);
        $wpdb->query("DROP TABLE IF EXISTS $table_name");
			}
		}

		// Remove all app files from /wp-content/wpa/{app_key}.
		$wp_content_dir = WP_CONTENT_DIR;
		$wpa_dir = $wp_content_dir . '/wpa';
		$app_path = $wpa_dir . '/' . $app_key;
		$this->rrmdir($app_path);




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
