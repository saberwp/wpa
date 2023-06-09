class ComponentBase {

	el = null
	elType = 'div'
	id = null
	classes = []
	children = []
	classMap = {
	  Svg,
	  Anchor,
		Avatar,
		NavH,
		IconLogo,
		Span,
		FormSelectOption,
		Flex,
		AppShellSidebar,
		NavDropdown,
		DividerH,
		FormSelect,
		FormElementInput,
		FormButton
	}
	defaultClasses = []
	classes = []
	loaded = false

	constructor() {

	}

	make() {

		this.el = document.createElement(this.elType)
		const classList = this.defaultClasses.concat(this.classes);
		this.el.classList.add(...classList)
		if(this.id) {
			this.el.id = this.id
		}

		this.children.forEach((childComponent) => {
			childComponent.build()
		  this.el.appendChild(childComponent.get());
		})

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
		const childComponent = new this.classMap[componentName]()
		this.children.push(childComponent)
		return childComponent
	}

	addClass(className) {
		this.classes.push(className)
	}

	removeDefaultClass(className) {
	  this.defaultClasses = this.defaultClasses.filter((cls) => cls !== className);
	}

	// Components must override.
	build() {
		this.make()
	}

}
