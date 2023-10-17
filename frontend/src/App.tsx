import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';

import Header from './sections/Header/Header';
import Shop from './sections/Shop/Shop';
import Footer from './sections/Footer/Footer';

export default function App() {
  return (
    <MantineProvider defaultColorScheme="light" theme={theme}>
      <Header />
      <Shop />
      <Footer />
    </MantineProvider>
  );
}
