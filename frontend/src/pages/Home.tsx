import { Box, Grid, Title } from '@mantine/core';
import { useContext } from 'react';
import { GamesContext } from './Root';

import Hero from '../sections/Hero/Hero';
import Navbar from '../sections/Navbar/Navbar';
import Shop from '@/sections/Shop/Shop';

/* <div>
  {games.length && games.map((game:any) => (
    <div key={game.id}>
      <h1>{game.Title}</h1>
      <p>{game.Description}</p>
    </div>
  ))}
  </div> */

export default function Home() {
  const games: any = useContext(GamesContext);
  return (
    <>
      <Hero />
      <Grid>
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
