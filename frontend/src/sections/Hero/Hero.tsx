import { Link } from 'react-router-dom';

import { Container, Title, Text, Button, rem, darken, lighten } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import classes from './Hero.module.css';

export default function HeroImageRight() {
  return (
    <div className={classes.root}>
      <Container maw={rem('2500px')}>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title lh={rem('1.2em')} className={classes.title}>
              Welcome to the{' '}
              <Text component="span" inherit c="rgb(84, 216, 255)">
                Coyote&nbsp;Arcade
              </Text>{' '}
              Web&nbsp;Application!
            </Title>
            <Text className={classes.description} mt={30}>
              Try out new games made by your fellow Coyotes – Mantine includes more than 100
              customizable components and hooks to cover you in any situation
            </Text>

            <Link to="/games">
              <Button
                // @ts-ignore

                variant="gradient"
                gradient={{
                  from: 'var(--mantine-color-coyote-blue-light)',
                  to: 'var(--mantine-color-coyote-blue-dark)',
                }}
                size="xl"
                className={classes.control}
                mt={40}
              >
                View games
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
