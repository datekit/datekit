import {
  type DatekitEvent,
  type CalendarState,
  type DatekitEventSource,
  type View,
  Calendar,
} from '@datekit/core'
import { useRef, useState } from 'react'

interface UseCalendarProps {
  sources: DatekitEventSource[]
  defaultView: View
}

export function useCalendar(options: UseCalendarProps) {
  const calendarRef = useRef(new Calendar(options))
  const [state, setState] = useState<CalendarState>(
    calendarRef.current.getState()
  )

  const updateState = () => {
    setState({ ...calendarRef.current.getState() })
  }

  const setView = (view: View) => {
    calendarRef.current.setView(view)
    updateState()
  }

  const addEvent = (event: DatekitEvent) => {
    calendarRef.current.addEvent(event)
    updateState()
  }

  const removeEvent = (id: string) => {
    calendarRef.current.removeEvent(id)
    updateState()
  }

  const setCurrent = (date: Date) => {
    calendarRef.current.setCurrent(date)
    updateState()
  }

  return {
    ...state,
    setView,
    addEvent,
    removeEvent,
    setCurrent,
  }
}
