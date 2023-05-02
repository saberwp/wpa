/*
 * Select Multiple Field Type
 *
 * Used to select multiple records from a related model.
 * Example usage: you have projects and tasks in the app. When editing projects you want to be able to add multiple existing tasks into the project by creating a relationship between the project and task records.
 * As a field this script only handles rendering and function of the field. The relationship model it is managing must be defined as a relation model first.
 */

 class RelationSelectMultiple {

	 relationModel = false

	 // Relation model key is defined in field.relation.model.
	 make(field) {

		 this.relationModel = appDef[field.relation.model]
		 const choicesRelationDef = this.relationModel.relations[field.relation.side]
		 if(choicesRelationDef.type !== 'many') {
			 console.error('Model relations in Relation Select Field did not validate as type=many.')
		 }

		 // Get model key from the relation def.
		 const choicesRelationModelKey = choicesRelationDef.model

		 // Get the choices model def from appDef.
		 // choicesModelDef.field array defines the fields for this model.
		 const choicesModelDef = appDef[choicesRelationModelKey]
		 this.relationModelDef = choicesModelDef // Stash into class.

		 // Create and append field elements.
		 const el = document.createElement('div')
		 el.id = 'relation-select-field-' + field.key
		 el.appendChild(this.valueInput(field))
		 el.appendChild(this.inlineCreateButton(field))
		 el.appendChild(this.choicesList(field))
		 el.appendChild(this.selectionList(field))

		 // Load records for the relation model.
		 this.choicesRefresh()

		 return el
	 }

	 valueInput(field) {
		 const el = document.createElement('input')
		 el.id = 'field-' + field.key
		 el.name = 'field-' + field.key
		 el.value = '[]'
		 return el
	 }

	 inlineCreateButton(field) {

		 const el = document.createElement('button')
		 el.type = 'button'
		 el.id = 'field-inline-create-' + field.key
		 el.classList.add('wpa-inline-create-button')
		 el.classList.add('clickable')

		 // Set attribute model-key using the parsed relation model data.
		 el.setAttribute('model-key', this.relationModelDef.key)

		 el.innerHTML = 'Create +'
		 el.addEventListener('click', (e) => {

			 // Make save form to put into modal.

			 const modelDef = this.relationModelDef
			 const formClass = new Form()
			 const formEl = formClass.makeForModel(modelDef)
			 formClass.addSubmitEventHandler(formEl)

			 // Set current model inline.
			 app.data.currentModelInline = modelDef

			 const modalContentEl = document.createElement('div')
			 modalContentEl.appendChild(formEl) // Add form element to the modal. 1
			 const modal = new Modal()
			 modal.setContent(modalContentEl)
			 modal.open()
			 this.relateInlineCreatedRecordEvent()

		 })
		 return el
	 }

	 // Catch wpa_record_created event and do the relationship create between the new record and the edited base record.
	 relateInlineCreatedRecordEvent() {
		 document.addEventListener('wpa_record_created', (event) => {

			if(event.detail.model_key !== 'budget_item') {
				return;
			}

			const record = {
				id: 0,
				budget_id: app.data.currentRecordId,
				budget_item_id: event.detail.record_id
			}

			// model should be budget_budget_item.
			app.create.recordModel(this.relationModel, record)

			// Load records for the relation model.
 		 this.choicesRefresh()

 		});
	 }

	 choicesRefresh() {
		 this.relationModelRecords = app.dm.fetch(this.relationModelDef.key)
		 document.addEventListener('app_data_loaded', (event) => {
		   if(event.detail.modelKey === this.relationModelDef.key) {
				 this.relationModelRecords = event.detail.records
				 this.choicesPopulate()
			 }
		 })
	 }

	 // Return the relation model records so they can be used as choices for user selection.
	 choices() {
		 return this.relationModelRecords
	 }

	 choicesList(field) {
		 const el = document.createElement('ul')
		 this.choicesList = el
		 return el
	 }

	 choicesPopulate() {
		 this.choicesList.innerHTML = ''
		 const choices = this.choices()
		 choices.forEach((choice) => {
			 const elChoice = document.createElement('li')
			 elChoice.innerHTML = choice.title
			 elChoice.classList.add('clickable')
			 elChoice.setAttribute('record-id', choice.id)

			 // Click choice.
			 elChoice.addEventListener('click', (event) => {

				 // Store value in field input.
				 const recordId = event.target.getAttribute('record-id')
				 const fieldItemsEl = document.getElementById('field-items')
				 const value = fieldItemsEl.value
				 const valueArray = JSON.parse(value)
				 valueArray.push(recordId) // Add new selection to values array.
				 fieldItemsEl.value = JSON.stringify(valueArray) // Update input.

				 // Get selected records from ID's.
				 const selectedRecords = this.recordsFromIds(valueArray)

				 // Update selection list.
				 const selectionList = document.getElementById('wpa-selection-list')
				 selectionList.innerHTML = ''
				 selectedRecords.forEach((choice) => {
					 const elChoice = document.createElement('li')
					 elChoice.innerHTML = choice.title
					 elChoice.classList.add('clickable')
					 elChoice.setAttribute('record-id', choice.id)
					 selectionList.appendChild(elChoice)
				 })
			 })
			 this.choicesList.appendChild(elChoice)
		 })
	 }

	 recordsFromIds(ids) {
		 const records = []
		 const choices = this.choices()
		 choices.forEach((choice) => {
			 ids.forEach((id) => {
				 if(choice.id == id) {
					 records.push(choice)
				 }
			 })
		 })
		 return records
	 }

	 /*
	  * Make the <ul> that contains the selected records.
		*/
	 selectionList(field) {
		 const el = document.createElement('ul')
		 el.id = 'wpa-selection-list'
		 return el
	 }

 }
