import Link from 'next/link'
import clsx from 'clsx'

function ArrowIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m11.5 6.5 3 3.5m0 0-3 3.5m3-3.5h-9"
      />
    </svg>
  )
}

const variantStyles = {
  primary:
    'rounded-full bg-stone-900 py-1 px-3 text-white hover:bg-stone-700 dark:bg-rose-400/10 dark:text-rose-400 dark:ring-1 dark:ring-inset dark:ring-rose-400/20 dark:hover:bg-rose-400/10 dark:hover:text-rose-300 dark:hover:ring-rose-300',
  secondary:
    'rounded-full bg-stone-100 py-1 px-3 text-stone-900 hover:bg-stone-200 dark:bg-stone-800/40 dark:text-stone-400 dark:ring-1 dark:ring-inset dark:ring-stone-800 dark:hover:bg-stone-800 dark:hover:text-stone-300',
  filled:
    'rounded-full bg-stone-900 py-1 px-3 text-white hover:bg-stone-700 dark:bg-rose-500 dark:text-white dark:hover:bg-rose-400',
  outline:
    'rounded-full py-1 px-3 text-stone-700 ring-1 ring-inset ring-stone-900/10 hover:bg-stone-900/2.5 hover:text-stone-900 dark:text-stone-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-white',
  text: 'text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-500',
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
  arrow?: 'left' | 'right'
} & (
  | React.ComponentPropsWithoutRef<typeof Link>
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
)

export function Button({
  variant = 'primary',
  className,
  children,
  arrow,
  ...props
}: ButtonProps) {
  className = clsx(
    'inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition',
    variantStyles[variant],
    className,
  )

  let arrowIcon = (
    <ArrowIcon
      className={clsx(
        'mt-0.5 h-5 w-5',
        variant === 'text' && 'relative top-px',
        arrow === 'left' && '-ml-1 rotate-180',
        arrow === 'right' && '-mr-1',
      )}
    />
  )

  let inner = (
    <>
      {arrow === 'left' && arrowIcon}
      {children}
      {arrow === 'right' && arrowIcon}
    </>
  )

  if (typeof props.href === 'undefined') {
    return (
      <button className={className} {...props}>
        {inner}
      </button>
    )
  }

  return (
    <Link className={className} {...props}>
      {inner}
    </Link>
  )
}
