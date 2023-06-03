class Footer {

	render() {
		const el = document.createElement('footer')
		el.id = 'app-footer'
		el.classList.add('flex', 'text-white', 'py-2')
		const logo = new Logo()
		logo.setIconWidth('w-10')
		el.appendChild( logo.render() ) // Add nested logo el.
		return el
	}

}
