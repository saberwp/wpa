/* Base class for screens. */
class ScreenController {

	screenKey = ''

	constructor(screenKey) {
		this.screenKey = screenKey
	}

	appShell() {

		// AppShell.
		const appShell = new AppShell()
		appShell.addClass('overflow-hidden')

		// App wrapper.
		const wrapper = appShell.addChild('Flex')
		wrapper.removeDefaultClass('gap-4')
		wrapper.addClass('items-stretch')
		wrapper.addClass('h-full')

		// Sidebar
		const sidebar = wrapper.addChild('AppShellSidebar')

		// AppBody
		const appBody = wrapper.addChild('Flex')
		appBody.setId('app-body')
		appBody.addClass('justify-between')
		appBody.addClass('w-full')
		appBody.addClass('flex-col')
		appBody.removeDefaultClass('gap-4')
		appBody.removeDefaultClass('items-center')

		// App Header
		this.header(appBody)

		// App Content
		const appContent = appBody.addChild('Flex')
		appContent.id = 'app-body-content'
		appContent.addClass('flex-col')
		appContent.addClass('flex-grow')
		appContent.addClass('overflow-hidden')
		appContent.addClass('p-2')
		appContent.removeDefaultClass('items-center')

		// App Footer
		const appFooter = appBody.addChild('AppShellFooter')
		const iconLogo = appFooter.addChild('IconLogo')
		iconLogo.setSvgMarkup(app.def.logo)
		iconLogo.setFillClass('fill-gray-300')

		// Build app shell.
		document.body.classList.remove('bg-gray-800')
		document.body.innerHTML = ''
		appShell.build()

		document.body.appendChild(appShell.get())

	}

	header(parent) {

		// Header wrap.
		const appHeader = parent.addChild('AppShellHeader')

		// Move to trax app.
		//this.headerForm(appHeader)

		// Notification icon.
		const notifyIcon = appHeader.addChild('Svg')
		notifyIcon.setSvgMarkup('<svg width="48" height="34" viewBox="0 0 48 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.3425 16.4703L18.99 23.7528L18.1425 27.0828L0 20.4753L0.9675 17.8053L6.0075 14.2053L8.7375 6.70532C10.665 1.41782 16.5075 -1.30468 21.7875 0.615318C21.855 0.637818 21.915 0.660318 21.975 0.690318C16.6425 3.84032 14.1375 10.4403 16.335 16.4703H16.3425ZM7.3125 25.6953L16.155 28.9128C15.3075 30.2853 13.7925 31.1928 12.0675 31.1928C9.4125 31.1928 7.26 29.0403 7.26 26.3928C7.26 26.1528 7.275 25.9203 7.3125 25.6953ZM44.6175 24.1578L44.1525 24.3303L39.9525 25.8603L31.2375 29.0253L27.0375 30.5553L20.91 32.7828L19.8825 29.9628L20.0625 29.2653L21.5025 23.6253L18.6 15.6453C16.575 10.0803 19.44 3.93032 25.005 1.90532C30.57 -0.119682 36.7275 2.75282 38.7525 8.31782L41.655 16.2978L46.38 19.6953L46.965 20.1153L48 22.9278L44.6175 24.1578ZM40.89 28.8003C40.89 28.9878 40.8825 29.1753 40.86 29.3628C40.5825 31.7478 38.55 33.6003 36.09 33.6003C34.815 33.6003 33.6525 33.1053 32.7975 32.2953C32.565 32.0778 32.355 31.8303 32.1675 31.5678L36.0975 30.1428L39.7725 28.8003L40.875 28.3953C40.8825 28.5303 40.89 28.6653 40.89 28.8003ZM42.285 21.1803L39.555 19.2228L38.655 18.5778L38.2725 17.5353L35.37 9.54782C34.0275 5.85032 29.9325 3.94532 26.235 5.28782C22.5375 6.63032 20.6325 10.7178 21.975 14.4153L24.8775 22.3953L25.26 23.4378L24.9825 24.5178L24.15 27.7728L42.2775 21.1728L42.285 21.1803Z" fill="#111827" fill-opacity="0.2"/></svg>')
		notifyIcon.addClass('cursor-pointer')
		notifyIcon.removeDefaultClass('w-6')
		notifyIcon.addClass('w-10')

		const divider = appHeader.addChild('DividerH')
		divider.addClass('h-8')
		appHeader.addChild('Avatar')
		const userMenu = appHeader.addChild('NavDropdown')
		userMenu.setLabel(app.user.data.display_name)

	}

	headerForm(parent) {

		// Make exercise select.
		const exerciseSelect = parent.addChild('FormSelect')
		exerciseSelect.setData([
			{
				label: "Pushups",
				value: 1
			},
			{
				label: "Heel Raises",
				value: 2
			},
		])

		// Make log type select.
		const logTypeSelect = parent.addChild('FormSelect')
		logTypeSelect.setData([
			{
				label: "Reps",
				value: 1
			},
			{
				label: "Distance",
				value: 2
			},
			{
				label: "Time",
				value: 3
			},
		])

		// Make value input.
		const valueInput = parent.addChild('FormElementInput')
		valueInput.placeholder = 6

		// Make save button.
		const formButton = parent.addChild('FormButton')

	}

}
