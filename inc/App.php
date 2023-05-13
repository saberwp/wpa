<?php

namespace WPA;

class App {

	public $def          = false;
	public $dir_name     = false;
	public $path_root    = false;
	public $brand_styles = false;

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

		// Load models from $app_def->models array of keys.
		foreach ($app_def->models as $model_key) {
			$model_json = file_get_contents( $this->path_root() . 'models/'.$model_key.'.json');
			$app_def->{$model_key} = json_decode( $model_json );
		}

		// Init relations.
		$app_def = $this->relationsInit($app_def);

		// Add brand to app def.
		$app_def = $this->brandDefinition($app_def);

		// Stash app def into property.
		$this->def = $app_def;

	}

	public function render_app_def_script() {
		echo '<script>var appDef = ' . json_encode( $this->def ) . '</script>';
	}

	public function brandDefinition($app_def) {
		if( ! file_exists( $this->path_root() . 'brand.json' ) ) { return $app_def; }

		// Add def.
		$brand_json = file_get_contents( $this->path_root() . 'brand.json');
		$app_def->brand = json_decode( $brand_json );

		// Flag that there are brand styles for this app.
		$this->brand_styles = true;

		return $app_def;
	}

	public function brand_styles_render() {

		$brand_json = file_get_contents( $this->path_root() . 'brand.json');
		$brand = json_decode( $brand_json );

		echo "\n";
		echo "\n";
		echo '<style>';
		foreach ($brand as $key => $value) {

			echo "\n";

			if( $key === 'app_container_background') {
				$class_name = '.' . str_replace('_', '-', $key);
		    echo $class_name . ' {' . "\n";
				echo "\t" . 'background-color: ' . $value . ';';
				echo "\n" . '}' . "\n";
			}

			if( $key === 'primary_color') {
				$class_name = '--' . str_replace('_', '-', $key);
				echo ':root {' . "\n";
				echo "\t" . $class_name . ': ' . $value . ';';
				echo "\n" . '}' . "\n";
			}

		}
		echo '</style>';

	}

	public function relationsInit( $app_def ) {

		foreach ($app_def->models as $model_key) {

			$model_json = file_get_contents( $this->path_root() . 'models/'.$model_key.'.json');
			$model = json_decode( $model_json );

			if( $model->type === 'relation' ) {

				// Get def for each side of the relation.
				$relation_left  = $model->relations->left;
				$relation_right = $model->relations->right;

				// Add to left model using def of right model.
				$app_def->{$model->relations->left->model}->relations = [];
				$app_def->{$model->relations->left->model}->relations[] = $relation_right;

				// Add to right model using def of left model.
				$app_def->{$model->relations->right->model}->relations = [];
				$app_def->{$model->relations->right->model}->relations[] = $relation_left;

			}
		}
		return $app_def;
	}
}
