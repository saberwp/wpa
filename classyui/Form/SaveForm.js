class SaveForm extends ComponentBase {

	modelDef = false
	fieldInstances = []

	constructor() {
		super()
		this.elType = 'form'
		this.setId('save-form')
		this.defaultClasses = ['bg-white/90', 'p-4']

	}

	build() {

		this.addChild('InputID')
		this.addFields()
		this.addChild('SaveButton')
		this.make()
		this.el.name = 'save-form'
		this.el.setAttribute('model-key', this.modelDef.key)

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

			/* Load field type from Field() class. */
			const fieldClass = new Field()
			const fieldType = fieldClass.loadFieldTypeClass(field.type, field)
			if(fieldType) {
				this.fieldInstances.push(fieldType)

				console.log(fieldType)

				if (typeof fieldType.componentType === 'function') {
					const component = this.addChild(fieldType.componentType())
					fieldType.setComponent(component)
					fieldType.componentConfigure()
				}

			} else {
				console.error('Could not load field.type '+field.type)
			}

		})

	}

}
