class App {

	userId = 0

	constructor() {

		// Add feature controllers to app.
		this.form   = new Form();
		this.edit   = new Edit()
		this.create = new Create()
		this.delete = new Delete()
		this.modal  = new Modal()
		this.dm     = new DataManager()
		this.menu   = new Menu()
		this.screen = new Screen()

		// Set API URL.
		this.apiUrl = WPA_ApiUrl;

		// Set Current User ID.
		if (typeof WPA_CurrentUserID !== 'undefined') {
			this.userId = WPA_CurrentUserID
		}


		// Fetch app def.
		this.fetchAppDef()

		document.addEventListener('wpa_app_def_loaded', (event) => {

			// Init data store.
			this.dm.dataInit()
			this.load()

		})

	}

	load() {

		// Init routing.
		this.route = new Route
		const route = this.route.get()
		const screenKey = route[0]

		this.screenChangeCompleteRoutine()

		const recordId = route[1] ? route[1] : false;
		if(recordId) {
			//this.route.renderSingle(screenKey, recordId)
		} else {
			this.route.render(screenKey)
		}

		// Call menu.clickInit() function to initialize the menu clicks
		this.menu.clickInit()

	}

	screenChangeCompleteRoutine() {
		// Screen change complete routine.
		document.addEventListener('wpa_screen_change_complete', (e) => {

			console.log('caught screen change complete...')
			console.log(app.data.screenKey)

			// Menu click events.
			this.menu.clickInit()

			// Menu set active item.
			if(app.def.sidebar !== false) {
				const activeMenuEl = app.menu.findMenuItemByScreenKey(app.data.screenKey)
				if(activeMenuEl) {
					app.menu.setActive(activeMenuEl);
				}
			}
		})
	}

	fetchAppDef() {

		const data = {
			'app_key': document.getElementById('wpa-app').getAttribute('app-key'),
			'user_id': WPA_CurrentUserID,
		};

		// Send API request.
		fetch('/wp-json/wpa/app/load/', {
				method: "POST",
				body: JSON.stringify(data),
				headers: {
				"Content-Type": "application/json",
				"API-KEY": "KR928NV81G01"
			},
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			return response.json();
		})
		.then((responseJson) => {
			app.def = responseJson.app_def
			app.user = responseJson.user

			// Send event wpa_app_def_loaded.
			const event = new CustomEvent('wpa_app_def_loaded', {
				detail: {
					app_key:app.def.key
				}
			})
			document.dispatchEvent(event)

		})
		.catch((error) => {
			console.error(error);
		});

	}

	getModel(modelKey) {
		return this.def[modelKey]
	}

}

// Self initiate.
window.app = '';
document.addEventListener('DOMContentLoaded', function() {
  window.app = new App();
});
