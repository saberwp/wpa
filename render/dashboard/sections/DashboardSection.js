/* DASHBOARD SECTION BASE */
class DashboardSection {

	widgets = []

	constructor() {}

  addWidget(widget) {
    this.widgets.push(widget);
  }

  render() {
    const grid = new Grid();
		grid.addClass('sm:grid-cols-2')
		grid.build()
		this.widgets.forEach(widget => {
      grid.el.appendChild(widget.render());
    });
		return grid.get()
  }
}
