import { useRouteLoaderData } from 'react-router-dom';
import { Box, Title, rem } from '@mantine/core';

import GameGrid from '@/components/GameGrid/GameGrid';
import ShopCategories from './ShopCategories/ShopCategories';

import { sortByRelease } from '@/utilities/sortUtils';
import { Game, ShopProps } from '@/types';

import classes from './Shop.module.css';

export default function Shop({
  titleCategories = '',
  titleGrid = '',
  showGrid = true,
  showCategories = true,
  maxCategories,
  gameCategory = '',
  sortBy = '',
}: ShopProps) {
  let games: Game[] = useRouteLoaderData('root') as Game[];

  const handleFilters = (games: Game[]) => {
    let filteredGames = games;

    if (gameCategory) {
      filteredGames = games.filter((game) => game.categories?.includes(gameCategory));
    }
    if (sortBy === 'releaseDate') {
      filteredGames = sortByRelease(filteredGames);
    }
    return filteredGames;
  };

  return (
    <Box className={classes.shop}>
      {showCategories && (
        <Title className={classes.title} mb={rem('30px')} order={2}>
          {titleCategories}
        </Title>
      )}
      {showCategories && <ShopCategories gameData={games} maxCategories={maxCategories} />}
      {showGrid && (
        <Title mb="lg" className={classes.title} order={2}>
          {titleGrid}
        </Title>
      )}

      {showGrid && <GameGrid gameData={handleFilters(games)} />}
    </Box>
  );
}
