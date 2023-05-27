class ScreenDashboard {

	render() {
		let content = ''
		const body = document.getElementById('app-body')
		const report = new Report()
		content += report.make()
		body.innerHTML = content

	}

}
