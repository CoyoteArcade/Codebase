import { useContext, useEffect, useState } from 'react';
import { Box } from '@mantine/core';

import { AuthContext } from '@/utilities/auth/AuthContext';
import { GameCard } from '@/components/GameCard/GameCard';
import classes from './GameGrid.module.css';
import RestController from '@/utilities/api/restController';

function GameGrid({ gameData, category = '' }: { gameData: any; category?: string }) {
  const { user }: any = useContext(AuthContext);
  const [userLists, setUserLists] = useState([]);
  const [allImageLinks, setAllImageLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const restController = RestController.getInstance();
  let games:any = [];
  let categoryGames;

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const json = await restController.get<any>(`/profile/${user.uid}`);
          setUserLists(json.favorites);
        } catch (error) {
          console.error('failed to fetch profile', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    const fetchGameImages = async () => {
      setLoading(true);
      try {
        const json = await restController.get<any>('/games/url/images');
        setAllImageLinks(json.images);
      } catch (error) {
        console.error('failed to fetch game images', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchGameImages();
  }, []);

  const findGameImages = (id:any) => {
    let gameImages:any = {};

    gameImages = allImageLinks.find((game:any) => game.id === id);

    return gameImages;
  };

  if (category === '') {
    games = gameData.map((game: any) => (
      <Box key={game.id} className={classes.card}>
        <GameCard
          gameObj={game}
          gameImages={findGameImages(game.id)}
          isFavorite={(userLists as any).includes(game.id)}
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
          isFavorite={(userLists as any).includes(game.id)}
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
        </Box>,
      );
    }
  }

  return <Box className={classes.container}>{games}</Box>;
}

export default GameGrid;
