/* DASHBOARD SECTION BASE */
class FullWidthDashboardSection extends DashboardSection {

  render() {
    const grid = new Grid();
		grid.build()
		this.widgets.forEach(widget => {
      grid.el.appendChild(widget.render());
    });
		return grid.get()
  }

}
