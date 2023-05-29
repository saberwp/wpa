class DateTime {

	fieldDef = false

	constructor(fieldDef) {
		this.fieldDef = fieldDef
	}

	make() {
		const el = document.createElement('div')
		let content = ''
		content += '<div class="datetimepicker-'+this.fieldDef.key+'"><input type="hidden" class="date_output" id="field-'+this.fieldDef.key+'" name="field-'+this.fieldDef.key+'" value=""></div>'
		el.innerHTML = content
		return el
	}

	init() {
		const dateTimePicker = new DateTimePickerComponent.DateTimePicker('.datetimepicker-'+this.fieldDef.key)
	}

}
