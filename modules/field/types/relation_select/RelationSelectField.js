class RelationSelectField {

	fieldDef = false

	constructor(fieldDef) {
		this.fieldDef = fieldDef
	}

	make(field) {
		const el = document.createElement('select')
		el.id = 'field-' + field.key
		el.name = 'field-' + field.key
		this.relationHandler(el, field)
		return el
	}

	init() {}

	relationHandler(el, field) {
		const fieldRelationModelKey = field.relation.model
		const relationModel = app.def[fieldRelationModelKey]
		const relationSide  = relationModel.relations[field.relation.side]
		const relationRecords = app.data[relationSide.model].record

		// If records are not loaded, we need to start the load and then use an event to update choices.
		if(!relationRecords || relationRecords.length === 0) {
			const dm = new DataManager()
			dm.fetch(relationSide.model)

			// Delay making list until after custom event "app_data_loaded".
			document.addEventListener('app_data_loaded', () => {
				const relationRecordsLoaded = app.data[relationSide.model].record
				this.choicesRender(el, relationRecordsLoaded);
			});

			return false

		}

		this.choicesRender(el, relationRecords)
	}

	choicesRender(el, relationRecords) {
		relationRecords.forEach((record) => {
			const opt = document.createElement('option')
			opt.value = record.id
			opt.innerHTML = record.title
			el.appendChild(opt)
		})

	}

}
