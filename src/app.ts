class App {
  data: Array<Object>
  dayManager: DayManager
  currentDay: string
  constructor(dayManager: DayManager) {
    this.data = []
    this.dayManager = dayManager
    this.currentDay = 'monday'
  }
  private getStorage(): void {
    const data: string = localStorage.getItem('data')
    this.data = JSON.parse(data) || []
  }
  private setCurrentDay(day: string) {
    this.currentDay = day
  }
  private setCallbacks():void {
    this.dayManager.setCallbacks(this.setCurrentDay.bind(this))
  }
  private setEventListeners(): void {
    this.dayManager.setEventListeners()
  }
  public start():void {
    this.getStorage()
    this.setCallbacks()
    this.setEventListeners()
    console.log('meow')
  }
}
