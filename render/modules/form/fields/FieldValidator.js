class FieldValidator {

	test(field, value) {

		console.log('FieldValidator.test()')

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

		console.log('fail count:')
		console.log(failCount)

		if(failCount === 0) {
			console.log('setting pass to true...')
			result.pass = true
		}

		return result
	}

	testSingle(validationDef, value) {

		console.log('FieldValidator.testSingle()')
		console.log(validationDef.type)

		// Select validation based on defined "type" property.
		let validator = false
		if(validationDef.type === 'required') {
			console.log('setting validator to required...')
			validator = new RequiredField()
		}

		// Abort if validator could not be found (invalid key used in definition for instance)
		if(!validator) {
			console.log('validator was false here?')
			return { pass: false } // We return as if validation failed.
		}

		// Return test result.
		return validator.test(value)

	}

}
