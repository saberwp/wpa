class Footer {

	render() {
		const el = document.createElement('footer')
		el.id = 'app-footer'
		el.classList.add('flex')
		el.classList.add('text-white')
		const logo = new Logo()
		el.appendChild( logo.render() ) // Add nested logo el.
		return el
	}

}
