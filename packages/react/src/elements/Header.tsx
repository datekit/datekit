'use client';

import DateSwitcher from '../actions/DateSwitcher';
import ViewSwitcher from '../actions/ViewSwitcher';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisHorizontalIcon } from '@heroicons/react/20/solid';
import { useDatekit } from '../DatekitContext';

export default function Header({ children }: { children: React.ReactNode }) {
  const { selected: { current }, setCurrent } = useDatekit();

  function handleToday() {
    setCurrent(new Date());
  }

  return (
    <header className="flex flex-none items-center justify-between py-4">
      <div>
        {children}
      </div>
      <div className="flex items-center">
        <DateSwitcher />
        <div className="hidden md:ml-4 md:flex md:items-center">
          <ViewSwitcher />
          <div className="ml-6 h-6 w-px bg-stone-200 dark:bg-stone-800" />
          <button
            type="button"
            className="ml-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add event
          </button>
        </div>
        <Menu as="div" className="relative ml-6 md:hidden">
          <MenuButton
            className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Open menu</span>
            <EllipsisHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </MenuButton>

          <MenuItems
            transition
            className="absolute right-0 z-10 mt-3 w-48 origin-top-right divide-y divide-stone-100 dark:divide-stone-800 overflow-hidden rounded-lg bg-white dark:bg-stone-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="py-1">
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-300 data-[focus]:bg-stone-100 dark:data-[focus]:bg-stone-900 data-[focus]:text-stone-900 dark:data-[focus]:text-stone-100"
                >
                  Create event
                </a>
              </MenuItem>
            </div>
            <div className="py-1">
              <MenuItem>
                <a
                  href="#"
                  onClick={handleToday}
                  className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-300 data-[focus]:bg-stone-100 dark:data-[focus]:bg-stone-900 data-[focus]:text-stone-900 dark:data-[focus]:text-stone-100"
                >
                  Go to today
                </a>
              </MenuItem>
            </div>
            <div className="py-1">
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-300 data-[focus]:bg-stone-100 dark:data-[focus]:bg-stone-900 data-[focus]:text-stone-900 dark:data-[focus]:text-stone-100"
                >
                  Day view
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-300 data-[focus]:bg-stone-100 dark:data-[focus]:bg-stone-900 data-[focus]:text-stone-900 dark:data-[focus]:text-stone-100"
                >
                  Week view
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-300 data-[focus]:bg-stone-100 dark:data-[focus]:bg-stone-900 data-[focus]:text-stone-900 dark:data-[focus]:text-stone-100"
                >
                  Month view
                </a>
              </MenuItem>
              <MenuItem>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-300 data-[focus]:bg-stone-100 dark:data-[focus]:bg-stone-900 data-[focus]:text-stone-900 dark:data-[focus]:text-stone-100"
                >
                  Year view
                </a>
              </MenuItem>
            </div>
          </MenuItems>
        </Menu>
      </div>
    </header>
  );
}
