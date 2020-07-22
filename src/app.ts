class App {
  data: Data
  dayManager: DayManager
  currentDay: string
  entryManager: EntryManager
  eventsManager: EventsManager
  updating: Entry
  deleting: Entry
  constructor(
    dayManager: DayManager,
    entryManager: EntryManager,
    eventsManager: EventsManager
  ) {
    this.data = null
    this.dayManager = dayManager
    this.entryManager = entryManager
    this.eventsManager = eventsManager
    this.currentDay = 'monday'
    this.updating = null
    this.deleting = null
  }
  private getStorage(): void {
    const data: string = localStorage.getItem('data')
    this.data = JSON.parse(data) || {
      sunday: [],
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: []
    }
  }
  private changeCurrentDay(day: string): void {
    this.currentDay = day
    this.eventsManager.updateEvents()
  }
  private getCurrentDay(): string {
    return this.currentDay
  }
  private setCallbacks():void {
    this.dayManager.setCallbacks(
      this.changeCurrentDay.bind(this),
      this.eventsManager.updateEvents.bind(this)
    )
    this.entryManager.setCallbacks(
      this.addNewEntry.bind(this),
      this.resetUpdating.bind(this),
      this.getUpdatingEntry.bind(this),
      this.eventsManager.updateEntryInEvent.bind(this),
      this.getCurrentDay.bind(this),
      this.updateEntryInData.bind(this),
      this.resetDeleting.bind(this),
      this.deleteEntryInData.bind(this)
    )
    this.eventsManager.setCallbacks(
      this.setUpdating.bind(this),
      this.setDeleting.bind(this),
      this.getCurrentDay.bind(this),
      this.getCurrentEvents.bind(this)
    )
  }
  private addNewEntry(entry: Entry): void {
    this.eventsManager.addNewEntry(entry)
    this.data[entry.day].push(entry)
    this.dayManager.updateDayCounter(this.data)
  }
  private setEventListeners(): void {
    this.dayManager.setEventListeners()
    this.entryManager.setEventListeners()
  }
  private setUpdating(row: HTMLTableRowElement): void {
    const updatingEntry: Entry = this.data[this.currentDay].find(entry => entry.row === row)
    this.updating = updatingEntry
    this.entryManager.fillUpdateModal(updatingEntry)
    this.entryManager.showUpdateModal()
  }
  private setDeleting(row: HTMLTableRowElement): void {
    const deletingEntry: Entry = this.data[this.currentDay].find(entry => entry.row === row)
    this.deleting = deletingEntry
    this.entryManager.showDeleteModal()
  }
  private resetUpdating(): void {
    this.updating = null
  }
  private resetDeleting(): void {
    this.deleting = null
  }
  private getUpdatingEntry(): Entry {
    return this.updating
  }
  private updateEntryInData(newEntry: Entry): void {
    if(newEntry.day !== this.currentDay) {
      const entryIndex: number = this.data[this.currentDay].findIndex(entry => entry.row === this.updating.row)
      this.data[this.currentDay].splice(entryIndex, 1)
      this.data[newEntry.day].push(newEntry)
      this.eventsManager.updateEvents()
      this.dayManager.updateDayCounter(this.data)
    } else {
      this.updating.time = newEntry.time
      this.updating.description = newEntry.description
      this.eventsManager.updateEntryInEvent(this.updating)
      this.resetUpdating()
    }
  }
  private deleteEntryInData() {
    const entryIndex: number = this.data[this.currentDay].findIndex(entry => entry.row === this.deleting.row)
    this.data[this.currentDay].splice(entryIndex, 1)
    this.eventsManager.deleteEntryInEvent(this.deleting)
    this.dayManager.updateDayCounter(this.data)
    this.resetDeleting()
  }
  private getCurrentEvents(): Entry[] {
    return this.data[this.currentDay]
  }
  public start():void {
    this.getStorage()
    this.setCallbacks()
    this.setEventListeners()
  }
}
