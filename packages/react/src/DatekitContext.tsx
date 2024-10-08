import { createContext, useContext, useRef, useState } from 'react'
import { CalendarState, CalendarEvent, View } from '@datekit/core'

type DatekitContextProps = CalendarState & {
  addEvent: (event: CalendarEvent) => void
  removeEvent: (id: string) => void
  setView: (view: View) => void
  setCurrent: (date: Date) => void
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
