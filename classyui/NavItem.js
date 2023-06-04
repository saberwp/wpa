class NavItem extends ComponentBase {

	title = ''
	screen = ''

	constructor() {
		super()
		this.elType = 'li'
		this.defaultClasses = ['cursor-pointer', 'text-white/50', 'hover:text-white/30', 'font-semibold', 'p-0', 'm-0']
	}

	build() {
		this.make()
		this.el.innerHTML = this.title
		this.el.setAttribute('screen', this.screen)
		this.el.classList.add('wpa-app-menu-item')
	}

	setTitle(title) {
		this.title = title
	}

	setScreen(screen) {
		this.screen = screen
	}

}
