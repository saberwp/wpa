class Report {

	def = false
	records  = []
	chart = false

	constructor(def) {
		this.def = def
		return this
	}

	appDataLoadedCallback(event) {
		if(event.detail.modelKey !== this.def.dataModelKey) { return }

		this.records = event.detail.records

		if(!this.chart) {
			this.chartInit()
		} else {
			this.updateChartData()
		}

		const reportContainerEl = document.getElementById('wpa-report-'+this.def.key)
		console.log(reportContainerEl)
		const logCountStatEl = reportContainerEl.querySelector('.report-summary-record-count')
		logCountStatEl.innerHTML = this.records.length
	}

	make() {

		document.removeEventListener('app_data_loaded_report', this.appDataLoadedCallback)
		document.addEventListener('app_data_loaded_report', this.appDataLoadedCallback.bind(this))

		// Get the current date and time.
		const endDate = new Date();

		// Get the start of the previous calendar day.
		const startDate = new Date();
		startDate.setDate(startDate.getDate() - 1); // Subtract one day
		startDate.setHours(0, 0, 0, 0); // Set the time to 00:00:00

		// Format dates in 'YYYY-MM-DD HH:mm:ss' format.
		const formatDate = (date) => {
		    const year = date.getFullYear();
		    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed.
		    const day = String(date.getDate()).padStart(2, '0');
		    const hours = String(date.getHours()).padStart(2, '0');
		    const minutes = String(date.getMinutes()).padStart(2, '0');
		    const seconds = String(date.getSeconds()).padStart(2, '0');
		    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
		};

		const formattedStartDate = formatDate(startDate);
		const formattedEndDate = formatDate(endDate);
		app.dm.fetchReportRange(this.def.dataModelKey, 'timestamp', formattedStartDate, formattedEndDate)

		let content = ''
		content += '<section id="wpa-report-'+this.def.key+'">'
		content += '<div>'
		content += '<h2 class="text-lg font-semibold">'
		content += this.def.title
		content += '</h2>'
		content += '</div>'
		content += this.makeTimeRangeFiltersStandard()
		content += this.makeGroupingSelector()
		content += this.makeChart()
		content += this.summaryStat()
		content += '</section>'
		return content
	}

	makeGroupingSelector() {
		const groupOptions = this.groupOptionsArray()
		let content = ''
		content += '<section class="bg-white/10 p-1">'
		content += '<h4 class="text-xs text-white/30">GROUP BY</h4>'
		content += '<ul class="flex flex-wrap gap-2">'
		groupOptions.forEach((groupOption) => {
			content += '<li class="cursor-pointer bg-white text-gray-800 text-xs font-semibold rounded px-2">'
			content += groupOption
			content += '</li>'
		})
		content += '</ul>'
		content += '</section>'
		return content
	}

	groupOptionsArray() {
		return [
			'Day',
			'Week',
			'Month',
			'Year'
		]
	}

	makeTimeRangeFiltersStandard() {
		let content = ''
		content += '<section class="mb-3 mt-2">'
		content += '<ul class="flex flex-wrap gap-2">'
		content += '<li class="cursor-pointer bg-white text-gray-800 text-xs font-semibold rounded px-2">'
		content += 'TODAY'
		content += '</li>'
		content += '<li class="cursor-pointer bg-white text-gray-800 text-xs font-semibold rounded px-2">'
		content += '24-HOURS'
		content += '</li>'
		content += '<li class="cursor-pointer bg-white text-gray-800 text-xs font-semibold rounded px-2">'
		content += 'THIS WEEK'
		content += '</li>'
		content += '<li class="cursor-pointer bg-white text-gray-800 text-xs font-semibold rounded px-2">'
		content += '7-DAYS'
		content += '</li>'
		content += '<li class="cursor-pointer bg-white text-gray-800 text-xs font-semibold rounded px-2">'
		content += 'THIS MONTH'
		content += '</li>'
		content += '<li class="cursor-pointer bg-white text-gray-800 text-xs font-semibold rounded px-2">'
		content += '30-DAYS'
		content += '</li>'
		content += '<li class="cursor-pointer bg-white text-gray-800 text-xs font-semibold rounded px-2">'
		content += 'THIS YEAR'
		content += '</li>'
		content += '<li class="cursor-pointer bg-white text-gray-800 text-xs font-semibold rounded px-2">'
		content += '1-YEAR'
		content += '</li>'
		content += '<li class="cursor-pointer bg-white text-gray-800 text-xs font-semibold rounded px-2">'
		content += 'ALL-TIME'
		content += '</li>'
		content += '</ul>'
		content += '</section>'
		return content
	}

	summaryStat() {
		let content = ''
		content += '<div class="bg-white/10 my-2 flex flex-col flex-wrap justify-center items-center gap-x-4 gap-y-2 px-2 py-4 sm:px-6 xl:px-8">'
		content += '<dd class="report-summary-record-count text-2xl font-medium leading-4 tracking-tight text-white/20"></dd>'
		content += '<dt class="text-sm font-medium leading-3 text-white/20">Record Count</dt>'
		content += '</div>'
		return content
	}

	makeChart() {
		let content = ''
		content += '<canvas id="wpa-report-chart-'+this.def.key+'"></canvas>'
		return content
	}

	chartInit() {
	  const ctx = document.getElementById('wpa-report-chart-'+this.def.key);
	  const grouped = this.groupRecordsByDay();

	  this.chart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	      labels: grouped.labels,
	      datasets: [
	        {
	          label: 'Logs',
	          data: grouped.data,
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
	    const createdDate = new Date(record[this.def.dataGroupFieldKey]);

			if (!isNaN(createdDate)) {
		    const day = createdDate.toISOString().split('T')[0];

		    if (!groups[day]) {
		      groups[day] = [];
		      labels.push(day);
		      data.push(0);
		    }

		    groups[day].push(record);
		    data[labels.indexOf(day)] += Number(record[this.def.dataFieldKey]);
			}
	  }

	  return { data, labels };
	}

	updateChartData() {
    // Retrieve the new data
    const grouped = this.groupRecordsByDay();

    // Update the chart's data
    this.chart.data.labels = grouped.labels;
    this.chart.data.datasets[0].data = grouped.data;

    // Refresh the chart
    this.chart.update();
  }

}
