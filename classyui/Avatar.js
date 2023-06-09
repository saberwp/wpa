class Avatar extends ComponentBase {

	constructor() {
		super()
		this.defaultClasses = ['cursor-pointer']
	}

	build() {
		this.make()
		this.el.innerHTML = '<svg class="w-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M43.5 24C43.5 18.8283 41.4455 13.8684 37.7886 10.2114C34.1316 6.55446 29.1717 4.5 24 4.5C18.8283 4.5 13.8684 6.55446 10.2114 10.2114C6.55446 13.8684 4.5 18.8283 4.5 24C4.5 29.1717 6.55446 34.1316 10.2114 37.7886C13.8684 41.4455 18.8283 43.5 24 43.5C29.1717 43.5 34.1316 41.4455 37.7886 37.7886C41.4455 34.1316 43.5 29.1717 43.5 24ZM0 24C0 17.6348 2.52856 11.5303 7.02944 7.02944C11.5303 2.52856 17.6348 0 24 0C30.3652 0 36.4697 2.52856 40.9706 7.02944C45.4714 11.5303 48 17.6348 48 24C48 30.3652 45.4714 36.4697 40.9706 40.9706C36.4697 45.4714 30.3652 48 24 48C17.6348 48 11.5303 45.4714 7.02944 40.9706C2.52856 36.4697 0 30.3652 0 24ZM18 21V18.75C18 18.5625 17.9906 18.3844 17.9625 18.2062C17.5688 18.5437 17.0625 18.75 16.5 18.75C15.2531 18.75 14.25 17.7469 14.25 16.5C14.25 15.9375 14.4563 15.4312 14.7938 15.0375C14.6156 15.0094 14.4375 15 14.25 15C12.1781 15 10.5 16.6781 10.5 18.75V21H18ZM14.25 12C17.9812 12 21 15.0188 21 18.75V21V24H18H10.5H7.5V21V18.75C7.5 15.0188 10.5188 12 14.25 12ZM34.5 18.75C33.2531 18.75 32.25 17.7469 32.25 16.5C32.25 15.9937 32.4188 15.5344 32.6906 15.1594C32.3063 15.0562 31.9125 15 31.5 15C29.0156 15 27 17.0156 27 19.5V21H36V19.5C36 19.0875 35.9437 18.6844 35.8406 18.3094C35.4656 18.5906 35.0063 18.75 34.5 18.75ZM31.5 12C35.6438 12 39 15.3562 39 19.5V21V24H36H27H24V21V19.5C24 15.3562 27.3562 12 31.5 12ZM9.39375 28.7812L9 27H10.9031H12.075H35.925H37.0969H39L38.6062 28.7812L38.5969 28.8187L38.5875 28.8469C38.2219 30.4781 37.5938 31.9969 36.7594 33.3656L36.75 33.3562C34.1062 37.6594 29.3813 40.4531 24.1031 40.4906H24C21.225 40.4906 18.6 39.7312 16.3406 38.3812C12.9094 36.3375 10.3313 32.9531 9.4125 28.8562L9.39375 28.7719V28.7812ZM34.1344 31.8844C33.375 31.6313 32.5594 31.5 31.7156 31.5C28.0406 31.5 24.975 34.0594 24.1969 37.5C28.3313 37.4344 32.0344 35.25 34.1438 31.8938L34.1344 31.8844Z" fill="#111827" fill-opacity="0.5"/></svg>'
	}

}