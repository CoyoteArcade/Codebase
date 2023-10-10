import { Box } from '@mantine/core';
import ShopGrid from './ShopGrid/ShopGrid';

import classes from './Shop.module.css';

export default function Shop() {
  return (
    <Box className={classes.shop}>
      <ShopGrid />
    </Box>
  );
}
