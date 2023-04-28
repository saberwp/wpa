/*
 * Select Multiple Field Type
 *
 * Used to select multiple records from a related model.
 * Example usage: you have projects and tasks in the app. When editing projects you want to be able to add multiple existing tasks into the project by creating a relationship between the project and task records.
 * As a field this script only handles rendering and function of the field. The relationship model it is managing must be defined as a relation model first.

Field Options
-- User can select existing records.
-- User can inline create new records.
---- For child items like budget_item in a budget, turn off select existing.


---- Ideas
------- Should we rename the field to reflect that sometimes selection is turned off and it's only for child creation?


Reference
-- Field Storage
---- A single input stores JSON data.
------ Items are added by parsing the JSON data, then pushing into the array and storing as JSON with stringify.

Features
-- Add items to selection list from choices list with a single click.
-- Remove items from selection with a single click.
-- Create new related record with click on create button.
---- Inline create form is rendered in a modal.
---- Inline created records are saved and related to the current edited record using the relation DB table.

Future ideas.
-- Records can be deleted if the field settings allow it, and if record is an orphan (not related to an existing parent record).
-- Records can be edited from the field using the same modal as inline create.
---- For now provide links to the records to enable edit/delete simplified.

 */

 class RelationSelectMultiple {

	 make(field) {


		 // Add an input to store array of values that the form can process.

		 // Do we have access to budget_budget_item here?
		 console.log(field)
		 console.log(appDef[field.relation.model])

		 const relationModel = appDef[field.relation.model]
		 console.log(relationModel.relations[field.relation.side])

		 const choicesRelationDef = relationModel.relations[field.relation.side]


		 if(choicesRelationDef.type !== 'many') {
			 console.error('Model relations in Relation Select Field did not validate as type=many.')
		 }

		 // Get model key from the relation def.
		 const choicesRelationModelKey = choicesRelationDef.model

		 // Get the choices model def from appDef.
		 // choicesModelDef.field array defines the fields for this model.
		 const choicesModelDef = appDef[choicesRelationModelKey]
		 this.relationModelDef = choicesModelDef // Stash into class.

		 // Load records for the relation model.
		 // @TODO this only works if the user visits "budget_item" first to load those records.
		 this.relationModelRecords = app.data[choicesRelationModelKey].record

		 console.log('this.relationModelRecords')
		 console.log(this.relationModelRecords)


		 // @TODO Render list of items to user to choose from.

		 // Render ID for each list of items.

		 // Click event to handle item selection.

		 // Process item selected and store ID into values input.

		 // Check if item selected has already been chosen to avoid duplicates.

		 // Provide click event to remove from the list of selections.

		 // Provide click to move item up or down in the list (simple sorting)


		 const el = document.createElement('div')
		 el.id = 'relation-select-field-' + field.key
		 el.appendChild(this.valueInput(field))
		 el.appendChild(this.inlineCreateButton(field))
		 el.appendChild(this.choicesList(field))
		 el.appendChild(this.selectionList(field))
		 el.appendChild(this.description(field))
		 return el

	 }

	 choiceList() {

		 const el = document.createElement('ul')

		 return el

	 }

	 valueInput(field) {
		 const el = document.createElement('input')
		 el.id = 'field-' + field.key
		 el.name = 'field-' + field.key
		 el.value = '[]'
		 return el
	 }

	 description(field) {
		 const el = document.createElement('div')
		 el.innerHTML = 'Field for model: ' + field.relation.model
		 return el
	 }

	 inlineCreateButton(field) {
		 const el = document.createElement('button')
		 el.type = 'button'
		 el.id = 'field-inline-create-' + field.key
		 el.classList.add('wpa-inline-create-button')
		 el.innerHTML = 'Create +'
		 el.addEventListener('click', () => {

			 // @TODO load form into modal.
			 // @TODO setup form processing submit.
			 // @TODO Setup close modal on successful create.
			 // @TODO Update field value store with new record ID.
			 // @TODO Update list of selected records.

			 console.log('inline create button click...')
			 const modalContentEl = document.createElement('div')
			 modalContentEl.innerHTML = 'Create new record inline...'
			 const modal = new Modal()
			 modal.setContent(modalContentEl)

			 modal.open()
		 })
		 return el
	 }

	 // Return the relation model records so they can be used as choices for user selection.
	 choices() {
		 return this.relationModelRecords
	 }

	 choicesList(field) {
		 const el = document.createElement('ul')
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

			 el.appendChild(elChoice)
		 })
		 return el
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
