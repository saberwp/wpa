/*
 * Alert Class
 * Controller for Alert Module.
 *
 * Designed to be loaded singularly, has "id" on the parent container, #wpa-alert.
 *
 * Usage:
 		const alert = new Alert()
 */
class Alert {

	markup = ''
	message = null
	bg = 'bg-gray-500'
	containerClasses = ['fixed','bottom-6','right-6','text-white', 'p-4', 'rounded', 'shadow', 'w-full', 'sm:!w-80']
	el = false
	duration = 3000
	delay = 0
	dismissAuto = true
	dismissButton = false

	constructor() {

	}

	setMessage(heading,body) {
		this.message = new AlertMessage(heading,body)
	}

	addMarkup(html) {
		this.markup += html
	}

	/* Build process. */
	build() {
		this.container()
		this.addMarkup('<h2 class="font-semibold text-lg">')
		this.addMarkup(this.message.heading)
		this.addMarkup('</h2>')
		this.addMarkup('<p>')
		this.addMarkup(this.message.body)
		this.addMarkup('</p>')
		this.addMarkup('</div>')
	}

	container() {
		this.containerClasses.push(this.bg)
		let classes = this.containerClasses.join(' ');
		this.addMarkup('<div id="wpa-alert" class="'+classes+'">')
	}

	getMarkup() {
		return this.markup
	}

	render() {
		this.el = document.createElement('div')
		this.el.innerHTML = this.getMarkup()
		if(!this.delay) {
			document.body.appendChild(this.el)
		} else {
			setTimeout(() => {
		    document.body.appendChild(this.el)
		  }, this.delay);
		}

		if(this.dismissAuto) {
			setTimeout(() => {
		    this.el.remove();
		  }, this.delay+this.duration);
		}
	}

	addContainerClass(className) {
		//this.containerClasses...add
	}

	removeContainerClass(className) {
		//this.containerClasses...remove
	}


}
