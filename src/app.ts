class App {
  data: Array<Entry>
  dayManager: DayManager
  currentDay: string
  entryManager: EntryManager
  eventsManager: EventsManager
  updating: Entry
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
    this.updating = null
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
    this.eventsManager.setCallbacks(this.setUpdating.bind(this))
  }
  private addNewEntry(entry: Entry): void {
    this.eventsManager.addNewEntry(entry)
    this.data.push(entry)
  }
  private setEventListeners(): void {
    this.dayManager.setEventListeners()
    this.entryManager.setEventListeners()
  }
  private setUpdating(row: HTMLTableRowElement): void {
    console.log(row)
    const updatingEntry: Entry = this.data.find(entry => entry.row === row)
    this.updating = updatingEntry
    this.entryManager.showUpdateModal()
  }
  public start():void {
    this.getStorage()
    this.setCallbacks()
    this.setEventListeners()
    console.log('meow')
  }
}
