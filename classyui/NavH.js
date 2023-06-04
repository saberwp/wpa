class NavH extends ComponentBase {

	data = []
	itemType = 'text'

	constructor() {
		super()
		this.elType = 'ul'
		this.defaultClasses = ['flex', 'flex-col', 'gap-0']
	}

	build() {
		this.data.forEach((navItemData) => {
			let c = null
			if(this.itemType === 'icon') {
				c = new IconNavItem()
				c.setIcon(navItemData.icon)
			} else {
				c = new NavItem()
			}

			c.setTitle(navItemData.title)
			c.setScreen(navItemData.screen)

			c.build()
			this.children.push(c)
		})
		this.make()
	}

	setItemType(itemType) {
		this.itemType = itemType
	}

	setData(data) {
		this.data = data
	}

}
