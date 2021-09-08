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
            blockquote: {
              borderLeftColor: colors.gray[300],
              fontStyle: 'normal',
              borderOpacity: 0.5
            },
          },
        },
        dark: {
          css: {
            color: colors.gray[300],
            "ul > li::before": { backgroundColor: colors.gray[600] },
            strong: { color: colors.gray[100] },
            hr: { borderColor: colors.gray[800] },
            blockquote: {
              color: colors.gray[200],
              borderLeftColor: colors.gray[700],
            },
            h1: { color: colors.gray[100] },
            h2: { color: colors.gray[100] },
            h3: { color: colors.gray[100] },
            h4: { color: colors.gray[100] },
            a: { color: colors.green[200] },
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
