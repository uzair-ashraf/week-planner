const dayManager: DayManager = new DayManager(
  document.querySelector('.day-container'),
  document.querySelector('.event-day')
)
// const entryManager: EntryManager = new EntryManager(
//   document.querySelector('')
// )
const app: App = new App(dayManager)
app.start()
