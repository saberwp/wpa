class FormButton extends ComponentBase {

	label = 'SAVE'

	constructor() {
		super()
		this.defaultClasses = ['text-gray-500', 'rounded-md', 'px-4', 'py-2', 'bg-gray-200', 'hover:bg-gray-300', 'leading-none']
		this.elType = 'button'
	}

	build() {
		this.make()
		this.el.innerHTML = this.label
	}

	setLabel(label) {
		this.label = label
	}

}
