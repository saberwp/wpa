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
			case 'textarea':
	      fieldTypeClass = new TextareaField(fieldDef)
	      break;
			case 'user_select':
	      fieldTypeClass = new UserSelectField(fieldDef)
	      break;
			case 'relation_select_multiple':
	      fieldTypeClass = new RelationSelectMultipleField(fieldDef)
	      break;
			case 'keygen':
	      fieldTypeClass = new KeygenField(fieldDef)
	      break;
			case 'select':
	      fieldTypeClass = new SelectField(fieldDef)
	      break;
			case 'relation_select':
	      fieldTypeClass = new RelationSelectField(fieldDef)
	      break;
			case 'relation_select':
	      fieldTypeClass = new TextareaField(fieldDef)
	      break;
	    default:
	      break;
	  }
		return fieldTypeClass
	}
}
