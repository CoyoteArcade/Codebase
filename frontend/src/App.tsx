import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import { Router } from './Router';
import { theme } from './theme';

import './global.css';

export default function App() {
  return (
    <MantineProvider defaultColorScheme="light" theme={theme}>
      <Router />
    </MantineProvider>
  );
}
