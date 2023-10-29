import { Box, Title, Stack, MantineProvider, rem } from '@mantine/core';
import { useState } from 'react';
import ShopGrid from './ShopGrid/ShopGrid';
import ShopRow from './ShopRow/ShopRow';

import classes from './Shop.module.css';
import gamesData from './games.json';
import { getGames, getCategory } from '@/api/index';

export default function Shop() {
  const [games, setGameData] = useState(gamesData);

  const main = async () => {
    const games = await getGames();
    let arrayThing = games;
    console.log(arrayThing);
    const actionGames = await getCategory('Multiplayer');
    console.log(actionGames[0]);
  };

  main();
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
        <Stack className={classes.categories} my={rem('50px')}>
          <ShopRow gameData={games} category="FPS" />
          <ShopRow gameData={games} category="Multiplayer" />
          <ShopRow gameData={games} category="Action" />
        </Stack>

        <Title order={2}>All Games</Title>
        <ShopGrid gameData={games} />
      </Box>
    </MantineProvider>
  );
}
