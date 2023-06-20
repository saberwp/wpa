class KeygenField {

	fieldDef = false

	constructor(fieldDef) {
		this.fieldDef = fieldDef
	}

	key = 'keygen'
	title = 'Key Generator Field'

	make() {
		const el = document.createElement('div')
		el.classList.add('wpa-field-container', 'bg-white/10', 'rounded', 'py-2', 'px-3', 'flex', 'gap-4', 'items-center', 'justify-between')
		el.innerHTML = this.makeFieldContents()


		return el
	}

	init() {
		// Get the elements
		const apiKeyField = document.querySelector('#field-api_key');
		const keyGenRenderEl = document.querySelector('#keygen-render');
		const copyButton = document.querySelector('#api-key-copy');
		const generateButton = document.querySelector('#keygen-generate-button');

		// Add click event listener to the copy button
		generateButton.addEventListener('click', () => {
			const generatedKey = this.generateKey()
			apiKeyField.value = generatedKey
			keyGenRenderEl.innerHTML = generatedKey
		})

		// Add click event listener to the copy button
		copyButton.addEventListener('click', function() {

			const keyGen = new KeyGen
			keyGen.copyToClipboard(apiKeyField.value)

		})
	}

	copyToClipboard(textToCopy) {
    // Navigator clipboard api needs a secure context (https)
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy);
    } else {
        // Use the 'out of viewport hidden text area' trick
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;

        // Move textarea out of the viewport so it's not visible
        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";

        document.body.prepend(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
        } catch (error) {
            console.error(error);
        } finally {
            textArea.remove();
        }
    }
}

	makeFieldContents() {
		const generatedKey = this.generateKey()
		let content = ''
		content += '<input type="hidden" id="field-api_key" name="field-api_key" value="'+generatedKey+'" />'
		content += '<div id="keygen-render">'+generatedKey+'</div>'
		content += this.generateButton()
		content += this.copyButton()
		return content
	}

	generateButton() {
		let content = ''
		content += '<svg id="keygen-generate-button" class="clickable fill-white/20 hover:fill-white/40" width="32" height="30" viewBox="0 0 32 30" xmlns="http://www.w3.org/2000/svg"><path d="M32 12.8H30.4H20.8H19.2V9.6H20.8H26.54L23.0667 6.12667C21.1867 4.25333 18.6467 3.2 16 3.2C11.1533 3.2 6.98667 6.14 5.2 10.34L2.25333 9.08667C4.52667 3.74667 9.82667 0 16 0C19.5 0 22.8533 1.38667 25.3267 3.86L28.8 7.34V1.6V0H32V1.6V11.2V12.8ZM0 17.0667H1.6H11.2H12.8V20.2667H11.2H5.46L8.93333 23.74C10.8133 25.6133 13.3533 26.6667 16 26.6667C20.84 26.6667 25 23.74 26.7933 19.5467L29.7333 20.8067C27.4533 26.1333 22.1667 29.8667 16 29.8667C12.5 29.8667 9.14667 28.48 6.67333 26.0067L3.2 22.5267V28.2667V29.8667H0V28.2667V18.6667V17.0667Z"/></svg>'
		return content
	}

	copyButton() {
		let content = ''
		content += '<svg id="api-key-copy" class="clickable fill-white/20 hover:fill-white/40" width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M32 24H12V0H26L32 6V24ZM3 8H10V11H3V29H17V26H20V29V32H17H3H0V29V11V8H3Z"/></svg>'
		return content
	}

	generateKey() {
	  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	  let key = '';

	  for (let i = 0; i < 19; i++) {
	    if (i === 4 || i === 9 || i === 14) {
	      key += '-';
	    } else {
	      const randomIndex = Math.floor(Math.random() * characters.length);
	      key += characters.charAt(randomIndex);
	    }
	  }

	  return key;
	}



}
