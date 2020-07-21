interface ClickEvent {
  target: HTMLElement
}
interface SubmitEvent {
  target: HTMLFormElement
  preventDefault: Function
}
interface Entry {
  day: any
  time: any
  description: any
  row?: HTMLTableRowElement
}
interface Modals {
  [key: string]: HTMLElement
}
