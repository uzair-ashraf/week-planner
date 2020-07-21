class EntryManager {
  modalContainer: HTMLElement
  addEntryModal: HTMLElement
  addEntryButton: HTMLElement
  isShowingModal: boolean
  constructor(modalContainer: HTMLElement, addEntryModal: HTMLElement, addEntryButton: HTMLElement) {
    this.modalContainer = modalContainer
    this.addEntryModal = addEntryModal
    this.addEntryButton = addEntryButton
  }
  public setEventListeners(): void {
    this.addEntryButton.addEventListener('click', this.showEntryModal.bind(this))
    this.modalContainer.addEventListener('click', this.cancelAllEntries.bind(this))
  }
  private showEntryModal(): void {
    this.showModalShadow()
    this.addEntryModal.classList.remove('hidden')
  }
  private showModalShadow(): void {
    this.modalContainer.classList.remove('hidden')
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
