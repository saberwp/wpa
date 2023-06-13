/*
 * Label Component
 *
 * @package \CUI
 *
 * Provides label for form fields using standard HTML5 <label> tag.
 * Supports "for" attribute by use of setElementFor()
 *
 * @example:
 *   const label = new Label()
 *   label.setElementFor('label-identifier')
 *
 *   Get the markup generated.
 *      label.get()
 *
 *   Manipulate element
 *      label.appendChild([childDOMElement])
 *
 */

class Label extends ComponentBase {

	elementFor = ''

	constructor() {
		super()
		this.elType = 'label'
	}

	build() {
		this.make()
		this.el.for = ''
	}

	setElementFor(elementFor) {
		this.elementFor = elementFor
	}

	destroy() {
		this.el.remove()
	}

}
