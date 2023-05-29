class SelectField {

	fieldDef = false

	constructor(fieldDef) {
		this.fieldDef = fieldDef
	}

	make(field) {

		// Init field create.
		const el = document.createElement('select')
		el.id = 'field-' + field.key
		el.name = 'field-' + field.key
		this.choicesStatic(el, field)
		return el
	}

	choicesStatic(el, field) {
		field.choices.forEach((choice) => {
			const opt = document.createElement('option')
			opt.value = choice.value
			opt.innerHTML = choice.label
			el.appendChild(opt)
		})
	}

	choicesRender(el, relationRecords) {
		relationRecords.forEach((record) => {
			const opt = document.createElement('option')
			opt.value = record.id
			opt.innerHTML = record.title
			el.appendChild(opt)
		})

	}

}
