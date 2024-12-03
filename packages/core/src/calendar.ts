import {
  DAY_VIEW,
  generateActiveDay,
  generateMonthView,
  generateWeekView,
  generateYearView,
  type Day,
  type Month,
  type Week,
  type Year,
  type View,
  generatePeriodStart,
  generatePeriodEnd,
} from './views'
import { type DatekitEvent, type DatekitEventSource } from './events'
import { isWithinInterval } from 'date-fns'
export interface SelectedState {
  today: Date
  current: Date
  day: Day
  week: Week
  month: Month
  year: Year
}

export interface CalendarState {
  view: View
  defaultView: View
  selected: SelectedState
  period: {
    startDate: Date
    endDate: Date
  }
  events: DatekitEvent[]
  sources: DatekitEventSource[]
}

export class Calendar {
  private debounceId: ReturnType<typeof setTimeout> | null = null
  private debounceTime = 0
  private readonly state: CalendarState = {
    view: DAY_VIEW,
    defaultView: DAY_VIEW,
    selected: {
      today: new Date(),
      current: new Date(),
      day: { date: new Date() },
      week: [],
      month: { name: '', days: [] },
      year: [],
    },
    period: {
      startDate: new Date(),
      endDate: new Date(),
    },
    events: [],
    sources: [],
  }

  constructor(options: Partial<CalendarState> = {}) {
    console.log('Constructor with options', options)
    this.state = {
      ...this.state,
      ...options,
      view: options.defaultView ?? this.state.defaultView,
    }
    this.refresh()
    this.setPeriod()
  }

  addEvent(event: DatekitEvent): void {
    this.state.events.push(event)
  }

  removeEvent(id: string): void {
    this.state.events = this.state.events.filter((event) => event.id !== id)
  }

  getEvents(): DatekitEvent[] {
    const filteredEvents = this.state.events
      .map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }))
      .filter(
        (event) =>
          isWithinInterval(event.start, {
            start: this.state.period.startDate,
            end: this.state.period.endDate,
          }) ||
          isWithinInterval(event.end, {
            start: this.state.period.startDate,
            end: this.state.period.endDate,
          })
      )

    return filteredEvents
  }

  setView(view: View): void {
    this.state.view = view
    this.refreshCalendar()
  }

  getView(): View {
    return this.state.view
  }

  async setCurrent(date: Date): Promise<void> {
    console.log('Setting current date', date)
    this.state.selected.current = date
    await this.refreshCalendar()
  }

  async refreshCalendar(): Promise<void> {
    this.setPeriod()
    this.refresh()
    console.log('Refreshing sources')
    await this.refreshSources()
    console.log('Sources refreshed')

    console.log('Calendar refreshed', this.state)
  }

  setPeriod(): void {
    this.state.period.startDate = generatePeriodStart(
      this.state.view,
      this.state.selected.current
    )
    this.state.period.endDate = generatePeriodEnd(
      this.state.view,
      this.state.selected.current
    )
  }

  getPeriod(): { startDate: Date; endDate: Date } {
    return this.state.period
  }

  getCurrent(): Date {
    return this.state.selected.current
  }

  getState(): CalendarState {
    return {
      ...this.state,
      events: this.getEvents(),
    }
  }

  private async refreshSources() {
    if (this.debounceId) {
      clearTimeout(this.debounceId)
    }

    this.debounceId = setTimeout(async () => {
      if (!this.state) return

      const dateEvents: DatekitEvent[] = []
      await Promise.all(
        this.state.sources.map(async (source: { events: Function | any[] }) => {
          if (typeof source.events === 'function') {
            return source.events(
              {
                startDate: this.state.period.startDate,
                endDate: this.state.period.endDate,
              },
              (events: any[]) => {
                console.log('Events fetched', events)
                dateEvents.push(...events)
              },
              (error: Error) => {
                console.error('Error fetching events', error)
              }
            )
          } else {
            dateEvents.push(...source.events)
          }
        })
      )

      console.log('Events', dateEvents)
      this.state.events = dateEvents

      console.log('State', this.getState())
    }, this.debounceTime)
  }

  private refresh() {
    this.state.selected.day = generateActiveDay(this.state.selected.current)
    this.state.selected.week = generateWeekView(this.state.selected.current)
    this.state.selected.month = generateMonthView(this.state.selected.current)
    this.state.selected.year = generateYearView(this.state.selected.current)
    console.log('Refreshed state', this.state)
  }
}
