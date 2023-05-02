class ScreenDocs {

	render() {
		const body = document.getElementById('app-body')
		body.innerHTML = ''
		body.appendChild(this.heading())
	}

	heading() {
		const el = document.createElement('h2')
		el.innerHTML = '<h1>Docs</h1>'
		return el
	}

}
