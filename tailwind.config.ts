import type { Config } from 'tailwindcss';

import { nextui } from '@nextui-org/react';
import aspectRatioPlugin from '@tailwindcss/aspect-ratio';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  corePlugins: {
    aspectRatio: false,
  },
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [
    nextui({
      prefix: 'acme',
    }),
    aspectRatioPlugin,
  ],
  theme: {
    extend: {
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
      },
      fontFamily: {
        mono: ['var(--font-mono)'],
        sans: ['var(--font-sans)'],
      },
    },
  },
  variants: {
    aspectRatio: ['responsive', 'hover'],
  },
};

export default config;
