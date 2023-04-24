class Create {

	init() {

		// Bind the class instance to the click handler function
		this.handleCreateClick = this.handleCreateClick.bind(this);

		const createButton = document.getElementById('create-button')
		createButton.addEventListener('click', this.handleCreateClick);

	}

	handleCreateClick(e) {
		const idField = document.getElementById('field-id')
		idField.value = 0

		// Update form field title.
		const titleField = document.getElementById('field-title')
		titleField.value = ''

		// Update form fields.
		appDef[app.data.currentModel].fields.forEach(( field ) => {
			const el = document.getElementById('field-'+field.key)
			el.value = ''
		})

	}

	create(record) {

		// Update local data store.
		app.data[app.data.currentModel].record.unshift(record)
		app.data[app.data.currentModel].index = app.recordIndex( app.data[app.data.currentModel].record )

		// Send API request.
		fetch(app.apiUrl+appDef.key+'/'+app.data.currentModel, {
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
			console.log(responseJson);
		})
		.catch((error) => {
			console.error(error);
		});
	}

	button() {
		const el = document.createElement('button')
		el.id = 'create-button'
		el.innerHTML = '<span>Create</span><svg fill="#FFFFFF" width="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M240 64c0-8.8-7.2-16-16-16s-16 7.2-16 16V240H32c-8.8 0-16 7.2-16 16s7.2 16 16 16H208V448c0 8.8 7.2 16 16 16s16-7.2 16-16V272H416c8.8 0 16-7.2 16-16s-7.2-16-16-16H240V64z"/></svg>'
		el.classList.add('clickable')
		el.classList.add('flex')
		el.classList.add('gap-1')
		el.classList.add('items-center')
		return el
	}

	buttonIcon() {

	}

}
