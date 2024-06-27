import { useRouteLoaderData } from 'react-router-dom';
import { Box, Title, rem } from '@mantine/core';

import GameGrid from '@/components/GameGrid/GameGrid';
import ShopCategories from './ShopCategories/ShopCategories';

import { sortByRelease } from '@/utilities/sortUtils';

import classes from './Shop.module.css';

interface ShopProps {
  titleCategories?: string;
  titleGrid?: string;
  showGrid?: boolean;
  showCategories?: boolean;
  maxCategories?: number;
  title?: string;
  gameCategory?: string;
  sortBy?: string;
}

export default function Shop({
  titleCategories = '',
  titleGrid = '',
  showGrid = true,
  showCategories = true,
  maxCategories,
  gameCategory = '',
  sortBy = '',
}: ShopProps) {
  let games: any = useRouteLoaderData('root');

  if (sortBy === 'releaseDate') {
    games = sortByRelease(games);
  }

  let categoryGames = [];
  if (gameCategory) {
    categoryGames = games.filter((game: any) => game.categories.includes(gameCategory));
  }

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

      {showGrid && <GameGrid gameData={gameCategory ? categoryGames : games} />}
    </Box>
  );
}
