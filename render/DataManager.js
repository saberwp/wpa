class DataManager {

	fetch(modelKey) {

		const apiUrl = app.apiUrl+appDef.key+'/'+modelKey

		fetch(apiUrl, { headers: {
        'API-KEY': 'KR928NV81G01'
    	}
		})
			.then(response => response.json())
			.then(data => {

				app.setModelRecordStore(data.model_key, data.records)

				// Dispatch custom event "app_data_loaded".
			  const event = new CustomEvent('app_data_loaded', {
					detail: {
						modelKey: data.model_key,
						records: data.records
					}
				})
			  document.dispatchEvent(event)

			})
			.catch(error => console.error(error));
	}

}
