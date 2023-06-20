class AppShellHeader extends ComponentBase {

	constructor() {
		super()
		this.elType = 'header'
		this.defaultClasses = ['flex', 'w-full', 'text-gray-600', 'py-2', 'mb-4', 'border-b', 'border-gray-300', 'px-2', 'gap-4', 'justify-end', 'items-center']
	}

	build() {
		this.make()
	}

}
