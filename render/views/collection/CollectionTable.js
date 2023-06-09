class CollectionTable {

	id = null
	data = false
	modelKey = false
	modelDef = false
	hasControls = true
	sorting = {
		init: 0,
		field: 'id',
		dir: 'desc'
	}

	constructor(id, modelKey) {
		this.id = id
		this.modelKey = modelKey
		this.modelDef = app.def[modelKey]
	}

	init() {

		// Edit init if model supports it.
		if(this.provideEditOperation()) {
			app.edit.init()
		}

		// Delete init.
		app.delete.init()

		// Sorter init.
		if( ! this.sorting.init ) {
			this.sortingInit()
			this.sorting.init = 1
		}

	}

	make() {
		const wrapEl = document.createElement('div')
		wrapEl.classList.add('flex-grow', 'overflow-y-auto', 'bg-gray-600', 'p-2', 'rounded', 'box-border')
		const el = document.createElement('table')
		el.id = this.id
		el.classList.add('table-fixed', 'w-full', 'divide-y', 'divide-gray-700', 'bg-gray-600')
		el.appendChild(this.header())
		el.appendChild(this.tbody())
		el.appendChild(this.footer())
		wrapEl.appendChild(el)
		return wrapEl
	}

	renderId() {
		const setting = this.modelDef?.collections?.table?.show_id;
		if (setting === undefined || setting === true) {
			return true
		}
		return false
	}

	renderTitle() {
		const setting = this.modelDef?.title_field;
		if (setting === undefined || setting === true) {
			return true
		}
		return false
	}

	provideEditOperation() {
		const setting = this.modelDef?.operations?.edit;
		if (setting === undefined || setting === true) {
			return true
		}
		return false
	}

	cols() {
		const cols = []

		// If ID add it to cols.
		const showId = this.modelDef?.collections?.table?.show_id;

		// By default we show ID, so if it's undefined or true, we render it.
		if(this.renderId()) {
			const col = {
				key: 'id',
				label: 'ID'
			}
			cols.push(col)
		}

		// By default we show title, so if it's undefined or true, we render it.
		if(this.renderTitle()) {
			const col = {
				key: 'title',
				label: 'Title'
			}
			cols.push(col)
		}

		this.modelDef.fields.forEach(( field ) => {
			const col = {
				key: field.key,
				label: field.label
			}
			cols.push(col)
		})

		// Add <th> for controls column.
		const colControls = {
			key: 'controls',
			label: ''
		}
		cols.push(colControls)

		return cols
	}

	header() {
		const el = document.createElement('thead')
		const el2 = document.createElement('tr')
		this.cols().forEach((col) => {
			const el3 = document.createElement('th')
			el3.classList.add(
				'cursor-pointer',
			  'py-3.5',
			  'px-3',
			  'text-left',
			  'text-sm',
			  'font-semibold',
			  'text-white'
			)
			el3.innerHTML = col.label
			el3.setAttribute('col-key',col.key)
			el2.appendChild(el3)
		})

		if(this.hasControls) {
			const el4 = document.createElement('th')
			el2.appendChild(el4)
		}

		el.appendChild(el2)
		return el
	}

	tbody() {
		const el = document.createElement('tbody')
		el.classList.add('divide-y', 'divide-gray-800')
		el.id = 'wpa-collection-table-body'
		return el
	}

	footer() {
		const el = document.createElement('tfoot')
		const el2 = document.createElement('tr')
		const el3 = document.createElement('th')
		el2.appendChild(el3)
		el.appendChild(el2)
		return el
	}

	refresh() {
		this.data = app.dm.currentModelRecordStore()
		const container = document.getElementById('wpa-collection-table-body')
		container.innerHTML = ''
		this.dataInsert(container)
		this.init()
	}

	dataInsert(container) {
		this.data.forEach((item) => {
			container.appendChild( this.itemMake(item) )
		})
	}

	/*
	 * Make all the table rows (record items)
	 */
	itemMake(item) {

		const el = document.createElement('tr')

		// By default we show ID, so if it's undefined or true, we render it.
		if(this.renderId()) {
			el.appendChild( this.itemFieldByKey(item, 'id') )
		}

		// By default we show Title, so if it's undefined or true, we render it.
		if(this.renderTitle()) {
			el.appendChild( this.itemFieldByKey(item, 'title') )
		}

		this.modelDef.fields.forEach(( field ) => {
			if(field.type !== 'relation_select') {
				el.appendChild( this.listItemField(item, field) )
			}
			if(field.type === 'relation_select') {
				el.appendChild( this.listItemFieldRelation(item, field) )
			}
		})

		/* Add control column. */
		const controlCol = document.createElement('td')
		controlCol.classList.add(
		  'px-3',
		  'py-4',
		  'text-sm',
		  'text-gray-300'
		)
		el.appendChild(controlCol)

		/* Edit button. */
		if(this.provideEditOperation()) {
			const editButton = new TextButton()
			editButton.setContent('EDIT')
			editButton.addClass('edit-button')
			editButton.addClass('mr-3')
			editButton.build()
			editButton.el.setAttribute('object-id', item.id)
			controlCol.appendChild(editButton.get())
		}

		/* Delete button. */
		const deleteButton = new TextButton()
		deleteButton.setContent('DELETE')
		deleteButton.addClass('delete-button')
		deleteButton.build()
		deleteButton.el.setAttribute('object-id', item.id)
		controlCol.appendChild(deleteButton.get())

		return el
	}

	itemFieldByKey(item, key) {
		const el = document.createElement('td')
		el.classList.add(
		  'px-3',
		  'py-4',
		  'text-sm',
		  'text-gray-300'
		)
		el.innerHTML = item[ key ]
		return el
	}

	listItemField(item, field) {
		const el = document.createElement('td')
		el.classList.add(
		  'px-3',
		  'py-4',
		  'text-sm',
		  'text-gray-300'
		)
		el.innerHTML = item[ field.key ]
		return el
	}

	listItemFieldRelation(item, field) {
		const el = document.createElement('td')
		el.id = 'record-'+item.id+'-'+field.key
		el.classList.add(
		  'px-3',
		  'py-4',
		  'text-sm',
		  'text-gray-300'
		)
		el.innerHTML = 'Pending...'

		// Do request for data required.
		app.dm.fetchRelation(this.modelKey, item.id, field.relation)
		document.addEventListener('app_data_loaded_relation', (event) => {
			if(event.detail.recordId === item.id && event.detail.relationModelKey === field.relation.model && event.detail.recordModelKey === this.modelKey) {
				if(event.detail?.records && event.detail.records.length > 0) {
					const relationModelDef = app.def[field.relation.model]
					const renderModelKey = relationModelDef.relations[field.relation.side].model
					const records = event.detail.records
					records.forEach((relationRecord) => {
						const relatedRecord = app.data[renderModelKey].index[relationRecord[renderModelKey+'_id']]
						if(relatedRecord) {
							el.innerHTML = relatedRecord.id + ' / ' + relatedRecord.title
						} else {
							el.innerHTML = relationRecord.id
						}
					})
				} else {
					el.innerHTML = '--'
				}
			}
		})

		return el
	}

	sortingInit() {

		const thElements = document.querySelectorAll('#list-table th');

		thElements.forEach((th) => {
		  th.addEventListener('click', function(e) {
				const colKey = e.target.getAttribute('col-key')
				this.sort(colKey, 'desc')
		  }.bind(this));
		});

	}

	sort(field, dir) {

		// Check if already sorted by this field, if it is just call sortReverse().
		if( field === this.sorting.field ) {
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
		app.dm.currentModelRecordStore().sort((a, b) => {
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
		app.dm.currentModelRecordStore().reverse();
	}

	sortToggle() {
		this.sorting.dir = this.sorting.dir === 'asc' ? 'desc' : 'asc';
	}

	makeEditButton(item) {
		const el = document.createElement('button')
		el.innerHTML = 'Edit'
		el.classList.add('edit-button')
		el.classList.add('clickable')
		el.setAttribute('object-id',item.id)
		return el
	}

	makeDeleteButton(item) {
		const el = document.createElement('button')
		el.innerHTML = 'Delete'
		el.classList.add('delete-button')
		el.classList.add('clickable')
		el.setAttribute('object-id',item.id)
		return el
	}


}
