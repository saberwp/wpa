class DateTime {

	fieldDef = false

	constructor(fieldDef) {
		this.def = fieldDef
	}

	make(field) {
		console.log('make field key: ' + field.key)
		const el = document.createElement('div')
		let content = ''
		content += '<div id="datetimepicker"><input type="hidden" class="date_output" id="field-'+field.key+'" name="field-'+field.key+'" value=""></div>'
		el.innerHTML = content
		return el
	}

	init() {
		const dateTimePicker = new DateTimePickerComponent.DateTimePicker("datetimepicker")
		console.log(dateTimePicker)
	}

}
