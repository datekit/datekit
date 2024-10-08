export interface DatekitEvent<T = Record<string, any>> {
  id: string
  name: string
  start: Date
  end: Date
  metadata?: T
}

export interface DatekitEventSource<T = unknown> {
  id: string
  name: string
  events: DatekitEvent<T>[]
}
