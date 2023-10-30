import { Box, Title, Stack, MantineProvider, rem } from '@mantine/core';
import ShopGrid from './ShopGrid/ShopGrid';
import ShopRow from './ShopRow/ShopRow';

import { useEffect, useState } from 'react';

import classes from './Shop.module.css';

export default function Shop() {
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/games')
    .then(response => response.json())
    .then(data => {
      console.log(data); // This will print the list of games.
      setGameData(data);
    })
    .catch(error => {
      console.error('Error fetching games:', error);
    });
  }, []);


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
        <Stack className={classes.categories} mb={rem('50px')}>
          <Box>
            <Title order={3}>Category One</Title>
            <ShopRow gameData={gameData}/>
          </Box>
          <Box>
            <Title order={3}>Category Two</Title>
            <ShopRow gameData={gameData}/>
          </Box>
        </Stack>

        <Title order={2}>All Games</Title>
        <ShopGrid />
      </Box>
    </MantineProvider>
  );
}
