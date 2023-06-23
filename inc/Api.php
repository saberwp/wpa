<?php

/*
 * API Class
 *
 * Builds API with WordPress functions from App Definition JSON data.
 *
 */

namespace WPA;

class Api {

	public $key = 'KR928NV81G01';  // @TODO security issue, remove key.
	public $app_key = false;

	public function init() {
		require_once(WPA_PATH.'inc/ApiCreate.php');
		require_once(WPA_PATH.'inc/ApiRelations.php');
		add_action('rest_api_init', [$this, 'register_api_endpoints']);
	}

	public function set_app_key($val) {
		$this->app_key = $val;
	}

	public function get_app_key() {
		return $this->app_key;
	}

	// Define the API route handler function.
	// @param $order_by
	// @param $order_dir
	// @param $limit
	public function list_callback($request) {

    // Get model key from API path.
    $route = $request->get_route();
    $route_parts = explode('/', $route);
    $app_key = $route_parts[3];
    $model_key = $route_parts[4];

    // Get user_id from query parameters.
    $user_id = $request->get_param('user_id');

    // Load data.
    global $wpdb;
    $table_name = $this->make_table_name($app_key, $model_key);

    if ($user_id) {
        // If user_id is provided, use it in the query.
        $sql = $wpdb->prepare("SELECT * FROM $table_name WHERE author_user_id = %d ORDER BY id DESC LIMIT 100", $user_id);
    } else {
        // Otherwise, get all records.
        $sql = "SELECT * FROM $table_name ORDER BY id DESC LIMIT 100";
    }

    $results = $wpdb->get_results($sql);

    $records = array();
    foreach ($results as $result) {
        $records[] = $result;
    }

    // Return the data as a JSON response.
    $data = new \stdClass;
    $data->message = "Records loaded from $table_name.";
    $data->model_key = $model_key;
    $data->records = $records;
    return rest_ensure_response($data);
	}


	public static function edit_callback($request) {

		// Get model key from API path.
		$route = $request->get_route();
		$route_parts = explode('/', $route);
		$app_key = $route_parts[3];
		$model_key = $route_parts[4];

		// Get ID.
		$id = $request->get_param('id');

		// Get request body.
		$form_data = $request->get_json_params();

		// Setup API object.
		$api = new Api;
		$api->set_app_key($app_key);

		// Do DB update.
		global $wpdb;
		$table_name = $api->make_table_name( $app_key, $model_key );

		// Load model definition from JSON file
		$app_def = wpa_load_app_def_by_key_any_storage($app_key);
		$app_def = wpa_app_set_type($app_def);
		$api->storage_path = wpa_app_storage_path_by_type($app_def->type);
	  $model_json = file_get_contents($api->storage_path.$app_key.'/models/'.$model_key.'.json');
	  $model = json_decode($model_json);

		$edit_data = array();

		if(Model::title_field_active($model)) {
			$edit_data['title'] = $form_data['title'];
		}

		$relations_exist = 0;
		foreach ($model->fields as $field) {

		  // Add to $data query using $field->key and matching key from $json_data.
		  if (isset($form_data[$field->key]) && $field->type !== 'relation_select') {
		    $edit_data[$field->key] = $form_data[$field->key];
		  }

			// Flag special handling for relation select fields.
			if (isset($form_data[$field->key]) && $field->type === 'relation_select') {
				$relations_exist = 1;
			}
		}

		$where = array(
		  'id' => $id,
		);

		$result = $wpdb->update($table_name, $edit_data, $where);

		$response = new \stdClass;
		$response->success = true;
		$response->message = 'Request processed successfully.';
		$response->model_id = $id;
		$response->result = $result;

		// If relations exist, do relations handling.
		if( $relations_exist === 1 ) {
			$api_relations = new ApiRelations();
			$response->relations = $api_relations->process($model, $id, $form_data, $app_key);
		}

		return rest_ensure_response($response);
	}

	private static function model_has_title($model_def) {
		if(!isset($model_def->title_field) || $model_def->title_field) {
			return true;
		}
		return false;
	}

	public function delete_callback($request) {

		// Get model key from API path.
		$route = $request->get_route();
		$route_parts = explode('/', $route);
		$app_key = $route_parts[3];
		$model_key = $route_parts[4];

		// Get ID.
		$id = $request->get_param('id');

		// Do DB delete.
		global $wpdb;
		$table_name = $this->make_table_name($app_key, $model_key);

		$where = array(
			'id' => $id,
		);

		$result = $wpdb->delete($table_name, $where);

		$response = new \stdClass;
		$response->success = true;
		$response->message = 'Request processed successfully.';
		$response->model_id = $id;
		$response->result = $result;

		return rest_ensure_response($response);
	}

