import { createContext } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import { Box, Container, Stack } from '@mantine/core';

import Header from '../sections/Header/HeaderMegaMenu';
import Footer from '../sections/Footer/Footer';

import classes from './styles/Root.module.css';

export async function getGames() {
  let games = [];
  const gamesResponse = await fetch('https://delightful-sombrero-slug.cyclic.app/games');
  const gamesJson = await gamesResponse.json();
  if (gamesJson.length) {
    games = gamesJson;
    // console.log(games);
  }
  return games;
}

export async function loader() {
  const games = await getGames();
  return games;
}

export const GamesContext = createContext([]);

export default function RootPage() {
  const games: any = useLoaderData();

  return (
    <GamesContext.Provider value={games}>
      <Box className={classes.root}>
        <Header />
        <Box mih="80vh">
          <Outlet />
        </Box>
        <Footer />
      </Box>
    </GamesContext.Provider>
  );
}
