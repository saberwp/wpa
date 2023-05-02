class ScreenModel {

	render(screenKey) {

		console.log(screenKey)

		// Set current model data.
		app.data.currentModel = screenKey

		// Data load.
		app.dataLoad()

		const body = document.getElementById('app-body')
		body.innerHTML = ''
		body.appendChild(app.screenTitle())
		body.appendChild(app.create.button())
		body.appendChild(app.form.make())

		// List make.
		body.appendChild(app.list.make())

		// Save form submit init.
		app.form.submit()

		// Delay making list until after custom event "app_data_loaded".
		document.addEventListener('app_data_loaded', () => {
			// List init.
			app.list.refresh();

			// Create init.
			app.create.init();
		});

	}

	single() {

		console.log('calling single screen model...')

	}

}
