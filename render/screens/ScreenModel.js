class ScreenModel {

	render(screenKey) {

		console.log(screenKey)

		// Set current model data.
		app.data.currentModel = screenKey

		// Data load.
		app.dm.fetch(screenKey)

		const body = document.getElementById('app-body')
		body.innerHTML = ''
		body.appendChild(app.shell.screenTitle())
		body.appendChild(app.create.button())


		// List make.
		body.appendChild(app.list.make())

		// Save form submit init.
		// body.appendChild(app.form.make())
		// app.form.submit()

		// Delay making list until after custom event "app_data_loaded".
		document.addEventListener('app_data_loaded', () => {
			// List init.
			app.list.refresh();

			// Create init.
			app.create.init();
		});

	}

	renderSingle(screenKey, recordId) {

		app.data.currentModel = screenKey
		app.dm.fetch(screenKey)

		const body = document.getElementById('app-body')
		body.innerHTML = ''
		body.appendChild(app.shell.screenTitle())
		body.appendChild(app.create.button())
		body.appendChild(app.list.make())

		document.addEventListener('app_data_loaded', (e) => {

			if(e.detail.modelKey !== screenKey) { return }

			console.log('doing app_data_loaded callback at 51....')

			// List init.
			app.list.refresh();

			// Create init.
			app.create.init();

			// Get single row from data store.
			const record = app.data[screenKey].index[recordId]
			console.log(screenKey)
			console.log(recordId)
			console.log(record)

			app.modal.setHeaderLabel('Task ' + record.id)
			const singleContent = document.createElement('div')
			singleContent.innerHTML = 'TASK ' + record.id + ' content'
			app.modal.setContent(singleContent)
			app.modal.open()


		});



	}

}
