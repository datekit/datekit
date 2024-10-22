"use client";

import { cn } from '../utils';
import Header from '../elements/Header';
import { useDatekit } from '../DatekitContext';
import { format } from 'date-fns';

export default function YearView() {
  const { selected: { current, year } } = useDatekit();

  return (
    <div>
      <Header>
        <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          <time dateTime="2022">{format(current, 'yyyy')}</time>
        </h1>
      </Header>
      <div className="overflow-hidden rounded-xl bg-stone-50 dark:bg-stone-950">
        <div
          className="mx-auto grid max-w-3xl grid-cols-1 gap-x-8 px-1 gap-y-16 py-16 sm:grid-cols-2 xl:max-w-none xl:grid-cols-3 2xl:grid-cols-4"
        >
          {year.map((month) => (
            <section key={month.name} className="text-center">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-white">{month.name}</h2>
              <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-stone-500 dark:text-stone-400">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </div>
              <div
                className="shadow dark:shadow-stone-50/20 isolate mt-2 grid grid-cols-7 gap-px rounded-xl text-sm ring-inset ring-stone-200 dark:ring-stone-800"
              >
                {month.days.map((day, dayIdx) => (
                  <button
                    key={day.date.toISOString()}
                    type="button"
                    className={cn(
                      day.isCurrentMonth ? 'bg-white dark:bg-stone-800 text-gray-900 dark:text-white' : 'bg-stone-50 dark:bg-stone-900 text-stone-400',
                      dayIdx === 0 && 'rounded-tl-xl',
                      dayIdx === 6 && 'rounded-tr-xl',
                      dayIdx === month.days.length - 7 && 'rounded-bl-xl',
                      dayIdx === month.days.length - 1 && 'rounded-br-xl',
                      'py-1.5 hover:bg-stone-100 dark:hover:bg-stone-700 focus:z-10',
                    )}
                  >
                    <time
                      dateTime={day.date.toString()}
                      title={day.date.toDateString()}
                      className={cn(
                        day.isToday && 'bg-indigo-600 dark:bg-indigo-400 font-semibold text-white',
                        'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                      )}
                    >
                      {day.date.getDate()}
                    </time>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
