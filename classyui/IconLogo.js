class IconLogo extends ComponentBase {

	svgMarkup = false
	svgURL = false

	constructor() {
		super()
		this.elType = 'a'
		this.addChild('icon', 'Svg') // Nest an SVG element in property this.icon.
	}

	build() {
		if(this.svgMarkup) {
			this.children.icon.svgMarkup = this.svgMarkup
		}
		if(this.svgURL) {
			this.children.icon.svgURL = this.svgURL
		}
		this.children.icon.make()
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
