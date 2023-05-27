class Report {

	modelKey = false
	records  = []

	// @TODO fetch sleep logs.
		// Render chart.
		  // Render sleep log start/end onto chart as bars.
			  // Fetch goals.
				  // Render goals as a line across chart.

	make() {
		let content = ''
		content += this.makeTimeRangeFiltersStandard()
		content += this.summaryStat()
		content += this.makeChart()

		app.dm.fetch('sleep_log')
		document.addEventListener('app_data_loaded', (event) => {
			if(event.detail.modelKey === 'sleep_log') {
				this.records = event.detail.records
				this.chartInit()
			}
		})

		return content
	}

	makeTimeRangeFiltersStandard() {
		let content = ''
		content += '<section>'
		content += '<ul class="flex flex-wrap gap-2">'
		content += '<li class="cursor-pointer bg-white text-gray-800 text-sm font-semibold rounded px-2">'
		content += 'TODAY'
		content += '</li>'
		content += '<li class="cursor-pointer bg-white text-gray-800 text-sm font-semibold rounded px-2">'
		content += '24-HOURS'
		content += '</li>'
		content += '<li class="cursor-pointer bg-white text-gray-800 text-sm font-semibold rounded px-2">'
		content += 'THIS WEEK'
		content += '</li>'
		content += '<li class="cursor-pointer bg-white text-gray-800 text-sm font-semibold rounded px-2">'
		content += '7-DAYS'
		content += '</li>'
		content += '<li class="cursor-pointer bg-white text-gray-800 text-sm font-semibold rounded px-2">'
		content += 'THIS MONTH'
		content += '</li>'
		content += '<li class="cursor-pointer bg-white text-gray-800 text-sm font-semibold rounded px-2">'
		content += '30-DAYS'
		content += '</li>'
		content += '<li class="cursor-pointer bg-white text-gray-800 text-sm font-semibold rounded px-2">'
		content += 'THIS YEAR'
		content += '</li>'
		content += '<li class="cursor-pointer bg-white text-gray-800 text-sm font-semibold rounded px-2">'
		content += '1-YEAR'
		content += '</li>'
		content += '<li class="cursor-pointer bg-white text-gray-800 text-sm font-semibold rounded px-2">'
		content += 'ALL-TIME'
		content += '</li>'
		content += '</ul>'
		content += '</section>'
		return content
	}

	summaryStat() {
		let content = ''
		content += '<dl class="mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4">'
		content += '<div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"><dt class="text-sm font-medium leading-6 text-gray-500">'
		content += 'Log Entries</dt>'
		content += '<dd class="text-xs font-medium text-gray-700">+4.75%</dd><dd class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">5</dd></div>'
		content += '</dl>'
		return content
	}

	makeChart() {
		let content = ''
		content += '<canvas id="wpa-report-chart"></canvas>'
		return content
	}

	chartInit() {
		const ctx = document.getElementById('wpa-report-chart');

		// Extract start times into an array
		const startTimes = this.records.map(sleepLog => sleepLog.start);

		console.log(startTimes)

		// Convert start times to corresponding numeric values
		const data = startTimes.map(startTime => this.convertDateTimeToNumeric(startTime));

	  new Chart(ctx, {
	    type: 'line',
	    data: {
	      labels: startTimes,
	      datasets: [{
	        label: 'Sleep Start Times',
	        data: data,
	        borderWidth: 1
	      }]
	    },
	    options: {
	      scales: {
	        y: {
	          beginAtZero: false
	        }
	      }
	    }
	  });
	}

	convertDateTimeToNumeric(dateTime) {
	  const date = new Date(dateTime);
	  const hours = date.getHours();
	  const minutes = date.getMinutes();
	  return hours + minutes / 60;
	}

}
