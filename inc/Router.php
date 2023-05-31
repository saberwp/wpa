<?php

namespace WPA;

class Router {


	public function init() {

		add_filter( 'template_include', [$this, 'routes'] );

	}


	// @TODO Add support for WP Admin routes.

	public function routes( $template ) {

		$plugin = new Plugin;
		$app_data  = $this->app_data();
		$app_paths = $app_data['app_paths'];

		global $wp_query;

		// Detect route in query vars.
		if ( isset( $wp_query->query_vars['name'] ) && in_array( $wp_query->query_vars['name'], $app_paths ) ) {

			add_action('wp_enqueue_scripts', [$this,'enqueue_scripts']);

			add_filter('show_admin_bar', function($show) {
		    return false;
			}, 99);

			remove_action('wp_head', '_admin_bar_bump_cb');


			// Set global to indicate the app key for the current app, because this is needed in the app template.
			$app_map = $app_data['app_map'];
			$GLOBALS['wpa_app_dir_name'] = $app_map->{$wp_query->query_vars['name']}['app_dir_name'];
			$GLOBALS['wpa_app_key'] = $app_map->{$wp_query->query_vars['name']}['app_key'];

			// Load template.
			$template = WPA_PATH.'templates/app.php';
			return $template;

		}

		return $template;
	}

	public function enqueue_scripts() {

		$this->deregister_registered_stylesheets();
		wp_enqueue_script('wpa-alert-message', WPA_URL . 'modules/alert/AlertMessage.js', array(), '1.0', true);
		wp_enqueue_script('wpa-alert', WPA_URL . 'modules/alert/Alert.js', array(), '1.0', true);
		wp_enqueue_script('wpa-form-validator', WPA_URL . 'modules/form/FormValidator.js', array(), '1.0', true);
		wp_enqueue_script('wpa-form-field', WPA_URL . 'modules/field/Field.js', array(), '1.0', true);
		wp_enqueue_script('wpa-field-validator', WPA_URL . 'modules/field/FieldValidator.js', array(), '1.0', true);
		wp_enqueue_script('wpa-required-field', WPA_URL . 'modules/field/validators/required/RequiredField.js', array(), '1.0', true);
		wp_enqueue_script('wpa-date-time-picker', WPA_URL . 'js/date-time-picker-component.min.js', array(), '1.0', true);
		wp_enqueue_script('wpa-logo', WPA_URL . 'render/components/Logo.js', array(), '1.0', true);
		wp_enqueue_script('wpa-footer', WPA_URL . 'render/components/Footer.js', array(), '1.0', true);
		wp_enqueue_script('wpa-default-app-shell', WPA_URL . 'render/views/app-shells/DefaultAppShell.js', array(), '1.0', true);
		wp_enqueue_script('wpa-route', WPA_URL . 'render/Route.js', array(), '1.0', true);
		wp_enqueue_script('wpa-screen', WPA_URL . 'render/Screen.js', array(), '1.0', true);
		wp_enqueue_script('wpa-collection-sorting', WPA_URL . 'render/views/collection/CollectionSorting.js', array(), '1.0', true);
		wp_enqueue_script('wpa-collection-table', WPA_URL . 'render/views/collection/CollectionTable.js', array(), '1.0', true);
		wp_enqueue_script('wpa-data-manager', WPA_URL . 'render/DataManager.js', array(), '1.0', true);
		wp_enqueue_script('wpa-text-area', WPA_URL . 'modules/field/types/textarea/TextareaField.js', array(), '1.0', true);
		wp_enqueue_script('wpa-select', WPA_URL . 'modules/field/types/select/SelectField.js', array(), '1.0', true);
		wp_enqueue_script('wpa-module-fields-types-keygen', WPA_URL . 'modules/field/types/keygen/KeygenField.js', array(), '1.0', true);
		wp_enqueue_script('wpa-module-fields-types-date-time', WPA_URL . 'modules/field/types/date_time/DateTime.js', array(), '1.0', true);
		wp_enqueue_script('wpa-module-fields-types-text', WPA_URL . 'modules/field/types/text/TextField.js', array(), '1.0', true);
		wp_enqueue_script('wpa-module-fields-types-user-select', WPA_URL . 'modules/field/types/user_select/UserSelectField.js', array(), '1.0', true);
		wp_enqueue_script('wpa-relation-select-multiple', WPA_URL . 'modules/field/types/relation_select/RelationSelectField.js', array(), '1.0', true);
		wp_enqueue_script('wpa-relation-select-multiple', WPA_URL . 'modules/field/types/relation_select_multiple/RelationSelectMultipleField.js', array(), '1.0', true);
		wp_enqueue_script('wpa-screen-dashboard', WPA_URL . 'render/screens/ScreenDashboard.js', array(), '1.0', true);
		wp_enqueue_script('wpa-screen-model', WPA_URL . 'render/screens/ScreenModel.js', array(), '1.0', true);
		wp_enqueue_script('wpa-screen-docs', WPA_URL . 'render/screens/ScreenDocs.js', array(), '1.0', true);
		wp_enqueue_script('wpa-report', WPA_URL . 'render/Report.js', array(), '1.0', true);
		wp_enqueue_script('wpa-form', WPA_URL . 'modules/form/Form.js', array(), '1.0', true);
		wp_enqueue_script('wpa-edit', WPA_URL . 'render/Edit.js', array(), '1.0', true);
		wp_enqueue_script('wpa-create', WPA_URL . 'render/Create.js', array(), '1.0', true);
		wp_enqueue_script('wpa-delete', WPA_URL . 'render/Delete.js', array(), '1.0', true);
		wp_enqueue_script('wpa-list', WPA_URL . 'render/List.js', array(), '1.0', true);
		wp_enqueue_script('wpa-modal', WPA_URL . 'render/Modal.js', array(), '1.0', true);
		wp_enqueue_script('wpa-menu', WPA_URL . 'render/Menu.js', array(), '1.0', true);

		wp_enqueue_script('wpa-app', WPA_URL . 'render/App.js', array(), '1.0', true);
	}

