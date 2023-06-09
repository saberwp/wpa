class WpaAdmin {

	container = false
	data = false

	constructor() {
		this.container = document.getElementById('wpa-admin-container')
	}

	makeAppGrid() {
		const el = document.createElement('section')
		el.classList.add('flex', 'flex-wrap', 'gap-x-4', 'gap-y-6', 'p-4', 'max-w-4xl')
		this.data.forEach((app) => {
			el.appendChild(this.makeAppCard(app))
		})
		this.container.appendChild(el)
	}

	makeAppCard(app) {
		const el = document.createElement('div')
		el.id = 'wpa-app-'+app.key
		el.classList.add('rounded-md', 'px-4', 'pt-4', 'pb-2', 'bg-gray-600', 'w-60', 'h-40', 'flex', 'flex-col', 'drop-shadow-lg')
		el.appendChild(this.makeAppCardHeader(app))
		el.appendChild(this.makeAppCardBody(app))
		el.appendChild(this.makeAppCardFooter(app))
		return el
	}

	makeAppCardHeader(app) {
		const el = document.createElement('header')
		el.innerHTML = '<h2 class="text-white text-xl font-semibold mb-6">'+app.title+'</h2>'
		return el
	}

	makeAppCardBody(app) {
		const el = document.createElement('section')
		el.classList.add('wpa-app-card-body', 'flex', 'gap-4', 'items-center')
		if(app.installed) {
			el.appendChild(this.makeAppCardRefreshButton(app))
		}
		if(!app.installed) {
			el.appendChild(this.makeAppCardInstallButton(app))
		}
		el.appendChild(this.makeAppCardVisitButton(app))
		return el
	}

	makeAppCardFooter(app) {
		const el = document.createElement('footer')
		el.classList.add('flex', 'gap-4', 'items-center', 'justify-between', 'mt-auto', 'bg-gray-700', '-mx-4', '-mb-4', 'py-2', 'px-4', 'rounded-b-md')

		el.appendChild(this.makeAppCardRemoveButton(app))
		el.appendChild(this.makeAppCardStatus(app))
		return el
	}

	makeAppCardInstallButton(app) {
		const el = document.createElement('div')
		el.classList.add('cursor-pointer','wpa-app-install-button')
		let content = ''
		content += '<svg class="fill-white hover:fill-gray-200" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.3125 1.3125V0H12.6875V1.3125V16.0836L7.49219 10.8883L6.5625 9.95859L4.70859 11.8125L5.63828 12.7422L13.0703 20.1797L14 21.1094L14.9297 20.1797L22.3672 12.7422L23.2969 11.8125L21.4375 9.95859L20.5078 10.8883L15.3125 16.0836V1.3125ZM7.04375 16.625H2.625H0V19.25V25.375V28H2.625H25.375H28V25.375V19.25V16.625H25.375H20.9563L18.3313 19.25H25.375V25.375H2.625V19.25H9.66875L7.04375 16.625ZM23.625 22.3125C23.625 21.9644 23.4867 21.6306 23.2406 21.3844C22.9944 21.1383 22.6606 21 22.3125 21C21.9644 21 21.6306 21.1383 21.3844 21.3844C21.1383 21.6306 21 21.9644 21 22.3125C21 22.6606 21.1383 22.9944 21.3844 23.2406C21.6306 23.4867 21.9644 23.625 22.3125 23.625C22.6606 23.625 22.9944 23.4867 23.2406 23.2406C23.4867 22.9944 23.625 22.6606 23.625 22.3125Z"/></svg>'

		el.innerHTML = content
		el.setAttribute('app-key',app.key)
		return el
	}

	makeAppCardRemoveButton(app) {
		const el = document.createElement('div')
		el.classList.add('wpa-app-uninstall-button')

		let content = ''
		if(app.installed) {
			el.classList.add('cursor-pointer')
			content += '<svg class="fill-gray-400 hover:fill-gray-200" width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.35714 0H4.92857L4.6875 0.355273L3.14062 2.65625H2.67857H1.07143H0V4.25H1.07143V15.4062V17H2.67857H12.3214H13.9286V15.4062V4.25H15V2.65625H13.9286H12.3214H11.8594L10.3125 0.355273L10.0714 0H9.64286H5.35714ZM9.92745 2.65625H5.07254L5.78571 1.59375H9.21429L9.92745 2.65625ZM2.67857 15.4062V4.25H12.3214V15.4062H2.67857ZM10.7779 7.4375L9.64286 6.31191L9.07366 6.87637L7.5 8.43691L5.92634 6.87637L5.35714 6.31191L4.2221 7.4375L4.79129 8.00195L6.36496 9.5625L4.79129 11.123L4.2221 11.6875L5.35714 12.8131L5.92634 12.2486L7.5 10.6881L9.07366 12.2486L9.64286 12.8131L10.7779 11.6875L10.2087 11.123L8.63504 9.5625L10.2087 8.00195L10.7779 7.4375Z"/></svg>'
		}
		if(!app.installed) {
			content += '<svg class="fill-white/20" width="15" height="17" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.35714 0H4.92857L4.6875 0.355273L3.14062 2.65625H2.67857H1.07143H0V4.25H1.07143V15.4062V17H2.67857H12.3214H13.9286V15.4062V4.25H15V2.65625H13.9286H12.3214H11.8594L10.3125 0.355273L10.0714 0H9.64286H5.35714ZM9.92745 2.65625H5.07254L5.78571 1.59375H9.21429L9.92745 2.65625ZM2.67857 15.4062V4.25H12.3214V15.4062H2.67857ZM10.7779 7.4375L9.64286 6.31191L9.07366 6.87637L7.5 8.43691L5.92634 6.87637L5.35714 6.31191L4.2221 7.4375L4.79129 8.00195L6.36496 9.5625L4.79129 11.123L4.2221 11.6875L5.35714 12.8131L5.92634 12.2486L7.5 10.6881L9.07366 12.2486L9.64286 12.8131L10.7779 11.6875L10.2087 11.123L8.63504 9.5625L10.2087 8.00195L10.7779 7.4375Z"/></svg>'
		}
		el.innerHTML = content
		el.setAttribute('app-key',app.key)
		return el
	}

	makeAppCardRefreshButton(app) {
		const el = document.createElement('div')
		el.classList.add('cursor-pointer','wpa-app-refresh-button')
		let content = ''
		content += '<svg class="fill-white hover:fill-gray-200" width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M28 11.2H26.6H18.2H16.8V8.4H18.2H23.2225L20.1833 5.36083C18.5383 3.72167 16.3158 2.8 14 2.8C9.75917 2.8 6.11333 5.3725 4.55 9.0475L1.97167 7.95083C3.96083 3.27833 8.59833 0 14 0C17.0625 0 19.9967 1.21333 22.1608 3.3775L25.2 6.4225V1.4V0H28V1.4V9.8V11.2ZM0 14.9333H1.4H9.8H11.2V17.7333H9.8H4.7775L7.81667 20.7725C9.46167 22.4117 11.6842 23.3333 14 23.3333C18.235 23.3333 21.875 20.7725 23.4442 17.1033L26.0167 18.2058C24.0217 22.8667 19.3958 26.1333 14 26.1333C10.9375 26.1333 8.00333 24.92 5.83917 22.7558L2.8 19.7108V24.7333V26.1333H0V24.7333V16.3333V14.9333Z"/></svg>'

		el.innerHTML = content
		el.setAttribute('app-key',app.key)
		return el
	}

	makeAppCardVisitButton(app) {
		const el = document.createElement('div')
		el.classList.add('wpa-app-link')
		let content = ''
		if(app.installed) {
			el.classList.add('cursor-pointer')
			content += '<a href="'+app.site_url+'">'
			content += '<svg class="fill-white hover:fill-gray-200" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5742 3.19922L11.25 1.875L12.5742 0.550781L13.125 0H18.125H20V1.875V6.875L19.4492 7.42578L18.125 8.75L16.8008 7.42578L15.3516 5.97656L9.41406 11.9141L8.75 12.5781L7.42578 11.25L8.08984 10.5859L14.0234 4.64844L12.5742 3.19922ZM18.125 6.09766V1.875H13.9023L18.125 6.09766ZM0 1.25H0.9375H7.8125H8.75V3.125H7.8125H1.875V18.125H16.875V12.1875V11.25H18.75V12.1875V19.0625V20H17.8125H0.9375H0V19.0625V2.1875V1.25Z"/></svg>'
			content += '</a>'
		}
		if(!app.installed) {
			content += '<svg class="fill-gray-500" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.5742 3.19922L11.25 1.875L12.5742 0.550781L13.125 0H18.125H20V1.875V6.875L19.4492 7.42578L18.125 8.75L16.8008 7.42578L15.3516 5.97656L9.41406 11.9141L8.75 12.5781L7.42578 11.25L8.08984 10.5859L14.0234 4.64844L12.5742 3.19922ZM18.125 6.09766V1.875H13.9023L18.125 6.09766ZM0 1.25H0.9375H7.8125H8.75V3.125H7.8125H1.875V18.125H16.875V12.1875V11.25H18.75V12.1875V19.0625V20H17.8125H0.9375H0V19.0625V2.1875V1.25Z"/></svg>'
		}
		el.innerHTML = content
		return el
	}

	makeAppCardStatus(app) {
		const label = app.installed ? 'INSTALLED' : 'UNINSTALLED';
		const el = document.createElement('div')
		el.classList.add('wpa-app-card-status')
		let content = ''
		content += '<h2 class="text-gray-400 text-base font-medium">'+label+'</h2>'
		el.innerHTML = content
		return el
	}

	eventsInit() {
		this.attachInstallButtonClickEvent()
		this.attachAppRefreshButtonClickEvent()
		this.attachUninstallButtonClickEvent()
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
						self.appCardRefreshInstalled(appKey)
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

	attachUninstallButtonClickEvent() {

		const installButtons = document.querySelectorAll('.wpa-app-uninstall-button');
		const self = this;

		const handleUninstallClick = function(event) {
		  event.preventDefault();


			const appKey = event.currentTarget.getAttribute('app-key')

		  const data = {
		    'app_key': appKey,
		  };

		  fetch('/wp-json/wpa/app/uninstall/', {
		    method: 'POST',
		    headers: {
		      'Content-Type': 'application/json'
		    },
		    body: JSON.stringify(data)
		  })
		    .then(function(response) {
		      if (response.ok) {
		        console.log(response);
						self.appCardRefreshUninstalled(appKey)
		      } else {
		        console.error('App uninstall failed!');
		      }
		    })
		    .catch(function(error) {
		      console.error('App uninstall failed!', error);
		    });
		  };

	  installButtons.forEach(button => {
	    button.addEventListener('click', handleUninstallClick);
	  });
	}

	appDefinitionByKey(key) {
		let match = false
		this.data.forEach((appDef) => {
			if(appDef.key === key) {
				match = appDef
			}
		})
		return match
	}

	appCardRefreshInstalled(appKey) {

		const appDef = this.appDefinitionByKey(appKey)
		appDef.installed = true


		const cardEl = document.getElementById('wpa-app-'+appKey)
		const statusElement = cardEl.querySelector('.wpa-app-card-status h2');
		statusElement.innerHTML = 'INSTALLED'

		// Replace install button with refresh button.
		const installButtonElement = cardEl.querySelector('.wpa-app-install-button');
		installButtonElement.remove()
		const refreshButtonElement = this.makeAppCardRefreshButton(appDef)
		const appCardBodyElement = cardEl.querySelector('.wpa-app-card-body');
		const appLinkElement = cardEl.querySelector('.wpa-app-link');
		appCardBodyElement.insertBefore(refreshButtonElement, appLinkElement)

		// Replace link deactivated button with active link button.

		const appVisitButton = this.makeAppCardVisitButton(appDef)
		appLinkElement.remove()
		appCardBodyElement.appendChild(appVisitButton)

		// Activate delete app button.
		const uninstallButtonElement = cardEl.querySelector('.wpa-app-uninstall-button');
		uninstallButtonElement.classList.add('cursor-pointer')
		const uninstallButtonIconElement = uninstallButtonElement.querySelector('svg');
		uninstallButtonIconElement.classList.remove('fill-white/20')
		uninstallButtonIconElement.classList.add('fill-gray-400')


	}

	// Refresh the altered app card after uninstall.
	appCardRefreshUninstalled(appKey) {

		const appDef = this.appDefinitionByKey(appKey)
		appDef.installed = false

		console.log('app uninstalled...')

		const cardEl = document.getElementById('wpa-app-'+appKey)
		const statusElement = cardEl.querySelector('.wpa-app-card-status h2');
		statusElement.innerHTML = 'UNINSTALLED'

		// Deactivate delete app button.
		const newUninstallButtonEl = this.makeAppCardRemoveButton(appDef);
		const currentUninstallButtonElement = cardEl.querySelector('.wpa-app-uninstall-button');
		if (currentUninstallButtonElement) {
		  const parentElement = currentUninstallButtonElement.parentNode;
		  parentElement.insertBefore(newUninstallButtonEl, currentUninstallButtonElement);
		  currentUninstallButtonElement.remove();
		}

		// Replace link activated button with inactive link button.
		const appLinkElement = cardEl.querySelector('.wpa-app-link');
		const appCardBodyElement = cardEl.querySelector('.wpa-app-card-body');
		const appVisitButton = this.makeAppCardVisitButton(appDef)
		appLinkElement.remove()
		appCardBodyElement.appendChild(appVisitButton)

		// Replace install button with refresh button.
		const refreshButtonElement = cardEl.querySelector('.wpa-app-refresh-button');
		refreshButtonElement.remove()
		const installButtonElement = this.makeAppCardInstallButton(appDef)
		appCardBodyElement.insertBefore(installButtonElement, appVisitButton)

		// @TODO Notify user of result.













	}

	attachAppRefreshButtonClickEvent() {
	  const installButtons = document.querySelectorAll('.wpa-app-refresh-button');

	  installButtons.forEach(button => {
	    button.addEventListener('click', event => {
	      event.preventDefault();
	      const appKey = button.getAttribute('app-key')
				const appRefresh = new AppRefresh()
				appRefresh.run(appKey)
			});
	  });
	}



}

const admin = new WpaAdmin()
admin.data = wpaAppDefsWithInstallFlag
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
