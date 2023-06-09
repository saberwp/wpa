class IconButton {

	el = null
	id = null
	text = ''
	icon = ''
	content = ''

	make() {
		let el = document.createElement('button')
		if(this.id) {
			el.id = this.id
		}
		el.classList.add('bg-red-500', 'rounded-md', 'px-4', 'py-2', 'hover:bg-red-600', 'text-white')
		this.content += '<div class="flex gap-2 items-center">'
		this.content += this.icon
		this.content += '<span class="leading-none">'
		this.content += this.text
		this.content += '</span>'
		this.content += '</div>'
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

	setIcon() {
		this.icon = '<svg class="fill-white" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"/></svg>'
	}

	setText(text) {
		this.text = text
	}

}
