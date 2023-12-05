import { GameCard } from '@/components/GameCard/GameCard';

import classes from './GameGrid.module.css';
import { Box } from '@mantine/core';

function GameGrid({ gameData, category = '' }: { gameData: any; category?: string }) {
  let games = [];
  let categoryGames;
  if (category === '') {
    games = gameData.map((game: any) => (
      <Box key={game.id} className={classes.card}>
        <GameCard gameObj={game} />
      </Box>
    ));
  } else {
    categoryGames = gameData.filter((gameObj: any) => gameObj.categories.includes(category));
    games = categoryGames.map((game: any) => (
      <Box key={game.id} className={classes.card}>
        <GameCard gameObj={game} />
      </Box>
    ));
  }

  // Hack for responsiveness
  if (games.length < 6) {
    for (let i = 0; i < 5; i++) {
      games.push(
        <Box key={`i${i}`} style={{ visibility: 'hidden' }}>
          .
        </Box>
      );
    }
  }

  return <div className={classes.container}>{games}</div>;
}

export default GameGrid;
