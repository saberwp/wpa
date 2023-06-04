class FormSelect extends ComponentBase {

	data = []

	constructor() {
		super()
		this.elType = 'select'
		this.defaultClasses = ['bg-gray-200', 'rounded-md', 'px-4', 'py-2']
	}

	build() {
		this.data.forEach((optionData) => {
			const option = this.addChild('FormSelectOption')
			option.setLabel(optionData.label)
		})
		this.make()
	}

	// Set array of options, e.g. [{label: "Label", value: 1}].
	setData(data) {
		this.data = data
	}

}
