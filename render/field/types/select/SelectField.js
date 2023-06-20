class SelectField {

	fieldDef = false

	constructor(fieldDef) {
		this.fieldDef = fieldDef
	}

	componentType() {
		return 'FormSelect'
	}

	setComponent(component) {
		this.component = component
	}

	componentConfigure(component) {

		console.log('componentConfigure/SelectField.js:')
		console.log(this.fieldDef)

		this.component.setId('field-'+this.fieldDef.key)
		this.component.setData(this.fieldDef.choices)
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
