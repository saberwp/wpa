<?php

namespace WPA;

class ApiCreate {

	public $app_key   = false;
	public $model_key = false;
	public $app_def   = false;
	public $model_def = false;
	public $form_data = [];
	public $storage_path = '';
	public $table_name = '';
	public $relations_exist = false;
	public $insert_data = [];
	public $insert_id = 0;
	public $insert_result;

	public function constructor() {}

	public function init() {

		// Load model definition from JSON file.
		$this->app_def = wpa_load_app_def_by_key_any_storage($this->app_key);
		$this->app_def = wpa_app_set_type($this->app_def);
		$this->storage_path = wpa_app_storage_path_by_type($this->app_def->type);
	  $model_json = file_get_contents($this->storage_path.$this->app_key.'/models/'.$this->model_key.'.json');
	  $this->model_def = json_decode($model_json);

	}

	public function parse_form_data() {

		switch($this->model_def->type) {
			case 'standard':
			case 'settings':
				$this->make_standard_insert_data();
				break;
			case 'relation':
				$this->make_relation_insert_data($model, $this->form_data);
				break;
		}

	}

	public function db_insert() {
		global $wpdb;
		$this->insert_result = $wpdb->insert($this->table_name, $this->insert_data);
		$this->insert_id = $wpdb->insert_id;
		return $this->insert_result;
	}

	public function make_standard_insert_data() {

		// Set author_user_id to current WP user.
		$this->insert_data['author_user_id'] = $this->form_data['author_user_id'];

		// Set title if supported by model.
		if(Model::title_field_active($this->model_def)) {
			$this->insert_data['title'] = $this->form_data['title'];
		}

		if(!isset($this->model_def->fields) || empty($this->model_def->fields)) {
			return; // No field to parse.
		}

		foreach ($this->model_def->fields as $field) {

			// Skip relation_select_multiple fields.
			if($field->type === 'relation_select_multiple') {
				continue;
			}

			// Flag special handling for relation select fields.
			if (isset($this->form_data[$field->key]) && $field->type === 'relation_select') {
				$this->relations_exist = 1;
			}

			// Parse field values for standard model fields.
			if (isset($this->form_data[$field->key]) && $field->type !== 'relation_select') {
				$this->insert_data[$field->key] = $this->form_data[$field->key];
			}

		}
	}

	public function make_relation_insert_data() {
		$this->insert_data = ['id' => 0];
		$this->insert_data[$this->model_def->relations->left->model.'_id']  = $this->form_data[$this->model_def->relations->left->model.'_id'];
		$this->insert_data[$this->model_def->relations->right->model.'_id'] = $this->form_data[$this->model_def->relations->right->model.'_id'];
	}

	public static function create_callback($request) {

		// Get model key from API path.
	  $route = $request->get_route();
	  $route_parts = explode('/', $route);
		$app_key = $route_parts[3];
	  $model_key = $route_parts[4];

		// Init the ApiCreate class.
		$api_create = new ApiCreate();
		$api_create->app_key = $app_key;
		$api_create->model_key = $model_key;
		$api_create->form_data = $request->get_json_params();
		$api_create->table_name = Api::make_table_name($app_key, $model_key);
		$api_create->init();
		$api_create->parse_form_data();
		$api_create->db_insert();

	  if ($api_create->insert_result === false) {
	    // Handle insert error.
	    $response = new \stdClass;
	    $response->success = false;
	    $response->message = 'Error processing insert request.';
	  } else {
	    // Handle insert success.
	    $response = new \stdClass;
	    $response->success = true;
	    $response->message = 'Request processed successfully.';
			$response->insert_id = $api_create->insert_id;
			$response->model_key = $api_create->model_def->key;
	  }

		// If relations exist, do relations handling.
		if( $api_create->relations_exist === 1 ) {
			$api_relations = new ApiRelations;
			$api_relations->app_key = $api_create->app_key;
			$api_relations->model_def = $api_create->model_def;
			$api_relations->record_id = $api_create->insert_id;
			$api_relations->storage_path = $api_create->storage_path;
			$api_relations->form_data = $api_create->form_data;
			$response->relations = $api_relations->process();
		}

		return rest_ensure_response($response);

	}

}
