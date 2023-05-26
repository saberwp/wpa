class Menu {

	make() {
		const el = document.createElement('ul')
		el.id = 'app-menu-main'
		el.classList.add('menu-horiz')
		el.classList.add('list-none')
		el.classList.add('p-0')
		el.classList.add('m-0')
		el.classList.add('font-lg')
		el.classList.add('font-semibold')
		el.appendChild(this.menuItem('Dashboard', 'dashboard'))
		app.def.models.forEach(( modelKey ) => {
			const model = app.def[modelKey]
			if( model.type === 'standard' || model.type === 'settings' ) {
				el.appendChild( this.menuItemModel( model ))
			}
		})
		el.appendChild(this.menuItem('Docs', 'docs'))
		return el
	}

	menuItem( title, screenKey ) {
		const el = document.createElement('li')
		el.innerHTML = title
		el.classList.add('clickable')
		el.classList.add('py-1')
		el.classList.add('px-0.5')
		el.setAttribute('screen', screenKey)
		return el
	}

	menuItemModel( model ) {
		const el = document.createElement('li')
		el.innerHTML = model.title_plural
		el.classList.add('clickable')
		el.classList.add('py-1')
		el.classList.add('px-0.5')
		el.setAttribute('screen', model.key)
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

}
