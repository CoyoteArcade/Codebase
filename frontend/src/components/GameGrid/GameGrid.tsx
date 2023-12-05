import { GameCard } from '@/components/GameCard/GameCard';

import classes from './GameGrid.module.css';
import { Box } from '@mantine/core';

function GameGrid({ gameData }: any) {
  const games = gameData.map((game: any) => (
    <div key={game.id} className={classes.card}>
      <GameCard gameObj={game} />
    </div>
  ));

  // Hack for responsiveness
  if (games.length < 6) {
    for (let i = 0; i < 5; i++) {
      games.push(<Box style={{ visibility: 'hidden' }}>.</Box>);
    }
  }

  return <div className={classes.container}>{games}</div>;
}

export default GameGrid;
