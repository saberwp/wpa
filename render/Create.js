/* Create record process handler. */
class Create {

	init() {

		// Bind the class instance to the click handler function
		this.handleCreateClick = this.handleCreateClick.bind(this);

		const createButton = document.getElementById('create-button')
		createButton.addEventListener('click', this.handleCreateClick);

	}

	handleCreateClick(e) {
		const modal = new Modal()
		const formContent = app.form.make(app.def[app.data.currentModel])
		modal.setHeaderLabel('Create '+app.def[app.data.currentModel].title)
		modal.setContent(formContent)

		// Attach form submit handler.
		app.form.submit(formContent)

		modal.open()

		// Run field init to enable fields to attach events.
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

			console.log('responseJson at line 61 Create.js')
			console.log(responseJson)

			const recordId = responseJson.model_id

			const event = new CustomEvent('wpa_record_created', {
				detail: {
					model_key:responseJson.model_key,
					record_id:responseJson.insert_id
				}
			})
			document.dispatchEvent(event)

			record.id = recordId
			app.data[model.key].record.unshift(record)
			app.data[model.key].index = app.recordIndex( app.data[model.key].record )

			// Do table refresh.
			app.table.refresh()

			// Close modal.
			app.modal.close()

		})
		.catch((error) => {
			console.error(error);
		});
	}

	button() {
		const el = document.createElement('button')
		el.id = 'create-button'
		let content = ''
		content += '<span>Create</span>'
		content += '<svg class="w-5" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M240 64c0-8.8-7.2-16-16-16s-16 7.2-16 16V240H32c-8.8 0-16 7.2-16 16s7.2 16 16 16H208V448c0 8.8 7.2 16 16 16s16-7.2 16-16V272H416c8.8 0 16-7.2 16-16s-7.2-16-16-16H240V64z"/></svg>'
		el.innerHTML = content
		el.classList.add('clickable', 'flex', 'gap-4', 'items-center')
		el.classList.add('bg-white/20', 'my-2', 'py-2', 'px-6', 'shadow-sm', 'text-white', 'mb-6')
		el.classList.add('hover:bg-white/30')

		return el
	}

	buttonIcon() {

	}

}
