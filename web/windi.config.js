import { defineConfig } from 'windicss/helpers';
import colors from 'windicss/colors';

export default defineConfig({
  darkMode: 'class',
	theme: {
		boxShadow: {
      thin: '0 -4px 0 0px var(--tw-ring-color) inset',
      thick: '0 -12px 0 0px var(--tw-ring-color) inset',
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: colors.gray[900],
            'sup > a': {
              textDecoration: 'underline',
              textDecorationStyle: 'dotted',
            },
            abbr: {
              textDecorationThickness: '2px',
            },
            '.footnotes': {
              fontSize: '0.575rem',
              fontFamily: 'monospace',
            },
          },
        },
        dark: {
          css: {
            color: colors.gray[300],
            "ul > li::before": { backgroundColor: colors.gray[700] },
            hr: { borderColor: colors.gray[800] },
            blockquote: {
              color: colors.gray[100],
              borderLeftColor: colors.gray[800],
            },
            h1: { color: colors.gray[100] },
            h2: { color: colors.gray[100] },
            h3: { color: colors.gray[100] },
            h4: { color: colors.gray[100] },
            a: {
              color: colors.green[200],
            },
          },
        },
      },
    },
  },
	plugins: [
    require('windicss/plugin/typography'),
    require('windicss/plugin/filters'),
  ],
});
