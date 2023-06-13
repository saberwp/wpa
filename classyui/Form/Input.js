class Input extends ComponentBase {

	id = ''
	name = ''
	placeholder = ''

	constructor() {
		super()
		this.elType = 'input'
		this.setId(this.id)
	}

	build() {
		this.make()
		this.el.type = 'text'
		this.el.placeholder = this.placeholder
		this.el.name = this.name
	}

	setId(id) {
		this.id = id
		this.name = id
	}

	setPlaceholder(placeholder) {
		this.placeholder = placeholder
	}

}
