import { Grid } from '@mantine/core';

import GameCard from '../GameCard/GameCard';

import classes from './ShopGrid.module.css';

import games from '../games.json';

function GameGrid({gameData}:any) {
  const gameList = gameData.map((game:any, idx:any) => (
    <Grid.Col span={{ base: 6, xs: 4, sm: 4, md: 4, lg: 3, xl: 3, xxl: 2.4 }} key={idx}>
      <GameCard gameObj={game} />
    </Grid.Col>
  ));

  return (
    <Grid className={classes.grid} gutter={{ base: 5, sm: 'md', lg: 'xl' }} justify="flex-start">
      {gameList}
    </Grid>
  );
}

export default GameGrid;
