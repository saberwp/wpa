<?php

/* @TODO

-- Load key from DB or env file.
-- Refactor register_api_endpoints() to avoid double foreach loop, separate single setup.


*/

/*
 * API Class
 *
 * Builds API with WordPress functions from App Definition JSON data.
 *
 */

namespace WPA;

class Api {

	public $key = 'KR928NV81G01';
	public $app_key = false;
	public $app_path_root;

	public function init() {
		add_action('rest_api_init', [$this, 'register_api_endpoints']);
	}

	public function set_app_key($val) {
		$this->app_key = $val;
	}

	public function get_app_key() {
		return $this->app_key;
	}

	public function set_path_root($app_key) {
		$this->app_path_root = WP_CONTENT_DIR . '/wpa/'.$app_key.'/';
	}

	public function get_path_root() {
		return $this->app_path_root;
	}

	public function load_app_def() {

		$app_def_json = file_get_contents($this->get_path_root() . 'app.json');
    $app_def = json_decode($app_def_json);
		return $app_def;

	}

	// Define the API route handler function.
	public function list_callback($request) {

		// Get model key from API path.
		$route = $request->get_route();
    $route_parts = explode('/', $route);
		$app_key = $route_parts[3];
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

	public static function edit_callback($request) {

		// Get model key from API path.
		$route = $request->get_route();
		$route_parts = explode('/', $route);
		$app_key = $route_parts[3];
		$model_key = $route_parts[4];

		// Get ID.
		$id = $request->get_param('id');

		// Get request body.
		$json_data = $request->get_json_params();

		// Setup API object.
		$api = new Api;
		$api->set_app_key($app_key);
		$api->set_path_root($app_key);

		// Do DB update.
		global $wpdb;
		$table_name = $api->make_table_name( $model_key );

		$data = array(
			'title' => $json_data['title'],
		);

		// Load model definition from JSON file
    $model_json = file_get_contents($api->get_path_root().'models/'.$model_key.'.json');
    $model = json_decode( $model_json );

		$relations_exist = 0;
		foreach ($model->fields as $field) {
		  // Add to $data query using $field->key and matching key from $json_data.
		  if (isset($json_data[$field->key]) && $field->type !== 'relation_select') {
		    $data[$field->key] = $json_data[$field->key];
		  }

			// Flag special handling for relation select fields.
			if (isset($json_data[$field->key]) && $field->type === 'relation_select') {
				$relations_exist = 1;
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

		// If relations exist, do relations handling.
		if( $relations_exist === 1 ) {
			$response->relations = $api->relations_process($model, $id, $json_data, $data);
		}

		return rest_ensure_response($response);
	}

	// $id is the record id for the main model record.
	public function relations_process($model, $id, $json_data, $data) {

		$result = new \stdClass;

		foreach ($model->fields as $field) {
			// Handling for relation select fields.
			if (isset($json_data[$field->key]) && $field->type === 'relation_select') {

				// 1- Load the related model using $model field data (or $json_data?).

				// 2- Find out what the table name is from the $related_model key.

				// 3- Query relation table to find this combination of $id and the related model id.

				// 4- If relation record exists, check if the value is different.

				// 5- If value is different, update the value with query.

				// 6- If relation record does not exist, insert it into relation table. 

			}
		}

		return $result;

	}

	public static function create_callback($request) {

		// Get model key from API path.
	  $route = $request->get_route();
	  $route_parts = explode('/', $route);
		$app_key = $route_parts[3];
	  $model_key = $route_parts[4];

	  // Get request body.
	  $json_data = $request->get_json_params();

	  // Do DB insert.
	  global $wpdb;
	  $table_name = self::make_table_name($model_key);

	  $data = array(
	    'title' => $json_data['title'],
	  );

	  // Load model definition from JSON file.
		$api = new Api;
		$api->set_app_key($app_key);
		$api->set_path_root($app_key);
	  $model_json = file_get_contents($api->get_path_root().'models/'.$model_key.'.json');
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
	    $response->message = 'Error processing insert request.';
			$response->model_key = $model_key;
			$response->table_name = $table_name;
			$response->insert_data = $data;
			$response->path_root = $api->get_path_root();
			$response->model_json = $model_json;
	    return rest_ensure_response($response);
	  } else {
	    // Handle insert success.
	    $response = new \stdClass;
	    $response->success = true;
	    $response->message = 'Request processed successfully.';
	    $response->model_id = $wpdb->insert_id;
	    $response->result = $result;
			$response->model_key = $model_key;
			$response->table_name = $table_name;
			$response->insert_data = $data;
			$response->path_root = $api->get_path_root();
			$response->model_json = $model_json;
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

		// @TODO move this, it is duplicate of Plugin code because we can't call Plugin() again it has a constructor.

		// Find apps loaded.
		$wp_content_dir = WP_CONTENT_DIR;
		$wpa_dir = $wp_content_dir . '/wpa';

		$app_keys = array_filter( scandir( $wpa_dir ), function( $item ) use ( $wpa_dir ) {
			return is_dir( $wpa_dir . '/' . $item ) && ! in_array( $item, array( '.', '..' ) );
		});

		// Loop over apps and init API routes.
		foreach( $app_keys as $app_key ) {

			// Set app key and path root.
			$this->set_app_key($app_key);
			$this->set_path_root($app_key);

		  $app_def = $this->load_app_def();

		    foreach ($app_def->models as $model_key) {

		        // Define the route for this model based on the model key.
		        $route_base = $app_key.'/'.$model_key;

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
		          'callback' => ['\\WPA\Api', 'edit_callback'],
		          'args' => array('id'),
		          'permission_callback' => [$this, 'permission_callback'],
		        ));

						// Create route.
						register_rest_route('wp/v2', $route_base, array(
		          'methods' => 'POST',
		          'callback' => ['\\WPA\Api', 'create_callback'],
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

	private static function make_table_name( $model_key ) {
		global $wpdb;
		return $wpdb->prefix . 'app_' . $model_key;
	}

}
