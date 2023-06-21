class Modal extends ComponentBase {

	headerLabel = ''
	content = ''

	constructor() {
		super();
		this.defaultClasses = ['modal', 'fixed', 'inset-0', 'bg-gray-700', 'bg-opacity-90', 'transition-opacity'];
	}

	build() {
		const wrap = this.addChild('Div');
		wrap.setClasses(['flex', 'min-h-full', 'items-end', 'justify-center', 'p-4', 'text-center', 'sm:items-center', 'sm:p-0']);
		const main = wrap.addChild('Div');
		main.setClasses(['relative', 'transform', 'rounded-lg', 'bg-gray-900', 'px-4', 'pb-4', 'pt-5', 'text-left', 'shadow-xl', 'transition-all', 'sm:my-8', 'sm:w-full', 'sm:max-w-md', 'sm:p-6']);
		const header = main.addChild('Div')
		header.setClasses(['flex', 'items-center', 'justify-between', 'mb-6'])
		const headerLabel = header.addChild('Div')
		headerLabel.setClasses(['text-white/20'])
		const headerLabelText = headerLabel.addChild('Span')
		headerLabelText.setText(this.headerLabel)
		const closeButton = header.addChild('IconButton')
		closeButton.setClasses(['modal-close-button'])
		const closeButtonIcon = closeButton.addChild('Svg');
		closeButtonIcon.setClasses(['fill-white/20', 'hover:fill-white/50'])
		closeButtonIcon.setSvgMarkup('<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.8 3.6L24 2.4L21.6 0.00705872L20.4 1.20706L12 9.60706L3.6 1.2L2.4 0L0.00705885 2.4L1.20706 3.6L9.60706 12L1.2 20.4L0 21.6L2.4 23.9929L3.6 22.7929L12 14.3929L20.4 22.8L21.6 24L23.9929 21.6L22.7929 20.4L14.3929 12L22.8 3.6Z"/></svg>')
		const modalContent = main.addChild('Div')
		const modalFooter = main.addChild('Div')
		modalFooter.setClasses(['flex', 'mt-6', 'justify-end'])
		const cancelButton = modalFooter.addChild('TextButton')
		cancelButton.setClasses(['modal-close-button', 'mt-3', 'inline-flex', 'justify-center', 'rounded-md', 'bg-white/20', 'px-8', 'py-2', 'text-sm', 'font-semibold', 'text-white/20', 'shadow-sm', 'hover:bg-white/10', 'sm:ml-3', 'sm:mt-0', 'sm:w-auto']);
		cancelButton.setContent('Cancel')

		this.make();

		// @TODO we need a more systematic way to do this:
		  // Support setting a child element to append during build.
			// Support setting innerHTML content to add during build.
		modalContent.el.appendChild(this.content)
	}

	open() {
		this.build()
		document.body.appendChild(this.get())

		// Init close handling.
		this.close = this.close.bind(this)
		const closeButtons = document.querySelectorAll('.modal-close-button')
		closeButtons.forEach((closeButton) => {
			closeButton.addEventListener('click', this.close);
		})
	}

	close() {
		const el = document.querySelector('.modal')
		el.removeEventListener('click', this.close)
		el.innerHTML = ''
		el.remove()
	}

	setHeaderLabel(value) {
		this.headerLabel = value
	}

	setContent(el) {
		this.content = el
	}

}
