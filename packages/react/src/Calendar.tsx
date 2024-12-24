'use client'

import { useDatekit, DatekitProvider } from './DatekitContext'
import DayView from './views/DayView'
import WeekView from './views/WeekView'
import MonthView from './views/MonthView'
import YearView from './views/YearView'

interface CalendarProps {
  calendar: any
}

const CalendarComponent = () => {
  const { view, selected } = useDatekit()

  switch (view) {
    case 'year':
      return <YearView />
    case 'month':
      return <MonthView />
    case 'week':
      return <WeekView />
    case 'day':
      return <DayView />
    default:
      return (
        <>
          <pre>View: {view}</pre>
          <pre>{selected.current.toISOString()}</pre>
        </>
      )
  }
}

export const Calendar = ({ calendar }: CalendarProps) => (
  <DatekitProvider calendar={calendar}>
    <CalendarComponent />
  </DatekitProvider>
)
