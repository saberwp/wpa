class TextArea {

	make(field) {

		const el = document.createElement('textarea')
		el.placeholder = field.placeholder
		el.id = 'field-' + field.key
		el.name = 'field-' + field.key
		return el

	}

}
