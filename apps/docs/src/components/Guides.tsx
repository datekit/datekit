import { Button } from '@/components/Button'
import { Heading } from '@/components/Heading'

const guides = [
  {
    href: '/components/calendar',
    name: '<Calendar>',
    description: 'Learn how to authenticate your API requests.',
  },
  {
    href: '/components/event',
    name: '<Event>',
    description: 'Understand how to work with paginated responses.',
  },
  {
    href: '/components/datepicker',
    name: '<Datepicker>',
    description:
      'Read about the different types of errors returned by the API.',
  },
]

export function Guides() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="guides">
        Components
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-stone-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
        {guides.map((guide) => (
          <div key={guide.href}>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-white">
              {guide.name}
            </h3>
            <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
              {guide.description}
            </p>
            <p className="mt-4">
              <Button href={guide.href} variant="text" arrow="right">
                Read more
              </Button>
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
