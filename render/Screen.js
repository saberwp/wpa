class Screen {

	render(screenKey) {

		const route = new Route()
		route.setScreenHash(screenKey)

		console.log(screenKey)

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
