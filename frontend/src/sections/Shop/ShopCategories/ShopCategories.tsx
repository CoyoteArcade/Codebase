import { Stack, Title, rem } from '@mantine/core';

import GameCategoryRow from './GameCategoryRow/GameCategoryRow';

import classes from './ShopCategories.module.css';

function ShopCategories({ gameData, maxCategories }: { gameData: any; maxCategories?: number }) {
  const categories: Array<string> = [];

  for (let i = 0; i < gameData.length; i++) {
    const game = gameData[i];
    for (let j = 0; j < game.Category.length; j++) {
      const category = game.Category[j];
      if (!categories.includes(category)) {
        categories.push(category);
      }
    }
  }

  // Rendered categories
  const gameCategories = categories.map((category, idx) => {
    return <GameCategoryRow key={idx} gameData={gameData} category={category} />;
  });

  return (
    <Stack className={classes.categories} my={rem('50px')}>
      {gameCategories.slice(0, maxCategories)}
    </Stack>
  );
}

export default ShopCategories;
