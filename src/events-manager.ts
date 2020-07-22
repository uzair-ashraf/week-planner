class EventsManager {
  tableContent: HTMLElement
  setUpdating: Function
  setDeleting: Function
  getCurrentDay: Function
  getCurrentEvents: Function
  constructor(tableContent: HTMLElement) {
    this.tableContent = tableContent
    this.setUpdating = null
    this.setDeleting = null
    this.getCurrentDay = null
    this.getCurrentEvents = null
  }
  public addNewEntry(entry: Entry): void {
    if (entry.day !== this.getCurrentDay()) return
    const row: HTMLTableRowElement = this.generateNewRow(entry)
    entry.row = row
    this.tableContent.appendChild(row)
  }
  public updateEvents(): void {
    const entries: Entry[] = this.getCurrentEvents()
    this.tableContent.innerHTML = ''
    for(let i: number = 0; i < entries.length; i++) {
      const row: HTMLTableRowElement = this.generateNewRow(entries[i])
      entries[i].row = row
      this.tableContent.appendChild(row)
    }
  }
  public updateEntryInEvent(entry: Entry): void {
    const [timeCell, descriptionCell] = entry.row.children
    timeCell.textContent = entry.time
    descriptionCell.textContent = entry.description
  }
  public deleteEntryInEvent(entry: Entry): void {
    entry.row.remove()
  }
  public setCallbacks(
    setUpdating: Function,
    setDeleting: Function,
    getCurrentDay: Function,
    getCurrentEvents: Function
  ) {
    this.setUpdating = setUpdating
    this.setDeleting = setDeleting
    this.getCurrentDay = getCurrentDay
    this.getCurrentEvents = getCurrentEvents
  }
  private generateNewRow(entry: Entry): HTMLTableRowElement {
    const row: HTMLTableRowElement = document.createElement('tr')
    const timeCell: HTMLTableDataCellElement = document.createElement('td')
    const descriptionCell: HTMLTableDataCellElement = document.createElement('td')
    const actionsCell: HTMLTableDataCellElement = document.createElement('td')
    const updateButton: HTMLButtonElement = document.createElement('button')
    const deleteButton: HTMLButtonElement = document.createElement('button')

    timeCell.className = 'event-time'
    descriptionCell.className = 'event-description'
    actionsCell.className = 'actions'

    timeCell.textContent = entry.time
    descriptionCell.innerText = entry.description
    updateButton.textContent = 'Update'
    deleteButton.textContent = 'Delete'
    updateButton.addEventListener('click', () => this.setUpdating(row))
    deleteButton.addEventListener('click', () => this.setDeleting(row))
    actionsCell.append(updateButton, deleteButton)
    row.append(timeCell, descriptionCell, actionsCell)
    return row
  }
}
