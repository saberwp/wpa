<?php

/*
 * API Class
 *
 * Builds API with WordPress functions from App Definition JSON data.
 *
 */

namespace WPA;

class Api {

	public $key = 'KR928NV81G01';

	public function app_path_root() {
		return WP_CONTENT_DIR . 'tasks/';
	}

	public function init() {

		add_action('rest_api_init', [$this, 'register_api_endpoints']);

	}

	public function load_app_def() {

		$app_def_json = file_get_contents(Plugin::app_path_root() . 'app.json');
    $app_def = json_decode($app_def_json);
		return $app_def;

	}

	// Define the API route handler function.
	public function list_callback($request) {

		// Get model key from API path.
		$route = $request->get_route();
    $route_parts = explode('/', $route);
    $model_key = $route_parts[4];

		// Load data.
		global $wpdb;
		$table_name = $this->make_table_name( $model_key );
    $results = $wpdb->get_results("SELECT * FROM $table_name ORDER BY id DESC LIMIT 10");
    $records = array();
    foreach ($results as $result) {
	    $records[] = $result;
    }

		// Return the data as a JSON response.
		$data = new \stdClass;
		$data->message = "Hey nice job!";
		$data->model_key = $model_key;
		$data->records = $records;
		return rest_ensure_response($data);

	}

	public function edit_callback($request) {

		// Get model key from API path.
		$route = $request->get_route();
		$route_parts = explode('/', $route);
		$model_key = $route_parts[4];

		// Get ID.
		$id = $request->get_param('id');

		// Get request body.
		$json_data = $request->get_json_params();

		// Do DB update.
		global $wpdb;
		$table_name = $this->make_table_name( $model_key );

		$data = array(
			'title' => $json_data['title'],
		);

		// Load model definition from JSON file
    $model_json = file_get_contents( Plugin::app_path_root() . "models/{$model_key}.json" );
    $model = json_decode( $model_json );

		foreach ($model->fields as $field) {
		  // Add to $data query using $field->key and matching key from $json_data.
		  if (isset($json_data[$field->key])) {
		    $data[$field->key] = $json_data[$field->key];
		  }
		}

		$where = array(
		  'id' => $id,
		);

		$result = $wpdb->update($table_name, $data, $where);

		$response = new \stdClass;
		$response->success = true;
		$response->message = 'Request processed successfully.';
		$response->model_id = $id;
		$response->result = $result;

		return rest_ensure_response($response);
	}

	public function create_callback($request) {
	  // Get model key from API path.
	  $route = $request->get_route();
	  $route_parts = explode('/', $route);
	  $model_key = $route_parts[4];

	  // Get request body.
	  $json_data = $request->get_json_params();

	  // Do DB insert.
	  global $wpdb;
	  $table_name = $this->make_table_name( $model_key );

	  $data = array(
	    'title' => $json_data['title'],
	  );

	  // Load model definition from JSON file.
	  $model_json = file_get_contents(Plugin::app_path_root() . "models/{$model_key}.json");
	  $model = json_decode($model_json);

	  foreach ($model->fields as $field) {
	    // Add to $data query using $field->key and matching key from $json_data.
	    if (isset($json_data[$field->key])) {
	      $data[$field->key] = $json_data[$field->key];
	    }
	  }

	  $result = $wpdb->insert($table_name, $data);

	  if ($result === false) {
	    // Handle insert error.
	    $response = new \stdClass;
	    $response->success = false;
	    $response->message = 'Error processing request.';
	    return rest_ensure_response($response);
	  } else {
	    // Handle insert success.
	    $response = new \stdClass;
	    $response->success = true;
	    $response->message = 'Request processed successfully.';
	    $response->model_id = $wpdb->insert_id;
	    $response->result = $result;
	    return rest_ensure_response($response);
	  }
	}

	public function delete_callback($request) {

		// Get model key from API path.
		$route = $request->get_route();
		$route_parts = explode('/', $route);
		$model_key = $route_parts[4];

		// Get ID.
		$id = $request->get_param('id');

		// Do DB update.
		global $wpdb;
		$table_name = $this->make_table_name( $model_key );

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


	  $app_def = $this->load_app_def();

	    foreach ($app_def->models as $model_key) {
	        // Define the route for this model based on the model key.
	        $route_base = "app/{$model_key}";

					// Register read list route.
	        register_rest_route('wp/v2', $route_base, array(
	            'methods' => 'GET',
	            'callback' => [$this, 'list_callback'],
	            //'args' => array(),
	            'permission_callback' => [$this, 'permission_callback'],
	        ));

					// Edit one route.
					register_rest_route('wp/v2', $route_base . '/(?P<id>\d+)', array(
	          'methods' => 'PUT',
	          'callback' => [$this, 'edit_callback'],
	          'args' => array('id'),
	          'permission_callback' => [$this, 'permission_callback'],
	        ));

					// Create route.
					register_rest_route('wp/v2', $route_base, array(
	          'methods' => 'POST',
	          'callback' => [$this, 'create_callback'],
	          'args' => array('id'),
	          'permission_callback' => [$this, 'permission_callback'],
	        ));

					// Edit one route.
					register_rest_route('wp/v2', $route_base . '/(?P<id>\d+)', array(
	          'methods' => 'DELETE',
	          'callback' => [$this, 'delete_callback'],
	          'args' => array('id'),
	          'permission_callback' => [$this, 'permission_callback'],
	        ));

	    }
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

	private function make_table_name( $model_key ) {
		global $wpdb;
		return $wpdb->prefix . 'app_' . $model_key;
	}

}
