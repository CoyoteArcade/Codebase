import { Box, Title, Stack, MantineProvider, rem } from '@mantine/core';
import ShopGrid from './ShopGrid/ShopGrid';
import ShopRow from './ShopRow/ShopRow';

import classes from './Shop.module.css';

export default function Shop() {
  return (
    <MantineProvider
      theme={{
        components: {
          Title: Title.extend({
            classNames: {
              root: classes.heading,
            },
          }),
        },
      }}
    >
      <Box className={classes.shop}>
        <Stack className={classes.categories} my={rem('50px')}>
          <ShopRow category={'FPS'} />
          <ShopRow category={'Multiplayer'} />
          <ShopRow category={'DoesNotExist'} />
          <ShopRow category={'Action'} />
        </Stack>

        <Title order={2}>All Games</Title>
        <ShopGrid />
      </Box>
    </MantineProvider>
  );
}
