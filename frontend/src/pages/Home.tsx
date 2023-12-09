import { useContext } from 'react';
import { Box, Flex } from '@mantine/core';
import Hero from '../sections/Hero/Hero';
import Navbar from '../sections/Navbar/Navbar';
import Shop from '@/sections/Shop/Shop';
import { AuthContext } from '@/utilities/auth/AuthContext';

export default function Home() {
  const { user, setUser } = useContext(AuthContext);
  console.log(user, setUser);
  return (
    <Box>
      <Hero />
      <Flex style={{ flexWrap: 'nowrap' }} align="flex-start" w="100vw">
        <Navbar />
        <Box style={{ flex: 0 }}></Box>
        <Shop title="POPULAR GAME CATEGORIES" showGrid={false} maxCategories={5} />
      </Flex>
    </Box>
  );
}
