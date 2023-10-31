import { Grid, Title, rem } from '@mantine/core';

import ShopGridCard from './ShopGridCard/ShopGridCard';

import classes from './ShopGrid.module.css';

function GameGrid({ gameData }: any) {
  // Rendered game grid
  const gameList = gameData.map((game: any) => (
    <Grid.Col key={game.id} span={{ base: 6, xs: 4, sm: 4, md: 4, lg: 3, xl: 2.4 }}>
      <ShopGridCard gameObj={game} />
    </Grid.Col>
  ));

  return (
    <>
      <Grid className={classes.grid} gutter={{ base: 5, sm: 'md', lg: 'xl' }} justify="flex-start">
        {gameList}
      </Grid>
    </>
  );
}

export default GameGrid;
