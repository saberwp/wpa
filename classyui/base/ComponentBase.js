class ComponentBase {

	el = null
	elType = 'div'
	id = null
	classes = []
	children = {}
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
			el.id = this.id
		}

		Object.values(this.children).forEach((childComponent) => {
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

	addChild(propertyName, componentName) {
		this.children[propertyName] = new this.classMap[componentName]()
	}

	defaultClasses() {
		return ['py-2', 'px-4', 'mr-0.125', 'basis-60']
	}



}
