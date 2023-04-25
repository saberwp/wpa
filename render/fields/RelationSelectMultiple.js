/*
 * Select Multiple Field Type
 *
 * Used to select multiple records from a related model.
 * Example usage: you have projects and tasks in the app. When editing projects you want to be able to add multiple existing tasks into the project by creating a relationship between the project and task records.
 * As a field this script only handles rendering and function of the field. The relationship model it is managing must be defined as a relation model first.
 */

 class RelationSelectMultiple {

	 make(field) {
		 const el = document.createElement('div')
		 el.id = 'relation-select-field-' + field.key
		 el.appendChild(this.description(field))
		 el.appendChild(this.valueInput(field))
		 // Add an input to store array of values that the form can process.

		 // Do we have access to budget_budget_item here?
		 console.log(field)
		 console.log(appDef[field.relation.model])

		 const relationModel = appDef[field.relation.model]
		 console.log(relationModel.relations[field.relation.side])

		 const choicesModelKey = relationModel.relations[field.relation.side]

		 // @TODO check if the relationship actually allows multiple with (one-to-many) relationship. 

		 // @TODO Do fetch for choicesModelKey (budget_item)

		 // @TODO Render list of items to user to choose from.

		 // Render ID for each list of items.

		 // Click event to handle item selection.

		 // Process item selected and store ID into values input.

		 // Check if item selected has already been chosen to avoid duplicates.

		 // Provide click event to remove from the list of selections.

		 // Provide click to move item up or down in the list (simple sorting)

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
		 return el
	 }

	 description(field) {
		 const el = document.createElement('div')
		 el.innerHTML = 'Field for model: ' + field.relation.model
		 return el
	 }

 }
