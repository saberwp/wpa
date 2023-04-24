<?php

// Load app main def.
global $wp_query;
$app_dir_name = $wp_query->query_vars['name'];
$app_main_json = \file_get_contents(WP_CONTENT_DIR . '/wpa/' . $GLOBALS['wpa_app_dir_name'] . '/app.json');
$app_main_def = json_decode( $app_main_json );

require_once(WPA_PATH.'inc/App.php');
$app = new \WPA\App();
$app->init($GLOBALS['wpa_app_dir_name']);

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>App</title>
    <link rel="stylesheet" href="<?php echo WPA_URL; ?>styles/app.css">
		<script src="<?php echo WPA_URL; ?>render/DataManager.js"></script>
		<script src="<?php echo WPA_URL; ?>render/fields/TextArea.js"></script>
		<script src="<?php echo WPA_URL; ?>render/fields/Select.js"></script>
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
    <!-- page content -->
  </body>
</html>

<script>
const app = new App()
</script>
