class TimePicker extends ComponentBase {

	name = ''

	constructor() {
		super()
		this.elType = 'input'
	}

	build() {
		this.make()
		this.el.name = this.name
		this.setCurrentTime()
	}

	setCurrentTime() {
		const currentDate = new Date();
		const year = currentDate.getFullYear();
		const month = String(currentDate.getMonth() + 1).padStart(2, '0');
		const day = String(currentDate.getDate()).padStart(2, '0');
		const hours = String(currentDate.getHours()).padStart(2, '0');
		const minutes = String(currentDate.getMinutes()).padStart(2, '0');
		const period = (hours >= 12) ? 'PM' : 'AM';
		const currentTime = `${year}-${month}-${day} ${hours}:${minutes}${period}`;
		this.el.value = currentTime;
	}

	setName(name) {
		this.name = name
	}
	setPlaceholder() {}

}
