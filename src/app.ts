interface App {
  data: Array<Object>
}

class App {
  constructor() {
    this.data = []
  }
  private getStorage(): void {
    const data: string = localStorage.getItem('data')
    this.data = JSON.parse(data) || []
  }
  public start():void {
    this.getStorage()
    console.log('meow')
  }
}
