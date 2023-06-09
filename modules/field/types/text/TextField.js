class TextField {

	fieldDef = false
	component = false

	constructor(fieldDef) {
		this.fieldDef = fieldDef
	}

	componentType() {
		return 'Input'
	}

	setComponent(component) {
		this.component = component
	}

	componentConfigure(component) {
		this.component.setId('field-'+this.fieldDef.key)
		this.component.setPlaceholder(this.fieldDef.placeholder)
	}

	init() {}

}
