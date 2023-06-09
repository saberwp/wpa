class ScreenModel extends ScreenController {

	constructor(screenKey) {
		super(screenKey)
	}

	render(screenKey) {

		this.appShell()

		// Set current model data.
		app.data.currentModel = screenKey

		// Data load.
		app.dm.fetch(screenKey)

		// Do settings model render if model.type is settings.
		const modelDef = app.def[app.data.currentModel]
		if(modelDef.type === 'settings') {
			this.settingsModelRender()
			return; // Return before any rendering and before the event hook into app_loaded_data.
		}

		const body = document.getElementById('app-body-content')

		// Add create button.
		const createButton = new TextButton()
		createButton.setId('create-button')
		createButton.setContent('Create New')
		createButton.build()
		body.appendChild(createButton.get())

		// Table make.
		app.table = new CollectionTable('list-table', app.data.currentModel)
		const tableElement = app.table.make()
		body.appendChild(tableElement)

		app.create.init()

		// Delay making list until after custom event "app_data_loaded".
		document.addEventListener('app_data_loaded', (event) => {

			if(event.detail.modelKey === app.data.currentModel) {
				app.table.refresh()
			}

		});

	}

	renderSingle(screenKey, recordId) {

		app.data.currentModel = screenKey
		app.dm.fetch(screenKey)

		const body = document.getElementById('app-body')
		body.innerHTML = ''
		body.appendChild(app.create.button())
		body.appendChild(app.list.make())

		document.addEventListener('app_data_loaded', (e) => {

			if(e.detail.modelKey !== screenKey) { return }

			// List init.
			app.list.refresh();

			// Create init.
			app.create.init();

			// Get single row from data store.
			const record = app.data[screenKey].index[recordId]

			app.modal.setHeaderLabel('Task ' + record.id)
			const singleContent = document.createElement('div')
			singleContent.innerHTML = 'TASK ' + record.id + ' content'
			app.modal.setContent(singleContent)
			app.modal.open()


		});



	}

	settingsModelRender() {

		// Make form.
		const formContent = app.form.make(app.def[app.data.currentModel])

		// Attach form submit handler.
		app.form.submit(formContent)

		const body = document.getElementById('app-body')
		body.innerHTML = ''
		body.appendChild(formContent)

		// Run field init to enable fields to attach events.
		app.form.init(app.def[app.data.currentModel])

	}

}
