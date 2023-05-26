<?php

namespace WPA;

class ApiRelations {

	public $app_key = false;
	public $model_def = false;
	public $record_id = 0;
	public $form_data = [];
	public $storage_path = '';

	public function process() {

		global $wpdb;
		$result = new \stdClass;

		foreach ($this->model_def->fields as $field) {

			// Handling for relation select fields.
			if (isset($this->form_data[$field->key]) && $field->type === 'relation_select') {

				// Load task_status model def.
				$relation_model_json = file_get_contents($this->storage_path.$this->app_key.'/models/' . $field->relation->model . '.json');
				$relation_model = json_decode($relation_model_json);

				// Parse the 2 database column names from $relation_model.
				if($field->relation->side === 'left') {
					$first_col = $relation_model->relations->right->model . '_id';
					$second_col = $relation_model->relations->left->model . '_id';
				}

				if($field->relation->side === 'right') {
					$first_col = $relation_model->relations->left->model . '_id';
					$second_col = $relation_model->relations->right->model . '_id';
				}

				// Get the relation ID from the form data.
				$relation_id = $this->form_data[$field->key];

				$table_name = $this->make_table_name($field->relation->model);
				$query = "SELECT * FROM $table_name WHERE $first_col = $this->record_id";
				$row = $wpdb->get_row($query);

				// If relation record exists, check if the value is different.
				$unchanged = 1;
				if($row) {

					if($row->{$first_col} !== $this->record_id || $row->{$second_col} !== $relation_id) {
						$unchanged = 0;
					}

					// If value is same, exit now.
					if(!$unchanged) {

						// Do update.
						$edit_data = [];
						$edit_data[$first_col] = $this->record_id;
						$edit_data[$second_col] = $relation_id;
						$where = array(
						  'id' => $row->id,
						);
						$result->{$field->key} = $wpdb->update($table_name, $edit_data, $where);
					}

				}

				// If relation record does not exist, insert it into relation table.
				if(!$row) {
					$insert_data = [];
					$insert_data[$first_col] = $this->record_id;
					$insert_data[$second_col] = $relation_id;
					$result->{$field->key} = $wpdb->insert($table_name, $insert_data);
				}

			}
		}

		return $result;

	}

	private function make_table_name($model_key) {
		global $wpdb;
		return $wpdb->prefix . $this->app_key . '_' . $model_key;
	}

}
