import { Flex } from '@mantine/core';

import Navbar from '../sections/Navbar/Navbar';
import Shop from '@/sections/Shop/Shop';

export default function Categories() {
  return (
    <Flex style={{ flexWrap: 'nowrap' }} align="flex-start" w="100vw">
      <Navbar />
      <Shop titleCategories="ALL CATEGORIES" showGrid={false} />
    </Flex>
  );
}
