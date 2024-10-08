'use client'

import { Calendar, useCalendar } from '@datekit/react'

export default function Home() {
  const sources = [
    {
      // 1st use-case to support
      events: [
        {
          id: 1,
          name: 'Event 1',
          start: '2021-09-01T00:00:00.000Z',
          end: '2021-09-01T00:00:00.000Z',
          metadata: {
            color: 'red',
          },
        },
      ],
    },
    // { // 2nd use-case to support
    //   events(startDate, endDate, success, failure) {
    //     // Fetch events from the server

    //     // Call the success callback with the events
    //     // if error, call the failure callback with the error
    //   },
    //   textColor: 'white',
    //   backgroundColor: 'blue',
    // },
    {
      // 3rd use-case to support
      events: [
        {
          id: 2,
          name: 'Recurring event',
          start: new Date(),
          end: new Date(),
          metadata: {
            name: 'Recurring event',
            description: 'This is a recurring event',
          },
          // recurrence: 'FREQ=WEEKLY;COUNT=10',
        },
      ],
    },
  ]

  const calendar = useCalendar({
    events: sources,
    defaultView: 'month',
  })

  const cal2 = useCalendar({
    events: sources,
    defaultView: 'week',
  })

  return (
    <main
      className="p-12 w-full h-full min-h-screen md:max-h-screen flex flex-col"
      suppressHydrationWarning
    >
      <Calendar calendar={calendar} />
      <Calendar calendar={cal2} />
    </main>
  )
}
