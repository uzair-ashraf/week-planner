class App {
  data: Array<Object>
  dayManager: DayManager
  currentDay: string
  entryManager: EntryManager
  constructor(dayManager: DayManager, entryManager: EntryManager) {
    this.data = []
    this.dayManager = dayManager
    this.entryManager = entryManager
    this.currentDay = 'monday'
  }
  private getStorage(): void {
    const data: string = localStorage.getItem('data')
    this.data = JSON.parse(data) || []
  }
  private setCurrentDay(day: string): void {
    this.currentDay = day
  }
  private setCallbacks():void {
    this.dayManager.setCallbacks(this.setCurrentDay.bind(this))
    this.entryManager.setCallbacks(this.addNewEntry.bind(this))
  }
  private addNewEntry(entry: object): void {
    this.data.push(entry)
    console.log(entry)
  }
  private setEventListeners(): void {
    this.dayManager.setEventListeners()
    this.entryManager.setEventListeners()
  }

  public start():void {
    this.getStorage()
    this.setCallbacks()
    this.setEventListeners()
    console.log('meow')
  }
}
