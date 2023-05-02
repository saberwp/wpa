class Route {

	get() {
		const route = this.parseHash()
		return route
	}

	setScreenHash(screenKey) {
	  window.location.hash = screenKey;
	}

	parseHash() {
	  var hash = window.location.hash;

		console.log('hash: '+hash)

	  if (hash) {
	    // Split the hash value on the / character
	    var parts = hash.substring(1).split('/');

	    // Return the array containing the two parts
	    return parts;
	  } else {
	    // Return the default array containing ['dashboard', '0']
	    return ['dashboard'];
	  }
	}

	render(screenKey) {
		const screen = new Screen()
		screen.render(screenKey)
		const activeMenuEl = app.menu.findMenuItemByScreenKey(screenKey)
		app.menu.setActive(activeMenuEl)
	}

	renderSingle(screenKey, recordId) {
		const screen = new Screen()
		screen.renderSingle(screenKey, recordId)
		console.log(screenKey)
		const activeMenuEl = app.menu.findMenuItemByScreenKey(screenKey)
		app.menu.setActive(activeMenuEl)
	}

}
