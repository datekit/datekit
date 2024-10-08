'use client';

import { Calendar } from '@datekit/react';

export default function Home() {
  const sources = [
    { // 1st use-case to support
      events: [
        {
          id: 1,
          name: 'Event 1',
          date: '2021-09-01T00:00:00.000Z',
        },
      ],
    },
    { // 2nd use-case to support
      events(startDate, endDate, success, failure) {
        // Fetch events from the server

        // Call the success callback with the events
        // if error, call the failure callback with the error
      },
      textColor: 'white',
      backgroundColor: 'blue',
    },
    { // 3rd use-case to support
      events: [
        {
          id: 2,
          name: 'Recurring event',
          date: new Date(),
          recurrence: 'FREQ=WEEKLY;COUNT=10',
        },
      ],
    },
  ];

  return (
    <main className="p-12 w-full h-full min-h-screen md:max-h-screen flex flex-col" suppressHydrationWarning>
      <Calendar defaultView="month" sources={sources} />
    </main>
  );
}
