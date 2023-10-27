import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { theme } from './theme';

import Header from './sections/Header/Header';
import Hero from './sections/Hero/Hero';
// import Navbar from './sections/Navbar/Navbar';
import Shop from './sections/Shop/Shop';
import Footer from './sections/Footer/Footer';

export default function App() {
  return (
    <MantineProvider defaultColorScheme="light" theme={theme}>
      <Header />
      {/* <Navbar /> */}
      <Hero />
      <Shop />
      <Footer />
    </MantineProvider>
  );
}
