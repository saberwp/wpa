class InputID extends ComponentBase {

	constructor() {
		super()
		this.elType = 'input'
		this.setId('field-id')
	}

	build() {
		this.make()
		this.el.name = 'field-id'
		this.el.type = 'hidden'
		this.el.value = 0
	}
}