	public function deregister_registered_stylesheets() {
	    global $wp_styles;

	    // List of stylesheets to keep
	    $stylesheets_to_keep = array();

	    // Loop through all registered stylesheets
	    foreach ($wp_styles->registered as $handle => $style) {
	        // Check if the stylesheet is not in the list of stylesheets to keep
	        if (!in_array($handle, $stylesheets_to_keep)) {
	            // Deregister the stylesheet
	            wp_dequeue_style($handle);
	            wp_deregister_style($handle);
	        }
	    }
	}

	public function app_data() {

		// Find apps loaded.
		$wp_content_dir = WP_CONTENT_DIR;
		$wpa_dir = $wp_content_dir . '/wpa';

		// Get all app directories.
		$app_dirs = array_filter( scandir( $wpa_dir ), function( $item ) use ( $wpa_dir ) {
			return is_dir( $wpa_dir . '/' . $item ) && ! in_array( $item, array( '.', '..' ) );
		});

		$app_paths = [];
		$app_map   = new \stdClass;
		foreach( $app_dirs as $app_dir ) {

			// Load app def.
			$app_main_json = \file_get_contents(WP_CONTENT_DIR . '/wpa/' . $app_dir . '/app.json');
			$app_main_def  = json_decode( $app_main_json );

			// Store the app path in array.
			$app_paths[] = $app_main_def->location->path;

			// Map app path to app key and app dir.
			$app_path = $app_main_def->location->path;
			$app_map->{$app_path} = [
				'app_key'      => $app_main_def->key,
				'app_dir_name' => $app_dir
			];

		}

		// Assemble paths and map.
		$app_data = [
			'app_paths' => $app_paths,
			'app_map'   => $app_map
		];

		return $app_data;
	}
}
