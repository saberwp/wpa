class ScreenSettings extends ScreenController {

	constructor(screenKey) {
		super(screenKey)
	}

	render() {

		this.appShell()

		// Set current model data.
		app.data.currentModel = this.screenKey

		// Fetch settings by user.
		app.dm.fetchSettingsByUser(app.data.currentModel)

		// Callback for data loaded.
		this.dataLoadedCallback()

	}

	dataLoadedCallback() {
		document.addEventListener('app_user_settings_loaded', (event) => {

			console.log('dataLoadedCallback/app_user_settings_loaded')

			if(event.detail.modelKey === app.data.currentModel) {

				console.log('yes at 32')

				// Isolate record data.
				const record = event.detail.record

				console.log(event.detail)

				if(!record) { return }

				// Update form ID field.
				const idField = document.getElementById('field-id')
				idField.value = record.id

				// Update form fields.
				app.def[app.data.currentModel].fields.forEach(( field ) => {

					console.log('test field key:')
					console.log(record[field.key])

					// Avoid loading undefined record data which may occur after new fields set in definition.
					// @todo create a better check that accounts for empty and other defined data that should skip render.
					if(record[field.key] === 'undefined') {
						const el = document.getElementById('field-'+field.key)
						el.value = record[field.key]
					}

				})

			}

		});
	}

}
