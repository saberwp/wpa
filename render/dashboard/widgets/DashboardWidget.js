/* DASHBOARD WIDGET BASE CLASS */
class DashboardWidget {

	backgroundColor = ''
	reportDefinition = false

	constructor(content) {
		this.content = content
	}

	render() {
		const flex = new Flex()
		flex.addClass('overflow-auto')
		if(this.backgroundColor) {
			flex.addClass(this.backgroundColor)
		}
		flex.build()
		if(this.reportDefinition) {
			const report = new Report(this.reportDefinition)
			flex.el.innerHTML = report.make()
		} else {
			flex.el.innerHTML = this.content
		}
		return flex.get()
	}

	setBackgroundColor(backgroundColor) {
		this.backgroundColor = backgroundColor
	}

}
