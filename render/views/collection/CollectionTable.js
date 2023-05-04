class CollectionTable {

	id = null
	hasControls = true

	constructor(id) {
		this.id = id
	}

	init() {
		console.log('making table...')
		return this.make()
	}

	make() {
		const el = document.createElement('table')
		el.id = this.id
		el.classList.add('w-full')
		el.appendChild(this.header())
		el.appendChild(this.data())
		el.appendChild(this.footer())
		return el
	}

	cols() {
		return [
			{
				key: 'id',
				label: 'Col 1'
			},
			{
				key: 'label',
				label: 'Col 2'
			}
		]
	}

	header() {
		const el = document.createElement('thead')
		const el2 = document.createElement('tr')
		this.cols().forEach((col) => {
			const el3 = document.createElement('th')
			el3.innerHTML = col.label
			el2.appendChild(el3)
		})

		if(this.hasControls) {
			const el4 = document.createElement('th')
			el2.appendChild(el4)
		}

		el.appendChild(el2)
		return el
	}

	data() {
		const el = document.createElement('tbody')
		var rows = [
			{
				id: 4,
				label: 'Test 1'
			},
			{
				id: 6,
				label: 'Test 2'
			}
		]
		rows.forEach((row) => {
			const el2 = document.createElement('tr')
			this.cols().forEach((col) => {
				const el3 = document.createElement('td')
				el3.innerHTML = row[col.key]
				el2.appendChild(el3)
			})

			if(this.hasControls) {
				const el4 = document.createElement('td')
				el4.innerHTML = 'EDIT / DELETE'
				el2.appendChild(el4)
			}

			el.appendChild(el2)
		})
		return el
	}

	footer() {
		const el = document.createElement('tfoot')
		const el2 = document.createElement('tr')
		const el3 = document.createElement('th')
		el3.innerHTML = 'Table footer content here.'
		el2.appendChild(el3)
		el.appendChild(el2)
		return el
	}

	render() {

	}

}
