'use client'

import { ClockIcon } from '@heroicons/react/20/solid'
import { cn } from '../utils'
import { useDatekit } from '../DatekitContext'
import Header from '../elements/Header'
import { format } from 'date-fns'

export default function MonthView() {
  const {
    selected: { current, month },
  } = useDatekit()

  const selectedDay = null

  return (
    <div className="lg:flex lg:flex-1 lg:h-full lg:min-h-full lg:flex-col">
      <Header>
        <h1 className="text-base font-semibold leading-6 text-stone-900 dark:text-white">
          <time dateTime={format(current, 'MM-yyyy')}>
            {format(current, 'MMMM yyyy')}
          </time>
        </h1>
      </Header>
      <div className="overflow-hidden rounded-xl ring-1 ring-stone-200 dark:ring-stone-800 ring-opacity-5 lg:flex lg:flex-auto lg:flex-col lg:flex-1 lg:min-h-full">
        <header className="grid grid-cols-7 gap-px text-center bg-stone-100 dark:bg-stone-800 text-xs border-b border-stone-200 dark:border-stone-800 font-semibold leading-6 lg:flex-none text-stone-500 dark:text-stone-400 uppercase">
          <div className="py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
          <div className="py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
        </header>
        <div className="flex bg-stone-200 dark:bg-stone-800 text-xs leading-6 text-stone-700 dark:text-stone-300 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:gap-px">
            {month.days.map((day) => (
              <div
                key={day.date}
                className={cn(
                  day.isCurrentMonth
                    ? 'bg-white dark:bg-stone-900'
                    : 'bg-stone-50 dark:bg-stone-950 text-stone-500',
                  'relative px-3 py-2 min-h-32'
                )}
              >
                <time
                  dateTime={day.date}
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full font-semibold',
                    day.isToday && 'bg-indigo-600 text-white'
                  )}
                >
                  {day.date.getDate()}
                </time>
                {day.events.length > 0 && (
                  <ol className="mt-2">
                    {day.events.slice(0, 2).map((event) => (
                      <li key={event.id}>
                        <a href={event.href} className="group flex">
                          <p className="flex-auto truncate font-medium text-stone-900 dark:text-stone-50 group-hover:text-indigo-600 dark:group-hover:text-indigo-300">
                            {event.name}
                          </p>
                          <time
                            dateTime={event.datetime}
                            className="ml-3 hidden flex-none text-stone-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 xl:block"
                          >
                            {event.time}
                          </time>
                        </a>
                      </li>
                    ))}
                    {day.events.length > 2 && (
                      <li className="text-stone-500">
                        + {day.events.length - 2} more
                      </li>
                    )}
                  </ol>
                )}
              </div>
            ))}
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {month.days.map((day) => (
              <button
                key={day.date}
                type="button"
                className={cn(
                  day.isCurrentMonth
                    ? 'bg-white dark:bg-stone-900'
                    : 'bg-stone-50 dark:bg-stone-900',
                  (day.isSelected || day.isToday) && 'font-semibold',
                  day.isSelected && 'text-white',
                  !day.isSelected && day.isToday && 'text-indigo-600',
                  !day.isSelected &&
                    day.isCurrentMonth &&
                    !day.isToday &&
                    'text-stone-900',
                  !day.isSelected &&
                    !day.isCurrentMonth &&
                    !day.isToday &&
                    'text-stone-500',
                  'flex h-14 flex-col px-3 py-2 hover:bg-stone-100 focus:z-10'
                )}
              >
                <time
                  dateTime={day.date}
                  className={cn(
                    day.isSelected &&
                      'flex h-6 w-6 items-center justify-center rounded-full',
                    day.isSelected && day.isToday && 'bg-indigo-600',
                    day.isSelected && !day.isToday && 'bg-stone-900',
                    'ml-auto'
                  )}
                >
                  {day.date.toISOString()}
                </time>
                <span className="sr-only">{day.events.length} events</span>
                {day.events.length > 0 && (
                  <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.events.map((event) => (
                      <span
                        key={event.id}
                        className="mx-0.5 mb-1 h-1.5 w-1.5 rounded-full bg-stone-400"
                      />
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      {selectedDay && selectedDay?.events.length > 0 && (
        <div className="px-4 py-10 sm:px-6 lg:hidden">
          <ol className="divide-y divide-stone-100 dark:divide-stone-700 overflow-hidden rounded-lg bg-white dark:bg-stone-800 text-sm ring-1 ring-black dark:ring-white ring-opacity-5">
            {selectedDay.events.map((event) => (
              <li
                key={event.id}
                className="group flex p-4 pr-6 focus-within:bg-stone-50 hover:bg-stone-50"
              >
                <div className="flex-auto">
                  <p className="font-semibold text-stone-900">{event.name}</p>
                  <time
                    dateTime={event.datetime}
                    className="mt-2 flex items-center text-stone-700"
                  >
                    <ClockIcon
                      className="mr-2 h-5 w-5 text-stone-400"
                      aria-hidden="true"
                    />
                    {event.time}
                  </time>
                </div>
                <a
                  href={event.href}
                  className="ml-6 flex-none self-center rounded-md bg-white px-3 py-2 font-semibold text-stone-900 opacity-0 shadow-sm ring-1 ring-inset ring-stone-300 hover:ring-stone-400 focus:opacity-100 group-hover:opacity-100"
                >
                  Edit<span className="sr-only">, {event.name}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}
