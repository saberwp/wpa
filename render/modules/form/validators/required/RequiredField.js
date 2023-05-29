class RequiredField {

	test(value) {

		const result = {
			pass: false
		}
		if( value !== '' ) {
			result.pass = true
		}

		return result

	}

}
