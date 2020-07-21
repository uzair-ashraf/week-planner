const dayManager: DayManager = new DayManager(
  document.querySelector('.day-container'),
  document.querySelector('.event-day')
)
const entryManager: EntryManager = new EntryManager(
  document.querySelector('.modal-container'),
  document.querySelector('.add-entry-modal'),
  document.querySelector('.add-entry-button')
)
const app: App = new App(dayManager, entryManager)
app.start()
