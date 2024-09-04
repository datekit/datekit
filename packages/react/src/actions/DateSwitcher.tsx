"use client"

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { useDatekit } from '../DatekitContext';
import { addDays, addMonths, addWeeks, addYears, subDays, subMonths, subWeeks, subYears } from 'date-fns';

export default function DateSwitcher({}) {
  const { view, selected: { current }, setCurrent } = useDatekit();

  function handleToday() {
    setCurrent(new Date());
  }

  function handlePrevious() {
    switch (view) {
      case 'day':
        setCurrent(subDays(current, 1));
        break;
      case 'week':
        setCurrent(subWeeks(current, 1));
        break;
      case 'month':
        setCurrent(subMonths(current, 1));
        break;
      case 'year':
        setCurrent(subYears(current, 1));
        break;
      default:
        break;
    }
  }

  function handleNext() {
    switch (view) {
      case 'day':
        setCurrent(addDays(current, 1));
        break;
      case 'week':
        setCurrent(addWeeks(current, 1));
        break;
      case 'month':
        setCurrent(addMonths(current, 1));
        break;
      case 'year':
        setCurrent(addYears(current, 1));
        break;
      default:
        break;
    }
  }

  return (
    <div className="relative flex items-center rounded-md bg-white dark:bg-stone-900 shadow-sm md:items-stretch">
      <button
        type="button"
        onClick={() => handlePrevious()}
        title={`Previous ${view}`}
        className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-stone-200 dark:border-stone-800 pr-1 text-gray-400 focus:relative md:w-9 md:pr-0 md:hover:bg-stone-50 md:dark:hover:bg-stone-700"
      >
        <span className="sr-only">Previous {view}</span>
        <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        onClick={() => handleToday()}
        className="hidden border-y border-stone-200 dark:border-stone-800 px-3.5 text-sm font-semibold text-gray-900 dark:text-white hover:bg-stone-50 dark:hover:bg-stone-700 focus:relative md:block"
      >
        Today
      </button>
      <span className="relative -mx-px h-5 w-px bg-stone-200 dark:bg-stone-800 md:hidden" />
      <button
        type="button"
        onClick={() => handleNext()}
        title={`Next ${view}`}
        className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-stone-200 dark:border-stone-800 pl-1 text-gray-400 focus:relative md:w-9 md:pl-0 md:hover:bg-stone-50 md:dark:hover:bg-stone-700"
      >
        <span className="sr-only">Next {view}</span>
        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
