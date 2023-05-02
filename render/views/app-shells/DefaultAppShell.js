class DefaultAppShell {

	appContainer() {
		const el = document.createElement('main')
		el.id = 'app-container'
		if( appDef.brand && appDef.brand.app_container_background ) {
			el.classList.add('app-container-background')
		} else {
			el.classList.add('bg-gray-800')
		}

		el.appendChild( this.main() ) // Add header.
		el.appendChild( this.footer() ) // Add footer.
		document.body.appendChild(el);
	}

	header() {
		const el = document.createElement('header')
		el.appendChild(this.headerSearch())
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

	footer() {
		const el = document.createElement('footer')
		el.id = 'app-footer'
		el.classList.add('flex')
		el.classList.add('text-white')
		el.appendChild( this.logo() ) // Add nested logo el.
		el.appendChild( this.footerText() ) // Add nested logo el.
		return el
	}

	footerText() {
		const el = document.createElement('p')
		el.innerHTML = appDef.title
		el.classList.add('font-semibold')
		return el
	}

	main() {
		const el = document.createElement('main')
		el.id = 'app-main'
		el.classList.add('flex')
		el.classList.add('text-white')
		el.appendChild( this.sidebar() ) // Add menu.

		const mainWrapEl = document.createElement('section')
		mainWrapEl.id = 'app-main-wrap'
		mainWrapEl.appendChild( this.header() ) // Add header.
		mainWrapEl.appendChild( this.body() ) // Add body.
		el.appendChild( mainWrapEl )

		return el
	}

	sidebar() {
		const el = document.createElement('section')
		el.id = 'app-sidebar'
		el.classList.add('min-w-20')
		el.classList.add('p-1')
		el.classList.add('mr-0.125')
		el.classList.add('bg-gray-800')
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
		el.appendChild(this.appName())
		return el
	}

	logo() {
		const el = document.createElement('div')
		el.classList.add('app-logo')
		el.innerHTML = '<svg width="48" height="48" fill="white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><defs><style>.fa-secondary{opacity:.4}</style></defs><path class="fa-primary" d="M331.2 146.9l-8.4-50.7c-1.7-10.2 1.6-20.6 8.9-27.9l51.2-51.2C391 9 404.7 11.9 409 22.5L432 80l57.5 23c10.7 4.3 13.5 18 5.4 26.2l-51.2 51.2c-7.3 7.3-17.7 10.6-27.9 8.9l-50.7-8.4L273 273c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l92.1-92.1z"/><path class="fa-secondary" d="M335.2 244.7c.5 3.7 .8 7.5 .8 11.3c0 44.2-35.8 80-80 80s-80-35.8-80-80s35.8-80 80-80c3.8 0 7.6 .3 11.3 .8l31.2-31.2L293.7 117c-12-3.3-24.7-5-37.7-5c-79.5 0-144 64.5-144 144s64.5 144 144 144s144-64.5 144-144c0-13.1-1.7-25.7-5-37.7l-28.6-4.8-31.2 31.2zm110.1-20.8c1.8 10.4 2.7 21.1 2.7 32.1c0 106-86 192-192 192S64 362 64 256S150 64 256 64c10.9 0 21.6 .9 32.1 2.7l9.3-9.3 43.1-43.1C314 5 285.6 0 256 0C114.6 0 0 114.6 0 256S114.6 512 256 512s256-114.6 256-256c0-29.6-5-58-14.3-84.5l-43.1 43.1-9.3 9.3z"/></svg>';
		return el
	}

	appName() {
		const el = document.createElement('div')
		el.innerHTML = appDef.title
		el.classList.add('font-lg')
		return el
	}

	screenTitle() {
		const el = document.createElement('h2')
		el.innerHTML = 'Tasks' // @TODO make dynamic if needed?
		return el
	}

}