const dayManager: DayManager = new DayManager(
  document.querySelector('.day-container'),
  document.querySelector('.event-day')
)
const entryManager: EntryManager = new EntryManager(
  document.querySelector('.modal-container'),
  document.querySelector('.add-entry-modal'),
  document.querySelector('.add-entry-button'),
  document.querySelector('.add-entry-form'),
  document.querySelector('.update-entry-modal'),
  document.querySelector('.update-entry-form')
)
const eventsManager: EventsManager = new EventsManager(
  document.querySelector('.events-table-content')
)
const app: App = new App(dayManager, entryManager, eventsManager)
app.start()
