class List {

	constructor() {
		this.sorting = {
			init: 0,
			field: 'id',
			dir: 'desc'
		}
	}

	init() {

		// Edit init.
		app.edit.init()

		// Delete init.
		app.delete.init()

		// Sorter init.
		if( ! this.sorting.init ) {
			this.sortHandler = this.sortHandler.bind(this);
			const sortButton = document.getElementById('model-list-sorter')
			sortButton.addEventListener('click', this.sortHandler)
			this.sorting.init = 1
		}

	}

	reset() {
		this.sorting.init = 0

		// @TODO possibly return the sorting to default here? Or leave it?

	}

	make() {

		this.reset() // During remake DOM is recreated, which means the sorting init flag needs resetting.
		const el = document.createElement('section')
		el.id = 'model-list-container'
		el.appendChild( this.sorter() )
		el.appendChild( this.list() )
		return el
	}

	list() {
		const el = document.createElement('ul')
		el.id = 'model-list'
		return el
	}

	refresh() {
		const container = document.getElementById('model-list')
		container.innerHTML = '' // Clear any existing records.
		const data = app.currentModelRecordStore()

		console.log('data from data store in refresh:')
		console.log(data)

		this.dataInsert(container, data)
		this.init()
	}

	dataInsert(container, data) {
		data.forEach((item) => {
			container.appendChild( this.listItem(item) )
		})
	}

	listItem(item) {
		const el = document.createElement('li')
		el.classList.add('grid')
		el.classList.add('gap-1')
		el.appendChild( this.listItemId(item) )
		el.appendChild( this.listItemTitle(item) )
		appDef[app.data.currentModel].fields.forEach(( field ) => {
			console.log('loop over fields in list item, item should have fields here:')
			console.log(item)
			el.appendChild( this.listItemField(item, field) )
		})
		el.appendChild( this.listItemEditButton(item) )
		el.appendChild( this.listItemDeleteButton(item) )
		return el
	}

	listItemField(item, field) {
		const el = document.createElement('div')
		el.innerHTML = item[ field.key ]
		return el
	}

	listItemId(item) {
		const el = document.createElement('h5')
		el.innerHTML = item.id
		return el
	}

	listItemTitle(item) {
		const el = document.createElement('h3')
		el.innerHTML = item.title
		return el
	}

	listItemEditButton(item) {
		const el = document.createElement('button')
		el.innerHTML = 'Edit'
		el.classList.add('edit-button')
		el.classList.add('clickable')
		el.setAttribute('object-id',item.id)
		return el
	}

	listItemDeleteButton(item) {
		const el = document.createElement('button')
		el.innerHTML = 'Delete'
		el.classList.add('delete-button')
		el.classList.add('clickable')
		el.setAttribute('object-id',item.id)
		return el
	}

	sorter() {
		const el = document.createElement('button')
		el.id = 'model-list-sorter'
		el.innerHTML = 'Sort'
		el.classList.add('clickable')
		return el
	}

	sortHandler() {

			console.log('sorting....')
			console.log(this)
			this.sort('id', 'desc')

	}

	sortToggle() {
		this.sorting.dir = this.sorting.dir === 'asc' ? 'desc' : 'asc';
	}

	sort(field, dir) {

		// Check if already sorted by this field, if it is just call sortReverse().
		if( field === this.sorting.field ) {
			console.log('sort by same field, reversing...')
			this.sortReverse()
			this.sortToggle()
			this.refresh()
			return;
		}

		// Store sorting data.
		this.sorting = {
			field: field,
			dir: dir
		}

		// Sort stored data.
		app.currentModelRecordStore().sort((a, b) => {
			const aVal = a[field];
			const bVal = b[field];

			if (aVal < bVal) {
				return dir === 'asc' ? -1 : 1;
			} else if (aVal > bVal) {
				return dir === 'asc' ? 1 : -1;
			} else {
				return 0;
			}
		});

		// Refresh list.
		this.refresh()

	}

	sortReverse() {
		app.currentModelRecordStore().reverse();
	}

}
