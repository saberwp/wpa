class Edit {

	init() {

		// Bind the class instance to the click handler function
		this.handleEditClick = this.handleEditClick.bind(this);

		// Retrieve all elements with the class 'edit-button'
    const editButtons = document.querySelectorAll('.edit-button');

    // Add a click event listener to each element
    for (let i = 0; i < editButtons.length; i++) {
      editButtons[i].addEventListener('click', this.handleEditClick);
    }

	}

	handleEditClick(e) {

		const modal = new Modal()
		const formContent = app.form.make(app.def[app.data.currentModel])
		modal.setHeaderLabel('Edit '+app.def[app.data.currentModel].title)
		modal.setContent(formContent)
		modal.open()

		const id = e.target.getAttribute('object-id')
		const record = app.dm.record(id)
		const idField = document.getElementById('field-id')
		idField.value = id

		// Update form field title if current model supports title field.
		if(app.def[app.data.currentModel].title_field !== false) {
			const titleField = document.getElementById('field-title')
			titleField.value = record.title
		}

		// Update form fields.
		app.def[app.data.currentModel].fields.forEach(( field ) => {
			const el = document.getElementById('field-'+field.key)
			el.value = record[field.key]
		})

		// Set current record data.
		app.data.currentRecordId = id

		// Attach form submit handler.
		app.form.submit(formContent)

	}


	update(record) {

		// Local store.
		app.dm.recordReplace(record)
		app.data[app.data.currentModel].index = app.dm.recordIndex(app.data[app.data.currentModel].record)

		// Send API request.
		fetch(app.apiUrl+app.def.key+'/'+app.data.currentModel+'/'+record.id, {
				method: "PUT",
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

			const recordId = responseJson.model_id

			// Show alert.
			const alert = new Alert()
			alert.bg = 'bg-green-800'
			alert.setMessage('Record Edited Successfully', 'Changes to record ID '+recordId+' were saved.')
			alert.build()
			alert.render()

			if(app.data.currentModel.type === 'standard') {
				this.doStandardModelAfterEdit()
			}

			if(app.data.currentModel.type === 'settings') {
				this.doSettingsModelAfterEdit()
			}

		})
		.catch((error) => {
			console.error(error);
		});

	}

	doStandardModelAfterEdit() {
		app.table.refresh()
		app.modal.close()
	}

	doSettingsModelAfterEdit() {
		console.log('settings model after edit...')
	}

}
