class ScreenDashboard {

	report = false

	render() {



		console.log('render dashboard')

		let content = ''
		content += '<div class="flex flex-wrap gap-6">'
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

		const alert = new Alert()
		alert.bg = 'bg-green-500'
		alert.delay = 1000
		alert.dismissAuto = false
		alert.setMessage('Good Job', 'Blah blah blah.')
		alert.build()
		alert.render()

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
