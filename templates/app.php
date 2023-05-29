<?php

// Load app main def.
global $wp_query;
$app_dir_name = $wp_query->query_vars['name'];
$app_main_json = \file_get_contents(WP_CONTENT_DIR . '/wpa/' . $GLOBALS['wpa_app_dir_name'] . '/app.json');
$app_main_def = json_decode( $app_main_json );

// App loading main.
require_once(WPA_PATH.'inc/App.php');
$app = new \WPA\App();
$storage_path = wpa_app_storage_path_by_type('wpa');
$app->set_storage_path($storage_path);
$app->set_app_key($app_main_def->key);
$app->init();

if( $app->brand_styles ) {
	$app->brand_styles_render();
}

?>

<?php ?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>App</title>

		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
		<link rel="stylesheet" href="<?php echo WPA_URL; ?>dist/output.css">
    <link rel="stylesheet" href="<?php echo WPA_URL; ?>styles/app.css">
		<link rel="stylesheet" href="<?php echo WPA_URL; ?>styles/date-time-picker-component.min.css">

		<?php

			// Render base URL for the API.
			$rest_url = rest_url();
			$api_url = $rest_url . 'wp/v2/';

			echo '<script>';
			echo 'var WPA_ApiUrl = "' . $api_url . '"';
			echo '</script>';

			// Render current WP user ID.
			$rest_url = rest_url();
			$api_url = $rest_url . 'wp/v2/';

			echo '<script>';
			echo 'var WPA_CurrentUserID = "' . get_current_user_id() . '"';
			echo '</script>';

		?>
		<?php $app->render_app_def_script(); ?>
		<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

		<!-- Standard WP header part. -->
		<meta charset="<?php bloginfo( 'charset' ); ?>" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<?php wp_head(); ?>

  </head>

  <body>
		<div id="wpa-app" app-key="<?php echo $app->def->key; ?>"></div>
		<?php wp_footer(); ?>
	</body>
</html>
