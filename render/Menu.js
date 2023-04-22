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
		appDef.models.forEach(( modelKey ) => {
			const model = appDef[modelKey]
			if( model.type === 'standard' ) {
				el.appendChild( this.menuItem( model ) )
			}
		})
		return el
	}

	menuItem( model ) {
		const el = document.createElement('li')
		el.innerHTML = model.title_plural
		el.classList.add('clickable')
		el.classList.add('py-1')
		el.classList.add('px-0.5')
		el.setAttribute('screen', model.key)
		return el
	}

}
