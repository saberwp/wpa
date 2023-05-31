<?php

namespace WPA;

class Admin {

	public function init() {

		add_action( 'admin_menu', function() {

			// Main page.
			add_menu_page(
	        'WPA',
	        'WPA',
	        'manage_options',
	        'wpa',
	        [$this, 'main_content'],
	        WPA_URL.'assets/wp-menu-icon.svg',
	        20
	    );

			add_submenu_page(
	      'wpa',                  // The slug of the parent menu item
	      'Dashboard',            // The title of the submenu item
	      'Dashboard',            // The menu title (shown in the admin menu)
	      'manage_options',       // The capability required to access the page
	      'wpa',        // The unique slug for the submenu item
	      [$this, 'main_content'],   // The callback function to render the page
		  );

			add_submenu_page(
	      'wpa',          // The slug of the parent page
	      'API Keys',     // The title of the submenu page
	      'API Keys',     // The menu title (shown in the admin menu)
	      'manage_options',// The capability required to access the page
	      'wpa-keys', // The unique slug for the submenu page
	      array( $this, 'keys_page' ) // The callback function to render the page
		  );

			add_submenu_page(
	      'wpa',          // The slug of the parent page
	      'Debug',     // The title of the submenu page
	      'Debug',     // The menu title (shown in the admin menu)
	      'manage_options',// The capability required to access the page
	      'wpa-debug', // The unique slug for the submenu page
	      array( $this, 'debug_page' ) // The callback function to render the page
		  );

		});

		// Admin enqueue scripts.
		add_action( 'admin_enqueue_scripts', [$this, 'admin_scripts'] );

	}

	public function main_content() {

		$am = new AppManager;
		$available_app_keys = wpa_get_available_app_keys();

		echo '<div id="wpa-admin-container" class="-ml-[20px] h-[calc(100vh-97px)] md:h-[calc(100vh-97px)] bg-gray-800 text-white">';

		echo $this->load_page_header('APP LIST');

		// Find apps installed, this includes custom apps created.
		$wp_content_dir = WP_CONTENT_DIR;
		$wpa_dir = $wp_content_dir . '/wpa';
		$apps_installed = array_filter( scandir( $wpa_dir ), function( $item ) use ( $wpa_dir ) {
		   return is_dir( $wpa_dir . '/' . $item ) && ! in_array( $item, array( '.', '..' ) );
		});

		// Merge all prebuilt available apps with current installed apps.
		$app_list_merged = array_merge($available_app_keys, $apps_installed);
		$app_list        = array_unique($app_list_merged);

		$app_defs_with_install_flag = [];
		foreach( $app_list as $app_key ) {

			// Check if installed, then load app def from install if it is.
			$installed = wpa_app_installed($app_key);

			if($installed) {
				$app_def = wpa_load_app_def($app_key);
			} else {
				$app_def = wpa_load_app_def_available($app_key);
			}

			$app_def->installed = $installed;
			$app_def->site_url  = site_url($app_def->location->path);
			$app_defs_with_install_flag[] = $app_def;

		}

		echo '</div>';

		echo '<script>';
		echo 'var wpaAppDefsWithInstallFlag = ';
		echo json_encode($app_defs_with_install_flag);
		echo '</script>';

	}

	private function load_page_header($page_title) {
		ob_start();
		require_once(WPA_PATH.'templates/components/wpa-admin-header.php');
		$admin_header_template = ob_get_contents();
		ob_end_clean();
		$admin_header_template_populated = str_replace('{{page_title}}', $page_title, $admin_header_template);
		return $admin_header_template_populated;
	}

	public function keys_page() {

		$app = new App();
		$storage_path = wpa_app_storage_path_by_type('internal');
		$app->set_storage_path($storage_path);
		$app->set_app_key('wpa_api_keys');
		$app->init();

		echo '<div id="wpa-admin-container" class="-ml-[20px] h-[calc(100vh-97px)] md:h-[calc(100vh-97px)] bg-gray-800 text-white">';
		echo $this->load_page_header('API KEYS');
		echo '<div id="wpa-app" app-key="wpa_api_keys"></div>';
		echo '</div>';

		// Render base URL for the API.
		$rest_url = rest_url();
		$api_url = $rest_url . 'wp/v2/';
		echo '<script>';
		echo 'var WPA_ApiUrl = "' . $api_url . '"';
		echo '</script>';

	}

