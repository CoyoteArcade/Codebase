import { Box, Flex } from '@mantine/core';
import Hero from '../sections/Hero/Hero';
import Navbar from '../sections/Navbar/Navbar';
import Shop from '@/sections/Shop/Shop';

export default function Home() {
  return (
    <Box>
      <Hero />
      <Flex style={{ flexWrap: 'nowrap' }} align="flex-start" w="100vw">
        <Navbar />
        <Shop title="POPULAR GAME CATEGORIES" showGrid={false} maxCategories={5} />
      </Flex>
    </Box>
  );
}
