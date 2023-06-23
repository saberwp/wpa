class DashboardScreen extends ScreenController {

	reports = []

	constructor() {
		super('dashboard')
	}

	render() {

		this.appShell()
		this.appBodyContent()

		// this.makeReports()

		document.addEventListener('wpa_screen_change', (e) => {
			this.unload()
		})

	}

	appBodyContent() {

		const contEl = document.getElementById('app-body-content')
		contEl.classList.add('overflow-y-auto')

		/* Section 1 */
		const section = new FullWidthDashboardSection();
		const widget2 = new DashboardWidget();
		widget2.reportDefinition = {
			key: 'time_log',
			title: 'Time Report',
			dataModelKey: 'time_log',
			dataFieldKey: 'value',
			dataGroupFieldKey: 'timestamp'
		}
		widget2.setBackgroundColor('bg-green-200')
		section.addWidget(widget2);
		contEl.appendChild(section.render())

		/* Section 2 */
		const section2 = new DashboardSection();
		const widget5 = new DashboardWidget('AAAAAAAAAAA');
		widget5.reportDefinition = {
			key: 'rep_log',
			title: 'Rep Report',
			dataModelKey: 'rep_log',
			dataFieldKey: 'value',
			dataGroupFieldKey: 'timestamp'
		}
		section2.addWidget(widget5);
		const widget6 = new DashboardWidget();
		widget6.reportDefinition = {
			key: 'distance_log',
			title: 'Distance Report',
			dataModelKey: 'distance_log',
			dataFieldKey: 'value',
			dataGroupFieldKey: 'timestamp'
		}
		widget6.setBackgroundColor('bg-green-300')
		section2.addWidget(widget6);
		contEl.appendChild(section2.render())
	}

	// This needs to be called when the screen changes.
	unload() {
		if(this?.report?.chart) {
			this.report.chart.destroy()
		}

	}

}
