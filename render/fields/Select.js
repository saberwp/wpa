class Select {

	make(field) {
		const el = document.createElement('select')
		el.id = 'field-' + field.key
		el.name = 'field-' + field.key
		field.choices.forEach((choice) => {
			const opt = document.createElement('option')
			opt.value = choice.value
			opt.innerHTML = choice.label
			el.appendChild(opt)
		})
		return el
	}

}
