/* Create record process handler. */
class Create {

	init() {
		this.handleCreateClick = this.handleCreateClick.bind(this);
		const createButton = document.getElementById('create-button')
		createButton.removeEventListener('click', this.handleCreateClick);
		createButton.addEventListener('click', this.handleCreateClick);
	}

	handleCreateClick(e) {
		const modal = new Modal()
		const formContent = app.form.make(app.def[app.data.currentModel])
		modal.setHeaderLabel('Create '+app.def[app.data.currentModel].title)
		modal.setContent(formContent)
		modal.open()
		app.form.init(app.def[app.data.currentModel])
	}

	recordModel(model, record) {
		this.request(model, record)
	}

	// Send API request.
	request(model, record) {

		// Add user to record.
		record['author_user_id'] = app.userId;

		fetch(app.apiUrl+app.def.key+'/'+model.key, {
				method: "POST",
				body: JSON.stringify(record),
				headers: {
				"Content-Type": "application/json",
				"API-KEY": "KR928NV81G01"
			},
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then((responseJson) => {

			console.log(responseJson)

			if(!responseJson.success) {
				console.error('Insert failed.')
				return;
			}

			const recordId = responseJson.insert_id

			const event = new CustomEvent('wpa_record_created', {
				detail: {
					model_key:responseJson.model_key,
					record_id:responseJson.insert_id
				}
			})
			document.dispatchEvent(event)
			const modelDef = app.def[app.data.currentModel]
			record.id = recordId
			if(modelDef.type === 'standard') {
				this.doStandardModelAfterEdit(modelDef, record)
			}

			if(modelDef.type === 'settings') {
				this.doSettingsModelAfterEdit(recordId)
			}


		})
		.catch((error) => {
			console.error(error);
		});
	}

	doStandardModelAfterEdit(modelDef, record) {

		// Local record store updates.
		app.data[modelDef.key].record.unshift(record)
		app.data[modelDef.key].index = app.dm.recordIndex( app.data[modelDef.key].record )

		// Show alert.
		const alert = new Alert()
		alert.bg = 'bg-green-800'
		alert.setMessage('Record Created Successfully', 'Record ID '+record.id+' was created.')
		alert.build()
		alert.render()

		// Refresh table or list and close modal.
		// @todo refactor to call the current view.
		app.table.refresh()
		app.modal.close()
	}

	doSettingsModelAfterEdit() {

	}

}
