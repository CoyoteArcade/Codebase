import { Outlet } from 'react-router-dom';
import { Box } from '@mantine/core';
import ScrollToTop from '@/components/ScrollToTop';

import Header from '../../sections/Header/Header';
import Footer from '../../sections/Footer/Footer';

import classes from './Root.module.css';

export async function loader() {
  let games = [];
  const gamesResponse = await fetch('https://codebase-ty4d.onrender.com/games');
  const gamesJson = await gamesResponse.json();
  if (gamesJson.length) {
    games = gamesJson;
  }
  return games;
}

export function Root() {
  return (
    <Box className={classes.root}>
      <Header />
      <Box component="main" className={classes.main}>
        <Box className={classes.outlet}>
          <ScrollToTop />
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}
