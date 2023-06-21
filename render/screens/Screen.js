class Screen {

	renderSingle(screenKey, recordId) {
		const route = new Route()
		route.setScreenHash(screenKey+'/'+recordId)
		const screen = new ScreenModel()
		screen.renderSingle(screenKey, recordId)
	}

	render(screenKey) {

		// Set current model data.
		app.data.screenKey = screenKey

		this.sendScreenChangeEvent()

		const route = new Route()
		route.setScreenHash(screenKey)

		// Dashboard handler.
		if(screenKey === 'dashboard') {
			let screen = new ScreenDashboard()
			screen.render(screenKey)
			this.sendScreenChangeCompleteEvent()
			return
		}

		// Docs handler.
		if(screenKey === 'docs') {
			let screen = new ScreenDocs()
			screen.render(screenKey)
			this.sendScreenChangeCompleteEvent()
			return
		}

		// Settings handler.
		if(screenKey === 'settings') {
			let screen = new ScreenSettings(screenKey)
			screen.render()
			this.sendScreenChangeCompleteEvent()
			return
		}

		// Account handler.
		if(screenKey === 'account') {
			let screen = new ScreenAccount(screenKey)
			screen.render()
			this.sendScreenChangeCompleteEvent()
			return
		}

		// Model handler.
		let screen = new ScreenModel()
		screen.render(screenKey)
		this.sendScreenChangeCompleteEvent()

	}

	sendScreenChangeEvent() {
		// Send event wpa_app_def_loaded.
		const event = new CustomEvent('wpa_screen_change')
		document.dispatchEvent(event)
	}

	sendScreenChangeCompleteEvent() {
		// Send event wpa_app_def_loaded.
		const event = new CustomEvent('wpa_screen_change_complete')
		document.dispatchEvent(event)
	}

}
