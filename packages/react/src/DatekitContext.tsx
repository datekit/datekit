import { createContext, useContext } from 'react'
import { CalendarState, type View } from '@datekit/core'

type DatekitContextProps = CalendarState & {
  addEvent: (event: Event) => void
  removeEvent: (id: string) => void
  setView: (view: View) => Promise<void>
  setCurrent: (date: Date) => void
  setPrevious: () => void
  setNext: () => void
  setToday: () => void
}

const DatekitContext = createContext<DatekitContextProps | undefined>(undefined)

interface DatekitProviderProps {
  children: React.ReactNode
  calendar: any
}

export const DatekitProvider = ({
  children,
  calendar,
}: DatekitProviderProps) => {
  return (
    <DatekitContext.Provider value={calendar}>
      {children}
    </DatekitContext.Provider>
  )
}

export const useDatekit = (): DatekitContextProps => {
  const context = useContext(DatekitContext)

  if (!context) {
    throw new Error('useDatekit must be used within a DatekitProvider')
  }

  return context
}
