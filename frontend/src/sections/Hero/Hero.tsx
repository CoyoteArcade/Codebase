// import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
// import { IconCheck } from '@tabler/icons-react';
// import image from './image.svg';
// import classes from './Hero.module.css';

import { Container, Title, Text, Button, rem } from '@mantine/core';
import classes from './Hero.module.css';
import { NavLink } from 'react-router-dom';

export default function HeroImageRight() {
  return (
    <div className={classes.root}>
      <Container maw={rem('2500px')}>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title lh={rem('1.2em')} className={classes.title}>
              Welcome to the{' '}
              <Text component="span" inherit c="rgb(84, 216, 255)">
                Coyote Arcade
              </Text>{' '}
              Web Application!
            </Title>

            <Text className={classes.description} mt={30}>
              Try out new games made by your fellow Coyotes – Mantine includes more than 100
              customizable components and hooks to cover you in any situation
            </Text>
            <NavLink style={{textDecoration:"none"}} to="/games" key="Games">
            <Button
              variant="gradient"
              gradient={{ from: '#1088F9', to: '#1FA6C1' }}
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
