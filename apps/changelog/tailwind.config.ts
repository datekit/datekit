import { type Config } from 'tailwindcss'

export default {
  content: ['./{src,mdx}/**/*.{js,mjs,jsx,ts,tsx,mdx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      fontSize: {
        '2xs': '.6875rem',
      },
      fontFamily: {
        sans: 'var(--font-mona-sans)',
        display: 'var(--font-lexend)',
      },
      opacity: {
        2.5: '0.025',
        7.5: '0.075',
        15: '0.15',
      },
      width: {
        112: '32rem'
      }
    },
  },
  plugins: [],
} satisfies Config
