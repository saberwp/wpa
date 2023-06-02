class Flex {

	el = null

	make() {
		const el = document.createElement('div')
		el.classList.add('flex', 'gap-4')
		this.el = el
	}

}
