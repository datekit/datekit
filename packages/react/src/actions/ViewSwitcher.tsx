'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import type { View } from '@datekit/core'
import type { MouseEventHandler } from 'react'
import { useDatekit } from '../DatekitContext'

export default function ViewSwitcher({}) {
  const { view, setView } = useDatekit()

  const setViewHandler =
    (view: View): MouseEventHandler<HTMLAnchorElement> =>
    (event) => {
      console.debug('Calling view switcher', view)
      event.preventDefault()
      setView(view)
    }

  return (
    <Menu as="div" className="relative">
      <MenuButton
        type="button"
        className="flex items-center gap-x-1.5 rounded-md bg-white dark:bg-stone-900 px-3 py-2 text-sm font-semibold text-stone-900 dark:text-white shadow-sm ring-1 ring-inset ring-stone-200 dark:ring-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 dark:focus:ring-stone-600"
      >
        <span>
          <span className="capitalize">{view}</span> view
        </span>
        <ChevronDownIcon
          className="-mr-1 h-5 w-5 text-stone-400"
          aria-hidden="true"
        />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white dark:bg-stone-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <a
              href="#"
              onClick={setViewHandler('day')}
              className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-400 data-[focus]:bg-stone-100 data-[focus]:text-stone-900 dark:data-[focus]:bg-stone-700 dark:data-[focus]:text-stone-100"
            >
              Day view
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              onClick={setViewHandler('week')}
              className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-400 data-[focus]:bg-stone-100 data-[focus]:text-stone-900 dark:data-[focus]:bg-stone-700 dark:data-[focus]:text-stone-100"
            >
              Week view
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              onClick={setViewHandler('month')}
              className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-400 data-[focus]:bg-stone-100 data-[focus]:text-stone-900 dark:data-[focus]:bg-stone-700 dark:data-[focus]:text-stone-100"
            >
              Month view
            </a>
          </MenuItem>
          <MenuItem>
            <a
              href="#"
              onClick={setViewHandler('year')}
              className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-400 data-[focus]:bg-stone-100 data-[focus]:text-stone-900 dark:data-[focus]:bg-stone-700 dark:data-[focus]:text-stone-100"
            >
              Year view
            </a>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}
