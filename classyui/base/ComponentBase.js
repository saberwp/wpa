class ComponentBase {

	el = null
	elType = 'div'
	id = null
	classes = []
	children = []
	classMap = {
		Div,
	  Svg,
	  Anchor,
		Avatar,
		NavH,
		IconLogo,
		IconButton,
		Span,
		FormSelectOption,
		Flex,
		AppShellSidebar,
		AppShellHeader,
		AppShellFooter,
		NavDropdown,
		DividerH,
		FormSelect,
		FormElementInput,
		FormButton,
		InputID,
		SaveButton,
		TextButton,
		SaveForm,
		Input,
		TimePicker
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
			const childEl = childComponent.get()
			if(childEl) {
				this.el.appendChild(childComponent.get())
			}

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

	// Set entire class array.
	setClasses(classes) {
		this.classes = classes
	}

	removeDefaultClass(className) {
	  this.defaultClasses = this.defaultClasses.filter((cls) => cls !== className);
	}

	// Components must override.
	build() {
		this.make()
	}

}
