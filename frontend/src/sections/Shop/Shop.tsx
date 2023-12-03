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
}: {
  titleCategories?: string;
  titleGrid?: string;
  showGrid?: boolean;
  showCategories?: boolean;
  maxCategories?: number;
  title?: string;
  gameCategory?: string;
}) {
  const games: any = useRouteLoaderData('root');
  let categoryGames = [];
  if (gameCategory) {
    categoryGames = games.filter((game: any) => game.categories.includes(gameCategory));
  }

  return (
    <MantineProvider
      theme={{
        components: {
          Title: Title.extend({
            classNames: {
              root: classes.heading,
            },
          }),
        },
      }}
    >
      <Box className={classes.shop}>
        {showCategories && (
          <Title mb={rem('30px')} order={2}>
            {titleCategories}
          </Title>
        )}
        {showCategories && <ShopCategories gameData={games} maxCategories={maxCategories} />}
        {showGrid && (
          <Title className={classes['title-grid']} order={2}>
            {titleGrid}
          </Title>
        )}

        {showGrid && <GameGrid gameData={gameCategory ? categoryGames : games} />}
      </Box>
    </MantineProvider>
  );
}
