const dayManager = new DayManager(
  document.querySelector('.day-container'),
  document.querySelector('.event-day')
)
const app: App = new App(dayManager)
app.start()
