class DefaultAppShell {

	appContainer() {
		const el = document.createElement('main')
		el.id = 'app-container'
		el.classList.add('flex-grow')
		if( app.def.brand && app.def.brand.app_container_background ) {
			el.classList.add('app-container-background')
		} else {
			el.classList.add('bg-gray-800')
		}

		if(app.def?.location?.where === 'back') {
			el.classList.add('h-[calc(100vh-97px)]', 'md:h-[calc(100vh-97px)]', 'bg-gray-800', 'text-white')
		}

		el.appendChild( this.main() )

		if(app.def.footer !== false) {
			const footer = new Footer()
			el.appendChild( footer.render() )
		}

		const appContainer = document.getElementById('wpa-app')
		appContainer.classList.add('h-screen', 'flex')
		appContainer.appendChild(el);
	}

	header() {
		const el = document.createElement('header')

		// Add search only if defined in app def.
		if(app.def.search) {
			el.appendChild(this.headerSearch())
		}

		el.id = 'app-header'
		el.classList.add('text-white')
		return el
	}

	headerSearch() {
		const el = document.createElement('input')
		el.type = 'text'
		el.placeholder = 'search'
		return el
	}

	body() {
		const el = document.createElement('div')
		el.id = 'app-body'
		el.classList.add('p-1')
		return el
	}

	main() {
		const el = document.createElement('main')
		el.id = 'app-main'
		el.classList.add('flex')
		el.classList.add('text-white')

		if(app.def.sidebar !== false) {
			el.appendChild( this.sidebar() ) // Add menu.
		}

		const mainWrapEl = document.createElement('section')
		mainWrapEl.id = 'app-main-wrap'

		if(app.def.header !== false) {
			mainWrapEl.appendChild( this.header() ) // Add header.
		}


		mainWrapEl.appendChild( this.body() ) // Add body.
		el.appendChild( mainWrapEl )

		return el
	}

	// @TODO move to Sidebar() class.
	sidebar() {

		const sidebar = new Sidebar()
		sidebar.setId('app-sidebar')

		// Add logo.
		const iconLogo = new IconLogo()
		iconLogo.setSvgMarkup(app.def.logo)
		iconLogo.build()
		sidebar.setContent(iconLogo.get())

		// Add primary menu.
		sidebar.setContent(app.menu.make())

		// Add secondary menu.
		app.menu.setType('secondary')
		sidebar.setContent(app.menu.make())

		return sidebar.get()
	}

}
