<?php

namespace WPA;

class App {

	public function app_path_root() {
		return WP_CONTENT_DIR . 'tasks/';
	}

	public function init() {

		// Load app def.
		$app_def_json = file_get_contents( Plugin::app_path_root() . 'app.json');
		$app_def = json_decode( $app_def_json );


		// @TODO loop over models here to do this.

		// Load models from $app_def->models array of keys.
		foreach ($app_def->models as $model_key) {
			$model_json = file_get_contents( Plugin::app_path_root() . 'models/'.$model_key.'.json');
			$app_def->{$model_key} = json_decode( $model_json );
			$app_def->{$model_key}->relations = array(); // Set empty relations array to be populated in next processing step.
		}

		// Init relations.
		$app_def = $this->relationsInit($app_def);

		// Render JSON app_def.
		echo '<script>var appDef = ' . json_encode( $app_def ) . '</script>';

	}

	public function relationsInit( $app_def ) {

		foreach ($app_def->models as $model_key) {
			$model_json = file_get_contents( Plugin::app_path_root() . 'models/'.$model_key.'.json');
			$model = json_decode( $model_json );
			if( $model->type === 'relation' ) {

				// Get definition for each side of the relation.
				$relation_left  = $model->relations->left;
				$relation_right = $model->relations->right;

				// Add to left model using definition of right model.
				$app_def->{$model->relations->left->model}->relations[] = $relation_right;

				// Add to right model using definition of left model.
				$app_def->{$model->relations->right->model}->relations[] = $relation_left;

			}

		}

		return $app_def;

	}

}
