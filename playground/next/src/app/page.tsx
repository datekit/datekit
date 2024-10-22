'use client'

import { Calendar, useCalendar } from '@datekit/react'

export default function Home() {
  const sources = [
    {
      // 1st use-case to support
      id: '1',
      name: 'Event 1',
      events: [
        {
          id: '1',
          name: 'Dr appointment',
          start: new Date('Sun Oct 20 2024 13:00:00 GMT-0700'),
          end: new Date('Sun Oct 20 2024 14:00:00 GMT-0700'),
          metadata: {
            description: 'my appointment with Dr.Ticcia'
          }
        },
        {
          id: '2',
          name: 'Meet Dana',
          start: new Date('Sun Oct 20 2024 08:20:00 GMT-0700'),
          end: new Date('Sun Oct 20 2024 11:20:00 GMT-0700'),
          metadata: {
            description: 'meet Dana from telus',
            color: 'red'
          }
        },
        {
          id: '3',
          name: 'cooking',
          start: new Date('Sun Oct 21 2024 11:30:00 GMT-0700'),
          end: new Date('Sun Oct 21 2024 13:00:00 GMT-0700'),
          metadata: {
            description: 'cook pizza',
            color: 'red'
          }
        }
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
      id: '2',
      name: 'Recurrent Event',
      events: [
        {
          id: '1',
          name: 'Physio appointment',
          start: new Date('Sun Oct 20 2024 13:00:00 GMT-0700'),
          end: new Date('Sun Oct 20 2024 14:00:00 GMT-0700'),
          metadata: {
            description: 'my weekly appointment with Jackson',
            color: 'red'
          }
        }
      ],
    },
  ]

  const calendar = useCalendar({
    sources: sources,
    defaultView: 'month',
  })

  return (
    <main
      className="p-12 w-full h-full min-h-screen md:max-h-screen flex flex-col"
      suppressHydrationWarning
    >
      <Calendar calendar={calendar} />
    </main>
  )
}
