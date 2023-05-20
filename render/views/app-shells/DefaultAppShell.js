class DefaultAppShell {

	appContainer() {
		const el = document.createElement('main')
		el.id = 'app-container'
		if( app.def.brand && app.def.brand.app_container_background ) {
			el.classList.add('app-container-background')
		} else {
			el.classList.add('bg-gray-800')
		}

		el.appendChild( this.main() )

		if(app.def.footer !== false) {
			const footer = new Footer()
			el.appendChild( footer.render() )
		}


		const appContainer = document.getElementById('wpa-app')
		appContainer.appendChild(el);
	}

	header() {
		const el = document.createElement('header')

		console.log(app.def)

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
		const el = document.createElement('section')
		el.id = 'app-sidebar'
		el.classList.add('min-w-20')
		el.classList.add('p-1')
		el.classList.add('mr-0.125')
		el.appendChild(this.brand())
		el.appendChild(app.menu.make())
		return el
	}

	brand() {
		const el = document.createElement('section')
		el.classList.add('app-brand')
		el.classList.add('flex')
		el.classList.add('items-center')
		el.classList.add('gap-1')
		el.classList.add('font-semibold')
		el.appendChild(this.logo())
		return el
	}

	logo() {
		const _logo = new Logo
		return _logo.render()
	}

	appName() {
		const el = document.createElement('div')
		el.innerHTML = app.def.title
		el.classList.add('font-lg')
		return el
	}

	screenTitle() {
		const el = document.createElement('h2')
		el.classList.add('text-lg')
		el.classList.add('font-semibold')
		el.classList.add('mb-4')
		el.innerHTML = 'Tasks' // @TODO make dynamic if needed?
		return el
	}

}
