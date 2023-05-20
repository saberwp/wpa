class Route {

	get() {
		const route = this.parseHash()
		return route
	}

	setScreenHash(screenKey) {
		console.log('setScreenHash() was called with screenKey: '+screenKey)
	  window.location.hash = screenKey;
	}

	parseHash() {
	  var hash = window.location.hash;

	  if (hash) {
	    // Split the hash value on the / character
	    var parts = hash.substring(1).split('/');

	    // Return the array containing the two parts
	    return parts;
	  } else {
	    // Return the default array containing ['dashboard', '0']
			console.log('parseHash check app.def.default_screen, result is '+app.def.default_screen)
			if(app.def.default_screen) {
				return [app.def.default_screen]
			}
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
