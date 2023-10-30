import { Stack, Title, rem } from '@mantine/core';

import GameCategoryRow from './GameCategoryRow/GameCategoryRow';

import classes from './ShopCategories.module.css';

function ShopCategories({ gameData, maxCategories }: { gameData: any; maxCategories?: number }) {
  const categories: Array<string> = [];

  for (const game of gameData) {
    for (const item of game.Category.values()) {
      if (!categories.includes(item)) {
        categories.push(item);
      }
    }
  }

  // Rendered categories
  const gameCategories = categories.map((category, idx) => {
    return <GameCategoryRow key={idx} gameData={gameData} category={category} />;
  });

  return (
    <Stack className={classes.categories} my={rem('50px')}>
      <Title tt="uppercase" order={2} mb={rem('10px')}>
        Game Categories
      </Title>
      {gameCategories.slice(0, maxCategories)}
    </Stack>
  );
}

export default ShopCategories;
