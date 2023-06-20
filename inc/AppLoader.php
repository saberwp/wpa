<?php

namespace WPA;

class AppLoader {

	public $log = [];

	public function init() {
    add_action( 'rest_api_init', array( $this, 'register_routes' ) );
  }

	public function register_routes() {
		// Route for app install.
    register_rest_route( 'wpa/app', '/load', array(
      'methods' => 'POST',
      'callback' => array( $this, 'app_load_callback' ),
    ));

  }

	public function app_load_callback( $request ) {
		$resp = new \stdClass;
		$resp->user = false;


    $params = $request->get_json_params();

		$this->log[] = 'App loader called.';

		if ( isset( $params['user_id'] ) ) {
			$user_id = $params['user_id'];
			$resp->user = get_userdata($user_id);
		}

    // Check if app_key parameter is set
    if ( isset( $params['app_key'] ) ) {

      $app_key = $params['app_key'];
			$this->log[] = 'App loader called for app key ' . $app_key . '.';

			$resp->app_def = $this->load_app_def($app_key);

    } else {
      $this->message = 'App_key parameter missing';
    }

		$resp->log = $this->log;
		return rest_ensure_response($resp);
  }

	public function load_app_def($app_key) {

		$app_registry = wpa_app_registry();

		if(empty($app_registry)) { return false; }
		$app_def = false;
		foreach($app_registry as $app_registered_def) {
			if($app_registered_def->key == $app_key) {
				$app_def = $app_registered_def;
				break;
			}
		}

		$app_def->type = isset($app_def->type) ? $app_def->type : 'wpa';

		$this->log[] = 'App type is '.$app_def->type.'.';

		$app = new App();
		$storage_path = wpa_app_storage_path_by_type($app_def->type);
		$app->set_storage_path($storage_path);
		$app->set_app_key($app_key);
		$app->init();

		// Add logo to the app def.
		$app->def->logo = false;
		if(file_exists($storage_path.$app_key.'/logo.svg')) {
			$app->def->logo = file_get_contents($storage_path.$app_key.'/logo.svg');
		}

		return $app->def;

	}

}
