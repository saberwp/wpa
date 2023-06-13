class SaveButton extends ComponentBase {

	constructor() {
		super()
		this.elType = 'button'
		this.setId('save-button')
	}

	build() {
		this.make()
		this.el.innerHTML = 'SAVE'
	}

}
