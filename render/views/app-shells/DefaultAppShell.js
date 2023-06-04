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
		el.classList.add('flex', 'gap-2', 'justify-between', 'text-gray-500', 'bg-white', 'border-b-2', 'border-gray-900/30', 'mb-4')

		// Make inline logging form.
		const flex1 = new Flex()
		flex1.build()

		this.addInlineLoggingForm(flex1)

		el.appendChild(flex1.get())

		// Make container for header/right side.
		const flex2 = new Flex()
		flex2.build()
		el.appendChild(flex2.get())

		const notifyIcon = new Svg
		notifyIcon.setSvgMarkup('<svg width="48" height="34" viewBox="0 0 48 34" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16.3425 16.4703L18.99 23.7528L18.1425 27.0828L0 20.4753L0.9675 17.8053L6.0075 14.2053L8.7375 6.70532C10.665 1.41782 16.5075 -1.30468 21.7875 0.615318C21.855 0.637818 21.915 0.660318 21.975 0.690318C16.6425 3.84032 14.1375 10.4403 16.335 16.4703H16.3425ZM7.3125 25.6953L16.155 28.9128C15.3075 30.2853 13.7925 31.1928 12.0675 31.1928C9.4125 31.1928 7.26 29.0403 7.26 26.3928C7.26 26.1528 7.275 25.9203 7.3125 25.6953ZM44.6175 24.1578L44.1525 24.3303L39.9525 25.8603L31.2375 29.0253L27.0375 30.5553L20.91 32.7828L19.8825 29.9628L20.0625 29.2653L21.5025 23.6253L18.6 15.6453C16.575 10.0803 19.44 3.93032 25.005 1.90532C30.57 -0.119682 36.7275 2.75282 38.7525 8.31782L41.655 16.2978L46.38 19.6953L46.965 20.1153L48 22.9278L44.6175 24.1578ZM40.89 28.8003C40.89 28.9878 40.8825 29.1753 40.86 29.3628C40.5825 31.7478 38.55 33.6003 36.09 33.6003C34.815 33.6003 33.6525 33.1053 32.7975 32.2953C32.565 32.0778 32.355 31.8303 32.1675 31.5678L36.0975 30.1428L39.7725 28.8003L40.875 28.3953C40.8825 28.5303 40.89 28.6653 40.89 28.8003ZM42.285 21.1803L39.555 19.2228L38.655 18.5778L38.2725 17.5353L35.37 9.54782C34.0275 5.85032 29.9325 3.94532 26.235 5.28782C22.5375 6.63032 20.6325 10.7178 21.975 14.4153L24.8775 22.3953L25.26 23.4378L24.9825 24.5178L24.15 27.7728L42.2775 21.1728L42.285 21.1803Z" fill="#111827" fill-opacity="0.2"/></svg>')
		notifyIcon.addClass('cursor-pointer')
		notifyIcon.removeDefaultClass('w-6')
		notifyIcon.addClass('w-10')
		notifyIcon.make()
		flex2.el.appendChild(notifyIcon.get())

		const dividerH = new DividerH()
		dividerH.build()
		flex2.el.appendChild(dividerH.get())

		const avatar = new Avatar()
		avatar.build()
		flex2.el.appendChild(avatar.get())

		const nav = new NavDropdown()
		nav.build()
		flex2.el.appendChild(nav.get())

		return el
	}

	addInlineLoggingForm(container) {

		// Make exercise select.
		const exerciseSelect = new FormSelect()
		exerciseSelect.build()
		container.el.appendChild(exerciseSelect.get())

		// Make log type select.
		const logTypeSelect = new FormSelect()
		logTypeSelect.build()
		container.el.appendChild(logTypeSelect.get())

		// Make value input.
		const valueInput = new FormElementInput()
		valueInput.build()
		container.el.appendChild(valueInput.get())

		// Make save button.
		const formButton = new FormButton()
		formButton.build()
		container.el.appendChild(formButton.get())
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

	sidebar() {

		const sidebar = new Sidebar()
		sidebar.setId('app-sidebar')
		const iconLogo = sidebar.addChild('IconLogo')

		// Add logo.
		iconLogo.setSvgMarkup(app.def.logo)
		iconLogo.build()

		// Get models for rendering in navs.
		const navModels = app.menu.processModels()

		// Primary nav.
		const navItems = [
			{
				title: 'Dashboard',
				screen: 'dashboard',
				icon: '/wp-content/plugins/wpa/assets/house-heart-sharp-regular.svg'
			}
		]
		navModels.primary.forEach((modelDef) => {
			const navItem = {
				title: modelDef.title,
				screen: modelDef.key,
				icon: modelDef.icon
			}
			navItems.push(navItem)
		})
		const pnav = sidebar.addChild('NavH')
		pnav.setId('app-menu-primary')
		pnav.setItemType('icon')
		pnav.setData(navItems)
		pnav.addClass('mt-6')
		pnav.addClass('gap-4')

		// Do the build to create the IconNavItem children.
		pnav.build()

		// Secondary nav.
		const secondaryNavItems = []
		navModels.secondary.forEach((modelDef) => {
			const navItem = {
				title: modelDef.title,
				screen: modelDef.key
			}
			secondaryNavItems.push(navItem)
		})
		secondaryNavItems.push(
			{
				title: 'Docs',
				screen: 'docs'
			}
		)
		secondaryNavItems.push(
			{
				title: 'Settings',
				screen: 'settings'
			}
		)
		secondaryNavItems.push(
			{
				title: 'Account',
				screen: 'account'
			}
		)

		const snav = sidebar.addChild('NavH')
		snav.setId('app-menu-secondary')
		snav.setData(secondaryNavItems)
		snav.addClass('text-base')
		snav.addClass('mt-6')
		snav.addClass('pt-6')
		pnav.addClass('gap-2')
		snav.addClass('border-t-2')
		snav.addClass('border-white/30')

		snav.build()

		sidebar.make()
		return sidebar.get()
	}

}
