import { useRouteLoaderData } from 'react-router-dom';
import { Grid } from '@mantine/core';

import Navbar from '../sections/Navbar/Navbar';
import Shop from '@/sections/Shop/Shop';

function translateCategory(category: string) {
  switch (category) {
    case 'rpg':
      return 'RPG';
    case 'action':
      return 'Action';
    case 'multiplayer':
      return 'Multiplayer';
    case 'strategy':
      return 'Strategy';
    case 'fps':
      return 'FPS';
    case 'adventure':
      return 'Adventure';
    default:
      return 'ALL GAMES';
  }
}

export default function Categories({ gameCategory = '' }: any) {
  const games: any = useRouteLoaderData('root');

  return (
    <Grid gutter={0}>
      <Grid.Col span={{ base: 0, lg: 2 }}>
        <Navbar />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xl: 10 }}>
        <Shop
          titleGrid={gameCategory ? translateCategory(gameCategory) : 'All Games'}
          showCategories={false}
          gameCategory={gameCategory ? translateCategory(gameCategory) : ''}
        />
      </Grid.Col>
    </Grid>
  );
}
