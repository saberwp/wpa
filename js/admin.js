// @TODO provide click event for each install button with callback that does API fetch call to endpoint installer.

class WpaAdmin {

	container = false
	data = false

	constructor() {
		console.log('constructor running in WpaAdmin()')
		this.container = document.getElementById('wpa-admin-container')
	}

	makeAppHeading() {
		const el = document.createElement('h2')
		el.classList.add('font-bold', 'text-2xl', 'text-white')
		el.innerHTML = 'APP LIST'
		this.container.appendChild(el)
	}

	makeAppGrid() {
		const el = document.createElement('section')
		el.classList.add('flex', 'flex-wrap', 'gap-4', 'bg-gray-800', 'p-4')
		this.data.forEach((app) => {
			el.appendChild(this.makeAppCard(app))
		})
		this.container.appendChild(el)
	}

	makeAppCard(app) {
		const el = document.createElement('div')
		el.id = 'wpa-app-'+app.key
		el.classList.add('rounded-md', 'p-4', 'bg-gray-600')
		el.appendChild(this.makeAppCardHeader(app.title))
		el.appendChild(this.makeAppCardBody(app))
		el.appendChild(this.makeAppCardFooter(app))
		return el
	}

	makeAppCardHeader(appTitle) {
		const el = document.createElement('header')
		el.innerHTML = '<h2 class="text-white text-xl font-bold mb-6">'+appTitle+'</h2>'
		return el
	}

	makeAppCardBody(app) {
		const el = document.createElement('section')
		el.innerHTML = 'Card body...'
		return el
	}

	makeAppCardFooter(app) {
		const el = document.createElement('footer')
		el.classList.add('flex', 'gap-4', 'items-center')
		el.appendChild(this.makeAppCardInstallButton(app))
		el.appendChild(this.makeAppCardVisitButton(app))
		el.appendChild(this.makeAppCardStatus(app))
		return el
	}

	makeAppCardInstallButton(app) {
		const el = document.createElement('div')
		el.classList.add('cursor-pointer','wpa-app-install-button')
		let content = ''
		content += '<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.3125 1.3125V0H12.6875V1.3125V16.0836L7.49219 10.8883L6.5625 9.95859L4.70859 11.8125L5.63828 12.7422L13.0703 20.1797L14 21.1094L14.9297 20.1797L22.3672 12.7422L23.2969 11.8125L21.4375 9.95859L20.5078 10.8883L15.3125 16.0836V1.3125ZM7.04375 16.625H2.625H0V19.25V25.375V28H2.625H25.375H28V25.375V19.25V16.625H25.375H20.9563L18.3313 19.25H25.375V25.375H2.625V19.25H9.66875L7.04375 16.625ZM23.625 22.3125C23.625 21.9644 23.4867 21.6306 23.2406 21.3844C22.9944 21.1383 22.6606 21 22.3125 21C21.9644 21 21.6306 21.1383 21.3844 21.3844C21.1383 21.6306 21 21.9644 21 22.3125C21 22.6606 21.1383 22.9944 21.3844 23.2406C21.6306 23.4867 21.9644 23.625 22.3125 23.625C22.6606 23.625 22.9944 23.4867 23.2406 23.2406C23.4867 22.9944 23.625 22.6606 23.625 22.3125Z" fill="white"/></svg>'
		el.innerHTML = content
		el.setAttribute('app-key',app.key)
		return el
	}

	// @TODO Use #wpa-app-refresh-button for refresh button.

	makeAppCardVisitButton(app) {
		const el = document.createElement('div')
		el.classList.add('cursor-pointer')
		let content = ''
		content += '<a href="'+app.site_url+'">'
		content += '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0594 2.55938L9 1.5L10.0594 0.440625L10.5 0H14.5H16V1.5V5.5L15.5594 5.94063L14.5 7L13.4406 5.94063L12.2812 4.78125L7.53125 9.53125L7 10.0625L5.94063 9L6.47188 8.46875L11.2188 3.71875L10.0594 2.55938ZM14.5 4.87813V1.5H11.1219L14.5 4.87813ZM0 1H0.75H6.25H7V2.5H6.25H1.5V14.5H13.5V9.75V9H15V9.75V15.25V16H14.25H0.75H0V15.25V1.75V1Z" fill="black"/></svg>'
		content += '</a>'
		el.innerHTML = content
		return el
	}

	makeAppCardStatus(app) {
		const label = app.installed ? 'INSTALLED' : 'UNINSTALLED';
		const el = document.createElement('div')
		let content = ''
		content += '<h2 class="text-gray-200 text-lg font-semibold">'+label+'</h2>'
		el.innerHTML = content
		return el
	}

	eventsInit() {
		this.attachInstallButtonClickEvent()
		this.attachAppRefreshButtonClickEvent()
	}

	attachInstallButtonClickEvent() {
		const installButtons = document.querySelectorAll('.wpa-app-install-button');
		const self = this;

		const handleClick = function(event) {
		  event.preventDefault();

			const appKey = event.currentTarget.getAttribute('app-key')

		  const data = {
		    'app_key': appKey,
		  };

		  fetch('/wp-json/wpa/app/install/', {
		    method: 'POST',
		    headers: {
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify(data)
		  })
		    .then(function(response) {
		      if (response.ok) {
		        console.log(response);
						self.appCardRefresh('installed', appKey)
		      } else {
		        console.error('App install failed!');
		      }
		    })
		    .catch(function(error) {
		      console.error('App install failed!', error);
		    });
		  };

	  installButtons.forEach(button => {
	    button.addEventListener('click', handleClick);
	  });
	}

	appCardRefresh(status, appKey) {
		const cardEl = document.getElementById('wpa-app-'+appKey)
		cardEl.innerHTML = 'INSTALLED BBAAABY!!'
	}

	attachAppRefreshButtonClickEvent() {
	  const installButtons = document.querySelectorAll('.wpa-app-refresh-button');

	  installButtons.forEach(button => {
	    button.addEventListener('click', event => {
	      event.preventDefault();

	      const appKey = button.getAttribute('app-key')

				console.log('app key is ' + appKey)

				const appRefresh = new AppRefresh()
				appRefresh.run(appKey)
			});
	  });
	}



}

const admin = new WpaAdmin()
admin.data = wpaAppDefsWithInstallFlag
admin.makeAppHeading()
admin.makeAppGrid()
admin.eventsInit()


class AppRefresh {

	run(appKey) {

		this.appKey = appKey
		const data = {
			app_key: appKey
		}

		fetch('/wp-json/wpa/app/refresh/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
			.then(response => {
				if (response.ok) {
					console.log('App refresh successful!');
				} else {
					console.error('App refresh failed!');
				}
			})
			.catch(error => {
				console.error('App refresh failed!', error);
			});

	}

}
