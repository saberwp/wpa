class NavH extends ComponentBase {

	data = []

	constructor() {
		super()
		this.elType = 'ul'
	}

	build() {
		this.data.forEach((navItemData) => {
			const c = new NavItem()
			c.setTitle(navItemData.title)
			c.setScreen(navItemData.screen)
			c.build()
			this.children.push(c)
		})
		this.make()
	}

	defaultClasses() {
		return ['flex', 'flex-col', 'gap-0']
	}

	setData(data) {
		this.data = data
	}

}
