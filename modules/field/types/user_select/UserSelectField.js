class UserSelectField {

	make(field) {
		const el = document.createElement('select')
		el.id = 'field-' + field.key
		el.name = 'field-' + field.key

		const choices = [
			{
				value: 1,
				label: 'Uno'
			},
			{
				value: 2,
				label: 'Dos'
			}
		]
		choices.forEach((choice) => {
			const opt = document.createElement('option')
			opt.value = choice.value
			opt.innerHTML = choice.label
			el.appendChild(opt)
		})

		return el
	}

	init() {}

	// @TODO add <options>
	// @TODO load list of WP users.

}
