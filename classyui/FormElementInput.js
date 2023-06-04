class FormElementInput extends ComponentBase {

	placeholder = ''

	constructor() {
		super()
		this.elType = 'input'
		this.defaultClasses = ['p-2', 'font-semibold', 'rounded-md', 'bg-gray-200']
	}

	build() {
		this.make()
		this.el.placeholder = this.placeholder
	}

	setPlaceholder(placeholder) {
		this.placeholder = placeholder
	}

}
