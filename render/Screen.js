class Screen {

	renderSingle(screenKey, recordId) {
		const route = new Route()
		route.setScreenHash(screenKey+'/'+recordId)
		const screen = new ScreenModel()
		screen.renderSingle(screenKey, recordId)
	}

	render(screenKey) {

		console.log('rendering with screenkey')

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

}