"use client"

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { cn } from './utils';
import { useDatekit } from './DatekitContext';
import { addMonths, format, subMonths } from 'date-fns';

const days = [
  { date: '2021-12-27' },
  { date: '2021-12-28' },
  { date: '2021-12-29' },
  { date: '2021-12-30' },
  { date: '2021-12-31' },
  { date: '2022-01-01', isCurrentMonth: true },
  { date: '2022-01-02', isCurrentMonth: true },
  { date: '2022-01-03', isCurrentMonth: true },
  { date: '2022-01-04', isCurrentMonth: true },
  { date: '2022-01-05', isCurrentMonth: true },
  { date: '2022-01-06', isCurrentMonth: true },
  { date: '2022-01-07', isCurrentMonth: true },
  { date: '2022-01-08', isCurrentMonth: true },
  { date: '2022-01-09', isCurrentMonth: true },
  { date: '2022-01-10', isCurrentMonth: true },
  { date: '2022-01-11', isCurrentMonth: true },
  { date: '2022-01-12', isCurrentMonth: true },
  { date: '2022-01-13', isCurrentMonth: true },
  { date: '2022-01-14', isCurrentMonth: true },
  { date: '2022-01-15', isCurrentMonth: true },
  { date: '2022-01-16', isCurrentMonth: true },
  { date: '2022-01-17', isCurrentMonth: true },
  { date: '2022-01-18', isCurrentMonth: true },
  { date: '2022-01-19', isCurrentMonth: true },
  { date: '2022-01-20', isCurrentMonth: true, isToday: true },
  { date: '2022-01-21', isCurrentMonth: true },
  { date: '2022-01-22', isCurrentMonth: true, isSelected: true },
  { date: '2022-01-23', isCurrentMonth: true },
  { date: '2022-01-24', isCurrentMonth: true },
  { date: '2022-01-25', isCurrentMonth: true },
  { date: '2022-01-26', isCurrentMonth: true },
  { date: '2022-01-27', isCurrentMonth: true },
  { date: '2022-01-28', isCurrentMonth: true },
  { date: '2022-01-29', isCurrentMonth: true },
  { date: '2022-01-30', isCurrentMonth: true },
  { date: '2022-01-31', isCurrentMonth: true },
  { date: '2022-02-01' },
  { date: '2022-02-02' },
  { date: '2022-02-03' },
  { date: '2022-02-04' },
  { date: '2022-02-05' },
  { date: '2022-02-06' },
];

export default function MiniCalendar({}) {
  const { selected: { current, month }, setCurrent } = useDatekit();

  function handlePreviousMonth() {
    setCurrent(subMonths(current, 1));
  }

  function handleNextMonth() {
    setCurrent(addMonths(current, 1));
  }

  return (
    <>
      <div className="flex items-center text-center text-gray-900 dark:text-white">
        <button
          type="button"
          onClick={handlePreviousMonth}
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Previous month</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </button>
        <div className="flex-auto text-sm font-semibold">
          <time>{format(current, 'MMMM yyyy')}</time>
        </div>
        <button
          type="button"
          onClick={handleNextMonth}
          className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Next month</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="mt-6 grid grid-cols-7 text-center text-xs leading-6 text-gray-500 dark:text-gray-400">
        <div>S</div>
        <div>M</div>
        <div>T</div>
        <div>W</div>
        <div>T</div>
        <div>F</div>
        <div>S</div>
      </div>
      <div
        className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg overflow-hidden bg-stone-200 dark:bg-stone-900 text-sm shadow ring-1 ring-stone-200 dark:ring-stone-800"
      >
        {month.days.map((day, dayIdx) => (
          <button
            key={day.date.toISOString()}
            title={format(day.date, 'LLLL d, yyyy')}
            type="button"
            className={cn(
              'py-1.5 hover:bg-stone-100 dark:hover:bg-stone-800 focus:z-10',
              day.isCurrentMonth ? 'bg-white dark:bg-stone-800' : 'bg-stone-50 dark:bg-stone-900',
              (day.isSelected || day.isToday) ? 'font-semibold text-white' : 'text-stone-400',
              dayIdx === 0 && 'rounded-tl-lg',
              dayIdx === 6 && 'rounded-tr-lg',
              dayIdx === days.length - 7 && 'rounded-bl-lg',
              dayIdx === days.length - 1 && 'rounded-br-lg',
            )}
          >
            <time
              dateTime={format(day.date, 'dd-MM-yyyy')}
              className={cn(
                'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                day.isToday && 'bg-indigo-400',
                day.isSelected && 'bg-indigo-600',
              )}
            >
              {day.date.getDate()}
            </time>
          </button>
        ))}
      </div>
    </>
  );
}
