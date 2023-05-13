class Select {

	make(field) {

		// Init field create.
		const el = document.createElement('select')
		el.id = 'field-' + field.key
		el.name = 'field-' + field.key

		// Set choices
		if(field.type === 'relation_select') {
			this.relationHandler(el, field)
		}

		// Static choices.
		if(field.type !== 'relation_select') {
			this.choicesStatic(el, field)
		}

		return el
	}

	choicesStatic(el, field) {
		field.choices.forEach((choice) => {
			const opt = document.createElement('option')
			opt.value = choice.value
			opt.innerHTML = choice.label
			el.appendChild(opt)
		})
	}

	relationHandler(el, field) {
		const fieldRelationModelKey = field.relation.model
		const relationModel = appDef[fieldRelationModelKey]
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
