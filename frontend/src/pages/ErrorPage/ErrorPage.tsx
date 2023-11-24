import { Link, useRouteError } from 'react-router-dom';
import { Box, Title, Text, Button, Container, Group, useMantineTheme } from '@mantine/core';

import classes from './ErrorPage.module.css';

export function ErrorPage() {
  const theme = useMantineTheme();
  const error: any = useRouteError();

  return (
    <Box className={classes.root}>
      <Box c={`${theme.primaryColor}.3`} className={classes.label}>
        ERROR
      </Box>
      <Title className={classes.title}>Something bad just happened...</Title>

      <Text c={`${theme.primaryColor}.2`} size="lg" ta="center" className={classes.description}>
        Our servers could not handle your request. Don&apos;t worry, our development team was
        already notified. Try refreshing the page.
      </Text>
      <Group justify="center">
        <Link to="/">
          <Button variant="white" size="md">
            Take me home, please!
          </Button>
        </Link>
      </Group>
    </Box>
  );
}
