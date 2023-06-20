class TextButton extends ComponentBase {

	content = ''

	constructor() {
		super()
		this.elType = 'button'
		this.defaultClasses = ['bg-gray-700', 'rounded-md', 'px-4', 'py-2', 'hover:bg-gray-900', 'text-white', 'max-w-sm']
	}

	build() {
		this.make()
		if(this.id) {
			this.el.id = this.id
		}
		if(this.content) {
			this.el.innerHTML = this.content
		}
	}

	setContent(text) {
		this.content = text
	}

}
