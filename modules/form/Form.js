/*
 * Form
 *
 * Base class for the management of forms in WPA.
 * Loaded into global app as app.form.
 */
class Form {

	fieldInstances = []

	/*
	 * Maker Method
	 * @example form.make(modelDef)
	 * @param modelDef the definition of the model to build the form for.
	 * @return DomElement type=form
	 */
	make(modelDef) {

		console.log(modelDef.fields)

		const saveForm = new SaveForm()
		saveForm.setModelDef(modelDef)
		saveForm.build()
		return saveForm.get()

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

	// For a drafted record, add the defined field values from the model.
	// Form values passed in values param.
	definedFieldValues(record, model, values) {
		const fieldClass = new Field()
		model.fields.forEach((field) => {
			const fieldType = fieldClass.loadFieldTypeClass(field.type, field)
			if(fieldType && typeof fieldType.valueFilter === 'function') {
				record[field.key] = fieldType.valueFilter(values['field-'+field.key])
			} else {
				record[field.key] = values['field-'+field.key]
			}
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
