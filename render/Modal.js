class Modal {

	open() {

		const el = document.createElement('div')
		el.classList = 'modal'
		el.appendChild(this.container())
		document.body.appendChild(el)

		// Init close handling.
		this.close = this.close.bind(this)
		const closeButton = document.getElementById('modal-close-button')
		closeButton.addEventListener('click', this.close);

	}

	container() {
		const el = document.createElement('div')
		el.classList = 'modal-container'
		el.appendChild(this.header())
		el.appendChild(this.content())
		return el
	}

	makeCloseButton() {
		const el = document.createElement('button')
		el.id = 'modal-close-button'
		el.classList.add('clickable')
		el.innerHTML = 'CLOSE'
		return el
	}

	close() {
		const el = document.querySelector('.modal')
		el.removeEventListener('click', this.close)
		el.remove()
	}

	header() {
		const el = document.createElement('header')
		el.classList.add('modal-header')
		el.classList.add('flex')
		el.appendChild(this.makeHeaderLabel())
		el.appendChild(this.makeCloseButton())
		return el
	}

	makeHeaderLabel() {
		const el = document.createElement('h2')
		el.innerHTML = this.headerLabel
		return el
	}

	content() {
		const el = document.createElement('main')
		el.appendChild(this.contents)
		return el
	}

	setHeaderLabel(value) {
		this.headerLabel = value
	}

	setContent(element) {
		this.contents = element
	}

}