	public function debug_page() {

		$php_version_report = $this->test_php_version();
		$wpa_contents_directory_report = $this->test_wpa_contents_directory();

		echo '<div id="wpa-admin-container" class="-ml-[20px] h-[calc(100vh-97px)] md:h-[calc(100vh-97px)] bg-gray-800 text-white">';
		echo $this->load_page_header('DEBUG');
		echo '<section class="px-4 max-w-lg bg-gray-600 rounded mx-4">';
		echo '<table class="min-w-full divide-y divide-gray-700 bg-gray-600">';

		echo '<thead>';
		echo '<tr>';
		echo '<th class="py-3.5 px-3 text-left text-sm font-semibold text-white">';
		echo 'DEBUG TEST';
		echo '</th>';
		echo '<th class="py-3.5 px-3 text-left text-sm font-semibold text-white">';
		echo 'STATUS';
		echo '</th>';
		echo '</tr>';
		echo '</thead>';

		echo '<tbody class="divide-y divide-gray-800">';

		// Single test row.
		echo '<tr>';
		echo '<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">';
		echo 'PHP VERSION';
		echo '</td>';
		echo '<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">';
		echo $php_version_report->version;
		echo '</td>';
		echo '</tr>';

		// Single test row.
		echo '<tr>';
		echo '<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">';
		echo 'WPA CONTENT DIRECTORY';
		echo '</td>';
		echo '<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">';
		if($wpa_contents_directory_report->pass) {
			echo 'EXISTS/WRITEABLE';
		} else {
			echo 'FAILED TEST';
		}
		echo '</td>';
		echo '</tr>';

		$mysql_version_report = $this->test_mysql_version();
		// Single test row.
		echo '<tr>';
		echo '<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">';
		echo 'MYSQL VERSION';
		echo '</td>';
		echo '<td class="whitespace-nowrap px-3 py-4 text-sm text-gray-300">';
		echo $mysql_version_report->version;
		echo '</td>';
		echo '</tr>';

		echo '</tbody>';
		echo '</table>';
		echo '</section>';
		echo '</div>';



	}

	function test_php_version() {

		$result = new \stdClass;
		$result->version = phpversion();

		if (version_compare($result->version, '8.0.0', '>')) {
			$result->pass = true;
		} else {
			$result->pass = false;
		}
		return $result;

	}

	function test_wpa_contents_directory() {
		$result = new \stdClass;
		$dir_path = WP_CONTENT_DIR . '/wpa';
		$result->exists = false;
		if(is_dir($dir_path)) {
			$result->exists = true;
		}
		$result->writeable = false;
		if (is_writable($dir_path)) {
    	$result->writeable = true;
		}
		$result->pass = false;
		if($result->writeable && $result->exists) {
			$result->pass = true;
		}
		return $result;
	}

	function test_mysql_version() {
		$result = new \stdClass;
    global $wpdb;
    $result->version = $wpdb->get_var("SELECT VERSION()");
    $result->pass = false;
    if (version_compare($result->version, '5.6', '>')) {
      $result->pass = true;
    }
		return $result;
}


	public function admin_scripts($hook_suffix) {
		global $pagenow;

		if ($pagenow === 'admin.php' && isset($_GET['page']) && $_GET['page'] === 'wpa-keys') {
			wp_enqueue_script('wpa-form-validator', WPA_URL . 'render/modules/form/FormValidator.js', array(), '1.0', true);
			wp_enqueue_script('wpa-form-field', WPA_URL . 'render/modules/form/Field.js', array(), '1.0', true);
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
			wp_enqueue_script('wpa-module-fields-types-keygen', WPA_URL . 'modules/field/types/keygen/KeyGen.js', array(), '1.0', true);
			wp_enqueue_script('wpa-module-fields-types-date-time', WPA_URL . 'modules/field/types/date_time/DateTime.js', array(), '1.0', true);
			wp_enqueue_script('wpa-module-fields-types-text', WPA_URL . 'modules/field/types/text/TextField.js', array(), '1.0', true);
			wp_enqueue_script('wpa-module-fields-types-user-select', WPA_URL . 'modules/field/types/user_select/UserSelectField.js', array(), '1.0', true);
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

			// Stylesheets.
			wp_enqueue_style( 'wpa-font-inter', 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap', array(), '1.0.0', 'all' );
			wp_enqueue_style( 'wpa-admin-tailwind', WPA_URL.'/dist/output.css', array(), '1.0.0', 'all' );
			wp_enqueue_style( 'wpa-admin', WPA_URL.'/styles/admin.css', array(), '1.0.0', 'all' );
			wp_enqueue_style( 'wpa-app-styles', WPA_URL.'/styles/app.css', array(), '1.0.0', 'all' );
			wp_enqueue_style( 'wpa-app-admin-styles', WPA_URL.'/styles/app-admin.css', array(), '1.0.0', 'all' );
		}

		if ($pagenow === 'admin.php' && isset($_GET['page']) && $_GET['page'] === 'wpa') {
			wp_enqueue_script( 'wpa-admin', WPA_URL.'js/admin.js', array(), '1.0.0', true );
			wp_enqueue_style( 'wpa-admin-tailwind', WPA_URL.'/dist/output.css', array(), '1.0.0', 'all' );
			wp_enqueue_style( 'wpa-admin', WPA_URL.'/styles/admin.css', array(), '1.0.0', 'all' );
		}

		if ($pagenow === 'admin.php' && isset($_GET['page']) && $_GET['page'] === 'wpa-debug') {
			wp_enqueue_script( 'wpa-admin-debug', WPA_URL.'js/AdminDebug.js', array(), '1.0.0', true );
			wp_enqueue_style( 'wpa-admin-tailwind', WPA_URL.'/dist/output.css', array(), '1.0.0', 'all' );
			wp_enqueue_style( 'wpa-admin', WPA_URL.'/styles/admin.css', array(), '1.0.0', 'all' );
		}



	}

}
