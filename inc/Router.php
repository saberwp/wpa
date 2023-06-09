<?php

namespace WPA;

class Router {


	public function init() {

		add_filter( 'template_include', [$this, 'routes'] );

	}

	// Main routing handler.
	// @TODO Add support for WP Admin routes.
	public function routes( $template ) {

		// Do not serve apps to logged out users.
		if(!is_user_logged_in()) { return $template; }

		$plugin = new Plugin;
		$app_data  = $this->app_data();
		$app_paths = $app_data['app_paths'];

		global $wp_query;

		// Detect route in query vars.
		if ( $this->require_scripts($wp_query->query_vars['name'], $app_paths) ) {

			$app_selector_path_segment = $wp_query->query_vars['name'];
			if($app_selector_path_segment === '') {
				$app_selector_path_segment = '/';
			}

			add_action('wp_enqueue_scripts', [$this,'enqueue_scripts']);

			add_filter('show_admin_bar', function($show) {
		    return false;
			}, 99);

			remove_action('wp_head', '_admin_bar_bump_cb');

			// Set global to indicate the app key for the current app, because this is needed in the app template.
			$app_map = $app_data['app_map'];
			$GLOBALS['wpa_app_dir_name'] = $app_map->{$app_selector_path_segment}['app_dir_name'];
			$GLOBALS['wpa_app_key'] = $app_map->{$app_selector_path_segment}['app_key'];

			// Load template.
			$template = WPA_PATH.'templates/app.php';
			return $template;

		}

		return $template;
	}

