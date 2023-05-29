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
		el.classList.add('modal-container', 'fixed', 'inset-0', 'bg-gray-700', 'bg-opacity-90', 'transition-opacity')
		const wrap = document.createElement('div')
		wrap.classList.add('flex', 'min-h-full', 'items-end', 'justify-center', 'p-4', 'text-center', 'sm:items-center', 'sm:p-0');
		wrap.appendChild(this.modalMain())
		el.appendChild(wrap)
		return el
	}

	modalMain() {
		const el = document.createElement('main')
		el.classList.add('relative', 'transform', 'rounded-lg', 'bg-gray-900', 'px-4', 'pb-4', 'pt-5', 'text-left', 'shadow-xl', 'transition-all', 'sm:my-8', 'sm:w-full', 'sm:max-w-md', 'sm:p-6');
		el.appendChild(this.header())
		el.appendChild(this.content())
		el.appendChild(this.buttons())
		return el
	}

	buttons() {
		const el = document.createElement('div')
		el.classList.add('w-full')
		el.innerHTML = '<div class="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4 justify-end"><button type="button" class="modal-close-button mt-3 inline-flex justify-center rounded-md bg-black/20 px-8 py-2 text-sm font-semibold text-white/20 shadow-sm hover:bg-black/10 sm:ml-3 sm:mt-0 sm:w-auto">Cancel</button></div>'
		return el
	}

	makeCloseButton() {
		const el = document.createElement('button')
		el.classList.add('clickable', 'modal-close-button')
		el.innerHTML = '<svg class="fill-white/20 hover:fill-white/50" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.8 3.6L24 2.4L21.6 0.00705872L20.4 1.20706L12 9.60706L3.6 1.2L2.4 0L0.00705885 2.4L1.20706 3.6L9.60706 12L1.2 20.4L0 21.6L2.4 23.9929L3.6 22.7929L12 14.3929L20.4 22.8L21.6 24L23.9929 21.6L22.7929 20.4L14.3929 12L22.8 3.6Z"/></svg>'
		return el
	}

	close() {
		const el = document.querySelector('.modal')
		el.removeEventListener('click', this.close)
		el.innerHTML = ''
		el.remove()
	}

	header() {
		const el = document.createElement('header')
		el.classList.add('modal-header')
		el.classList.add('flex', 'items-center', 'justify-between')
		el.appendChild(this.makeHeaderLabel())
		el.appendChild(this.makeCloseButton())
		return el
	}

	makeHeaderLabel() {
		const el = document.createElement('h2')
		el.classList.add('text-white/20')
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
