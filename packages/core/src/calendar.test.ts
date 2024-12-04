import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  DAY_VIEW,
  generateActiveDay,
  generateMonthView,
  generateWeekView,
  generateYearView,
  generatePeriodStart,
  generatePeriodEnd,
} from './views'
import { Calendar } from './calendar'
import type { DatekitEvent } from './events'

vi.mock('./views', () => ({
  DAY_VIEW: 'day',
  generateActiveDay: vi.fn(() => ({ date: new Date() })),
  generateMonthView: vi.fn(() => ({ name: '', days: [] })),
  generateWeekView: vi.fn(() => []),
  generateYearView: vi.fn(() => []),
  generatePeriodStart: vi.fn(() => new Date()),
  generatePeriodEnd: vi.fn(() => new Date()),
}))

describe('Calendar', () => {
  let calendar: Calendar

  beforeEach(() => {
    calendar = new Calendar()
    vi.clearAllMocks()
  })

  describe('initialization', () => {
    it('should initialize with default values', () => {
      expect(calendar.getView()).toBe(DAY_VIEW)
      expect(calendar.getState().events).toEqual([])
      expect(calendar.getState().sources).toEqual([])
    })

    it('should initialize with custom options', () => {
      const customView = 'week'
      calendar = new Calendar({ defaultView: customView })
      expect(calendar.getView()).toBe(customView)
    })
  })

  describe('event management', () => {
    it('should add events', () => {
      const event = {
        id: '1',
        name: 'Test Event',
        start: new Date(),
        end: new Date(),
      } as DatekitEvent<unknown>

      calendar.addEvent(event)
      expect(calendar.getState().events).toEqual([event])
    })

    it('should remove events', () => {
      const event = {
        id: '1',
        name: 'Test Event',
        start: new Date(),
        end: new Date(),
      } as DatekitEvent<unknown>

      calendar.addEvent(event)
      calendar.removeEvent('1')
      expect(calendar.getState().events).not.toContain(event)
    })

    it('should filter events based on period', () => {
      const now = new Date()
      const pastEvent = {
        id: '1',
        start: new Date(now.getTime() - 1000000),
        end: new Date(now.getTime() - 900000),
        name: 'Past Event',
      } as DatekitEvent<unknown>

      const futureEvent = {
        id: '2',
        start: new Date(now.getTime() + 900000),
        end: new Date(now.getTime() + 1000000),
        name: 'Future Event',
      } as DatekitEvent<unknown>

      calendar.addEvent(pastEvent)
      calendar.addEvent(futureEvent)

      const events = calendar.getState().events
      expect(events).toHaveLength(0) // Since mock dates don't match period
    })
  })

  describe('view management', () => {
    it('should set and get view', () => {
      const newView = 'month'
      calendar.setView(newView)
      expect(calendar.getView()).toBe(newView)
    })

    it('should set current date', async () => {
      const newDate = new Date(2024, 0, 1)
      await calendar.setCurrent(newDate)
      expect(calendar.getCurrent()).toEqual(newDate)
    })
  })

  describe('period management', () => {
    it('should set and get period', () => {
      calendar.setPeriod()
      const period = calendar.getPeriod()
      expect(period).toHaveProperty('startDate')
      expect(period).toHaveProperty('endDate')
    })
  })

  describe('refresh functionality', () => {
    it('should refresh calendar state', async () => {
      await calendar.refreshCalendar()
      expect(generateActiveDay).toHaveBeenCalled()
      expect(generateWeekView).toHaveBeenCalled()
      expect(generateMonthView).toHaveBeenCalled()
      expect(generateYearView).toHaveBeenCalled()
    })
  })
})
