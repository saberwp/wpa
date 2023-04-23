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
		const id = e.target.getAttribute('object-id')
		const record = app.record(id)
		const idField = document.getElementById('field-id')
		idField.value = id

		// Update form field title.
		const titleField = document.getElementById('field-title')
		titleField.value = record.title

		// Update form fields.
		appDef[app.data.currentModel].fields.forEach(( field ) => {
			const el = document.getElementById('field-'+field.key)
			el.value = record[field.key]
		})
	}


	update(record) {

		console.log('Edit.update')
		console.log(record)

		// Local store.
		app.recordReplace(record)
		app.data[app.data.currentModel].index = app.recordIndex(app.data[app.data.currentModel].record)

		// Send API request.
		fetch(app.apiUrl+'app/'+app.data.currentModel+'/'+record.id, {
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
		})
		.catch((error) => {
			console.error(error);
		});

	}


}
