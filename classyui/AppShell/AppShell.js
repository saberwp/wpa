class AppShell extends ComponentBase {

	constructor() {
		super()
		this.elType = 'main'
		this.defaultClasses = ['flex', 'flex-col', 'h-screen']
	}

	build() {
		this.make()
	}

}
