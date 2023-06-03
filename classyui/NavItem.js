class NavItem extends ComponentBase {

	title = ''
	screen = ''

	constructor() {
		super()
		this.elType = 'li'
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

	defaultClasses() {
		return ['cursor-pointer', 'text-white/50', 'font-semibold', 'p-0', 'm-0']
	}

}
