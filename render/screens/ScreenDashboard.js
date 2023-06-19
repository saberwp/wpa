class ScreenDashboard {

	report = false

	render() {

		let content = ''
		content += '<div class="wpa-app-container flex flex-wrap gap-6">'
		const body = document.getElementById('app-body')

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

		body.innerHTML = content

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

}
