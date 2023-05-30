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
			const screen = new ScreenDashboard()
			screen.render(screenKey)
			return
		}

		// Docs handler.
		if(screenKey === 'docs') {
			const screen = new ScreenDocs()
			screen.render(screenKey)
			return
		}

		// Model handler.
		const screen = new ScreenModel()
		screen.render(screenKey)

	}

	sendScreenChangeEvent() {
		// Send event wpa_app_def_loaded.
		const event = new CustomEvent('wpa_screen_change')
		document.dispatchEvent(event)
	}

}
