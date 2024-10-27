import { createTheme } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
  colors: {
    'coyote-blue': [
      '#ebf5ff',
      '#d5e7fa',
      '#a4cdf7',
      '#72b2f6',
      '#4e9cf5',
      '#3b8ef5',
      '#3187f6',
      '#2674dc',
      '#1b67c4',
      '#0059ad',
    ],
  },
  primaryColor: 'coyote-blue',
  primaryShade: {
    light: 6,
    dark: 8,
  },

  breakpoints: {
    xxs: '24em',
    xxl: '100em',
  },

  fontFamily:
    'Gabarito, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji',
});

export default theme;
