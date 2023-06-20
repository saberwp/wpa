class IconLogo extends ComponentBase {

	svgMarkup = false
	svgURL = false
	linkURL = '#'
	fillClass = 'fill-white/50'

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
		if(this.fillClass !== 'fill-white/50') {
			icon.removeDefaultClass('fill-white/50')
			icon.addClass(this.fillClass)
		}
		this.make()
		this.el.href = this.linkURL
	}

	setSvgMarkup(svgMarkup) {
		this.svgMarkup = svgMarkup
	}

	setSvgURL(svgURL) {
		this.svgURL = svgURL
	}

	setLinkURL(linkURL) {
		this.linkURL = linkURL
	}

	setFillClass(fillClass) {
		this.fillClass = fillClass
	}

}
