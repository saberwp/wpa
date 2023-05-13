class RequiredField {

	test(value) {

		const result = {
			pass: false
		}
		if( value !== '' ) {
			result.pass = true
		}

		console.log('result in RF:')
		console.log(result)

		return result

	}

}
