class DateTime {

	// See source: https://github.com/marcellosurdi/DateTimePickerComponent

	fieldDef = false
	fieldInit = false

	constructor(fieldDef) {
		this.fieldDef = fieldDef
	}

	componentType() {
		return 'TimePicker'
	}

	setComponent(component) {
		this.component = component
	}

	componentConfigure(component) {
		this.component.setId('field-'+this.fieldDef.key)
		this.component.setName('field-'+this.fieldDef.key)
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

	valueFilter(value) {
		const dateTimeParts = value.split(' ');
		const dateParts = dateTimeParts[0].split('-');
		const timeParts = dateTimeParts[1].split(/:|(?=[AP]M)/);

		let hour = parseInt(timeParts[0], 10);
		const minute = timeParts[1];
		const period = timeParts[2];

		if (period === 'PM' && hour !== 12) {
		  hour += 12;
		} else if (period === 'AM' && hour === 12) {
		  hour = 0;
		}

		const formattedDateTime = `${dateParts[0]}-${dateParts[1]}-${dateParts[2]} ${String(hour).padStart(2, '0')}:${minute}:00`;
		return formattedDateTime;
	}

}
