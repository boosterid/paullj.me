const colors = require('tailwindcss/colors');

const config = {
  darkMode: 'class',
	mode: "jit",
	purge: [
		"./src/**/*.{html,js,svelte,ts}",
	],
	theme: {
		boxShadow: {
      thin: '0 -4px 0 0px var(--tw-ring-color) inset',
      thick: '0 -12px 0 0px var(--tw-ring-color) inset',
    },
    extend: {
      typography: (theme) => ({
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
            "ul > li::before": { backgroundColor: theme("colors.gray.700") },
            hr: { borderColor: theme("colors.gray.800") },
            blockquote: {
              color: theme("colors.gray.100"),
              borderLeftColor: theme("colors.gray.800"),
            },
            h1: { color: theme("colors.gray.100") },
            h2: { color: theme("colors.gray.100") },
            h3: { color: theme("colors.gray.100") },
            h4: { color: theme("colors.gray.100") },
            code: { color: theme("colors.gray.100") },
            "a code": { color: theme("colors.gray.100") },
            pre: {
              color: theme("colors.gray.200"),
              backgroundColor: theme("colors.gray.800"),
            },
            thead: {
              color: theme("colors.gray.100"),
              borderBottomColor: theme("colors.gray.700"),
            },
            "tbody tr": { borderBottomColor: theme("colors.gray.800") },
            a: {
              color: colors.green[200],
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ['dark'],
    },
  },
	plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};

module.exports = config;
