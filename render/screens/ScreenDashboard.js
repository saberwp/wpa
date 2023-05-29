class ScreenDashboard {

	render() {
		let content = ''
		const body = document.getElementById('app-body')
		const report = new Report('time_log', 'time')
		content += report.make()
		body.innerHTML = content

	}

}
