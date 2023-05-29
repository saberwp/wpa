class Report {

	dataModelKey = false
	dataFieldKey = false
	records  = []

	constructor(dataModelKey, dataFieldKey) {
		this.dataModelKey = dataModelKey
		this.dataFieldKey = dataFieldKey
	}

	// @TODO fetch sleep logs.
		// Render chart.
		  // Render sleep log start/end onto chart as bars.
			  // Fetch goals.
				  // Render goals as a line across chart.

	make() {

		app.dm.fetch(this.dataModelKey)

		document.addEventListener('app_data_loaded', (event) => {
			if(event.detail.modelKey === this.dataModelKey) {
				this.records = event.detail.records
				this.chartInit()

				const logCountStatEl = document.getElementById('report-summary-log-count')
				logCountStatEl.innerHTML = this.records.length
			}
		})

		let content = ''

		content += this.makeTimeRangeFiltersStandard()
		content += this.summaryStat()
		content += this.makeChart()

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
		content += '<div class="flex flex-wrap gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"><dt class="text-sm font-medium leading-6 text-gray-500">'
		content += 'Log Entries</dt>'
		content += '<dd id="report-summary-log-count" class="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">'
		content += '</dd></div>'
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
	  const grouped = this.groupRecordsByDay();
	  const logCountData = this.groupRecordCountDaily().data;

	  new Chart(ctx, {
	    type: 'bar',
	    data: {
	      labels: grouped.labels,
	      datasets: [
	        {
	          label: 'Log Report',
	          data: grouped.data,
	          borderWidth: 1
	        },
	        {
	          label: 'Log Count',
	          data: logCountData,
	          borderWidth: 1
	        }
	      ]
	    },
	    options: {
	      scales: {
	        y: {}
	      }
	    }
	  });
	}


	groupRecordsByDay() {
	  const groups = {};
	  const labels = [];
	  const data = [];

	  for (const record of this.records) {
	    const createdDate = new Date(record.moment);
	    const day = createdDate.toISOString().split('T')[0];

	    if (!groups[day]) {
	      groups[day] = [];
	      labels.push(day);
	      data.push(0);
	    }

	    groups[day].push(record);
	    data[labels.indexOf(day)] += Number(record.time);
	  }

	  return { data, labels };
	}

	groupRecordCountDaily() {
	  const groups = {};
	  const labels = [];
	  const data = [];

	  for (const record of this.records) {
	    const createdDate = new Date(record.moment);
	    const day = createdDate.toISOString().split('T')[0];
	    const label = `Log Count ${day}`;

	    if (!groups[day]) {
	      groups[day] = [];
	      labels.push(label);
	      data.push(0);
	    }

	    groups[day].push(record);
	    data[labels.indexOf(label)] += 1;
	  }

	  return { data, labels };
	}



}
