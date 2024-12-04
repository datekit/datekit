import { describe, it, expect, beforeEach } from 'vitest'
import { EventManager } from './event-manager'
import { DatekitEvent } from './events'

describe('EventManager', () => {
  let eventManager: EventManager

  beforeEach(() => {
    eventManager = new EventManager()
  })

  describe('setEvents', () => {
    it('should set multiple events', () => {
      const events: DatekitEvent[] = [
        {
          id: '1',
          name: 'Event 1',
          start: new Date('2024-01-01'),
          end: new Date('2024-01-02'),
        },
        {
          id: '2',
          name: 'Event 2',
          start: new Date('2024-01-03'),
          end: new Date('2024-01-04'),
        },
      ]

      eventManager.setEvents(events)
      expect(eventManager.getEvents()).toHaveLength(2)
    })
  })

  describe('getFilteredEvents', () => {
    beforeEach(() => {
      const events: DatekitEvent[] = [
        {
          id: '1',
          name: 'Event 1',
          start: new Date('2024-01-01'),
          end: new Date('2024-01-02'),
        },
        {
          id: '2',
          name: 'Event 2',
          start: new Date('2024-01-03'),
          end: new Date('2024-01-04'),
        },
        {
          id: '3',
          name: 'Event 3',
          start: new Date('2024-01-02'),
          end: new Date('2024-01-03'),
        },
        {
          id: '4',
          name: 'Multi-day Event',
          start: new Date('2024-01-01'),
          end: new Date('2024-01-05'),
        },
        {
          id: '5',
          name: 'Outside Range Event',
          start: new Date('2024-01-10'),
          end: new Date('2024-01-11'),
        },
      ]
      eventManager.setEvents(events)
    })

    it('should filter events within date range', () => {
      const filtered = eventManager.getFilteredEvents({
        startDate: new Date('2024-01-01'),
        endDate: new Date('2024-01-02'),
      })
      expect(filtered).toHaveLength(3)
      expect(filtered[0].id).toBe('1')
      expect(filtered[1].id).toBe('3')
      expect(filtered[2].id).toBe('4')
    })
  })

  describe('addEvent', () => {
    it('should add a single event', () => {
      const event: DatekitEvent = {
        id: '1',
        name: 'Event 1',
        start: new Date('2024-01-01'),
        end: new Date('2024-01-02'),
      }

      eventManager.addEvent(event)
      expect(eventManager.getEvents()).toHaveLength(1)
      expect(eventManager.getEvents()[0]).toEqual(
        expect.objectContaining(event)
      )
    })
  })

  describe('removeEvent', () => {
    it('should remove an event by id', () => {
      const event: DatekitEvent = {
        id: '1',
        name: 'Event 1',
        start: new Date('2024-01-01'),
        end: new Date('2024-01-02'),
      }

      eventManager.addEvent(event)
      expect(eventManager.getEvents()).toHaveLength(1)

      eventManager.removeEvent('1')
      expect(eventManager.getEvents()).toHaveLength(0)
    })
  })
})
