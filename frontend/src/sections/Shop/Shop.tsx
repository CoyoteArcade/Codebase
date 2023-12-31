import { useState, useEffect } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { Box, Title, MantineProvider, rem } from '@mantine/core';

import GameGrid from '@/components/GameGrid/GameGrid';
import ShopCategories from './ShopCategories/ShopCategories';

import classes from './Shop.module.css';

export default function Shop({
  titleCategories = '',
  titleGrid = '',
  showGrid = true,
  showCategories = true,
  maxCategories,
  gameCategory = '',
  sortBy = '',
}: {
  titleCategories?: string;
  titleGrid?: string;
  showGrid?: boolean;
  showCategories?: boolean;
  maxCategories?: number;
  title?: string;
  gameCategory?: string;
  sortBy?: string;
}) {
  let games: any = useRouteLoaderData('root');

  const sortByRelease = (games: any) => {
    return games
      .toSorted((a: any, b: any) => {
        const dateA: number = Date.parse(a.releaseDate);
        const dateB: number = Date.parse(b.releaseDate);

        if (isNaN(dateA) && isNaN(dateB)) {
          return 0;
        } else if (isNaN(dateA)) {
          return -1;
        } else if (isNaN(dateB)) {
          return 1;
        } else {
          return dateA - dateB;
        }
      })
      .reverse();
  };

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
