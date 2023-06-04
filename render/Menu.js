class Menu {

	setType(type) {
		this.type = type
	}

	processModels() {
		const navModels = {
			primary: [],
			secondary: []
		}
		app.def.models.forEach(( modelKey ) => {
			const model = app.def[modelKey]
			const appMenu = this.getAppMenu(model)
			if( model.type === 'standard' && appMenu === 'primary' || model.type === 'settings' && appMenu === 'primary' ) {
				navModels.primary.push(model)
			}
			if( model.type === 'standard' && appMenu === 'secondary' || model.type === 'settings' && appMenu === 'secondary' ) {
				navModels.secondary.push(model)
			}
		})
		return navModels
	}

	getAppMenu(model) {
	  if (model && model.app_menu) {
	    return model.app_menu;
	  } else {
	    return "primary";
	  }
	}

	setActive(el) {
		const activeItems = document.querySelectorAll('.menu-item-active');
		activeItems.forEach(function(item) {
		  item.classList.remove('menu-item-active');
		});
		el.classList.add('menu-item-active')
	}

	findMenuItemByScreenKey(screenKey) {
	  var parentUl = document.querySelector('#app-menu-main');
	  var menuItems = parentUl.querySelectorAll('li');
	  for (var i = 0; i < menuItems.length; i++) {
	    var menuItem = menuItems[i];
	    if (menuItem.getAttribute('screen') === screenKey) {
	      return menuItem;
	    }
	  }
	  return null;
	}

	clickInit() {
	  const liElements = document.getElementsByClassName('wpa-app-menu-item');

	  for (let i = 0; i < liElements.length; i++) {
	    const liElement = liElements[i];
	    liElement.addEventListener('click', this.clickHandler.bind(this));
	  }
	}

	clickHandler(e) {
		let target = ''
		console.log(e)
		if (e.target.tagName === 'LI') {
	    target = e.target
	  } else {
	    target = e.currentTarget
	  }
		console.log(target)
		const screenKey = target.getAttribute('screen')
		const menu = new Menu()
		menu.setActive(e.target)
		const screen = new Screen()
		screen.render(screenKey)
	}

}
