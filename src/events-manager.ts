class EventsManager {
  tableContent: HTMLElement
  constructor(tableContent: HTMLElement) {
    this.tableContent = tableContent
  }
  public addNewEntry(entry: Entry): void {
    const row: HTMLTableRowElement = this.generateNewRow(entry)
    entry.row = row
    this.tableContent.appendChild(row)
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

    actionsCell.append(updateButton, deleteButton)
    row.append(timeCell, descriptionCell, actionsCell)
    return row
  }
}
