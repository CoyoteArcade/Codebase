import { useRouteLoaderData } from 'react-router-dom';
import { Grid } from '@mantine/core';

import Navbar from '../sections/Navbar/Navbar';
import Shop from '@/sections/Shop/Shop';

export default function Categories() {
  const games: any = useRouteLoaderData("root");

  return (
    <Grid gutter={0}>
      <Grid.Col span={{ base: 0, lg: 2 }}>
        <Navbar />
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 10 }}>
        <Shop titleGrid={'All Games'} showCategories={false} />
      </Grid.Col>
    </Grid>
  );
}
