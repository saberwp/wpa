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
