class FormSelectOption extends ComponentBase {

	label = 'Option'

	constructor() {
		super()
		this.elType = 'option'
	}

	build() {
		this.make()
		this.el.innerHTML = this.label
	}

	setLabel(label) {
		this.label = label
	}

}
