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
import { EventBus } from './event-bus'
import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  subDays,
  subMonths,
  subWeeks,
  subYears,
} from 'date-fns'

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
  isLoading: boolean
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
  private eventBus: EventBus

  constructor(options: CalendarOptions = {}) {
    this.eventManager = options.eventManager ?? new EventManager()
    this.eventBus = new EventBus()

    if (options.events) {
      this.eventManager.setEvents(options.events)
    }

    this.state = {
      view: options.defaultView ?? DAY_VIEW,
      defaultView: options.defaultView ?? DAY_VIEW,
      isLoading: false,
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

    this.setPeriod()
    this.refresh()
  }

  initialize() {
    this.refreshSources()
  }

  on(name: string, callback: () => void) {
    return this.eventBus.on(name, callback)
  }

  setToday() {
    this.setCurrent(new Date())
  }

  setPrevious() {
    switch (this.state.view) {
      case 'day':
        this.setCurrent(subDays(this.state.selected.current, 1))
        break
      case 'week':
        this.setCurrent(subWeeks(this.state.selected.current, 1))
        break
      case 'month':
        this.setCurrent(subMonths(this.state.selected.current, 1))
        break
      case 'year':
        this.setCurrent(subYears(this.state.selected.current, 1))
        break
      default:
        break
    }
  }

  setNext() {
    switch (this.state.view) {
      case 'day':
        this.setCurrent(addDays(this.state.selected.current, 1))
        break
      case 'week':
        this.setCurrent(addWeeks(this.state.selected.current, 1))
        break
      case 'month':
        this.setCurrent(addMonths(this.state.selected.current, 1))
        break
      case 'year':
        this.setCurrent(addYears(this.state.selected.current, 1))
        break
      default:
        break
    }
  }

  addEvent(event: DatekitEvent): void {
    this.eventManager.addEvent(event)
  }

  getEvents(): DatekitEvent[] {
    return this.eventManager.getEvents()
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

  setCurrent(date: Date): void {
    this.state.selected.current = date
    this.refreshCalendar()
  }

  refreshCalendar(): void {
    this.setPeriod()
    this.refreshSources()
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
      events: this.eventManager.getFilteredEvents(this.state.period),
    }
  }

  private async refreshSources() {
    if (this.debounceId) {
      clearTimeout(this.debounceId)
    }

    this.debounceId = setTimeout(async () => {
      this.state.isLoading = true

      try {
        await Promise.all(
          this.state.sources.map((source: any) => {
            if (typeof source.events === 'function') {
              return new Promise((resolve, reject) => {
                source.events(
                  {
                    startDate: this.state.period.startDate,
                    endDate: this.state.period.endDate,
                  },
                  (events: DatekitEvent[]) => {
                    this.eventManager.setEvents(events)
                    resolve(events)
                  },
                  (error: Error) => {
                    console.error('Error fetching events:', error)
                    reject(error)
                  }
                )
              })
            } else {
              this.eventManager.setEvents(source.events)
              return Promise.resolve()
            }
          })
        )
      } catch (error) {
        console.error('Error fetching events:', error)
      } finally {
        this.state.isLoading = false
        this.refresh()
      }
    }, this.debounceTime)
  }

  private refresh() {
    this.state.selected.day = generateActiveDay(this.state.selected.current)
    this.state.selected.week = generateWeekView(this.state.selected.current)
    this.state.selected.month = generateMonthView(
      this.state.selected.current,
      this.eventManager
    )
    this.state.selected.year = generateYearView(this.state.selected.current)

    this.eventBus.emit('refresh')
  }
}
