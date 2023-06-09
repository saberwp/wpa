class AppShellSidebar extends ComponentBase {

	constructor() {
		super()
		this.elType = 'main'
		this.defaultClasses = ['hidden', 'sm:flex', 'sm:flex-col', 'h-screen', 'basis-60', 'flex-shrink-0']
	}

	build() {
		this.make()
	}

}
