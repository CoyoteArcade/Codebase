// @ts-nocheck
import { useContext, useEffect, useState } from 'react';
import { Box } from '@mantine/core';

import { AuthContext } from '@/utilities/auth/AuthContext';
import { GameCard } from '@/components/GameCard/GameCard';
import classes from './GameGrid.module.css';

function GameGrid({ gameData, category = '' }: { gameData: any; category?: string }) {
  const { user }: any = useContext(AuthContext);
  const [userLists, setUserLists] = useState([]);
  const [allImageLinks, setAllImageLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  let games = [];
  let categoryGames;

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        fetch(`https://delightful-sombrero-slug.cyclic.app/profile/${user.uid}`)
          .then((res) => res.json())
          .then((json) => {
            // console.log('fetch profile response', json);
            setUserLists(json.favorites);
          })
          .catch((err) => console.log(err));
      }
    };

    const fetchGameImages = async () => {
      setLoading(true);
      fetch(`https://delightful-sombrero-slug.cyclic.app/games/url/images`)
        .then((res) => res.json())
        .then((json) => {
          // console.log('fetch game images response', json);
          setAllImageLinks(json.images);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
    };

    fetchProfile();
    fetchGameImages();
  }, []);

  const findGameImages = (id) => {
    let gameImages = {};

    gameImages = allImageLinks.find((game) => {
      return game.id === id;
    });

    return gameImages;
  };

  if (category === '') {
    games = gameData.map((game: any) => (
      <Box key={game.id} className={classes.card}>
        <GameCard
          gameObj={game}
          gameImages={findGameImages(game.id)}
          isFavorite={userLists.includes(game.id)}
          loading={loading}
        />
      </Box>
    ));
  } else {
    categoryGames = gameData.filter((gameObj: any) => gameObj.categories.includes(category));
    games = categoryGames.map((game: any) => (
      <Box key={game.id} className={classes.card}>
        <GameCard
          gameObj={game}
          gameImages={findGameImages(game.id)}
          isFavorite={userLists.includes(game.id)}
          loading={loading}
        />
      </Box>
    ));
  }

  // Hack for responsiveness
  if (games.length < 6) {
    for (let i = games.length; i < 6; i++) {
      games.push(
        <Box key={`box-${i}`} style={{ visibility: 'hidden' }}>
          .
        </Box>
      );
    }
  }

  return <Box className={classes.container}>{games}</Box>;
}

export default GameGrid;
