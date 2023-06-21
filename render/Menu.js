class Menu {

	processModels() {
		const navModels = {
			primary: [],
			secondary: []
		}
		app.def.models.forEach(( modelKey ) => {
			const model = app.def[modelKey]
			const appMenu = this.getAppMenu(model)
			if( appMenu === 'primary' ) {
				navModels.primary.push(model)
			}
			if( appMenu === 'secondary' ) {
				navModels.secondary.push(model)
			}
		})
		return navModels
	}

	/* For a given model, determine the app_menu setting (which determines if it is a primary or secondary menu item). */
	getAppMenu(model) {
		// Type is set.
	  if(model?.app_menu) {
	    return model.app_menu;
	  }
		if(model?.type && model.type === 'standard') {
	    return 'primary';
	  }
		return false;
	}

	setActive(el) {

		console.log('setActive() called with el:')
		console.log(el)

		const activeItems = document.querySelectorAll('.menu-item-active');
		activeItems.forEach(function(item) {
		  item.classList.remove('menu-item-active');
			item.classList.remove('bg-green-900');
			item.classList.remove('text-white');
			item.classList.remove('rounded-md')
			item.classList.remove('px-2')
			item.classList.remove('py-0.5')
		});
		el.classList.add('menu-item-active')
		el.classList.add('bg-green-900', 'text-white', 'rounded-md', 'px-2', 'py-0.5')
	}

	findMenuItemByScreenKey(screenKey) {
	  const liElements = document.getElementsByClassName('wpa-app-menu-item');
	  for (let i = 0; i < liElements.length; i++) {
	    const liElement = liElements[i];
	    if (liElement.getAttribute('screen') === screenKey) {
	      return liElement;
	    }
	  }
	  return null;
	}

	clickInit() {
	  const liElements = document.getElementsByClassName('wpa-app-menu-item');

	  for (let i = 0; i < liElements.length; i++) {
	    const liElement = liElements[i];
			liElement.removeEventListener('click', this.clickHandler)
	    liElement.addEventListener('click', this.clickHandler.bind(this));
	  }
	}

	clickHandler(e) {
		let target = ''
		if (e.target.tagName === 'LI') {
	    target = e.target
	  } else {
	    target = e.currentTarget
	  }
		const screenKey = target.getAttribute('screen')
		const screen = new Screen()
		screen.render(screenKey)
	}

}
