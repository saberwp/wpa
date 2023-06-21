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

	  if (hash) {
	    // Split the hash value on the / character
	    var parts = hash.substring(1).split('/');

	    // Return the array containing the two parts
	    return parts;
	  } else {
	    // Return the default array containing ['dashboard', '0']
			if(app.def.default_screen) {
				return [app.def.default_screen]
			}
	    return ['dashboard'];
	  }
	}

	render(screenKey) {
		const screen = new Screen()
		screen.render(screenKey)
	}

	renderSingle(screenKey, recordId) {
		const screen = new Screen()
		screen.renderSingle(screenKey, recordId)
	}

}
