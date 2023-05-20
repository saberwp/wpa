class Modal {

	open() {

		const el = document.createElement('div')
		el.classList = 'modal'
		el.appendChild(this.container())
		document.body.appendChild(el)

		// Init close handling.
		this.close = this.close.bind(this)
		const closeButtons = document.querySelectorAll('.modal-close-button')
		closeButtons.forEach((closeButton) => {
			closeButton.addEventListener('click', this.close);
		})

	}

	container() {
		const el = document.createElement('div')
		el.classList.add('modal-container', 'fixed', 'inset-0', 'bg-gray-200', 'bg-opacity-90', 'transition-opacity')
		const wrap = document.createElement('div')
		wrap.classList.add('flex', 'min-h-full', 'items-end', 'justify-center', 'p-4', 'text-center', 'sm:items-center', 'sm:p-0');
		wrap.appendChild(this.modalMain())
		el.appendChild(wrap)
		return el
	}

	modalMain() {
		const el = document.createElement('main')
		el.classList.add('relative', 'transform', 'overflow-hidden', 'rounded-lg', 'bg-gray-400', 'px-4', 'pb-4', 'pt-5', 'text-left', 'shadow-xl', 'transition-all', 'sm:my-8', 'sm:w-full', 'sm:max-w-sm', 'sm:p-6');
		el.appendChild(this.header())
		el.appendChild(this.content())
		el.appendChild(this.buttons())
		return el
	}

	buttons() {
		const el = document.createElement('div')
		el.innerHTML = '<div class="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4"><button type="button" class="modal-close-button mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto">Cancel</button></div>'
		return el
	}

	makeCloseButton() {
		const el = document.createElement('button')
		el.classList.add('clickable', 'modal-close-button')
		el.innerHTML = 'CLOSE'
		return el
	}

	close() {
		console.log('close button click...')
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
