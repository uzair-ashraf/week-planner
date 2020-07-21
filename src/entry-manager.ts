class EntryManager {
  modalContainer: HTMLElement
  modal: HTMLElement
  addEntryButton: HTMLElement
  constructor(modalContainer: HTMLElement, modal: HTMLElement, addEntryButton: HTMLElement) {
    this.modalContainer = modalContainer
    this.modal = modal
    this.addEntryButton = this.addEntryButton
  }
  public setEventListeners(): void {
    this.addEntryButton.addEventListener('click', this.triggerModal.bind(this))
  }
  private triggerModal(event: ClickEvent): void {
    console.log(event)
  }
}
