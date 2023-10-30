import { Box, Title, Stack, MantineProvider, rem } from '@mantine/core';
import { useState } from 'react';
import ShopGrid from './ShopGrid/ShopGrid';
import ShopCategories from './ShopCategories/ShopCategories';

import { useEffect, useState } from 'react';

import classes from './Shop.module.css';
import gamesData from '@/assets/games.json';
import { getGames, getCategory } from '@/api/index';

export default function Shop() {
  const [games, setGameData] = useState(gamesData);

  // const main = async () => {
  //   const games = await getGames();
  //   let arrayThing = games;
  //   console.log(arrayThing);
  //   const actionGames = await getCategory('Multiplayer');
  //   console.log(actionGames[0]);
  // };

  // main();

  return (
    <MantineProvider
      theme={{
        components: {
          Title: Title.extend({
            classNames: {
              root: classes.heading,
            },
          }),
        },
      }}
    >
      <Box className={classes.shop}>
        <ShopCategories gameData={games} />
        <ShopGrid gameData={games} />
      </Box>
    </MantineProvider>
  );
}
