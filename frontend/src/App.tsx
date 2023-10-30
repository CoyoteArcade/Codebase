import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { theme } from './theme';
import './App.css';

import Header from './sections/Header/Header';
import Hero from './sections/Hero/Hero';
import Navbar from './sections/Navbar/Navbar';
import Shop from './sections/Shop/Shop';
import Footer from './sections/Footer/Footer';

export default function App() {
  return (
    <MantineProvider defaultColorScheme="light" theme={theme}>
      <Header />
      <div className="container">
        <Navbar />
        <div className="row-container">
          <Hero />
          <Shop />
        </div>
      </div>
      <Footer />
    </MantineProvider>
  );
}