	public function enqueue_scripts() {
		$this->deregister_registered_stylesheets();
		wp_enqueue_script('wpa-classyui-component-base', WPA_URL . 'classyui/base/ComponentBase.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-div', WPA_URL . 'classyui/Div.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-grid', WPA_URL . 'classyui/Grid.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-icon-svg', WPA_URL . 'classyui/Svg.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-icon-logo', WPA_URL . 'classyui/IconLogo.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-anchor', WPA_URL . 'classyui/Anchor.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-nav-h', WPA_URL . 'classyui/NavH.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-nav-item', WPA_URL . 'classyui/NavItem.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-icon-nav-item', WPA_URL . 'classyui/IconNavItem.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-span', WPA_URL . 'classyui/Span.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-avatar', WPA_URL . 'classyui/Avatar.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-divider-h', WPA_URL . 'classyui/DividerH.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-nav-dropdown', WPA_URL . 'classyui/NavDropdown.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-form-h', WPA_URL . 'classyui/Form/FormH.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-form-element-input', WPA_URL . 'classyui/Form/FormElementInput.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-form-button', WPA_URL . 'classyui/Form/FormButton.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-form-select', WPA_URL . 'classyui/Form/FormSelect.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-form-select-option', WPA_URL . 'classyui/Form/FormSelectOption.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-app-shell', WPA_URL . 'classyui/AppShell/AppShell.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-app-shell-sidebar', WPA_URL . 'classyui/AppShell/AppShellSidebar.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-app-shell-header', WPA_URL . 'classyui/AppShell/AppShellHeader.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-app-shell-footer', WPA_URL . 'classyui/AppShell/AppShellFooter.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-form-input-id', WPA_URL . 'classyui/Form/InputID.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-form-save-button', WPA_URL . 'classyui/Form/SaveButton.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-form-save-form', WPA_URL . 'classyui/Form/SaveForm.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-form-input', WPA_URL . 'classyui/Form/Input.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-text-button', WPA_URL . 'classyui/TextButton.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-icon-button', WPA_URL . 'classyui/IconButton.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-sidebar', WPA_URL . 'classyui/Sidebar.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-flex', WPA_URL . 'classyui/Flex.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-modal', WPA_URL . 'classyui/Modal.js', array(), '1.0', true);
		wp_enqueue_script('wpa-classyui-form-time-picker', WPA_URL . 'classyui/Form/TimePicker.js', array(), '1.0', true);
		wp_enqueue_script('wpa-alert-message', WPA_URL . 'render/alert/AlertMessage.js', array(), '1.0', true);
		wp_enqueue_script('wpa-alert', WPA_URL . 'render/alert/Alert.js', array(), '1.0', true);
		wp_enqueue_script('wpa-form-validator', WPA_URL . 'render/form/FormValidator.js', array(), '1.0', true);
		wp_enqueue_script('wpa-form-field', WPA_URL . 'render/field/Field.js', array(), '1.0', true);
		wp_enqueue_script('wpa-field-validator', WPA_URL . 'render/field/FieldValidator.js', array(), '1.0', true);
		wp_enqueue_script('wpa-required-field', WPA_URL . 'render/field/validators/required/RequiredField.js', array(), '1.0', true);
		wp_enqueue_script('wpa-date-time-picker', WPA_URL . 'js/date-time-picker-component.min.js', array(), '1.0', true);
		wp_enqueue_script('wpa-route', WPA_URL . 'render/Route.js', array(), '1.0', true);
		wp_enqueue_script('wpa-screen', WPA_URL . 'render/Screens/Screen.js', array(), '1.0', true);
		wp_enqueue_script('wpa-collection-table', WPA_URL . 'render/views/collection/CollectionTable.js', array(), '1.0', true);
		wp_enqueue_script('wpa-data-manager', WPA_URL . 'render/DataManager.js', array(), '1.0', true);
		wp_enqueue_script('wpa-text-area', WPA_URL . 'render/field/types/textarea/TextareaField.js', array(), '1.0', true);
		wp_enqueue_script('wpa-select', WPA_URL . 'render/field/types/select/SelectField.js', array(), '1.0', true);
		wp_enqueue_script('wpa-module-fields-types-keygen', WPA_URL . 'render/field/types/keygen/KeygenField.js', array(), '1.0', true);
		wp_enqueue_script('wpa-module-fields-types-date-time', WPA_URL . 'render/field/types/date_time/DateTime.js', array(), '1.0', true);
		wp_enqueue_script('wpa-module-fields-types-text', WPA_URL . 'render/field/types/text/TextField.js', array(), '1.0', true);
		wp_enqueue_script('wpa-module-fields-types-user-select', WPA_URL . 'render/field/types/user_select/UserSelectField.js', array(), '1.0', true);
		wp_enqueue_script('wpa-relation-select-multiple', WPA_URL . 'render/field/types/relation_select/RelationSelectField.js', array(), '1.0', true);
		wp_enqueue_script('wpa-relation-select-multiple', WPA_URL . 'render/field/types/relation_select_multiple/RelationSelectMultipleField.js', array(), '1.0', true);
		wp_enqueue_script('wpa-screen-controller', WPA_URL . 'render/screens/ScreenController.js', array(), '1.0', true);

		/* Dashboard Module */
		wp_enqueue_script('wpa-dashboard-widget', WPA_URL . 'render/dashboard/widgets/DashboardWidget.js', array(), '1.0', true);
		wp_enqueue_script('wpa-dashboard-section', WPA_URL . 'render/dashboard/sections/DashboardSection.js', array(), '1.0', true);
		wp_enqueue_script('wpa-dashboard-full-width-section', WPA_URL . 'render/dashboard/sections/FullWidthDashboardSection.js', array(), '1.0', true);
		wp_enqueue_script('wpa-dashboard-screen', WPA_URL . 'render/dashboard/DashboardScreen.js', array(), '1.0', true);

		wp_enqueue_script('wpa-screen-model', WPA_URL . 'render/screens/ScreenModel.js', array(), '1.0', true);
		wp_enqueue_script('wpa-screen-docs', WPA_URL . 'render/screens/ScreenDocs.js', array(), '1.0', true);
		wp_enqueue_script('wpa-screen-settings', WPA_URL . 'render/screens/ScreenSettings.js', array(), '1.0', true);
		wp_enqueue_script('wpa-screen-account', WPA_URL . 'render/screens/ScreenAccount.js', array(), '1.0', true);
		wp_enqueue_script('wpa-report', WPA_URL . 'render/Report.js', array(), '1.0', true);
		wp_enqueue_script('wpa-form', WPA_URL . 'render/form/Form.js', array(), '1.0', true);
		wp_enqueue_script('wpa-edit', WPA_URL . 'render/Edit.js', array(), '1.0', true);
		wp_enqueue_script('wpa-create', WPA_URL . 'render/Create.js', array(), '1.0', true);
		wp_enqueue_script('wpa-delete', WPA_URL . 'render/Delete.js', array(), '1.0', true);
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

	public function require_scripts($query_vars_name, $app_paths) {
		if( isset( $query_vars_name ) && $query_vars_name === '' && in_array( '/', $app_paths ) ) {
			return true;
		}
		if( isset( $query_vars_name ) && in_array( $query_vars_name, $app_paths ) ) {
			return true;
		}
		return false;
	}

}
