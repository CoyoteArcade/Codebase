import { Link, useRouteError } from 'react-router-dom';

import { Box, Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './styles/ErrorPage.module.css';

export default function ServerError() {
  const error: any = useRouteError();

  return (
    <Box className={classes.root}>
      <div className={classes.label}>ERROR</div>
      <Title className={classes.title}>Something bad just happened...</Title>

      <Text size="lg" ta="center" className={classes.description}>
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
