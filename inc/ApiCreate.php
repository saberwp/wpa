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

	private function model_has_title() {
		if(!isset($this->model_def->title_field) || $this->model_def->title_field) {
			return true;
		}
		return false;
	}

	public function make_standard_insert_data() {
		if($this->model_has_title()) {
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

}
