<?php

namespace WPA;

class Activate {

	// @TODO update tables if they exist instead of creating them.

	public function app_path_root() {
		return WP_CONTENT_DIR . 'tasks/';
	}

	public function run() {

	  // Load app def.
	  $app_def_json = file_get_contents( Plugin::app_path_root() . 'app.json');
	  $app_def = json_decode( $app_def_json );

	  global $wpdb;
	  $table_name_prefix = $wpdb->prefix . 'app_'; // Set the table name prefix

	  // Loop over the models array and create a table for each model
	  foreach ($app_def->models as $model_key) {

			// Load model definition from JSON file
	    $model_json = file_get_contents( Plugin::app_path_root() . "models/{$model_key}.json" );
	    $app_def->{$model_key} = json_decode( $model_json );
			$model = json_decode( $model_json );

	    $table_name = $table_name_prefix . $model_key; // Set the table name based on the model key
	    $charset_collate = $wpdb->get_charset_collate(); // Get the database charset and collation

	    $sql  = 'CREATE TABLE ' . $table_name . '(';
			$sql .= 'id mediumint(9) NOT NULL AUTO_INCREMENT,';

			if( $model->type === 'standard' ) {
				$sql .= 'title varchar(255) NOT NULL,';
			}

			if( $model->type === 'relation' ) {
				$sql .= $model->relations->left->model . '_id mediumint(9) NOT NULL,';
				$sql .= $model->relations->right->model . '_id mediumint(9) NOT NULL,';
			}

			// Add defined fields if they exist.
			if( isset( $app_def->{$model_key}->fields ) && ! empty( $app_def->{$model_key}->fields) ) {
		    foreach ($app_def->{$model_key}->fields as $field) {
		      switch ($field->type) {
		        case 'text':
		          $sql .= "\n" . $field->key . ' varchar(255),';
		          break;
		        case 'int':
		          $sql .= "\n" . $field->key . ' int(11),';
		          break;
		        // Add more cases for other field types as needed
		      }
		    }
			}

	    $sql .= "\nPRIMARY KEY (id)\n) $charset_collate;"; // Add the primary key and finish the SQL statement

	    require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
	    dbDelta( $sql ); // Create the table using dbDelta function
	  }
	}

}
