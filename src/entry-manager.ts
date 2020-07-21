class EntryManager {
  modalContainer: HTMLElement
  addEntryModal: HTMLElement
  addEntryForm: HTMLElement
  addEntryButton: HTMLElement
  updateEntryModal: HTMLElement
  updateEntryForm: HTMLElement
  isShowingModal: boolean
  addNewEntry: Function
  constructor(
    modalContainer: HTMLElement,
    addEntryModal: HTMLElement,
    addEntryButton: HTMLElement,
    addEntryForm: HTMLElement,
    updateEntryModal: HTMLElement,
    updateEntryForm: HTMLElement
    ) {
    this.modalContainer = modalContainer
    this.addEntryModal = addEntryModal
    this.addEntryButton = addEntryButton
    this.addEntryForm = addEntryForm
    this.updateEntryModal = updateEntryModal
    this.updateEntryForm = updateEntryForm
  }
  public setEventListeners(): void {
    this.addEntryButton.addEventListener('click', this.showEntryModal.bind(this))
    this.modalContainer.addEventListener('click', this.cancelAllEntries.bind(this))
    this.addEntryForm.addEventListener('submit', this.handleNewEntry.bind(this))
  }
  public setCallbacks(addNewEntry: Function): void {
    this.addNewEntry = addNewEntry
  }
  private handleNewEntry(event: SubmitEvent): void {
    event.preventDefault()
    const formData:FormData = new FormData(event.target)
    const day: FormDataEntryValue = formData.get('day')
    const time: FormDataEntryValue = formData.get('time')
    const description: FormDataEntryValue = formData.get('description')
    if(!day || !time || !description) return
    const newEntry: Entry = {
      day,
      time,
      description
    }
    this.addNewEntry(newEntry)
    this.hideEntryModal()
    event.target.reset()
  }
  private showEntryModal(): void {
    this.showModalShadow()
    this.addEntryModal.classList.remove('hidden')
  }
  private hideEntryModal(): void {
    this.hideModalShadow()
    this.addEntryModal.classList.add('hidden')
  }
  public showUpdateModal(): void {
    this.showModalShadow()
    this.updateEntryModal.classList.remove('hidden')
  }
  private hideUpdateModal(): void {
    this.updateEntryModal.classList.add('hidden')
  }
  private showModalShadow(): void {
    this.modalContainer.classList.remove('hidden')
  }
  private hideModalShadow(): void {
    this.modalContainer.classList.add('hidden')
  }
  private cancelAllEntries(event: ClickEvent): void {
    if(!event.target.classList.contains('modal-container')) return
    if(!this.modalContainer.classList.contains('hidden')) {
      this.modalContainer.classList.add('hidden')
    }
    const modals: Element[] = [...this.modalContainer.children]
    modals.forEach(element => {
      if(!element.classList.contains('hidden')) {
        element.classList.add('hidden')
      }
    })
  }
}
