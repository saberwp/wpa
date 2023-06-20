class ScreenDashboard extends ScreenController {

	screenKey = 'dashboard'
	reports = []

	constructor() {
		super()
	}

	render() {

		this.appShell()

		// this.makeReports()

		document.addEventListener('wpa_screen_change', (e) => {
			this.unload()
		})

	}

	// This needs to be called when the screen changes.
	unload() {
		if(this?.report?.chart) {
			this.report.chart.destroy()
		}

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

		// App Header
		this.header(appBody)

		// App Content
		const appContent = appBody.addChild('Flex')
			// @TODO add reports here.

		// App Footer
		this.footer(appBody)

		// Build app shell.
		document.body.classList.remove('bg-gray-800')
		document.body.innerHTML = ''
		appShell.build()

		document.body.appendChild(appShell.get())

	}

	makeReports() {
		let content = ''

		// Rep log report.
		const def1 = {
			key: 'rep_log',
			title: 'Rep Report',
			dataModelKey: 'rep_log',
			dataFieldKey: 'value',
			dataGroupFieldKey: 'timestamp'
		}
		this.report = new Report(def1)
		content += '<div class="wpa-dashboard-widget basis-20">'
		content += this.report.make()
		content += '</div>'

		// Time log report.
		const def2 = {
			key: 'time_log',
			title: 'Time Report',
			dataModelKey: 'time_log',
			dataFieldKey: 'value',
			dataGroupFieldKey: 'timestamp'
		}
		this.report = new Report(def2)
		content += '<div class="wpa-dashboard-widget basis-20">'
		content += this.report.make()
		content += '</div>'

		// Distance log report.
		const def3 = {
			key: 'distance_log',
			title: 'Distance Report',
			dataModelKey: 'distance_log',
			dataFieldKey: 'value',
			dataGroupFieldKey: 'timestamp'
		}
		this.report = new Report(def3)
		content += '<div class="wpa-dashboard-widget basis-20">'
		content += this.report.make()
		content += '</div>'

		// Close container.
		content += '</div>'
	}

}
