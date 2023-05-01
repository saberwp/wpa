<?php

// Load app main def.
global $wp_query;
$app_dir_name = $wp_query->query_vars['name'];
$app_main_json = \file_get_contents(WP_CONTENT_DIR . '/wpa/' . $GLOBALS['wpa_app_dir_name'] . '/app.json');
$app_main_def = json_decode( $app_main_json );

require_once(WPA_PATH.'inc/App.php');
$app = new \WPA\App();
$app->init($GLOBALS['wpa_app_dir_name']);
if( $app->brand_styles ) {
	$app->brand_styles_render();
}

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>App</title>

		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="<?php echo WPA_URL; ?>styles/app.css">

		<?php
			// Render base URL for the API.
			$rest_url = rest_url();
			$api_url = $rest_url . 'wp/v2/';


			echo '<script>';
			echo 'var WPA_ApiUrl = "' . $api_url . '"';
			echo '</script>';
		?>
		<?php $app->render_app_def_script(); ?>
		<script src="<?php echo WPA_URL; ?>render/DataManager.js"></script>
		<script src="<?php echo WPA_URL; ?>render/fields/TextArea.js"></script>
		<script src="<?php echo WPA_URL; ?>render/fields/Select.js"></script>
		<script src="<?php echo WPA_URL; ?>render/fields/RelationSelectMultiple.js"></script>
		<script src="<?php echo WPA_URL; ?>render/Form.js"></script>
		<script src="<?php echo WPA_URL; ?>render/Edit.js"></script>
		<script src="<?php echo WPA_URL; ?>render/Create.js"></script>
		<script src="<?php echo WPA_URL; ?>render/Delete.js"></script>
		<script src="<?php echo WPA_URL; ?>render/List.js"></script>
		<script src="<?php echo WPA_URL; ?>render/Modal.js"></script>
    <script src="<?php echo WPA_URL; ?>render/Menu.js"></script>
		<script src="<?php echo WPA_URL; ?>render/App.js"></script>
  </head>
  <body>
		<script>
			const app = new App()

			// Add appDef to app object.
			// @TODO improve this by fetching the appDef by request?
			app.def = appDef
		</script>
  </body>
</html>
