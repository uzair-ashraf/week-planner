class EntryManager {
  modalContainer: HTMLElement
  addEntryModal: HTMLElement
  addEntryForm: HTMLFormElement
  addEntryButton: HTMLButtonElement
  updateEntryModal: HTMLElement
  updateEntryForm: any
  deleteEntryModal: HTMLElement
  confirmDeleteButton: HTMLButtonElement
  resetUpdating: Function
  addNewEntry: Function
  getUpdatingEntry: Function
  updateEntryInEvent: Function
  getCurrentDay: Function
  updateEntryInData: Function
  resetDeleting: Function
  deleteEntryInData: Function
  constructor(
    modalContainer: HTMLElement,
    addEntryModal: HTMLElement,
    addEntryButton: HTMLButtonElement,
    addEntryForm: HTMLFormElement,
    updateEntryModal: HTMLElement,
    updateEntryForm: any,
    deleteEntryModal: HTMLElement,
    confirmDeleteButton: HTMLButtonElement,
    ) {
    this.modalContainer = modalContainer
    this.addEntryModal = addEntryModal
    this.addEntryButton = addEntryButton
    this.addEntryForm = addEntryForm
    this.updateEntryModal = updateEntryModal
    this.updateEntryForm = updateEntryForm
    this.deleteEntryModal = deleteEntryModal
    this.confirmDeleteButton = confirmDeleteButton
    this.addNewEntry = null
    this.resetUpdating = null
    this.getUpdatingEntry = null
    this.updateEntryInEvent = null
    this.getCurrentDay = null
    this.updateEntryInData = null
    this.resetDeleting = null
    this.deleteEntryInData = null
  }
  public setEventListeners(): void {
    this.addEntryButton.addEventListener('click', this.showEntryModal.bind(this))
    this.modalContainer.addEventListener('click', this.cancelAllEntries.bind(this))
    this.addEntryForm.addEventListener('submit', this.handleNewEntry.bind(this))
    this.updateEntryForm.addEventListener('submit', this.handleUpdateEntry.bind(this))
    this.confirmDeleteButton.addEventListener('click', this.handleDeleteEntry.bind(this))
  }
  public setCallbacks(
    addNewEntry: Function,
    resetUpdating: Function,
    getUpdatingEntry: Function,
    updateEntryInEvent: Function,
    getCurrentDay: Function,
    updateEntryInData: Function,
    resetDeleting: Function,
    deleteEntryInData: Function
  ): void {
    this.addNewEntry = addNewEntry
    this.resetUpdating = resetUpdating
    this.getUpdatingEntry = getUpdatingEntry
    this.updateEntryInEvent = updateEntryInEvent
    this.getCurrentDay = getCurrentDay
    this.updateEntryInData = updateEntryInData
    this.resetDeleting = resetDeleting
    this.deleteEntryInData = deleteEntryInData
  }
  public fillUpdateModal(entry: Entry): void {
    const { day, time, description } = entry
    const [daySelect, timeSelect, ,textArea] = this.updateEntryForm
    daySelect.value = day
    timeSelect.value = time
    textArea.value = description
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
  private handleUpdateEntry(event: SubmitEvent): void {
    event.preventDefault()
    const formData: FormData = new FormData(event.target)
    const day: any = formData.get('day')
    const time: any = formData.get('time')
    const description: any = formData.get('description')
    if (!day || !time || !description) return
    const entry: Entry = this.getUpdatingEntry()
    const newEntry: Entry = {
      day,
      time,
      description
    }
    this.updateEntryInData(newEntry)
    this.hideUpdateModal()
    event.target.reset()
  }
  private handleDeleteEntry(): void {
    this.deleteEntryInData()
    this.hideDeleteModal()
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
    this.hideModalShadow()
    this.updateEntryModal.classList.add('hidden')
  }
  public showDeleteModal(): void {
    this.showModalShadow()
    this.deleteEntryModal.classList.remove('hidden')
  }
  private hideDeleteModal(): void {
    this.hideModalShadow()
    this.deleteEntryModal.classList.add('hidden')
  }
  private showModalShadow(): void {
    this.modalContainer.classList.remove('hidden')
  }
  private hideModalShadow(): void {
    this.modalContainer.classList.add('hidden')
  }
  private cancelAllEntries(event: ClickEvent): void {
    if(
      !event.target.classList.contains('modal-container') &&
      event.target.className !== 'cancel-delete'
    ) return
    console.log('hit')
    if(!this.modalContainer.classList.contains('hidden')) {
      this.modalContainer.classList.add('hidden')
    }
    const modals: Element[] = [...this.modalContainer.children]
    modals.forEach(element => {
      if(!element.classList.contains('hidden')) {
        element.classList.add('hidden')
      }
    })
    this.updateEntryForm.reset()
    this.resetUpdating()
    this.resetDeleting()
  }
}
