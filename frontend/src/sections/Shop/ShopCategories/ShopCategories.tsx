import { Stack, rem } from '@mantine/core';

import GameCategoryRow from './GameCategoryRow/GameCategoryRow';

import classes from './ShopCategories.module.css';

function ShopCategories({ gameData }: any) {
  return (
    <Stack className={classes.categories} my={rem('50px')}>
      <GameCategoryRow gameData={gameData} category="FPS" />
      <GameCategoryRow gameData={gameData} category="Multiplayer" />
      <GameCategoryRow gameData={gameData} category="Action" />
    </Stack>
  );
}

export default ShopCategories;
