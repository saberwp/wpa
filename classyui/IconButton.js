class IconButton extends ComponentBase {

	text = ''
	icon = ''

	constructor() {
		super()
		this.elType = 'button'
		this.defaultClasses = ['bg-gray-600', 'rounded-md', 'px-4', 'py-2', 'hover:bg-gray-800', 'text-white']
	}

	build() {
		const flex = this.addChild('Flex')
		const icon = flex.addChild('Svg')
		icon.setSvgMarkup(this.icon)
		const span = flex.addChild('Span')
		span.setText(this.text)
		this.make()
	}

	setIcon(markup) {
		this.icon = markup
	}

	setText(text) {
		this.text = text
	}

}
