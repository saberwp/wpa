class IconNavItem extends ComponentBase {

	title = ''
	screen = ''
	icon = ''

	constructor() {
		super()
		this.elType = 'li'
		this.defaultClasses = ['cursor-pointer', 'flex', 'items-center', 'gap-2', 'text-white/50', 'hover:text-white/30', 'font-semibold', 'p-0', 'm-0']
	}

	build() {
		const icon = this.addChild('Svg')
		icon.setSvgURL(this.icon)

		const text = this.addChild('Span')
		text.setText(this.title)
		this.addClass('leading-none')

		this.make()
		this.el.setAttribute('screen', this.screen)
		this.el.classList.add('wpa-app-menu-item')
	}

	setTitle(title) {
		this.title = title
	}

	setScreen(screen) {
		this.screen = screen
	}

	setIcon(icon) {
		this.icon = icon
	}

}
