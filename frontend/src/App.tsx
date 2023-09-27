import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';

import Header from './sections/Header/Header';

export default function App() {
  return (
    <MantineProvider defaultColorScheme="light" theme={theme}>
      <Header />
    </MantineProvider>
  );
}
