class Sidebar extends ComponentBase {

	el = null
	id = null
	content = ''
	classes = []

	constructor() {
		super()
		this.elType = 'section'
		this.defaultClasses = ['p-4', 'mr-0.125', 'basis-60']
	}

	get() {
		return this.el
	}

	markup() {
		return this.el.outerHTML
	}

	setId(id) {
		this.id = id
	}

}
