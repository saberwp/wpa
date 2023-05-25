class TextField {

	make(field) {
		const el = document.createElement('input')
		el.type = field.type
		el.placeholder = field.placeholder
		el.id = 'field-' + field.key
		el.name = 'field-' + field.key
		return el
	}

	init() {}

}
