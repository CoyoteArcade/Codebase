import { GameCard } from '@/components/GameCard/GameCard';

import classes from './GameGrid.module.css';

function GameGrid({ gameData }: any) {
  const games = gameData.map((game: any) => (
    <div key={game.id} className={classes.card}>
      <GameCard gameObj={game} />
    </div>
  ));

  return <div className={classes.container}>{games}</div>;
}

export default GameGrid;
