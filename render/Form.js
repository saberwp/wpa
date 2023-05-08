/*
 * Form
 *
 * Base class for the management of forms in WPA.
 * Loaded into global app as app.form.
 */
class Form {

	/* @param modelDef the definition of the model to build the form for. */
	make(modelDef) {

		const el = document.createElement('form')
		el.setAttribute('model-key', modelDef.key)
		el.id = 'save-form'
		el.name = 'save-form'

		el.appendChild( this.fieldId() )

		// Conditional display title field.
		if(modelDef.title_field) {
			el.appendChild( this.fieldTitle() )
		}

		// Add fields to form.
		modelDef.fields.forEach((field) => {

			if( field.type === 'text' ) {
				el.appendChild( this.field(field) )
			}

			if( field.type === 'textarea' ) {
				const fieldMaker = new TextArea()
				const fieldEl = fieldMaker.make(field)
				el.appendChild( fieldEl )
			}

			if( field.type === 'select' ) {
				const fieldMaker = new Select()
				const fieldEl = fieldMaker.make(field)
				el.appendChild( fieldEl )
			}

			if( field.type === 'relation_select' ) {
				const fieldMaker = new Select()
				const fieldEl = fieldMaker.make(field)
				el.appendChild( fieldEl )
			}

			// Relation Select Multiple /render/fields/SelectMultiple.js
			if( field.type === 'relation_select_multiple' ) {
				const fieldMaker = new RelationSelectMultiple()
				const fieldEl = fieldMaker.make(field)
				el.appendChild( fieldEl )
			}

		})

		el.appendChild( this.saveButton() )
		return el
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

	field(field) {
		const el = document.createElement('input')
		el.type = field.type
		el.placeholder = field.placeholder
		el.id = 'field-' + field.key
		el.name = 'field-' + field.key
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
			if( 0 === parseInt(formValues['field-id']) ) {
				const record = this.prepareRecord(formModelDef, formValues)
				app.create.recordModel(formModelDef, record)
			} else {
				const record = this.prepareRecord(formModelDef, formValues)
				app.edit.update(record)
			}
		})
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
