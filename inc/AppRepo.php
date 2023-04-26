<?php

namespace WPA;

class AppRepo {

	public function download() {

		$github_owner = 'saberwp';
		$repo_name = 'wpa-sleep';
		$app_name = 'wpa_sleep';

		// Fetch the repo data.
		$repo_data = $this->fetch_repo();



		// Download a ZIP archive of the repository
		$repo_url = $repo_data['html_url'];
		$zip_url = $repo_url . '/archive/main.zip';

var_dump( $zip_url );
// die();

		$zip_data = file_get_contents($zip_url);

	var_dump( $zip_data ); die();

		// Save the ZIP archive to a temporary file
		$tmp_file = tempnam(sys_get_temp_dir(), 'wpa');
		file_put_contents($tmp_file, $zip_data);

		// Extract the contents of the ZIP archive to the desired folder
		$zip = new \ZipArchive;
		if ($zip->open($tmp_file) === true) {
		  $zip->extractTo('/wp-content/wpa/'.$app_name);
		  $zip->close();
		}


	}

	public function fetch_repo() {

		// Set the repository name
		$repo = 'wpa-sleep';

		// Set the GitHub API endpoint and repository information
		$api_url = "https://api.github.com/repos/saberwp/'.$repo.'/releases/latest";

		// Set the HTTP headers for the request
		$headers = [
	    'User-Agent: saberwp',
		];

		// Initialize a new cURL session
		$ch = curl_init();

		// Set the cURL options
		curl_setopt($ch, CURLOPT_URL, $api_url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

		// Execute the cURL request
		$data = curl_exec($ch);

		// Check if there was an error
		if(curl_errno($ch)) {
	    echo 'Error: ' . curl_error($ch);
			die();
		}

		// Close the cURL session
		curl_close($ch);

		// Decode the JSON data
		$repo_data = json_decode($data, true);

		return $repo_data;


	}


}
