export class EventBus {
  private listeners: Record<string, Function[]> = {}

  on(name: string, callback: () => void) {
    if (!this.listeners[name]) {
      this.listeners[name] = []
    }
    this.listeners[name].push(callback)

    return () => {
      this.off(name, callback)
    }
  }

  off(name: string, callback: () => void) {
    if (!this.listeners[name]) return
    this.listeners[name] = this.listeners[name].filter((c) => c !== callback)
  }

  emit(name: string) {
    if (!this.listeners[name]) return
    this.listeners[name].forEach((callback) => callback())
  }
}
