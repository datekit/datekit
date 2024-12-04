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
import { EventManager } from './event-manager'

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

export interface CalendarOptions extends Partial<CalendarState> {
  eventManager?: EventManager
}

export class Calendar {
  private debounceId: ReturnType<typeof setTimeout> | null = null
  private debounceTime = 0
  private readonly state: CalendarState
  private eventManager: EventManager

  constructor(options: CalendarOptions = {}) {
    this.eventManager = options.eventManager ?? new EventManager()

    if (options.events) {
      this.eventManager.setEvents(options.events)
    }

    this.state = {
      view: options.defaultView ?? DAY_VIEW,
      defaultView: options.defaultView ?? DAY_VIEW,
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
      events: this.eventManager.getEvents(),
      sources: options.sources ?? [],
    }

    this.refresh()
    this.setPeriod()
  }

  addEvent(event: DatekitEvent): void {
    console.log('*************************', event)
    console.log('*************************', this.state.period)
    this.eventManager.addEvent(event)
  }

  removeEvent(id: string): void {
    this.eventManager.removeEvent(id)
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
    console.log('Getting state', this.state.period)
    console.log(
      'Events',
      this.eventManager.getFilteredEvents(this.state.period)
    )
    return {
      ...this.state,
      events: this.eventManager.getFilteredEvents(this.state.period),
    }
  }

  private async refreshSources() {
    if (this.debounceId) {
      clearTimeout(this.debounceId)
    }

    this.debounceId = setTimeout(async () => {
      if (!this.state) return

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
                this.eventManager.setEvents(events)
              },
              (error: Error) => {
                console.error('Error fetching events', error)
              }
            )
          } else {
            this.eventManager.setEvents(source.events)
          }
        })
      )

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
