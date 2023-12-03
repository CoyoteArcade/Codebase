import { useContext } from 'react';
import { Grid } from '@mantine/core';
import Hero from '../sections/Hero/Hero';
import Navbar from '../sections/Navbar/Navbar';
import Shop from '@/sections/Shop/Shop';
import { AuthContext } from '@/utilities/auth/AuthContext';

export default function Home() {
  const { user, setUser } = useContext(AuthContext);
  console.log(user, setUser);
  return (
    <>
      <Hero />
      <Grid gutter={0}>
        <Grid.Col span={{ base: 0, xl: 2 }}>
          <Navbar />
        </Grid.Col>
        <Grid.Col span={{ base: 12, xl: 10 }}>
          <Shop title="POPULAR GAME CATEGORIES" showGrid={false} maxCategories={5} />
        </Grid.Col>
      </Grid>
    </>
  );
}
