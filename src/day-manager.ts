class DayManager {
  daysContainer: HTMLElement
  dayInHeading: HTMLElement
  setCurrentDay: Function
  constructor(daysContainer: HTMLElement, daysInHeading: HTMLElement) {
    this.daysContainer = daysContainer
    this.dayInHeading = daysInHeading
    this.setCurrentDay = null
  }
  public setCallbacks(setCurrentDay: Function): void {
    this.setCurrentDay = setCurrentDay
  }

  public handleDaySelection(event: ClickEvent): void {
    if(!event.target.hasAttribute('data-day')) return
    const day: string = event.target.getAttribute('data-day')
    this.setCurrentDay(day)
    this.setDayInHeading(day)
  }
  private setDayInHeading(day: string): void {
    this.dayInHeading.textContent = day
  }
  public setEventListeners(): void {
    this.daysContainer.addEventListener('click', this.handleDaySelection.bind(this))
  }
}