	public function register_api_endpoints() {

		// Get registered app list.
		$app_registry = wpa_app_registry();

		// Loop over apps and init API routes.
		foreach( $app_registry as $app_def ) {

			$app_key = $app_def->key;

			// Set app key and path root.
			$this->set_app_key($app_key);

			$app = new App();
			$app_type = isset($app_def->type) ? $app_def->type : 'wpa';
			$this->storage_path = wpa_app_storage_path_by_type($app_type);
			$app->set_storage_path($this->storage_path);
			$app->set_app_key($app_key);
			$app->init();

	    foreach ($app->def->models as $model_key) {

        // Define the route for this model based on the model key.
        $route_base = $app_def->key.'/'.$model_key;

				// Fetch list route.
        register_rest_route('wp/v2', $route_base, array(
            'methods' => 'GET',
            'callback' => [$this, 'list_callback'],
            //'args' => array(),
            'permission_callback' => [$this, 'permission_callback'],
        ));

				// Edit one route.
				register_rest_route('wp/v2', $route_base . '/(?P<id>\d+)', array(
          'methods' => 'PUT',
          'callback' => ['\\WPA\Api', 'edit_callback'],
          'args' => array('id'),
          'permission_callback' => [$this, 'permission_callback'],
        ));

				// Create route.
				register_rest_route('wp/v2', $route_base, array(
          'methods' => 'POST',
          'callback' => ['\\WPA\ApiCreate', 'create_callback'],
          'args' => array('id'),
          'permission_callback' => [$this, 'permission_callback'],
        ));

				// Delete one route.
				register_rest_route('wp/v2', $route_base . '/(?P<id>\d+)', array(
          'methods' => 'DELETE',
          'callback' => [$this, 'delete_callback'],
          'args' => array('id'),
          'permission_callback' => [$this, 'permission_callback'],
        ));

				// Isolate current model def.
				$model_def = $app->def->{$model_key};

				// Add special relation routes.
				if($model_def->type === 'relation') {

					// Fetch left relation list route.
	        register_rest_route('wp/v2', $route_base . '/' . $model_def->relations->left->model . '/(?P<id>\d+)', array(
	            'methods' => 'GET',
	            'callback' => [$this, 'relation_fetch_callback'],
							'args' => array('id'),
	            'permission_callback' => [$this, 'permission_callback'],
	        ));

					// Fetch right relation list route.
	        register_rest_route('wp/v2', $route_base . '/' . $model_def->relations->right->model . '/(?P<id>\d+)', array(
	            'methods' => 'GET',
	            'callback' => [$this, 'relation_fetch_callback'],
							'args' => array('id'),
	            'permission_callback' => [$this, 'permission_callback'],
	        ));

				}

				// Add special settings routes.
				if($model_def->type === 'settings') {

					// Fetch settings for a given user.
	        register_rest_route('wp/v2', $route_base . '/user/(?P<id>\d+)', array(
	            'methods' => 'GET',
	            'callback' => [$this, 'settings_by_user_fetch_callback'],
							'args' => array('id'),
	            'permission_callback' => [$this, 'permission_callback'],
	        ));

				}

	    }
		}
}

	public function relation_fetch_callback($request) {

		// Get model key from API path.
		$route = $request->get_route();
    $route_parts = explode('/', $route);
		$app_key = $route_parts[3];
    $model_key = $route_parts[4];
		$relation_model_key = $route_parts[5];

		// Get Record ID.
		$record_id = $request->get_param('id');

		// Create where col name.
		$relation_col_name = $relation_model_key.'_id';

		// Load data.
		global $wpdb;
		$table_name = $this->make_table_name( $app_key, $model_key );
		$results = $wpdb->get_results(
			"SELECT * FROM $table_name
				WHERE $relation_col_name = $record_id
				ORDER BY id DESC LIMIT 100");

    $records = array();
    foreach ($results as $result) {
	    $records[] = $result;
    }

		// Return the data as a JSON response.
		$data = new \stdClass;
		$data->message = "Fetch from relation_fetch_callback.";
		$data->records = $records;
		$data->query = $wpdb->last_query;
		return rest_ensure_response($data);

	}

	public function settings_by_user_fetch_callback($request) {

		// Get model key from API path.
		$route = $request->get_route();
    $route_parts = explode('/', $route);
		$app_key = $route_parts[3];
    $model_key = $route_parts[4];
		$relation_model_key = $route_parts[5];

		// Get User ID.
		$user_id = $request->get_param('id');

		// Load data.
		global $wpdb;
		$table_name = $this->make_table_name( $app_key, $model_key );
		$result = $wpdb->get_row(
			"SELECT * FROM $table_name
				WHERE author_user_id = $user_id
				ORDER BY id DESC");

		// Return the data as a JSON response.
		$data = new \stdClass;
		$data->message = "Fetch from settings_by_user_fetch_callback().";
		$data->model_key = $model_key;
		$data->record = $result;
		$data->query = $wpdb->last_query;
		return rest_ensure_response($data);

	}

	public function permission_callback() {

			// Get key passed in request.
			$api_key_header = isset( $_SERVER['HTTP_API_KEY'] ) ? $_SERVER['HTTP_API_KEY'] : ''; // Get the API key from the request header

			if ( $api_key_header === $this->key ) { // Check if the provided API key matches the valid API key
				return true; // Allow access to the endpoint if the API key is valid
			} else {
				return false; // Deny access to the endpoint if the API key is invalid
			}

		}

	public static function make_table_name( $app_key, $model_key ) {
		global $wpdb;
		return $wpdb->prefix . $app_key . '_' . $model_key;
	}

}
