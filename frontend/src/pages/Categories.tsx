import { Grid } from '@mantine/core';
import { useContext } from 'react';
import { GamesContext } from './Root';

import Navbar from '../sections/Navbar/Navbar';
import Shop from '@/sections/Shop/Shop';

export default function Categories() {
  const games: any = useContext(GamesContext);
  return (
    <Grid gutter={0}>
      <Grid.Col span={{ base: 0, xl: 2 }}>
        <Navbar />
      </Grid.Col>
      <Grid.Col span={{ base: 12, xl: 10 }}>
        <Shop titleCategories="ALL CATEGORIES" showGrid={false} />
      </Grid.Col>
    </Grid>
  );
}
