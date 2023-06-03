class ComponentBase {

	el = null
	elType = 'div'
	id = null
	classes = []
	children = []
	classMap = {
	  Svg,
	  Anchor,
	  // Add more class mappings as needed
	}
	loaded = false

	constructor() {

	}

	make() {

		this.el = document.createElement(this.elType)
		this.el.classList.add(...this.defaultClasses())
		if(this.id) {
			this.el.id = this.id
		}

		this.children.forEach((childComponent) => {
		  this.el.appendChild(childComponent.get());
		});

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

	addChild(componentName) {
		this.children.push(new this.classMap[componentName]())
	}

	defaultClasses() {
		return []
	}

}
