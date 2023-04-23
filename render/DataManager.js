class DataManager {

	fetch(modelKey) {

		const apiUrl = app.apiUrl + 'app/' + modelKey

		fetch(apiUrl, { headers: {
        'API-KEY': 'KR928NV81G01'
    	}
		})
			.then(response => response.json())
			.then(data => {

				app.setModelRecordStore(data.model_key, data.records)

				// Dispatch custom event "app_data_loaded".
			  const event = new Event('app_data_loaded')
			  document.dispatchEvent(event)

			})
			.catch(error => console.error(error));
	}

	dataTemp() {

		return [
			{
				id: 1,
				title: "Firstly",
				size: "Big"
			},
			{
				id: 2,
				title: "Second",
				size: "Medium"
			},
			{
				id: 3,
				title: "Third",
				size: "Medium"
			}
		]

	}

}
