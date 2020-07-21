interface ClickEvent {
  target: HTMLElement
}
interface SubmitEvent {
  target: HTMLFormElement
  preventDefault: Function
}
interface Entry {
  day: FormDataEntryValue
  time: FormDataEntryValue
  description: FormDataEntryValue
}
interface Modals {
  [key: string]: HTMLElement
}
