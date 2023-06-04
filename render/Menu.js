class Menu {

	type = 'primary'

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

	make() {

		const modelNavData = this.processModels()

		if(this.type === 'primary') {
			const el = document.createElement('ul')
			el.id = 'app-menu-primary'
			el.classList.add('menu-horiz', 'text-white/60', 'list-none', 'pt-4', 'pb-6', 'm-0', 'text-base', 'font-semibold', 'border-b-2', 'border-white/30')
			el.appendChild(this.menuItem('Dashboard', 'dashboard'))

			modelNavData.primary.forEach(( model ) => {
				el.appendChild( this.menuItemModel( model ))
			})

			return el
		}

		if(this.type === 'secondary') {
			const el = document.createElement('ul')
			el.id = 'app-menu-secondary'
			el.classList.add('menu-horiz')
			el.classList.add('list-none')
			el.classList.add('p-0', 'm-0', 'mt-6', 'text-white/50', 'text-sm', 'font-semibold')

			modelNavData.secondary.forEach(( model ) => {
				el.appendChild( this.menuItemModel( model ))
			})

			el.appendChild(this.menuItem('Docs', 'docs'))
			el.appendChild(this.menuItem('Settings', 'settings'))
			el.appendChild(this.menuItem('Account', 'account'))
			return el
		}
	}

	getAppMenu(model) {
	  if (model && model.app_menu) {
	    return model.app_menu;
	  } else {
	    return "primary";
	  }
	}

	menuItem( title, screenKey ) {
		const el = document.createElement('li')
		el.innerHTML = title
		el.classList.add('wpa-app-menu-item', 'cursor-pointer', 'py-0.5', 'px-0.5')
		el.setAttribute('screen', screenKey)
		return el
	}

	menuItemModel(navModel) {
		const el = document.createElement('li')
		el.innerHTML = navModel.title
		el.classList.add('wpa-app-menu-item', 'cursor-pointer')
		el.classList.add('py-0.5')
		el.classList.add('px-0.5', 'hover:text-white/80')
		el.setAttribute('screen', navModel.key)
		return el
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
