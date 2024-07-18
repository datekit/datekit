'use client'

import Link from 'next/link'
import {
  type MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion'

import { GridPattern } from '@/components/GridPattern'
import { Heading } from '@/components/Heading'
import { ChatBubbleIcon } from '@/components/icons/ChatBubbleIcon'
import { EnvelopeIcon } from '@/components/icons/EnvelopeIcon'
import { UserIcon } from '@/components/icons/UserIcon'
import { UsersIcon } from '@/components/icons/UsersIcon'
import { CalendarIcon } from '@/components/icons/CalendarIcon';

interface Component {
  href: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  pattern: Omit<
    React.ComponentPropsWithoutRef<typeof GridPattern>,
    'width' | 'height' | 'x'
  >
}

const components: Array<Component> = [
  {
    href: '/components/calendar',
    name: '<Calendar>',
    description:
      'Learn about the contact model and how to create, retrieve, update, delete, and list contacts.',
    icon: CalendarIcon,
    pattern: {
      y: 16,
      squares: [
        [0, 1],
        [1, 3],
      ],
    },
  },
  {
    href: '/component/event',
    name: '<Event>',
    description:
      'Learn about the conversation model and how to create, retrieve, update, delete, and list conversations.',
    icon: CalendarIcon,
    pattern: {
      y: -6,
      squares: [
        [-1, 2],
        [1, 3],
      ],
    },
  },
  {
    href: '/components/datepicker',
    name: '<Datepicker>',
    description:
      'Learn about the message model and how to create, retrieve, update, delete, and list messages.',
    icon: CalendarIcon,
    pattern: {
      y: 32,
      squares: [
        [0, 2],
        [1, 4],
      ],
    },
  },
]

function ComponentIcon({ icon: Icon }: { icon: Component['icon'] }) {
  return (
    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-900/5 ring-1 ring-stone-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-stone-900/25 dark:bg-white/7.5 dark:ring-white/15 dark:group-hover:bg-rose-300/10 dark:group-hover:ring-rose-400">
      <Icon className="h-5 w-5 fill-stone-700/10 stroke-stone-700 transition-colors duration-300 group-hover:stroke-stone-900 dark:fill-white/10 dark:stroke-stone-400 dark:group-hover:fill-rose-300/10 dark:group-hover:stroke-rose-400" />
    </div>
  )
}

function ComponentPattern({
  mouseX,
  mouseY,
  ...gridProps
}: Component['pattern'] & {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
          {...gridProps}
        />
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#BC2F58]/10 to-[#D94166]/20 opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#BC2F58]/10 dark:to-[#D94166]/20"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
          {...gridProps}
        />
      </motion.div>
    </div>
  )
}

function Component({ component }: { component: Component }) {
  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <div
      key={component.href}
      onMouseMove={onMouseMove}
      className="group relative flex rounded-2xl bg-stone-50 transition-shadow hover:shadow-md hover:shadow-stone-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
    >
      <ComponentPattern {...component.pattern} mouseX={mouseX} mouseY={mouseY} />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-stone-900/7.5 group-hover:ring-stone-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
      <div className="relative rounded-2xl px-4 pb-4 pt-16">
        <ComponentIcon icon={component.icon} />
        <h3 className="mt-4 text-sm font-semibold leading-7 text-stone-900 dark:text-white">
          <Link href={component.href}>
            <span className="absolute inset-0 rounded-2xl" />
            {component.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">
          {component.description}
        </p>
      </div>
    </div>
  )
}

export function Components() {
  return (
    <div className="my-16 xl:max-w-none">
      <Heading level={2} id="components">
        Components
      </Heading>
      <div className="not-prose mt-4 grid grid-cols-1 gap-8 border-t border-stone-900/5 pt-10 sm:grid-cols-2 xl:grid-cols-4 dark:border-white/5">
        {components.map((component) => (
          <Component key={component.href} component={component} />
        ))}
      </div>
    </div>
  )
}
