class DayManager {
  daysContainer: HTMLElement
  dayInHeading: HTMLElement
  changeCurrentDay: Function
  updateEventContent: Function
  constructor(daysContainer: HTMLElement, daysInHeading: HTMLElement) {
    this.daysContainer = daysContainer
    this.dayInHeading = daysInHeading
    this.changeCurrentDay = null
    this.updateEventContent = null
  }
  public setCallbacks(
    changeCurrentDay: Function,
    updateEventContent: Function
  ): void {
    this.changeCurrentDay = changeCurrentDay
    this.updateEventContent = updateEventContent
  }

  public handleDaySelection(event: ClickEvent): void {
    if(!event.target.hasAttribute('data-day')) return
    const day: string = event.target.getAttribute('data-day')
    this.changeCurrentDay(day)
    this.setDayInHeading(day)
  }
  private setDayInHeading(day: string): void {
    this.dayInHeading.textContent = day
  }
  public setEventListeners(): void {
    this.daysContainer.addEventListener('click', this.handleDaySelection.bind(this))
  }
}
