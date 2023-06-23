class DataManager {

	dataInit() {

		app.data = {}
		app.def.models.forEach(( modelKey ) => {
			app.data[modelKey] = {
				record: [],
				index: {}
			}
		})

	}

	fetch(modelKey) {

		const apiUrl = `${app.apiUrl}${app.def.key}/${modelKey}?user_id=${app.user.ID}`;

		fetch(apiUrl, { headers: {
        'API-KEY': 'KR928NV81G01'
    	}
		})
			.then(response => response.json())
			.then(data => {

				app.dm.setModelRecordStore(data.model_key, data.records)

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

	fetchReportRange(modelKey, timestampField, startDate, endDate) {

		let apiUrl = `${app.apiUrl}${app.def.key}/${modelKey}?user_id=${app.user.ID}`;

    // Add timestamp field and date range to the URL if provided.
    if (timestampField && startDate && endDate) {
      apiUrl += `&timestampField=${timestampField}&startDate=${startDate}&endDate=${endDate}`;
    }

		fetch(apiUrl, { headers: {
        'API-KEY': 'KR928NV81G01'
    	}
		})
			.then(response => response.json())
			.then(data => {

				// Dispatch custom event "app_data_loaded_report".
			  const event = new CustomEvent('app_data_loaded_report', {
					detail: {
						modelKey: data.model_key,
						records: data.records
					}
				})
			  document.dispatchEvent(event)

			})
			.catch(error => console.error(error));
	}

	fetchRelation(recordModelKey, recordId, relation) {

		const relationModelKey = relation.model
		const apiUrl = app.apiUrl+app.def.key+'/'+relationModelKey+'/'+recordModelKey+'/'+recordId

		fetch(apiUrl, { headers: {
        'API-KEY': 'KR928NV81G01'
    	}
		})
			.then(response => response.json())
			.then(data => {

				// Dispatch custom event "app_data_loaded_relation".
			  const event = new CustomEvent('app_data_loaded_relation', {
					detail: {
						recordModelKey: recordModelKey,
						relationModelKey: relationModelKey,
						recordId: recordId,
						records: data.records
					}
				})
			  document.dispatchEvent(event)

			})
			.catch(error => console.error(error));
	}

	fetchSettingsByUser(modelKey) {

		const apiUrl = app.apiUrl+app.def.key+'/'+modelKey+'/user/'+app.userId

		fetch(apiUrl, { headers: {
        'API-KEY': 'KR928NV81G01'
    	}
		})
			.then(response => response.json())
			.then(data => {

				app.dm.setUserSettingsRecordStore(data.model_key, data.record)

				// Dispatch custom event "app_data_loaded".
			  const event = new CustomEvent('app_user_settings_loaded', {
					detail: {
						modelKey: data.model_key,
						record: data.record
					}
				})
			  document.dispatchEvent(event)

			})
			.catch(error => console.error(error));
	}

	// Automatically loads from current model data storage.
	record(id) {
		return app.data[app.data.currentModel].index[id]
	}

	recordIndex(records) {
	  const index = {};
	  for (let i = 0; i < records.length; i++) {
	    const record = records[i];
	    index[record.id] = record;
	  }
	  return index;
	}

	currentModelRecordStore() {
		return app.data[app.data.currentModel].record
	}

	setModelRecordStore(modelKey, records) {
		app.data[modelKey].record = records
		const index = this.recordIndex(app.data[modelKey].record)
		this.setModelIndexStore(modelKey, index)
	}

	setUserSettingsRecordStore(modelKey, record) {
		app.data[modelKey].record = record
	}

	setModelIndexStore(modelKey, index) {
		app.data[modelKey].index = index
	}

	currentModelIndexStore() {
		return app.data[app.data.currentModel].index
	}

	recordReplace(record) {

		const records = this.currentModelRecordStore();

    // Convert the id property to an integer
    record.id = parseInt(record.id, 10);

    // Find the object with a matching id and replace it with the updated object
    for (let i = 0; i < records.length; i++) {
      if ( parseInt(records[i].id) === record.id) {
        records[i] = record;
        return;
      }
    }

	}

	recordDeleteFromObject(id) {
		const index = this.currentModelIndexStore();
		if (index.hasOwnProperty(id)) {
			delete index[id];
		}
  }

	recordDeleteFromArray(id) {
		const records = this.currentModelRecordStore();
		for (let i = 0; i < records.length; i++) {
			if (parseInt(records[i].id) === parseInt(id, 10)) {
				records.splice(i, 1);
				return;
			}
		}
	}

}
