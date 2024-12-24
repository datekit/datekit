export interface DatekitEvent<T = unknown> {
  id: string
  name: string
  start: Date
  end: Date
  metadata?: T
}

type EventLoader<T> = (
  info: { startDate: Date; endDate: Date },
  onSuccess: (events: DatekitEvent<T>[]) => void,
  onFailure: (error: Error) => void
) => void

export interface DatekitEventSource<T = unknown> {
  id: string
  name: string
  events: DatekitEvent<T>[] | EventLoader<T>
}
