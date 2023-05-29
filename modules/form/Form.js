/*
 * Form
 *
 * Base class for the management of forms in WPA.
 * Loaded into global app as app.form.
 */
class Form {

	fieldInstances = []

	/* @param modelDef the definition of the model to build the form for. */
	make(modelDef) {

		const el = document.createElement('form')
		el.setAttribute('model-key', modelDef.key)
		el.id = 'save-form'
		el.name = 'save-form'

		el.appendChild( this.fieldId() )

		// Conditional display title field.
		if(modelDef.title_field !== false) {
			el.appendChild( this.fieldTitle() )
		}

		// Add fields to form.
		modelDef.fields.forEach((field) => {

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

		el.appendChild( this.saveButton() )
		return el
	}

	init(modelDef) {
		this.fieldInstances.forEach((fieldInstance) => {
			fieldInstance.init()
		})

		// Add fields to form.
		modelDef.fields.forEach((field) => {

			if( field.type === 'keygen' ) {
				const fieldMaker = new KeyGen()
				fieldMaker.init()
			}

		})

	}

	fieldId() {
		const el = document.createElement('input')
		el.type = 'hidden'
		el.id = 'field-id'
		el.name = 'field-id'
		el.value = 0
		return el
	}

	fieldTitle() {
		const el = document.createElement('input')
		el.type = 'text'
		el.id = 'field-title'
		el.name = 'field-title'
		el.placeholder = 'Record title...'
		return el
	}

	saveButton() {
		const el = document.createElement('input')
		el.type = 'submit'
		el.value = 'Save'
		el.id = 'button-save'
		return el
	}

	// For a drafted record, add the defined field values from the model.
	// Form values passed in values param.
	definedFieldValues(record, model, values) {
		model.fields.forEach((field) => {
			record[field.key] = values['field-'+field.key]
		})
		return record
	}

	// Parse data from form given the element.
	formDataParse(formEl) {
		const formData = new FormData(formEl);
		const data = Object.fromEntries(formData.entries());
		return data
	}

	submit(formEl) {
		formEl.addEventListener('submit', (event) => {
			event.preventDefault();
			const formModelKey = event.target.getAttribute('model-key')
			const formModelDef = app.def[formModelKey]
			const formValues = this.formDataParse(formEl)

			// Draft record.
			const record = this.prepareRecord(formModelDef, formValues)

			// Do validation.
			const validationResult = this.validate(record, formModelDef)

			if(!validationResult.pass) {
				// No pass validation.
				this.validateFailHandler()
				return
			}

			if( 0 === parseInt(formValues['field-id']) ) {
				app.create.recordModel(formModelDef, record)
			} else {
				app.edit.update(record)
			}
		})
	}

	validateFailHandler() {
		const container = document.querySelector('.modal-container > main')
		const el = document.createElement('div')
		el.classList.add('validation-error')
		el.innerHTML = 'Validation failed.'
		container.appendChild(el)
	}

	// Validate the entire record drafted based on the form data.
	validate(record, modelDef) {

		const result = {
			pass: false,
			failCount: 0,
			passCount: 0
		}

		// Loop over defined fields to validate individually.
		modelDef.fields.forEach((field) => {
			if(field.hasOwnProperty('validation') && field.validation.length > 0) {

				// @TODO add check to make sure record contains field value.
				const validator = new FieldValidator()
				const fieldResult = validator.test(field, record[field.key])
				if(fieldResult.pass) {
					result.passCount++
				}
				if(!fieldResult.pass) {
					result.failCount++
				}

			}
		})

		if(result.failCount === 0) {
			result.pass = true
		}

		return result
	}

	prepareRecord(formModelDef, formValues) {
		let record = {
			id: formValues['field-id'],
		}
		// @TODO in the future check the model def here instead of the form values to see if option "useTitle" is set to true.
		if(formValues['field-title']) {
			record.title = formValues['field-title']
		}
		record = this.definedFieldValues(record, formModelDef, formValues)
		return record
	}

}