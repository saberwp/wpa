class ScreenDashboard {

	report = false

	render() {



		console.log('render dashboard')

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

		// Try new button with transitions.
		content += '<div>'

		// TextButton
		const button1 = new TextButton
		button1.setId('warning-button')
		button1.setContent('SAVE')
		button1.make()
		content += button1.markup()

		// IconButton
		const button2 = new IconButton
		button2.setId('success-button')
		button2.setIcon()
		button2.setText('SUCCESS')
		button2.make()
		content += button2.markup()

		content += '</div>'

		// Close container.
		content += '</div>'

		body.innerHTML = content

		document.addEventListener('wpa_screen_change', (e) => {
			console.log('caught wpa_screen_change...')
			this.unload()
		})
	}

	// This needs to be called when the screen changes.
	unload() {
		console.log('unload dashboard:')
		console.log(this.report.chart)
		console.log('destroying chart: ' +this.report.chart.id)
		if(this?.report?.chart) {
			this.report.chart.destroy()
		}

	}

}
