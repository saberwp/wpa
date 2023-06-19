class Footer {

	render() {
		const el = document.createElement('footer')
		el.id = 'app-footer'
		el.classList.add('flex', 'text-white', 'py-2', 'gap-4', 'justify-center', 'items-center')

		// Footer Logo
		const iconLogo = new IconLogo
		iconLogo.setSvgMarkup(app.def.logo)
		iconLogo.build()
		el.appendChild(iconLogo.get())

		return el
	}

}
