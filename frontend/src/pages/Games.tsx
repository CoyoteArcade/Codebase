import { Flex } from '@mantine/core';

import Navbar from '../sections/Navbar/Navbar';
import Shop from '@/sections/Shop/Shop';

function translateCategory(category: string) {
  let translated = category;

  if (category) {
    switch (category) {
      case 'visualnovel':
        translated = 'Visual Novel';
        break;
      case 'rpg':
        translated = 'Role-playing';
        break;
      default:
        translated = category.charAt(0).toUpperCase() + category.slice(1);
    }
  }

  return translated;
}

export default function Categories({ gameCategory = '' }: any) {
  return (
    <Flex style={{ flexWrap: 'nowrap' }} w="100vw">
      <Navbar />
      <Shop
        titleGrid={gameCategory ? translateCategory(gameCategory) : 'All Games'}
        showCategories={false}
        gameCategory={gameCategory ? translateCategory(gameCategory) : ''}
        sortBy="releaseDate"
      />
    </Flex>
  );
}
