import { createTheme } from '@mantine/core';

export const theme = createTheme({
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
    // light: 4,
    // dark: 7,
  },
});
