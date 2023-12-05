import { Stack, rem } from '@mantine/core';

import CategoryRow from './CategoryRow/CategoryRow';

import classes from './ShopCategories.module.css';

function ShopCategories({
  gameData = [],
  maxCategories,
}: {
  gameData: any;
  maxCategories?: number;
}) {
  const categories: Array<string> = [];

  for (let i = 0; i < gameData.length; i++) {
    const game = gameData[i];
    for (let j = 0; j < game.categories.length; j++) {
      const category = game.categories[j];
      if (!categories.includes(category)) {
        categories.push(category);
      }
    }
  }

  // Rendered categories
  const gameCategories = categories.map((category, idx) => {
    return <CategoryRow key={idx} gameData={gameData} category={category} profile={false} />;
  });

  return (
    <Stack className={classes.categories} my={rem('50px')}>
      {gameCategories.slice(0, maxCategories)}
    </Stack>
  );
}

export default ShopCategories;
