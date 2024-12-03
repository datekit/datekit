'use client'

import { Calendar, useCalendar } from '@datekit/react'
import { DatekitEvent } from '@datekit/core'

const sources = [
  {
    id: '1',
    name: 'Default Source',
    events: async (
      info: { startDate: Date; endDate: Date },
      onSuccess: (events: DatekitEvent[]) => void,
      onFailure: (error: Error) => void
    ) => {
      const startDate = info.startDate.toISOString()
      const endDate = info.endDate.toISOString()
      fetch(`/api/events?startDate=${startDate}&endDate=${endDate}`)
        .then(async (res) => onSuccess(await res.json()))
        .catch((error) => onFailure(error))
    },
  },
]

export default function Home() {
  const calendar = useCalendar({
    sources: sources,
    defaultView: 'month',
  })

  console.log(calendar)

  return (
    <main
      className="p-12 w-full h-full min-h-screen md:max-h-screen flex flex-col"
      suppressHydrationWarning
    >
      <Calendar calendar={calendar} />
    </main>
  )
}
