module.exports = {
  purge: ['./**/*.tsx'],
  theme: {
    extend: {
      keyframes: {
        up: {
          '0%': {
            opacity: 0,
            transform: 'translateY(15px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        up: 'up .8s 1',
      },
    },
  },
  variants: {},
  plugins: [],
}
