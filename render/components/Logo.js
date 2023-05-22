class Logo {
	render() {
		const el = document.createElement('div')
		el.classList.add('wpa-logo')

		// Loaded into app.def by PHP AppLoader.
		if(app.def.logo) {
			let contents = '<a href="">'
			contents += app.def.logo
			el.innerHTML = contents
		}

		return el
	}
}
