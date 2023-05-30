class DateTime {

	// See source: https://github.com/marcellosurdi/DateTimePickerComponent

	fieldDef = false
	fieldInit = false

	constructor(fieldDef) {
		this.fieldDef = fieldDef
	}

	make() {
		const el = document.createElement('div')
		let content = ''
		content += '<div id="datetimepicker-'+this.fieldDef.key+'"><input type="text" class="date_output" id="field-'+this.fieldDef.key+'" name="field-'+this.fieldDef.key+'" value=""></div>'
		el.innerHTML = content
		return el
	}

	init() {
		if(!this.fieldInit) {
			console.log('DateTime init()')
			const dateTimePicker = new DateTimePickerComponent.DateTimePicker('datetimepicker-'+this.fieldDef.key)
			this.fieldInit = true
			console.log(dateTimePicker)
		}
	}

}
