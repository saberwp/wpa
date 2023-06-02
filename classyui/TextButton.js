class TextButton {

	el = null
	id = null
	content = ''

	make() {
		let el = document.createElement('button')
		if(this.id) {
			el.id = this.id
		}
		el.classList.add('bg-red-500', 'rounded-md', 'px-4', 'py-2', 'hover:bg-red-600', 'text-white')
		el.innerHTML += this.content
		this.el = el
	}


	get() {
		return this.el
	}

	markup() {
		return this.el.outerHTML
	}

	setId(id) {
		this.id = id
	}

	setContent(text) {
		this.content = text
	}

}
