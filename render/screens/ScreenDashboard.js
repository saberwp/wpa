class ScreenDashboard {

	render() {
		let content = ''
		const body = document.getElementById('app-body')
		content += this.rowFirst()
		content += this.rowSecond()
		body.innerHTML = content
	}

	rowFirst() {
		let content = ''
		content += '<dl class="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">'
		content += '<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"><dt class="text-sm font-medium leading-6 text-gray-500">Revenue</dt><dd class="text-xs font-medium text-gray-700">+4.75%</dd><dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">$405,091.00</dd></div>'
		content += '<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"><dt class="text-sm font-medium leading-6 text-gray-500">Revenue</dt><dd class="text-xs font-medium text-gray-700">+4.75%</dd><dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">$405,091.00</dd></div>'
		content += '</dl>'
		return content
	}

	rowSecond() {
		// Simple list of models available.
		let content = ''
		content += '<ul>'
		app.def.models.forEach((modelKey) => {
			const modelDef = app.getModel(modelKey)
			const rowCount = app.data[modelKey].record.length
			content += '<li>'
			content += modelDef.key + ' / ' + rowCount
			content += '</li>'
		})
		content += '</ul>'
		return content
	}

}
