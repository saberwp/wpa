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
		const formContent = app.form.make(appDef[app.data.currentModel])
		modal.setHeaderLabel('Edit '+appDef[app.data.currentModel].title)
		modal.setContent(formContent)
		modal.open()

		const id = e.target.getAttribute('object-id')
		const record = app.record(id)
		const idField = document.getElementById('field-id')
		idField.value = id

		// Update form field title if current model supports title field.
		if(appDef[app.data.currentModel].title_field) {
			const titleField = document.getElementById('field-title')
			titleField.value = record.title
		}

		// Update form fields.
		appDef[app.data.currentModel].fields.forEach(( field ) => {
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
		app.recordReplace(record)
		app.data[app.data.currentModel].index = app.recordIndex(app.data[app.data.currentModel].record)

		// Send API request.
		fetch(app.apiUrl+appDef.key+'/'+app.data.currentModel+'/'+record.id, {
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
			console.log("EDIT COMPLETE")
			console.log(responseJson);

			// Do list refresh.
			app.list.refresh()
		})
		.catch((error) => {
			console.error(error);
		});

	}


}
