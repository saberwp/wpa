class ScreenDashboard {

	report = false

	render() {

		console.log('render dashboard')

		let content = ''
		const body = document.getElementById('app-body')

		// Rep log report.
		const def1 = {
			key: 'rep_log',
			dataModelKey: 'rep_log',
			dataFieldKey: 'value',
			dataGroupFieldKey: 'timestamp'
		}
		this.report = new Report(def1)
		content += this.report.make()

		const def2 = {
			key: 'time_log',
			dataModelKey: 'time_log',
			dataFieldKey: 'value',
			dataGroupFieldKey: 'timestamp'
		}
		this.report = new Report(def2)
		content += this.report.make()

		const def3 = {
			key: 'distance_log',
			dataModelKey: 'distance_log',
			dataFieldKey: 'value',
			dataGroupFieldKey: 'timestamp'
		}
		this.report = new Report(def3)
		content += this.report.make()

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
