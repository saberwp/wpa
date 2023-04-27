<?php

// @TODO store token in property.
// @TODO find alternative to token auth.

namespace WPA;

class AppRepo {

	public function download($available_app) {
		$resp = new \stdClass;
		$repo_data = $this->fetch_repo($available_app);
		$resp->repo_data = $repo_data;
		if( ! $repo_data || ! is_array( $repo_data ) ) {
			// @TODO error handling.
			$resp->success = false;
			$resp->message = 'Could not fetch repo data.';
			return $resp;
		}
		$zip_url          = $repo_data['zipball_url'];
		$zip_fetch_result = $this->fetch_zip($zip_url, $available_app->key);
		$resp->success = true;
		$resp->message = 'Reached end of download process.';
		return $resp;
	}

	public function fetch_repo($available_app) {
		$api_url = $this->github_api_url($available_app->repo_url);
		echo $api_url . "\n\n";
		$headers = [
	    'User-Agent: saberwp',
			'Authorization: token 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',
		];
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $api_url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
		$data = curl_exec($ch);
		if(curl_errno($ch)) {
	    echo 'Error: ' . curl_error($ch);
			die();
		}
		curl_close($ch);
		$repo_data = json_decode($data, true);
		return $repo_data;
	}

	private function github_api_url( $repo_url ) {
    $matches = array();
    preg_match( '/github.com\/([^\/]+)\/([^\/\s]+)/', $repo_url, $matches );
    if ( count( $matches ) > 2 ) {
      $user = $matches[1];
      $repo = $matches[2];
      return "https://api.github.com/repos/{$user}/{$repo}/releases/latest";
    } else {
      return false;
    }
	}



	public function fetch_zip($zip_url, $app_key) {
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL, $zip_url);
		curl_setopt($ch, CURLOPT_USERAGENT, 'saberwp');
		curl_setopt($ch, CURLOPT_HTTPHEADER, array('Authorization: token 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'));
		curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
		$result = curl_exec($ch);

		$zip_path = \WP_CONTENT_DIR . '/wpa/' . $app_key . '.zip';
		$file_handle = fopen($zip_path, 'w');
		fwrite($file_handle, $result);
		fclose($file_handle);

		if(!$result) {
	    // @TODO error handling.
		}
		curl_close($ch);
		$this->unzip($zip_path, $app_key);
		$this->unpack(\WP_CONTENT_DIR . '/wpa/' . $app_key);
	}

	public function unzip($zip_path, $app_key) {
		$zip = new \ZipArchive;
		$zip_open_result = $zip->open($zip_path);
		if($zip_open_result === true) {
			$dest_dir = \WP_CONTENT_DIR . '/wpa/' . $app_key;
			if ($zip->extractTo($dest_dir) !== true) {
		    // @TODO error handling.
			}
		  $zip->close();
			if (file_exists($zip_path)) {
	    	unlink($zip_path);
			}
		} else {
			// @TODO error handling.
		}
	}

	public function unpack($dir) {
	  $child_dir_path = glob($dir . '/*', GLOB_ONLYDIR);
	  if (count($child_dir_path) === 1) {
      $child_dir_path = $child_dir_path[0];
      foreach (glob($child_dir_path . '/*') as $file) {
        $new_path = $dir . '/' . basename($file);
        rename($file, $new_path);
      }
      rmdir($child_dir_path);
	  }
	}

}
