import type { EventManager } from './event-manager'
import type { DatekitEvent } from './events'
import {
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  setMonth,
  format,
  isSameDay,
  startOfYear,
  endOfYear,
} from 'date-fns'

export const DAY_VIEW = 'day'
export const WEEK_VIEW = 'week'
export const MONTH_VIEW = 'month'
export const YEAR_VIEW = 'year'

export type View =
  | typeof DAY_VIEW
  | typeof WEEK_VIEW
  | typeof MONTH_VIEW
  | typeof YEAR_VIEW

export type Day = {
  date: Date
  isCurrentMonth?: boolean
  isSelected?: boolean
  isToday?: boolean
  events?: DatekitEvent[]
}

export type Week = Day[]

export type Month = {
  name: string
  days: Day[]
}

export type Year = Month[]

export function generateActiveDay(date: Date): Day {
  const today = new Date()
  const isToday = date.toDateString() === today.toDateString()
  const isSelected = false // Add logic to determine if the day is selected
  const events: any = [] // Add logic to fetch events for the day
  return { date, isToday, isSelected, events }
}

export function generatePeriodStart(view: View, date: Date): Date {
  switch (view) {
    case DAY_VIEW:
      return startOfDay(date)
    case WEEK_VIEW:
      return startOfWeek(date)
    case MONTH_VIEW:
      return startOfMonth(date)
    case YEAR_VIEW:
      return startOfYear(date)
  }
}

export function generatePeriodEnd(view: View, date: Date): Date {
  switch (view) {
    case DAY_VIEW:
      return endOfDay(date)
    case WEEK_VIEW:
      return endOfWeek(date)
    case MONTH_VIEW:
      return endOfMonth(date)
    case YEAR_VIEW:
      return endOfYear(date)
  }
}

export function generateWeekView(selectedDate: Date): Week {
  const today = new Date()
  const days = []

  const selected = new Date(selectedDate)
  const firstDayOfWeek = new Date(
    selected.getFullYear(),
    selected.getMonth(),
    selected.getDate() - selected.getDay()
  )
  const lastDayOfWeek = new Date(
    selected.getFullYear(),
    selected.getMonth(),
    selected.getDate() + (6 - selected.getDay())
  )

  for (let i = 0; i < 7; i++) {
    const date = new Date(firstDayOfWeek)
    date.setDate(date.getDate() + i)
    const isCurrentMonth = date.getMonth() === today.getMonth()
    const isToday = date.toDateString() === today.toDateString()
    const isSelected = false // Add logic to determine if the day is selected
    const events: any = [] // Add logic to fetch events for the day
    days.push({ date, isCurrentMonth, isToday, isSelected, events })
  }

  return days
}

export function generateMonthView(
  selectedDate: Date,
  eventManager: EventManager
): Month {
  const today = new Date()
  const selected = new Date(selectedDate)

  const firstDayOfMonth = startOfMonth(selected)
  const lastDayOfMonth = endOfMonth(selected)
  const days = []

  // Calculate the start date (including days from the previous month)
  const startDate = startOfWeek(firstDayOfMonth)

  // Calculate the end date (including days from the next month)
  const endDate = endOfWeek(lastDayOfMonth)

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const isCurrentMonth = date.getMonth() === selected.getMonth()
    const isToday = isSameDay(date, today)
    const isSelected = isSameDay(date, selected) // Add logic to determine if the day is selected
    const events = eventManager.getFilteredEvents({
      startDate: startOfDay(date),
      endDate: endOfDay(date),
    })

    days.push({
      date: new Date(date),
      isCurrentMonth,
      isToday,
      isSelected,
      events,
    })
  }

  const monthName = new Date(
    selected.getFullYear(),
    selected.getMonth()
  ).toLocaleString('default', { month: 'long' })

  return { name: monthName, days }
}

export function generateYearView(selectedDate: Date): Year {
  const today = new Date()
  const result = []

  const selected = new Date(selectedDate)

  for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
    const firstDayOfMonth = startOfMonth(setMonth(selected, monthIndex))
    const lastDayOfMonth = endOfMonth(setMonth(selected, monthIndex))
    const days = []

    // Calculate the start date (including days from the previous month)
    const startDate = startOfWeek(firstDayOfMonth)

    // Calculate the end date (including days from the next month)
    const endDate = endOfWeek(lastDayOfMonth)

    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const isCurrentMonth = date.getMonth() === monthIndex
      const isToday = date.toDateString() === today.toDateString()
      const isSelected = false // Add logic to determine if the day is selected
      const events: any = [] // Add logic to fetch events for the day
      days.push({
        date: new Date(date),
        isCurrentMonth,
        isToday,
        isSelected,
        events,
      })
    }

    const monthName = format(firstDayOfMonth, 'MMMM')

    result.push({ name: monthName, days })
  }

  return result
}
