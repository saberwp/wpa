class FieldValidator {

	test(field, value) {

		const result = {
			pass: false
		}

		let passCount = 0
		let failCount = 0
		field.validation.forEach((validator) => {
			const validatorResultSingle = this.testSingle(validator, value)
			if(validatorResultSingle.pass) {
				passCount++
			} else {
				failCount++
			}
		})
		if(failCount === 0) {
			result.pass = true
		}

		return result
	}

	testSingle(validationDef, value) {

		// Select validation based on defined "type" property.
		let validator = false
		if(validationDef.type === 'required') {
			validator = new RequiredField()
		}

		// Abort if validator could not be found (invalid key used in definition for instance)
		if(!validator) {
			return { pass: false } // We return as if validation failed.
		}

		// Return test result.
		return validator.test(value)

	}

}
