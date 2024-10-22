"use client";

import { useDatekit } from "../DatekitContext";
import {
  isSameDay,
  calculateGridrRowStartAndSpan,
  formatDate,
} from "../utils/dateUtils";
import Header from "../elements/Header";
import MiniCalendar from "../MiniCalendar";
import { useEffect, useRef } from "react";
import { format } from "date-fns";
import { cn } from "../utils";
import { DatekitEvent } from "@datekit/core";

export default function DayView() {
  const {
    selected: { current, week },
    sources,
  } = useDatekit();
  const container: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const containerNav: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);
  const containerOffset: React.MutableRefObject<HTMLDivElement | null> =
    useRef(null);

  useEffect(() => {
    // Set the container scroll position based on the current time.
    const currentMinute = new Date().getHours() * 60 + +new Date().getMinutes();
    if (container.current && containerNav.current && containerOffset.current) {
      container.current.scrollTop =
        ((container.current.scrollHeight -
          containerNav.current.offsetHeight -
          containerOffset.current.offsetHeight) *
          currentMinute) /
        1440;
    }
    console.log("==== nazanin inside useEffect", containerOffset);
  }, []);

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border-b border-stone-200 dark:border-stone-800">
      <Header>
        <>
          <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            <time dateTime="2022-01-22" className="sm:hidden">
              {format(current, "MMMM do, yyyy")}
            </time>
            <time dateTime="2022-01-22" className="hidden sm:inline">
              {format(current, "MMMM do, yyyy")}
            </time>
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {format(current, "EEEE")}
          </p>
        </>
      </Header>
      <div
        ref={container}
        className="isolate flex flex-auto rounded-xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 border-b-0 overflow-auto"
      >
        <div className="flex flex-auto flex-col overflow-auto">
          <div
            ref={containerNav}
            className="sticky top-0 z-10 grid flex-none grid-cols-7 text-xs text-gray-500 ring-1 ring-black dark:ring-stone-800 ring-opacity-5 md:hidden"
          >
            {week.map((day) => (
              <button
                type="button"
                className="flex flex-col items-center pb-3 pt-3"
              >
                <span>{format(day.date, "EEEEE")}</span>
                {/* Default: "text-gray-900", Selected: "bg-stone-900 text-white", Today (Not Selected): "text-indigo-600", Today (Selected): "bg-indigo-600 text-white" */}
                <span
                  className={cn(
                    "mt-3 flex h-8 w-8 items-center justify-center rounded-full text-base font-semibold text-gray-900 dark:text-white",
                    day.isToday && "bg-indigo-600 text-white"
                  )}
                >
                  {format(day.date, "d")}
                </span>
              </button>
            ))}
          </div>
          <div className="flex w-full flex-auto">
            <div className="w-14 flex-none ring-1 ring-gray-100 dark:ring-stone-800" />
            <div
              ref={containerOffset}
              className="grid flex-auto grid-cols-1 grid-rows-1"
            >
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-stone-100 dark:divide-stone-800"
                style={{ gridTemplateRows: "repeat(48, minmax(3.5rem, 1fr))" }}
              >
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    1AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    2AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    3AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    4AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    5AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    6AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    7AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    8AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    9AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11AM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    12PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    1PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    2PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    3PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    4PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    5PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    6PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    7PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    8PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    9PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    10PM
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -ml-14 -mt-2.5 w-14 pr-2 text-right text-xs leading-5 text-gray-400">
                    11PM
                  </div>
                </div>
                <div />
              </div>

              {/* Events */}
              <ul
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
                style={{
                  gridTemplateRows: "1.75rem repeat(288, minmax(0, 1fr)) auto",
                }}
              >
                {sources.map((source) => {
                  return isSameDay(
                    source.events as DatekitEvent[],
                    current
                  ).map((event) => {
                    const { gridRowStart, span } =
                      calculateGridrRowStartAndSpan(event.start, event.end);
                    return (
                      <li
                        className="relative mt-px flex"
                        style={{ gridRow: `${gridRowStart} / span ${span}` }}
                      >
                        <a
                          href="#"
                          className={`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg p-2 text-xs leading-5 hover:bg-blue-100 ${event.metadata?.color ? `bg-${event.metadata.color}-50` : "bg-blue-50"}`}
                        >
                          <p className="order-1 font-semibold text-blue-700">
                            {event.name}
                          </p>
                          {event.metadata?.description ? (
                            <p className="order-1 font-medium py-1 text-slate-700 dark:text-slate-500">
                              {event.metadata.description}
                            </p>
                          ) : (
                            ""
                          )}
                          <p className="text-blue-500 group-hover:text-blue-700">
                            <time dateTime="2022-01-22T06:00">
                              {formatDate(event.start)}
                            </time>
                          </p>
                        </a>
                      </li>
                    );
                  });
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="hidden w-1/2 max-w-md flex-none border-l border-stone-100 dark:border-stone-800 px-8 py-10 md:block">
          <MiniCalendar />
        </div>
      </div>
    </div>
  );
}
