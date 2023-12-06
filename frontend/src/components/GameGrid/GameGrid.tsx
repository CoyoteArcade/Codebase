// @ts-nocheck
import { GameCard } from '@/components/GameCard/GameCard';

import classes from './GameGrid.module.css';
import { Box } from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utilities/auth/AuthContext';

function GameGrid({ gameData, category = '' }: { gameData: any; category?: string }) {
  const { user }: any = useContext(AuthContext);
  let games = [];
  let categoryGames;
  const [userLists, setUserLists] = useState([]);
  useEffect(() => {
    if (user) {
      fetch(`https://delightful-sombrero-slug.cyclic.app/profile/${user.uid}`)
        .then((res) => res.json())
        .then((json) => {
          console.log('gameGrid fetch response', json);
          setUserLists(json.favorites);
        })
        .catch((err) => console.log(err));
    }
  }, []);
  if (category === '') {
    games = gameData.map((game: any) => (
      <Box key={game.id} className={classes.card}>
        <GameCard gameObj={game} isFavorite={userLists.includes(game.id)} />
      </Box>
    ));
  } else {
    categoryGames = gameData.filter((gameObj: any) => gameObj.categories.includes(category));
    games = categoryGames.map((game: any) => (
      <Box key={game.id} className={classes.card}>
        <GameCard gameObj={game} isFavorite={userLists.includes(game.id)} />
      </Box>
    ));
  }

  // Hack for responsiveness
  if (games.length < 6) {
    for (let i = games.length; i < 6; i++) {
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
