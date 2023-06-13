class Svg extends ComponentBase {

	svgMarkup = false
	svgURL = false

	constructor() {
		super()
		this.elType = 'svg'
		this.defaultClasses = ['w-6', 'fill-white/50', 'opacity-0', 'transition-opacity', 'duration-500', 'ease-in']
	}

	make() {

		// Load SVG from existing markup.
		if(this.svgMarkup) {
			this.el = this.svgObjectify(this.svgMarkup)
			this.fadeIn()
		}

		// Load SVG from URL.
		if(this.svgURL) {

			// Make placeholder.
			if(!this.loaded) {
				this.el = document.createElement('div')
				this.el.classList.add('animate-pulse', 'bg-gray-300', 'rounded', 'opacity-0', 'transition-opacity', 'duration-500', 'ease-in')
				this.el.innerHTML = '...'
			}

			this.svgLoad(this.svgURL)
				.then(svgData => {
					this.loaded = true
					const newEl = this.svgObjectify(svgData)

					console.log('is newEl an el?')
					console.log(newEl)

					const result = this.el.replaceWith(newEl)
					this.el = newEl
					this.fadeIn()
				})
				.catch(error => {
					// Handle any errors that occurred during the SVG loading process
					console.error(error);
				});
			}
	}

	fadeIn() {
		setTimeout(() => {
			this.el.classList.remove('opacity-0')
		}, 10);
	}

	async svgLoad(url) {
		console.log('svgLoad:')
		console.log(url)
	  try {
	    const response = await fetch(url);
	    if (response.ok) {
	      const svgData = await response.text();
	      return svgData;
	    }
	    throw new Error(`Failed to load SVG (${response.status}): ${url}`);
	  } catch (error) {
	    throw new Error(`Failed to load SVG: ${url}`);
	  }
	}

	svgObjectify(svgData) {
	  const parser = new DOMParser()
	  const svgElement = parser.parseFromString(svgData, 'image/svg+xml').querySelector('svg')
	  const viewBox = svgElement.getAttribute('viewBox')
	  const newSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
	  newSVG.setAttribute('viewBox', viewBox)
	  newSVG.innerHTML = svgElement.innerHTML
		const classList = this.defaultClasses.concat(this.classes);
		newSVG.classList.add(...classList)
	  return newSVG
	}

	setSvgURL(svgURL) {
		this.svgURL = svgURL
	}

	setSvgMarkup(svgMarkup) {
		this.svgMarkup = svgMarkup
	}

}
