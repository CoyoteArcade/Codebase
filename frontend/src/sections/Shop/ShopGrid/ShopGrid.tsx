import { Grid } from '@mantine/core';

import GameCard from './GameCard/GameCard';

import games from './GameCard/games.json';

function getRandomNum(min = 300, max = 500) {
  const newMin = Math.ceil(min);
  const newMax = Math.floor(max);
  return Math.floor(Math.random() * (newMax - newMin + 1) + newMin).toString(); // Inclusive both sides
}

function GameGrid() {
  const gameList = games.map((game) => (
    <Grid.Col span={{ base: 6, xs: 4, sm: 6, lg: 4, xl: 3, xxl: 2.4 }}>
      <GameCard
        gameObj={{
          ...game,
          banner: {
            src: `https://placekitten.com/${getRandomNum()}/${getRandomNum()}`,
            alt: 'kitto',
          },
        }}
      />
    </Grid.Col>
  ));

  return (
    <Grid gutter={{ base: 5, sm: 'md', lg: 'xl' }} justify="flex-start">
      {gameList}
    </Grid>
  );
}

export default GameGrid;
