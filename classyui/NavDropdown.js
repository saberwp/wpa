class NavDropdown extends ComponentBase {

	constructor() {
		super()
		this.elType = 'div'
		this.defaultClasses = ['cursor-pointer', 'relative', 'flex', 'items-center', 'gap-4', 'ml-6']
	}

	build() {
		this.make()
		let c = '<span class="font-semibold">Thomas</span>'
		c += '<svg class="w-4 fill-gray-900/30 mt-1" viewBox="0 0 16 10" xmlns="http://www.w3.org/2000/svg"><path d="M7.99823 9.20204L8.60013 8.60013L15.3981 1.80571L16 1.20381L14.7962 0.00354082L14.1943 0.605444L7.99823 6.80151L1.80217 0.601903L1.20027 0L0 1.20381L0.601903 1.80571L7.39633 8.60367L7.99823 9.20558V9.20204Z"/></svg>'
		c += '<ul id="hds9e3" class="opacity-0 absolute w-40 left-0 top-8 bg-gray-900/90 text-white px-8 py-4 rounded shadow"><li>Account</li><li>Settings</li></ul>'
		this.el.innerHTML = c

		this.el.addEventListener('click', (e) => {
			const nav = document.getElementById('hds9e3')
			nav.classList.remove('opacity-0')
		})
	}

}
