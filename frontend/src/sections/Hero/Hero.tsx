import { Container, Title, Text, Button, rem } from '@mantine/core';
import classes from './Hero.module.css';
import { NavLink } from 'react-router-dom';

export default function HeroImageRight() {
  const description =
    'Try out new games from your fellow Coyote Students here at CSUSB Upload and share your own game creations to show off your skills and creativity!';

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
              Web&nbsp;Application
            </Title>
            <Text className={classes.description} mt={30}>
              {description}
            </Text>
            <NavLink style={{ textDecoration: 'none' }} to="/games" key="Games">
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
            </NavLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
