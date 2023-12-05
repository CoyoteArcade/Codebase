import { Stack, Title, Box } from '@mantine/core';

import GameGrid from '@/components/GameGrid/GameGrid';

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
    return (
      <Box my="sm" key={idx}>
        <Title key={idx} order={2}>
          {category} Games
        </Title>
        <GameGrid key={idx} gameData={gameData} category={category} />
      </Box>
    );
  });

  return <Stack className={classes.categories}>{gameCategories.slice(0, maxCategories)}</Stack>;
}

export default ShopCategories;
