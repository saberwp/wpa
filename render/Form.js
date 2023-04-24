class Form {

	make() {
		const el = document.createElement('form')
		el.id = 'save-form'
		el.name = 'save-form'

		el.appendChild( this.fieldId() )
		el.appendChild( this.fieldTitle() )

		// Add fields to form.
		appDef[app.data.currentModel].fields.forEach((field) => {

			if( field.type === 'text' ) {
				el.appendChild( this.field(field) )
			}

			if( field.type === 'textarea' ) {
				const fieldMaker = new TextArea()
				const fieldEl = fieldMaker.make(field)
				el.appendChild( fieldEl )
			}

		})

		// Add relations to form.
		appDef[app.data.currentModel].relations.forEach((relation) => {
			if( relation.type === 'one' ) {
				el.appendChild( this.fieldRelation(relation) )
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

	// Build select elements with option for each record in the referenced data source model.
	fieldRelation(relation) {
		const el = document.createElement('select')
		el.id = 'field-' + relation.model
		el.name = 'field-' + relation.model

		const sourceModelKey = relation.model
		const sourceRecords  = app.data[sourceModelKey].record
		sourceRecords.forEach((record) => {
			const option = document.createElement('option')
			option.value = record.id
			option.innerHTML = record.title
			el.appendChild( option )
		})

		return el
	}

	saveButton() {
		const el = document.createElement('input')
		el.type = 'submit'
		el.value = 'Save'
		el.id = 'button-save'
		return el
	}

	submit() {

		const formElement = document.getElementById('save-form');

		formElement.addEventListener('submit', (event) => {
			// Prevent the default form submission behavior
			event.preventDefault();

			// Perform any other actions needed for the form submission
			// For example, you can retrieve the form data using FormData
			const formData = new FormData(formElement);
			const data = Object.fromEntries(formData.entries());
			console.log(data);

			const id = data['field-id']
			const title = data['field-title']

			if( 0 === parseInt(id) ) {

				const obj = {
					id: 0,
					title: title
				}

				appDef[app.data.currentModel].fields.forEach((field) => {
					obj[field.key] = data['field-'+field.key]
				})

				// Create record.
				app.create.create(obj)

			} else {

				const record = {
					id: id,
					title: title
				}
				appDef[app.data.currentModel].fields.forEach((field) => {
					record[field.key] = data['field-'+field.key]
				})
				app.edit.update(record)

			}

			// Update list.
			app.list.refresh()

		});

	}

}
