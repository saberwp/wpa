class Sidebar {

	el = null
	id = null
	content = ''
	classes = []

	constructor() {
		this.make()
	}

	make() {
		this.el = document.createElement('section')
		this.el.classList.add(...this.defaultClasses())
		if(this.id) {
			el.id = this.id
		}
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

	setContent(contentEl) {
		this.el.appendChild(contentEl)
	}

	defaultClasses() {
		return ['py-2', 'px-4', 'mr-0.125', 'basis-60']
	}

}
