import type { DatekitEvent } from '@datekit/core';

export const isSameDay = (events: DatekitEvent[], current:Date): DatekitEvent[] => {
    return events.filter((event) => {
      return (
        event.start.getDate() === current.getDate() &&
        event.start.getMonth() === current.getMonth() &&
        event.start.getFullYear() === current.getFullYear()
    );
   });
  }

export const calculateGridrRowStartAndSpan = (start: Date, end: Date): {gridRowStart: number, span: number} => {
    const minutesSinceMidnight = (start.getHours() * 60) + start.getMinutes();
    const minutesPerRow = 5;
    const gridRowStart = Math.floor(minutesSinceMidnight / minutesPerRow);
    const startMinutesSinceMidnight = (start.getHours() * 60) + start.getMinutes();
    const endMinutesSinceMidnight = (end.getHours() * 60) + end.getMinutes();
    const durationInMinutes = endMinutesSinceMidnight - startMinutesSinceMidnight;
    const span = Math.ceil(durationInMinutes / minutesPerRow);
    return {gridRowStart, span};
  }


export const formatDate = (date: Date): String => {
    let ampm = date.getHours() >= 12 ? 'PM' : 'AM';
    let hours = date.getHours() % 12;
    hours = hours ? hours : 12;
    let minutes: String | number = date.getMinutes();
    minutes = minutes < 10 ? '0' + minutes.toString() : minutes.toString();

    return `${hours}:${minutes} ${ampm}`;
  }