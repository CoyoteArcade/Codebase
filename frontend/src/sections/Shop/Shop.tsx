import { Box, Title, Stack, MantineProvider, rem } from '@mantine/core';
import ShopGrid from './ShopGrid/ShopGrid';
import ShopCategories from './ShopCategories/ShopCategories';
import { useLoaderData } from 'react-router-dom';
import classes from './Shop.module.css';
import { useContext, useEffect, useState } from 'react';

import { GamesContext } from '@/pages/Root';

export default function Shop() {
  const games:any = useContext(GamesContext);
  // const [games, setGameData] = useState([]);

  // useEffect(() => {
  //     fetch('https://delightful-sombrero-slug.cyclic.app/games')
  //     .then(response => response.json())
  //     .then(data => setGameData(data))
  //     .catch(error => console.log(error));
  // }, []);

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
