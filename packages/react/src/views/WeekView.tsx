'use client';

import { format } from 'date-fns';
import { useRef } from 'react';
import { useDatekit } from '../DatekitContext';
import Header from '../elements/Header';
import { cn } from '../utils';

export default function WeekView() {
  const { selected: { current, week } } = useDatekit();
  const container: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const containerNav: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const containerOffset: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  // useEffect(() => {
  //   // Set the container scroll position based on the current time.
  //   const currentMinute = new Date().getHours() * 60;
  //   if (container.current && containerNav.current && containerOffset.current) {
  //     container.current.scrollTop =
  //       ((container.current.scrollHeight - containerNav.current.offsetHeight - containerOffset.current.offsetHeight) *
  //         currentMinute) /
  //       1440;
  //   }
  // }, []);

  const beginningOfWeek = week.at(0);
  const endOfWeek = week.at(-1);

  return (
    <div className="flex h-full flex-col rounded-xl overflow-hidden border-b border-stone-200 dark:border-stone-800">
      <Header>
        <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          {!!beginningOfWeek && (
            <>
              <time dateTime={format(beginningOfWeek.date, 'dd-MM-yyyy')} className="md:hidden">
                {format(beginningOfWeek.date, 'LLL do, yyyy')}
              </time>
              <time dateTime={format(current, 'dd-MM-yyyy')} className="hidden md:inline">
                {format(beginningOfWeek.date, 'MMMM do, yyyy')}
              </time>
            </>
          )}
          <span> - </span>
          {!!endOfWeek && (
            <>
              <time dateTime={format(endOfWeek.date, 'LLL do, yyyy')} className="md:hidden">
                {format(endOfWeek.date, 'LLL do, yyyy')}
              </time>
              <time dateTime={format(endOfWeek.date, 'LLL do, yyyy')} className="hidden md:inline">
                {format(endOfWeek.date, 'MMMM do, yyyy')}
              </time>
            </>
          )}
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Week {format(current, 'w')}
        </p>
      </Header>
      <div ref={container}
           className="rounded-xl isolate flex flex-auto flex-col overflow-auto bg-white dark:bg-stone-900"
      >
        <div style={{ width: '165%' }} className="flex max-w-full flex-none flex-col sm:max-w-none md:max-w-full">
      <div
        ref={containerNav}
        className="sticky top-0 z-30 flex-none bg-white dark:bg-stone-800 ring-1 ring-black ring-opacity-5 sm:pr-8"
      >
        <div className="grid grid-cols-7 text-sm leading-6 text-stone-900 dark:text-stone-50 sm:hidden">
          {week.map((day) => (
            <button type="button" className="flex flex-col items-center pb-3 pt-2">
              {format(day.date, 'EEEEE')}&nbsp;
              <span
                className={cn('mt-1 flex h-8 w-8 items-center justify-center font-semibold text-stone-900 dark:text-white', { 'rounded-full bg-indigo-600 text-white': day.isToday })}
              >
                {format(day.date, 'd')}
              </span>
            </button>
          ))}
        </div>

        <div
          className="-mr-px hidden grid-cols-7 divide-x divide-stone-100 dark:divide-stone-700 border-r border-stone-100 dark:border-stone-700 text-sm leading-6 text-stone-500 dark:text-stone-100 sm:grid"
        >
          <div className="col-end-1 w-14" />
          {week.map((day) => (
            <div key={day.date.toISOString()} className="flex items-center justify-center py-3">
              <span>
                {format(day.date, 'EEE')}&nbsp;
                <span
                  className={cn('items-center justify-center font-semibold text-stone-900 dark:text-stone-50 inline-flex h-8 w-8', { 'ml-1.5 rounded-full bg-indigo-600 font-semibold text-white': day.isToday })}
                >
                  {format(day.date, 'd')}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-auto">
        <div
          className="sticky left-0 z-10 w-14 flex-none bg-white dark:bg-stone-800 ring-1 ring-stone-100 dark:ring-stone-700"
        />
        <div className="grid flex-auto grid-cols-1 grid-rows-1">
          {/* Horizontal lines */}
          <div
            className="col-start-1 col-end-2 row-start-1 grid divide-y divide-stone-100 dark:divide-stone-800"
            style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
          >
            <div ref={containerOffset} className="row-end-1 h-7"></div>
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                12AM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                1AM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                2AM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                3AM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                4AM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                5AM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                6AM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                7AM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                8AM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                9AM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                10AM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                11AM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                12PM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                1PM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                2PM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                3PM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                4PM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                5PM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                6PM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                7PM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                8PM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                9PM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                10PM
              </div>
            </div>
            <div />
            <div>
              <div
                className="sticky left-0 z-20 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400"
              >
                11PM
              </div>
            </div>
            <div />
          </div>

          {/* Vertical lines */}
          <div
            className="col-start-1 col-end-2 row-start-1 hidden grid-cols-7 grid-rows-1 divide-x divide-stone-100 dark:divide-stone-800 sm:grid sm:grid-cols-7"
          >
            <div className="col-start-1 row-span-full" />
            <div className="col-start-2 row-span-full" />
            <div className="col-start-3 row-span-full" />
            <div className="col-start-4 row-span-full" />
            <div className="col-start-5 row-span-full" />
            <div className="col-start-6 row-span-full" />
            <div className="col-start-7 row-span-full" />
            <div className="col-start-8 row-span-full w-8" />
          </div>

          {/* Events */}
          <ol
            className="col-start-1 col-end-2 row-start-1 grid grid-cols-1 sm:grid-cols-7 sm:pr-8"
            style={{ gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto' }}
          >
            <li className="relative mt-px flex sm:col-start-3" style={{ gridRow: '74 / span 12' }}>
              <a
                href="#"
                className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-blue-50 p-2 text-xs leading-5 hover:bg-blue-100"
              >
                <p className="order-1 font-semibold text-blue-700">Breakfast</p>
                <p className="text-blue-500 group-hover:text-blue-700">
                  <time dateTime="2022-01-12T06:00">6:00 AM</time>
                </p>
              </a>
            </li>
            <li className="relative mt-px flex sm:col-start-3" style={{ gridRow: '92 / span 30' }}>
              <a
                href="#"
                className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-pink-50 p-2 text-xs leading-5 hover:bg-pink-100"
              >
                <p className="order-1 font-semibold text-pink-700">Flight to Paris</p>
                <p className="text-pink-500 group-hover:text-pink-700">
                  <time dateTime="2022-01-12T07:30">7:30 AM</time>
                </p>
              </a>
            </li>
            <li className="relative mt-px hidden sm:col-start-6 sm:flex" style={{ gridRow: '122 / span 24' }}>
              <a
                href="#"
                className="group absolute inset-1 flex flex-col overflow-y-auto rounded-lg bg-stone-100 p-2 text-xs leading-5 hover:bg-stone-200"
              >
                <p className="order-1 font-semibold text-gray-700">Meeting with design team at Disney</p>
                <p className="text-gray-500 group-hover:text-gray-700">
                  <time dateTime="2022-01-15T10:00">10:00 AM</time>
                </p>
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>;
</div>
)
  ;
}
