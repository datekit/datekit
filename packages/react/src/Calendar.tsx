"use client"

import React from 'react';
import { useDatekit, DatekitProvider } from './DatekitContext';
import { type CalendarEvent, type View } from '@datekit/core';
import DayView from './views/DayView';
import WeekView from './views/WeekView';
import MonthView from './views/MonthView';
import YearView from './views/YearView';
import IntrinsicAttributes = React.JSX.IntrinsicAttributes;

interface CalendarProps {
  defaultView?: View;
  events?: CalendarEvent[];
}

const CalendarComponent: React.FC<CalendarProps & IntrinsicAttributes> = () => {
  const { view, selected } = useDatekit();

  // useEffect(() => {
  //   if(events) {
  //     events.forEach(event => addEvent(event));
  //   }
  //
  //   if(view === undefined) {
  //     setView(defaultView);
  //   }
  // }, [events, defaultView]);

  switch (view) {
    case 'year':
      return <YearView />;
    case 'month':
      return <MonthView />;
    case 'week':
      return <WeekView />;
    case 'day':
      return <DayView />;
    default:
      return <>
        <pre>View: {view}</pre>
        <pre>{selected.current.toISOString()}</pre>
      </>
  }
};

export const Calendar: React.FC<CalendarProps> = (props) => (
  <DatekitProvider options={{ view: props.defaultView }}>
    <CalendarComponent {...props} />
  </DatekitProvider>
);
