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
  public updateDayCounter(entries: Data): void {
    let dayElementIndex: number = 0
    for(const day in entries) {
      const count: number = entries[day].length
      const counterElement: Element = this.daysContainer.children[dayElementIndex].lastElementChild
      counterElement.textContent = count.toString()
      dayElementIndex++
    }
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
