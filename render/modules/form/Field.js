class Field {

	loadFieldTypeClass(fieldType) {
		let fieldTypeClass = false
	  switch (fieldType) {
	    case 'date_time':
	      fieldTypeClass = new DateTime()
	      break;
			case 'text':
	      fieldTypeClass = new TextField()
	      break;
	    default:
	      break;
	  }
		return fieldTypeClass
	}


}
