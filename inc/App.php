<?php

namespace WPA;

class App {

	public $dir_name  = false;
	public $path_root = false;

	public function dir_name() {
		return $this->dir_name;
	}

	public function path_root() {
		return $this->path_root;
	}

	public function init( $dir_name ) {

		// Set class properties from $dir_name string passed (e.g. "budget").
		$this->dir_name  = $dir_name;
		$this->path_root = WP_CONTENT_DIR . '/wpa/'.$this->dir_name.'/';

		// Load app def.
		$app_def_json = file_get_contents( $this->path_root() . 'app.json');
		$app_def = json_decode( $app_def_json );


		// @TODO loop over models here to do this.

		// Load models from $app_def->models array of keys.
		foreach ($app_def->models as $model_key) {
			$model_json = file_get_contents( $this->path_root() . 'models/'.$model_key.'.json');
			$app_def->{$model_key} = json_decode( $model_json );
		}

		// Init relations.
		$app_def = $this->relationsInit($app_def);

		// Render JSON app_def.
		echo '<script>var appDef = ' . json_encode( $app_def ) . '</script>';

	}

	public function relationsInit( $app_def ) {

		foreach ($app_def->models as $model_key) {

			$model_json = file_get_contents( $this->path_root() . 'models/'.$model_key.'.json');
			$model = json_decode( $model_json );
			if( $model->type === 'relation' ) {

				// Get definition for each side of the relation.
				$relation_left  = $model->relations->left;
				$relation_right = $model->relations->right;

				// Add to left model using definition of right model.
				$app_def->{$model->relations->left->model}->relations = [];
				$app_def->{$model->relations->left->model}->relations[] = $relation_right;

				// Add to right model using definition of left model.
				$app_def->{$model->relations->right->model}->relations = [];
				$app_def->{$model->relations->right->model}->relations[] = $relation_left;

			}

		}

		return $app_def;

	}

}
