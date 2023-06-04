class Span extends ComponentBase {

	text = ''

	constructor() {
		super()
		this.elType = 'span'
	}

	build() {
		this.make()
		this.el.innerHTML = this.text
	}

	setText(text) {
		this.text = text
	}

}
