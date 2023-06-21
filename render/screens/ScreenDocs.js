class ScreenDocs extends ScreenController {

	constructor() {
		super()
	}

	render() {
		const body = document.getElementById('app-body')
		let content = ''
		content += this.userDocs()
		app.def.models.forEach((modelKey) => {
			const modelDef = app.def[modelKey]
			content += this.modelSingle(modelDef)
			content += this.modelRoutes(modelDef)
		})
		body.innerHTML = content
	}

	modelSingle(modelDef) {
		let content = ''
		content += '<div class="my-6">'
		content += this.modelTitle(modelDef)
		content += this.apiUrl(modelDef)
		content += '</div>'
		return content
	}

	modelTitle(modelDef) {
		let content = ''
		content += '<h2 class="font-bold text-3xl">'+modelDef.key+'</h2>'
		return content
	}

	apiUrl() {
		let content = ''
		content += '<div class="my-6">'
		content += 'API Base URL: '
		content += '<span class="font-bold">'
		content += app.apiUrl
		content += '</span>'
		content += '</div>'
		return content
	}

	modelRoutes(modelDef) {
		let content = ''
		content += this.modelRouteGetCollection(modelDef)
		content += this.modelRouteGetOne(modelDef)
		content += this.modelRouteCreate(modelDef)
		content += this.modelRouteEdit(modelDef)
		content += this.modelRouteDelete(modelDef)
		return content
	}

	modelRouteGetCollection(modelDef) {
		const route = app.def.key+'/'+modelDef.key
		let content = ''
		content += '<section>'
		content += this.routeDisplay(route, 'GET')
		content += this.requestUrl(route)
		content += '<p>Fetch collection of model records.</p>'
		content += this.apiRequestExampleFetch(route, 'GET')
		content += '</section>'
		content += '<hr />'
		return content
	}

	modelRouteGetOne(modelDef) {
		const route = app.def.key+'/'+modelDef.key+'/[id]'
		let content = ''
		content += '<section>'
		content += this.routeDisplay(route, 'GET')
		content += '<p>Fetch one model record by ID.</p>'
		content += this.apiRequestExampleFetch(route, 'GET')
		content += '</section>'
		content += '<hr />'
		return content
	}

	modelRouteCreate(modelDef) {
		const route = app.def.key+'/'+modelDef.key
		let content = ''
		content += '<section>'
		content += this.routeDisplay(route, 'POST')
		content += '<p>Create a record with JSON body request.</p>'
		content += this.apiRequestExampleFetch(route, 'POST')
		content += '</section>'
		content += '<hr />'
		return content
	}

	modelRouteEdit(modelDef) {
		const route = app.def.key+'/'+modelDef.key+'/[id]'
		let content = ''
		content += '<section>'
		content += this.routeDisplay(route, 'PUT')
		content += '<p>Edit a single record with JSON body request.</p>'
		content += this.apiRequestExampleFetch(route, 'PUT')
		content += '</section>'
		content += '<hr />'
		return content
	}

	modelRouteDelete(modelDef) {
		const route = app.def.key+'/'+modelDef.key+'/[id]'
		let content = ''
		content += '<section>'
		content += this.routeDisplay(route, 'DELETE')
		content += '<p>Delete a single record by ID.</p>'
		content += this.apiRequestExampleFetch(route, 'DELETE')
		content += this.apiRequestReturnExample()
		content += '</section>'
		content += '<hr />'
		return content
	}

	apiRequestExampleFetch(route, method) {
		let content = ''
		content += '<section class="my-4 pl-6">'
		content += '<h4 class="font-semibold text-lg mb-4">Javascript Fetch Example</h4>'
		content += '<p class="font-sm">This is a simplified code example. In practice developers will likely want to use await or chain response handlers to the request.</p>'
		content += '<pre class="my-6">'
		content += '<code class="my-6 rounded p-4 bg-white text-black text-sm">'
		content += 'fetch(\''+route+'\', {method: \''+method+'\'})'
		content += '</code>'
		content += '</pre>'
		content += '</section>'
		return content
	}

	apiRequestReturnExample() {
		let content = ''
		content += '<section class="my-4 pl-6">'
		content += '<h4 class="font-semibold text-lg mb-4">Request Return Example</h4>'
		content += '<p class="font-sm">All responses data is contained in a singular JSON object.</p>'
		content += '<pre class="my-6 rounded p-4 bg-white text-black text-sm">'
		content += '<code class="">'
		content += '{'+"\n"
		content += "\t"+'"message": "Successful request."'
		content += "\n"+'}'
		content += '</code>'
		content += '</pre>'
		content += '</section>'
		return content
	}

	routeDisplay(route, protocol) {
		let color = 'green'
		if(protocol === 'POST' || protocol === 'PUT') {
			color = 'blue'
		}
		if(protocol === 'DELETE') {
			color = 'red'
		}
		let content = ''
		content += '<h4 class="mt-8 rounded-sm bg-'+color+'-600 text-white py-2 px-4 font-semibold">'
		content += protocol
		content += ' '
		content += route
		content += '</h4>'
		return content
	}

	requestUrl(route) {
		let content = ''
		content += '<section class="my-4 py-2 px-4">'
		content += '<h6 class="text-sm font-light">Full Request URL</h6>'
		content += '<h4 class="text-white font-semibold">'
		content += app.apiUrl + route
		content += '</h4>'
		content += '</section>'
		return content
	}

	userDocs() {
		let content = ''
		content += '<div class="my-8">'
		content += '<h2 class="font-semibold text-3xl">'
		content += 'User Docs'
		content += '</h2>'
		content += this.userDocsCreate()
		content += '<hr>'
		content += this.userDocsEdit()
		content += '<hr>'
		content += this.userDocsDelete()
		content += '<hr>'
		content += this.userDocsView()
		content += '<hr>'
		content += this.userDocsFaq()
		content += '<hr>'
		content += this.modelPropertyRef()
		content += '<hr>'
		content += '<div>'
		return content
	}

	userDocsCreate() {
		let content = ''
		content += '<h2 class="font-semibold text-2xl my-4">'
		content += 'Creating Records'
		content += '</h2>'
		content += '<p class="font-semibold text-base my-4">'
		content += 'Create a new record by selecting the model type from the main app menu usually found on your left, or for right-sided layouts the menu will be on the right of your screen. Click the create/add button to open the create record form. Enter any required fields and click the save button at the bottom of the form.'
		content += '</p>'
		return content
	}

	userDocsEdit() {
		let content = ''
		content += '<h2 class="font-semibold text-2xl my-4">'
		content += 'Editing Records'
		content += '</h2>'
		content += '<p class="font-semibold text-base my-4">'
		content += 'From the main app menu select the model type that contains the record you want to edit. Find the record within the table or other list view. Click the edit button to start the edit process. The edit form will open in a modal in most cases, unless the model type is configured for inline editing in which case the edit form may slide open and scroll into view. The edit form is preloaded with the existing values, change any values that are editable and click the save button to save your changes. Note that if a field cannot be edited, this is usually due to editing restrictions configured in the app model such as when it is intentional to prevent association changes for child items related to a parent model. In such cases you may wish to delete a record and create a new one instead of editing the parent/child relationship, or alternatively change the app field configuration for the given model to allow relationship edits.'
		content += '</p>'
		return content
	}

	userDocsDelete() {
		let content = ''
		content += '<h2 class="font-semibold text-2xl my-4">'
		content += 'Deleting Records'
		content += '</h2>'
		content += '<p class="font-semibold text-base my-4">'
		content += 'From the main app menu select the model type that contains the record you want to delete. Find the record within the table or other list view. Click the delete button to start the delete process. The delete confirmation button will open in a modal giving you an opportunity to cancel the delete. If you want to continue click the delete confirmation button. Note that some models have constraints in their configuration which may not allow deletions. This is configurable within your app model configuration.'
		content += '</p>'
		return content
	}

	userDocsView() {
		let content = ''
		content += '<h2 class="font-semibold text-2xl my-4">'
		content += 'Viewing Records'
		content += '</h2>'
		content += '<p class="font-semibold text-base my-4">'
		content += 'There are 2 major types of views for records in your WPA apps. There are collection views and single views. When you enter any model from the main menu you will see the default collection view which is either a list or table view containing multiple records. By default there is a view button presented, though this is configurable and some views may hide the detail or view single button for a cleaner UI in the collection view. Look for an ellipse (3-dots) clickable menu in the collection view to find a link to the single view mode. Single views by default will open a new modal above the collection view and present all of the single record field data.'
		content += '</p>'
		return content
	}

	userDocsFaq() {
		let content = ''
		content += '<h2 class="font-semibold text-2xl my-4">'
		content += 'Frequently Asked User Questions'
		content += '</h2>'

		// Custom fields question.
		content += '<div class="my-6">'
		content += '<h3 class="font-semibold text-base my-4">'
		content += 'How can I add a new field to an existing model?'
		content += '</h3>'
		content += '<h4>'
		content += 'Fields are defined in the apps models. Each model has a fields array. You can find the entire app definition in the /wpa folder under wp-content/ in your WordPress site. For example to edit fields in the WPA Tasker application that is provided with WPA, open the directory at wp-content/wpa/tasker/models. If you want to add a new custom field to tasks, edit the task.json model definition at /models/task.json. You can copy and paste an existing field from either Tasker or another one of the prebuilt apps shipped with WPA. There are also field definitions and additional document on the developers official website https://saberwp.com.'
		content += '</h4>'
		content += '</div>'

		// Adding models to apps.
		content += '<div class="my-6">'
		content += '<h3 class="font-semibold text-base my-4">'
		content += 'How can I add new model (record type) to an existing app?'
		content += '</h3>'
		content += '<h4>'
		content += 'WPA apps including the prebuilt apps use JSON files to define models (aka record types). To create a new model in the Tasker app for example, find the models folder inside the app root. Tasker will be found at wp-content/wpa/wpa-tasker/ in your WordPress site. You will see 3 existing models, tasks, status and task_status. You may want to start by copying one of the base models, either task or status. When you name the model file consistently with the model key such as dog.json for a model key "dog", then the API routes and rendering capabilities of WPA are generated dynamically when you reload the app.'
		content += '</h4>'
		content += '</div>'

		// Create new app.
		content += '<div class="my-6">'
		content += '<h3 class="font-semibold text-base my-4">'
		content += 'How can I make a completely new custom app?'
		content += '</h3>'
		content += '<h4>'
		content += 'WPA apps built using definition automation. If you can write the JSON that defines an app, it will be built as expected and function without any additional code required. A good starting point to building your own custom WPA apps is to copy an existing app such as the prebuilt Tasker app. If Tasker is not active in your WPA install, you can activate it which will copy the files from the plugin into your site wp-content/wpa/ folder. You can also skip this and simply find the files in the WPA plugin where they are under /apps relative to the plugin root at wp-content/plugins/wpa/apps/*. There will find find multiple existing apps that already fully configured with various models, fields and some informative variations in the configuration settings.'
		content += '</h4>'
		content += '</div>'

		// Field validation changes.
		content += '<div class="my-6">'
		content += '<h3 class="font-semibold text-base my-4">'
		content += 'How can I make an existing or new custom field required or not required?'
		content += '</h3>'
		content += '<h4>'
		content += 'WPA has multiple prebuilt validators available during the automated app build from definition. As with all other aspects of WPA apps, validation is defined in the JSON app files. For any given model, it has a field definition found in the model JSON file. For example the Tasker app has a models/task.json file which defines fields for tasks. If you wanted to make a field required that is not currently, you would add required to the "validation" property of that field. Note that the validation property can be either an array or single string, so if the only validation your field needs you can use "validation": "required". Fields that have multiple validations are defined with a validation array such as "validation": ["required", "numeric"] which would validate for a number and require it to be entered before allowing form save.'
		content += '</h4>'
		content += '</div>'

		return content
	}

	modelPropertyRef() {

		let content = ''
		content += '<h2 class="font-semibold text-2xl my-4">'
		content += 'Model Property Reference'
		content += '</h2>'
		content += '<p class="font-semibold text-lg my-2">'
		content += 'This reference is for the JSON definition of models stored under each WPA app /models/* directory. To view an example of this type of definition file and experiment with changes, activate the prebuilt Tasker app and open the models directory at /wp-content/wpa/tasker/models/*.'
		content += '</p>'
		content += '<div class="font-bold text-base my-4">'
		content += '<h3 class="font-semibold text-xl my-2">'
		content += 'key'
		content += '</h3>'
		content += '<h4 class="font-semibold text-base my-2">'
		content += 'Defines the reference key for the model type. This must match the filename given for the model definition file so for a model "cat", the file must be named cat.json. Model keys must be snake_cased such as "task_status". Do not use hyphens. While you can use numbers if needed, do not start the key with a number. Using common words and snake-case helps with the creation of the automated REST API for your model.'
		content += '</h4>'
		content += '</div>'
		return content

	}

}
