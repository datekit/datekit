import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Calendar, CalendarState, CalendarEvent, View } from '@datekit/core';

type DatekitContextProps = CalendarState & {
  addEvent: (event: CalendarEvent) => void;
  removeEvent: (id: string) => void;
  setView: (view: View) => void;
  setCurrent: (date: Date) => void;
}

const DatekitContext = createContext<DatekitContextProps | undefined>(undefined);

export const DatekitProvider: React.FC<{ children: React.ReactNode, options?: Partial<CalendarState> }> = ({ children, options }) => {
  const calendarRef = useRef(new Calendar(options));
  const [state, setState] = useState<CalendarState>(calendarRef.current.getState());

  const updateState = () => {
    setState({ ...calendarRef.current.getState() });
  }

  const addEvent = (event: CalendarEvent) => {
    calendarRef.current.addEvent(event);
    updateState();
  };

  const removeEvent = (id: string) => {
    calendarRef.current.removeEvent(id);
    updateState();
  };

  const setView = (view: View) => {
    calendarRef.current.setView(view);
    updateState();
  };

  const setCurrent = (date: Date) => {
    calendarRef.current.setCurrent(date);
    updateState();
  };

  return (
    <DatekitContext.Provider value={{ ...state, addEvent, removeEvent, setView, setCurrent  }}>
      {children}
    </DatekitContext.Provider>
  );
};

export const useDatekit = (): DatekitContextProps => {
  const context = useContext(DatekitContext);

  if (!context) {
    throw new Error('useDatekit must be used within a DatekitProvider');
  }

  return context;
};
