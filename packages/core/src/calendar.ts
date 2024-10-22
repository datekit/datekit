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
} from './views'
import { type DatekitEvent, type DatekitEventSource } from './events'

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
  events: DatekitEvent[]
  sources: DatekitEventSource[]
}

export class Calendar {
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
  }

  addEvent(event: DatekitEvent): void {
    this.state.events.push(event)
  }

  removeEvent(id: string): void {
    this.state.events = this.state.events.filter((event) => event.id !== id)
  }

  getEvents(): DatekitEvent[] {
    return this.state.events
  }

  setView(view: View): void {
    this.state.view = view
    this.refresh()
  }

  getView(): View {
    return this.state.view
  }

  setCurrent(date: Date): void {
    console.log('Setting current date', date)
    this.state.selected.current = date
    this.refresh()
  }

  getCurrent(): Date {
    return this.state.selected.current
  }

  getState(): CalendarState {
    return this.state
  }

  private refresh() {
    this.state.selected.day = generateActiveDay(this.state.selected.current)
    this.state.selected.week = generateWeekView(this.state.selected.current)
    this.state.selected.month = generateMonthView(this.state.selected.current)
    this.state.selected.year = generateYearView(this.state.selected.current)
    console.log('Refreshed state', this.state)
  }
}
