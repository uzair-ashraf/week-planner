class App {
  data: Array<Object>
  dayManager: DayManager
  currentDay: string
  entryManager: EntryManager
  eventsManager: EventsManager
  constructor(
    dayManager: DayManager,
    entryManager: EntryManager,
    eventsManager: EventsManager
  ) {
    this.data = []
    this.dayManager = dayManager
    this.entryManager = entryManager
    this.eventsManager = eventsManager
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
  private addNewEntry(entry: Entry): void {
    this.eventsManager.addNewEntry(entry)
    this.data.push(entry)
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
