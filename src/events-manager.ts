class EventsManager {
  tableContent: HTMLElement
  setUpdating: Function
  getCurrentDay: Function
  getCurrentEvents: Function
  constructor(tableContent: HTMLElement) {
    this.tableContent = tableContent
    this.setUpdating = null
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
  public updateEntry(entry: Entry, newEntry: Entry): void {
    if(newEntry.day !== this.getCurrentDay()) return
    entry.time = newEntry.time
    entry.description = newEntry.description
    const [timeCell, descriptionCell] = entry.row.children
    timeCell.textContent = newEntry.time
    descriptionCell.textContent = newEntry.description
  }
  public setCallbacks(
    setUpdating: Function,
    getCurrentDay: Function,
    getCurrentEvents: Function
  ) {
    this.setUpdating = setUpdating
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
    actionsCell.append(updateButton, deleteButton)
    row.append(timeCell, descriptionCell, actionsCell)
    return row
  }
}
