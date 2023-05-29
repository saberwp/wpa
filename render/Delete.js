class Delete {

	init() {

		// Bind the class instance to the click handler function
		this.handleDeleteClick = this.handleDeleteClick.bind(this);

		// Retrieve all elements with the class 'edit-button'
    const buttons = document.querySelectorAll('.delete-button');

    // Add a click event listener to each element
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', this.handleDeleteClick);
    }

	}

	delete(id) {

		// Local store.
		app.recordDeleteFromObject(id)
		app.recordDeleteFromArray(id)

		// Send API request.
		fetch(app.apiUrl+app.def.key+'/'+app.data.currentModel+'/'+id, {
				method: "DELETE",
				body: '{}',
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

			// Do table refresh.
			app.table.refresh()

			// Close modal.
			app.modal.close()

		})
		.catch((error) => {
			console.error(error);
		});

	}

	handleDeleteClick(e) {

		const id = e.target.getAttribute('object-id')
		const record = app.record(id)

		// Open modal to confirm.
		app.modal.setHeaderLabel('Delete Confirm')
		const el = document.createElement('button')
		el.id = 'delete-confirm-button'
		el.setAttribute('object-id',id)
		el.classList.add('clickable')
		el.innerHTML = 'Confirm?'
		app.modal.setContent(el)
		app.modal.open()

		// Init click event on confirm.
		this.handleConfirmClick = this.handleConfirmClick.bind(this);
		const confirmButton = document.getElementById('delete-confirm-button')
		confirmButton.addEventListener('click', this.handleConfirmClick);

	}

	handleConfirmClick(e) {
		const id = e.target.getAttribute('object-id')

		const record = app.record(id)

		// Do delete from data store.
		this.delete(id)

	}


}
