class Screen {

	renderSingle(screenKey, recordId) {
		const route = new Route()
		route.setScreenHash(screenKey+'/'+recordId)
		const screen = new ScreenModel()
		screen.renderSingle(screenKey, recordId)
	}

	render(screenKey) {

		this.sendScreenChangeEvent()

		const route = new Route()
		route.setScreenHash(screenKey)

		// Dashboard handler.
		if(screenKey === 'dashboard') {
			let screen = new ScreenDashboard()
			screen.render(screenKey)
			return
		}

		// Docs handler.
		if(screenKey === 'docs') {
			let screen = new ScreenDocs()
			screen.render(screenKey)
			return
		}

		// Settings handler.
		if(screenKey === 'settings') {
			let screen = new ScreenSettings()
			screen.render()
			return
		}

		// Model handler.
		let screen = new ScreenModel()
		screen.render(screenKey)

	}

	sendScreenChangeEvent() {
		// Send event wpa_app_def_loaded.
		const event = new CustomEvent('wpa_screen_change')
		document.dispatchEvent(event)
	}

}
