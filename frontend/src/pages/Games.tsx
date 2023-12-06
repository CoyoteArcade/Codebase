import { useRouteLoaderData } from 'react-router-dom';
import { Grid } from '@mantine/core';

import Navbar from '../sections/Navbar/Navbar';
import Shop from '@/sections/Shop/Shop';

export default function Categories({ gameCategory = '' }: any) {
  const games: any = useRouteLoaderData('root');

  return (
    <Grid gutter={0}>
      <Grid.Col span={{ base: 0, lg: 2 }}>
        <Navbar />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xl: 10 }}>
        <Shop
          titleGrid={gameCategory ? gameCategory : 'All Games'}
          showCategories={false}
          gameCategory={gameCategory ? gameCategory : ''}
          sortBy="releaseDate"
        />
      </Grid.Col>
    </Grid>
  );
}
