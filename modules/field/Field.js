class Field {

	loadFieldTypeClass(fieldType, fieldDef) {
		let fieldTypeClass = false
	  switch (fieldType) {
	    case 'date_time':
	      fieldTypeClass = new DateTime(fieldDef)
	      break;
			case 'text':
	      fieldTypeClass = new TextField(fieldDef)
	      break;
			case 'user_select':
	      fieldTypeClass = new UserSelectField(fieldDef)
	      break;
	    default:
	      break;
	  }
		return fieldTypeClass
	}


}
