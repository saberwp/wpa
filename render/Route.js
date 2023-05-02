class Route {

	setScreenHash(screenKey) {
	  window.location.hash = '#' + screenKey;
	}

	getScreenKeyFromHash() {
	  var hash = window.location.hash;
	  if (hash) {
	    return hash.substring(1);
	  } else {
	    return 'dashboard';
	  }
	}

	render(screenKey) {
		const screen = new Screen()
		screen.render(screenKey)
		const activeMenuEl = app.menu.findMenuItemByScreenKey(screenKey)
		app.menu.setActive(activeMenuEl)
	}

}
