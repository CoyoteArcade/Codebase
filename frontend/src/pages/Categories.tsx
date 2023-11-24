import { Grid } from '@mantine/core';

import Navbar from '../sections/Navbar/Navbar';
import Shop from '@/sections/Shop/Shop';

export default function Categories() {
  return (
    <Grid gutter={0}>
      <Grid.Col span={{ base: 0, lg: 2 }}>
        <Navbar />
      </Grid.Col>
      <Grid.Col span={{ base: 12, lg: 10 }}>
        <Shop titleCategories="All Categories" showGrid={false} />
      </Grid.Col>
    </Grid>
  );
}
