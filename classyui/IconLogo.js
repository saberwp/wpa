class IconLogo extends ComponentBase {

	svgMarkup = false
	svgURL = false

	constructor() {
		super()
		this.elType = 'a'
		this.addChild('Svg') // Nest an SVG element in property this.icon.
	}

	build() {
		if(this.svgMarkup) {
			this.children[0].svgMarkup = this.svgMarkup
		}
		if(this.svgURL) {
			this.children[0].svgURL = this.svgURL
		}
		this.children[0].make()
		this.make()
		this.el.href = 'https://saberwp.com'
	}

	setSvgMarkup(svgMarkup) {
		this.svgMarkup = svgMarkup
	}

	setSvgURL(svgURL) {
		this.svgURL = svgURL
	}

}
