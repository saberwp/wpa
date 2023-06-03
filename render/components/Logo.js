class Logo {

	iconWidth = 'w-20'

	render() {
		const el = document.createElement('a')
		el.href = 'http://wpappsgamify.local/exercise#dashboard'
		el.classList.add('wpa-logo', 'w-20', 'block')

		// Loaded into app.def by PHP AppLoader.
		if(app.def.logo) {
			const parser = new DOMParser();
			const svgDocument = parser.parseFromString(app.def.logo, 'image/svg+xml');
			const svgElement = svgDocument.documentElement;
			svgElement.classList.add(this.iconWidth)
			el.appendChild(svgElement)
		}

		return el
	}

	setIconWidth(wClass) {
		this.iconWidth = wClass
	}

}
