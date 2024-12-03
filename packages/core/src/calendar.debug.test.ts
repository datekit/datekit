import { describe, it, vi, expect } from 'vitest'
import { Calendar } from './calendar'
import type { DatekitEvent } from './events'
import { addDays } from 'date-fns'

const mockEvents = vi.fn((info, success, error) => {
  success([
    {
      id: '1',
      name: 'Test Event',
      start: new Date(),
      end: addDays(new Date(), 2),
    },
  ])
})

describe('Calendar', () => {
  it('should call sources', async () => {
    const calendar = new Calendar({
      sources: [
        {
          name: 'Test Source',
          id: 'test',
          events: mockEvents,
        },
      ],
    })

    const current = new Date()
    await calendar.setCurrent(current)
    await calendar.setCurrent(current)
    await calendar.setCurrent(current)

    expect(calendar.getState().selected.current).toEqual(current)

    await vi.waitFor(() => {
      expect(mockEvents).toHaveBeenCalledOnce()
      expect(calendar.getState().events).toHaveLength(1)
    })
  })
})
