class SaveForm extends ComponentBase {

	modelDef = false
	fieldInstances = []

	constructor() {
		super()
		this.elType = 'form'
		this.setId('save-form')
		this.defaultClasses = ['bg-red-100', 'p-4']

	}

	build() {

		this.addChild('InputID')
		this.addChild('SaveButton')
		this.make()
		this.el.name = 'save-form'
		this.el.setAttribute('model-key', this.modelDef.key)

		// Add fields.
		const fieldsEl = this.addFields()
		this.el.appendChild(fieldsEl)

		// Attach submit event handler.
		const form = new Form()
		form.submit(this.el)
	}

	setModelDef(modelDef) {
		this.modelDef = modelDef
	}

	addFields() {

		const el = document.createElement('div')
		this.modelDef.fields.forEach((field) => {

			let fieldEl = ''

			/* Load field type from Field() class. */
			const fieldClass = new Field()
			const fieldType = fieldClass.loadFieldTypeClass(field.type, field)
			if(fieldType) {
				this.fieldInstances.push(fieldType)
				fieldEl = fieldType.make(field)
				el.appendChild( fieldEl )
			} else {
				console.error('Could not load field.type '+field.type)
			}

		})
		return el

	}

}
