import { Flex } from '@mantine/core';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';

import Header from './sections/Header/Header';
import Hero from './sections/Hero/Hero';
import Navbar from './sections/Navbar/Navbar';

export default function App() {
  return (
    <MantineProvider defaultColorScheme="light" theme={theme}>
      <Header />
      <Flex >
        <Navbar />
        <Hero />
      </Flex >
    </MantineProvider>
  );
}

