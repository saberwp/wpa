# WPA Docs

## Create Process
/render/Create.js
Create()

Create is loaded into JS app object as app.create. Used in App as this.create.

app.form.submit() handles save form processing. If form ID is set to 0, create is called.

Call Create.create() to create a new record.

Record is parsed in Form() class and then sent to server in Create().

## Edit

Use app.edit.update(record).

Process starts in Form() and Edit.update() is used to send the request.

## Delete

## TODO

  1. Load app at defined locations in app.js.

## Ported HTML intro

<h1>Welcome to WPA (WordPress Application Framework)</h1>
<p>WPA applications are apps built from "definition models". </p>
<p>Definitions are JSON files. The most important is the definition for 1 or more models that make the data structure of the app.</p>
<h2>Renderer</h2>
<p>App definitions are processed and constructed into the app UI with all it's logic and storage capabilities using the renderer.</p>
<h2>Tired of WordPress Scaling Limitations?</h2>
<p>When you use the default post types, meta storage and other WordPress features, there are pros and cons to consider. The biggest setback you'll face on a site with a lot of data driven features, is scalability and site performance issues.</p>


## TODO

Use __() in PHP to enable translation.
   Use "wpa" as localization path.

Refactor Api::relations_process().
  See if loop is needed there. Can we loop once earlier and do a process callback on each field by type?
	Can processing for this field be moved to the FieldType def?

### Create.recordModel(model, record)

@param model full model object with model.key and model.fields.
@record draft record object for creation, fully populated with field data.

Sends fetch [POST] to the given model create route.

### Create Inline Process

1. Create.recordModel(model, record)
2. Create.request(model, record)

## Form.definedFieldValues(record, model, values)

Adds form values to the defined model field for a given record
