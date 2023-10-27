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
        <Stack className={classes.categories} mb={rem('50px')}>
          <Box>
            <Title order={3}>Category One</Title>
            <ShopRow />
          </Box>
          <Box>
            <Title order={3}>Category Two</Title>
            <ShopRow />
          </Box>
        </Stack>

        <Title order={2}>All Games</Title>
        <ShopGrid />
      </Box>
    </MantineProvider>
  );
}
