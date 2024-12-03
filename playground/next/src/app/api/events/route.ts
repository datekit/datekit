import { NextRequest, NextResponse } from 'next/server'
import events from '../mock-data/events.json'

export async function GET(request: NextRequest) {
  console.log('Fetching events')
  const query = request.nextUrl.searchParams
  const startDate = query.get('startDate')
  const endDate = query.get('endDate')

  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: 'startDate and endDate are required' },
      { status: 400 }
    )
  }

  const filteredEvents = events.filter((event) => {
    return (
      new Date(event.start) >= new Date(startDate) &&
      new Date(event.end) <= new Date(endDate)
    )
  })

  return NextResponse.json(
    filteredEvents.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }))
  )
}
