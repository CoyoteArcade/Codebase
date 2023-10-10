import { Flex, Group } from '@mantine/core';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { theme } from './theme';

import Header from './sections/Header/Header';
import Hero from './sections/Hero/Hero';
import Navbar from './sections/Navbar/Navbar';
import Shop from './sections/Shop/Shop';

export default function App() {
  return (
    <MantineProvider defaultColorScheme="light" theme={theme}>
      <Header />
      <Flex >
        <Navbar />
        <Group>
          <Hero />
          <Shop />
        </Group>
      </Flex >
      
    </MantineProvider>
  );
}

