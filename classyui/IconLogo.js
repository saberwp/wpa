class IconLogo extends ComponentBase {

	svgMarkup = false
	svgURL = false

	constructor() {
		super()
		this.elType = 'a'
	}

	build() {
		const icon = this.addChild('Svg') // Nest an SVG element in property this.icon.
		if(this.svgMarkup) {
			icon.svgMarkup = this.svgMarkup
		}
		if(this.svgURL) {
			icon.svgURL = this.svgURL
		}
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
