<?php

namespace WPA;

class DatabaseManager {

	// Pass table name without prefix.
	private function table_exists($table) {
    global $wpdb;

    $full_table_name = $wpdb->prefix . $table;

    $query = $wpdb->prepare("SHOW TABLES LIKE %s", $full_table_name);
    $result = $wpdb->get_var($query);

    if ($result === $full_table_name) {
      return true;
    }

    return false;
	}

	function get_full_table_name($table_name) {
		global $wpdb;
		return $wpdb->prefix . $table_name;
	}

	function get_table_columns($table_name) {
		global $wpdb;
		$full_table_name = $this->get_full_table_name($table_name);
		$existing_columns = $wpdb->get_results("SHOW COLUMNS FROM $full_table_name", ARRAY_A);
	  $existing_columns = wp_list_pluck($existing_columns, 'Field');
		return $existing_columns;
	}

	function get_column_type_from_field_type($field_type) {
	  switch ($field_type) {
	    case 'text':
        return 'VARCHAR(255)';
				break;
			case 'textarea':
				return 'TEXT';
				break;
	    case 'int':
        return 'INT';
				break;
			case 'number':
				return 'DOUBLE';
				break;
			case 'decimal':
				return 'DECIMAL';
				break;
	    case 'date':
			case 'date_time':
        return 'DATETIME';
				break;
			case 'relation_select':
				return false;
				break;
	    default:
        return 'TEXT';
				break;
	  }
	}


	function update_table_column($field, $full_table_name, $existing_columns) {
		global $wpdb;
		$field_key   = $field->key;
		$field_type  = $field->type;
		$column_type = $this->get_column_type_from_field_type($field->type);

		// If column type false it is because the field type was not at all supported or was type that does not need column.
		if(!$column_type) { return false; }

		if (!in_array($field_key, $existing_columns)) {
			// Add the column if it doesn't exist
			$alter_query = "ALTER TABLE $full_table_name ADD COLUMN $field_key $column_type";
			$wpdb->query($alter_query);
		} else {
			// Check if data type needs to be changed
			$existing_column_type = $wpdb->get_var("SELECT LOWER(DATA_TYPE) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '$full_table_name' AND COLUMN_NAME = '$field_key'");

			if (strtolower($existing_column_type) !== strtolower($column_type)) {
				// Add a new column with the desired data type
				$new_column_name = $field_key . '_new';
				$alter_query = "ALTER TABLE $full_table_name ADD COLUMN $new_column_name $column_type";
				$wpdb->query($alter_query);

				// Copy data from the old column to the new column
				$wpdb->query("UPDATE $full_table_name SET $new_column_name = $field_key");

				// Drop the old column
				$wpdb->query("ALTER TABLE $full_table_name DROP COLUMN $field_key");

				// Rename the new column to the original column name
				$wpdb->query("ALTER TABLE $full_table_name CHANGE COLUMN $new_column_name $field_key $field_type");
			}
		}
	}

	public function refresh($table_name, $model_def) {

		$table_exists = $this->table_exists($table_name);
		if($table_exists) {
			$this->update_table($table_name, $model_def);
		} else {
			$this->create_table($table_name, $model_def);
		}

	}

	function update_table($table_name, $model_def) {
	  global $wpdb;
	  $full_table_name = $wpdb->prefix . $table_name;

	  $existing_columns = $this->get_table_columns($table_name);
		$this->update_table_fields($model_def, $full_table_name, $existing_columns);
	}

	function create_table($table_name, $model_def) {
    global $wpdb;
    $full_table_name = $wpdb->prefix . $table_name;
    $charset_collate = $wpdb->get_charset_collate();
    $sql  = 'CREATE TABLE ' . $full_table_name . '(';
    $sql .= 'id mediumint(9) NOT NULL AUTO_INCREMENT,';
		$sql .= 'author_user_id mediumint(9) NOT NULL DEFAULT 0,';

    if ($model_def->type === 'relation') {
      $sql .= $model_def->relations->left->model . '_id mediumint(9) NOT NULL,';
      $sql .= $model_def->relations->right->model . '_id mediumint(9) NOT NULL,';
    }

    $sql .= 'created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,';
    $sql .= 'updated timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,';

    $sql .= "\nPRIMARY KEY (id)\n) $charset_collate;"; // Add the primary key and finish the SQL statement

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql); // Create the table using dbDelta function

    $existing_columns = $this->get_table_columns($table_name);
    $this->update_table_fields($model_def, $full_table_name, $existing_columns);
	}


	function update_table_fields($model_def, $full_table_name, $existing_columns) {

		if(!isset($model_def->fields)) {
			return false; // No fields defined in model.
		}

		$fields = $model_def->fields;

		// Make title field if it is active (or unset, default active) in defined model.
		$title_field = Model::title_field_active($model_def);
		if($title_field) {
			$field = new \stdClass;
			$field->key  = 'title';
			$field->type = 'text';
			$this->update_table_column($field, $full_table_name, $existing_columns);
		}

	  foreach ($fields as $field) {
      $this->update_table_column($field, $full_table_name, $existing_columns);
	  }
	}

}
