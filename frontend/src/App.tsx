import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Router } from './Router';
import { theme } from './theme';
import './App.css';

export default function App() {
  return (
    <MantineProvider defaultColorScheme="light" theme={theme}>
      <Router />
    </MantineProvider>
  );
}
