class AppShellSidebar extends ComponentBase {

	constructor() {
		super()
		this.elType = 'section'
		this.defaultClasses = ['hidden', 'sm:flex', 'sm:flex-col', 'h-screen', 'basis-60', 'flex-shrink-0', 'bg-gray-800', 'p-2']
	}

	build() {
		const iconLogo = this.addChild('IconLogo')
		iconLogo.setSvgMarkup(app.def.logo)

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
		const pnav = this.addChild('NavH')
		pnav.setId('app-menu-primary')
		pnav.setItemType('icon')
		pnav.setData(navItems)
		pnav.addClass('mt-6')
		pnav.addClass('gap-4')

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

		const snav = this.addChild('NavH')
		snav.setId('app-menu-secondary')
		snav.setData(secondaryNavItems)
		snav.addClass('text-base')
		snav.addClass('mt-6')
		snav.addClass('pt-6')
		pnav.addClass('gap-2')
		snav.addClass('border-t-2')
		snav.addClass('border-white/30')

		this.make()
	}

}
