import { Grid } from '@mantine/core';

import GameCard from '../GameCard/GameCard';

import classes from './ShopGrid.module.css';

import games from '@/sections/Shop/games.json';
import { getGames, getCategory } from '@/api/index';

// getGames().then(games => {
//     console.log(games);
// });

// let q = {
//     prop: "Title",
//     val: "Cyberpunk 2077"
// };

// getGames(q).then(games => {
//     console.log("Query:", q.prop, "==", q.val);
//     console.log(games);
// });

const main = async () => {
  try {
    const gamesData = await getGames();
    let arrayThing = gamesData;
    const actionGames = await getCategory('Multiplayer');
    console.log(arrayThing);
    return actionGames[0];
  } catch (error: any) {
    throw new Error(error);
  }
};

main();

function GameGrid() {
  const gameList = games.map((game) => (
    <Grid.Col span={{ base: 6, xs: 4, sm: 4, md: 4, lg: 3, xl: 3, xxl: 2.4 }}>
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
