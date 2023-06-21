class ScreenAccount extends ScreenController {

	constructor(screenKey) {
		super(screenKey)
	}

	render() {

		this.appShell()

		// Set current model data.
		app.data.currentModel = this.screenKey

	}

}
