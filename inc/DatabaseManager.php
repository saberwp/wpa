<?php

namespace WPA;

class DatabaseManager {

	// Pass table name without prefix.
	function table_exists($table) {
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
			case 'textarea':
				return 'TEXT';
	    case 'int':
        return 'INT';
			case 'number':
				return 'DOUBLE';
			case 'decimal':
				return 'DECIMAL';
	    case 'date':
        return 'DATETIME';
	    default:
        return '';
	  }
	}


	function update_table_column($field, $full_table_name, $existing_columns) {
		global $wpdb;
		$field_key   = $field->key;
		$field_type  = $field->type;
		$column_type = $this->get_column_type_from_field_type($field->type);

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

	function update_table($table_name, $model_def) {
	  global $wpdb;

	  $full_table_name = $wpdb->prefix . $table_name;

	  $existing_columns = $this->get_table_columns($table_name);

	  $fields = $model_def->fields;
	  foreach ($fields as $field) {
      $this->update_table_column($field, $full_table_name, $existing_columns);
	  }
	}

	function create_table($table_name, $model_def) {

		

	}

}
