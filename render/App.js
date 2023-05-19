// @TODO load dependency scripts using the append to child method ChatGPT suggested.

class App {

	constructor() {

		// Add feature controllers to app.
		this.form   = new Form()
		this.list   = new List()
		this.edit   = new Edit()
		this.create = new Create()
		this.delete = new Delete()
		this.modal  = new Modal()
		this.dm     = new DataManager()
		this.menu   = new Menu()
		this.screen = new Screen()

		// Set API URL.
		this.apiUrl = WPA_ApiUrl;

		// Init data store.
		this.dataInit()

	}

	load() {

		app.shell = new DefaultAppShell()
		app.shell.appContainer()

		// Bind the class instance to the menuClickHandler function
		this.menuClickHandler = this.menuClickHandler.bind(this)

		// Call menuClickInit function to initialize the menu clicks
		this.menuClickInit()

		// Init routing.
		this.route = new Route
		const route = this.route.get()
		const screenKey = route[0]
		const recordId = route[1] ? route[1] : false;
		if(recordId) {
			this.route.renderSingle(screenKey, recordId)
		} else {
			this.route.render(screenKey)
		}

	}

	menuClickInit() {
		const ulElement  = document.getElementById('app-menu-main');
		const liElements = ulElement.getElementsByTagName('li');

		for (let i = 0; i < liElements.length; i++) {
			const liElement = liElements[i];
			liElement.addEventListener('click', this.menuClickHandler);
		}
	}

	menuClickHandler(e) {
		const screenKey = e.target.getAttribute('screen')
		const menu = new Menu()
		menu.setActive(e.target)
		const screen = new Screen()
		screen.render(screenKey)
	}

	dataInit() {

		this.data = {}
		appDef.models.forEach(( modelKey ) => {
			this.data[modelKey] = {
				record: [],
				index: {}
			}
		})

	}

	// Automatically loads from current model data storage.
	record(id) {
		return this.data[app.data.currentModel].index[id]
	}

	recordIndex(records) {
	  const index = {};
	  for (let i = 0; i < records.length; i++) {
	    const record = records[i];
	    index[record.id] = record;
	  }
	  return index;
	}

	currentModelRecordStore() {
		return this.data[app.data.currentModel].record
	}

	setModelRecordStore(modelKey, records) {
		this.data[modelKey].record = records
		const index = this.recordIndex(this.data[modelKey].record)
		this.setModelIndexStore(modelKey, index)
	}

	setModelIndexStore(modelKey, index) {
		this.data[modelKey].index = index
	}

	currentModelIndexStore() {
		return this.data[app.data.currentModel].index
	}

	recordReplace(record) {

		const records = this.currentModelRecordStore();

    // Convert the id property to an integer
    record.id = parseInt(record.id, 10);

    // Find the object with a matching id and replace it with the updated object
    for (let i = 0; i < records.length; i++) {
      if ( parseInt(records[i].id) === record.id) {
        records[i] = record;
        return;
      }
    }

	}

	recordDeleteFromObject(id) {
		const index = this.currentModelIndexStore();

		if (index.hasOwnProperty(id)) {
			delete index[id];
		}
  }

	recordDeleteFromArray(id) {
		const records = this.currentModelRecordStore();
		for (let i = 0; i < records.length; i++) {
			if (records[i].id === parseInt(id, 10)) {
				records.splice(i, 1);
				return;
			}
		}
	}

	getModel(modelKey) {
		return this.def[modelKey]
	}

}
