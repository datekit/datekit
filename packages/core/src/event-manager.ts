import { isWithinInterval, isSameDay } from 'date-fns'
import { DatekitEvent } from './events'

export class EventManager {
  private events = new Map<string, DatekitEvent>()

  private normalizeEvent(event: DatekitEvent): DatekitEvent {
    return {
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }
  }

  setEvents(events: DatekitEvent[]) {
    for (const event of events) {
      const normalizedEvent = this.normalizeEvent(event)
      this.events.set(event.id, normalizedEvent)
    }
  }

  getEvents() {
    return Array.from(this.events.values())
  }

  getFilteredEvents({
    startDate,
    endDate,
  }: {
    startDate: Date
    endDate: Date
  }): DatekitEvent[] {
    const events = this.getEvents()

    const filteredEvents = events.filter((event) => {
      const eventStart = event.start
      const eventEnd = event.end

      return (
        isWithinInterval(eventStart, { start: startDate, end: endDate }) ||
        isWithinInterval(eventEnd, { start: startDate, end: endDate })
      )
    })

    console.log('*************************', filteredEvents)
    return filteredEvents
  }

  addEvent(event: DatekitEvent) {
    const normalizedEvent = this.normalizeEvent(event)
    this.events.set(event.id, normalizedEvent)
  }

  removeEvent(id: DatekitEvent['id']) {
    this.events.delete(id)
  }
}
