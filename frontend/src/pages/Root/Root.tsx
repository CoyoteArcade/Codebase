import { Outlet } from 'react-router-dom';
import { Box } from '@mantine/core';
import ScrollToTop from '@/components/ScrollToTop';

import Header from '../../sections/Header/Header';
import Footer from '../../sections/Footer/Footer';

import classes from './Root.module.css';
import RestController from '@/utilities/api/restController';
import { Game } from '@/types';

export async function loader() {
  const restController = RestController.getInstance();
  let games:Game[] = [];
  try {
    const gamesJson = await restController.get<Game[]>('/games');
    if (gamesJson.length) {
      games = gamesJson;
    }
  } catch (error) {
    console.error('failed to receive games', error);
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
