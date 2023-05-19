<?php

/*
 * Plugin Name: WPA (WordPress Application Framework)
 * Version: 1.0.7
 */

namespace WPA;

define( 'WPA_PATH', plugin_dir_path( __FILE__ ) . '/' );
define( 'WPA_URL', plugin_dir_url( __FILE__ ) );

class Plugin {

	public function __construct() {

		// Admin enqueue scripts.
		add_action( 'admin_enqueue_scripts', [$this, 'admin_scripts'] );

		// Require functional API.
		require_once(WPA_PATH.'inc/functions.php');

		// Init app manager.
		require_once(WPA_PATH.'inc/Model.php');
		require_once(WPA_PATH.'inc/DatabaseManager.php');
		require_once(WPA_PATH.'inc/App.php');
		require_once(WPA_PATH.'inc/AppManager.php');
		$am = new AppManager();
		$am->init();

		// App Repo include
		require_once(WPA_PATH.'inc/AppRepo.php');

		// Admin init.
		require_once(WPA_PATH.'inc/Admin.php');
		$api = new \WPA\Admin();
		$api->init();

		add_action( 'init', function() {

			if ( wp_doing_ajax() || wp_doing_cron() ) {
	        return;
	    }

	    if ( false !== strpos( $_SERVER['REQUEST_URI'], '/wp-json/' ) ) {
	        return;
	    }

		});


		/*****

		API Init.

		*********/
		require_once(WPA_PATH.'inc/Api.php');
		$api = new Api();
		$api->init();

		// Routes init.
		require_once(WPA_PATH.'inc/Router.php');
		$r = new \WPA\Router();
		$r->init();

	}

	// Plugin activation callback.
	public static function activate() {

		$plugin = new Plugin;

		require_once(WPA_PATH.'inc/Activate.php');

		// Check if WPA content directory exists, create if not already existing.
		$local_storage_path = WP_CONTENT_DIR . '/wpa';
		if( ! is_dir($local_storage_path) ) {
			$make_dir_result = mkdir($local_storage_path, 0755);
			if( ! $make_dir_result ) {
				error_log('WPA could not create the main local storage folder at /wp-content/wpa/.');
			}
		}

		// Install Tasker as a sample app.
		$app_manager = new \WPA\AppManager;
		$app_manager->activate('wpa_tasker');

	}

	public function deactivate() {


	}

	public function update() {



	}

	public function installed_apps() {

		// Find apps loaded.
		$wp_content_dir = WP_CONTENT_DIR;
		$wpa_dir = $wp_content_dir . '/wpa';

		$app_keys = array_filter( scandir( $wpa_dir ), function( $item ) use ( $wpa_dir ) {
			return is_dir( $wpa_dir . '/' . $item ) && ! in_array( $item, array( '.', '..' ) );
		});

		return $app_keys;

	}

	public function admin_scripts($hook_suffix) {
		global $pagenow;

		if ($pagenow === 'admin.php' && isset($_GET['page']) && $_GET['page'] === 'wpa-keys') {
	    wp_enqueue_script('wpa-form-validator', WPA_URL . 'render/modules/form/FormValidator.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-field-validator', WPA_URL . 'render/modules/form/fields/FieldValidator.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-required-field', WPA_URL . 'render/modules/form/validators/required/RequiredField.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-date-time-picker', WPA_URL . 'js/date-time-picker-component.min.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-logo', WPA_URL . 'render/components/Logo.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-footer', WPA_URL . 'render/components/Footer.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-default-app-shell', WPA_URL . 'render/views/app-shells/DefaultAppShell.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-route', WPA_URL . 'render/Route.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-screen', WPA_URL . 'render/Screen.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-collection-sorting', WPA_URL . 'render/views/collection/CollectionSorting.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-collection-table', WPA_URL . 'render/views/collection/CollectionTable.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-data-manager', WPA_URL . 'render/DataManager.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-text-area', WPA_URL . 'render/fields/TextArea.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-select', WPA_URL . 'render/fields/Select.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-relation-select-multiple', WPA_URL . 'render/fields/RelationSelectMultiple.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-screen-dashboard', WPA_URL . 'render/screens/ScreenDashboard.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-screen-model', WPA_URL . 'render/screens/ScreenModel.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-screen-docs', WPA_URL . 'render/screens/ScreenDocs.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-form', WPA_URL . 'render/Form.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-edit', WPA_URL . 'render/Edit.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-create', WPA_URL . 'render/Create.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-delete', WPA_URL . 'render/Delete.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-list', WPA_URL . 'render/List.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-modal', WPA_URL . 'render/Modal.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-menu', WPA_URL . 'render/Menu.js', array(), '1.0', true);
	    wp_enqueue_script('wpa-app', WPA_URL . 'render/App.js', array(), '1.0', true);
    }

		if ($pagenow === 'admin.php' && isset($_GET['page']) && $_GET['page'] === 'wpa') {

			wp_enqueue_script( 'wpa-admin', WPA_URL.'js/admin.js', array(), '1.0.0', true );
			wp_enqueue_style( 'wpa-admin-tailwind', WPA_URL.'/dist/output.css', array(), '1.0.0', 'all' );
			wp_enqueue_style( 'wpa-admin', WPA_URL.'/styles/admin.css', array(), '1.0.0', 'all' );
		}



	}

}

new Plugin();

// Register activation hook.
register_activation_hook( __FILE__, array( '\WPA\Plugin', 'activate' ) );
