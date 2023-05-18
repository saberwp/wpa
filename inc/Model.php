<?php

namespace WPA;

class Model {

	public static function title_field_active($model_def) {
		if(!isset($model_def->title_field) || isset($model_def->title_field) && $model_def->title_field === true) {
			return true;
		}
		return false;
	}

}
