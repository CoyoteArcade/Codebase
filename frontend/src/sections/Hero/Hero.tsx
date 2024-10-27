import {
  Container, Title, Text, Button, rem, useMantineTheme,
} from '@mantine/core';
import { NavLink } from 'react-router-dom';
import classes from './Hero.module.css';

export default function HeroImageRight() {
  const theme = useMantineTheme();
  const description = 'Try out new games from your fellow Coyote Students here at CSUSB Upload and share your own game creations to show off your skills and creativity!';

  let accentColor = '';
  switch (theme.primaryColor) {
    case 'coyote-blue':
      accentColor = 'cyan';
      break;
    case 'violet':
      accentColor = 'grape';
      break;
    default:
      accentColor = 'blue';
      break;
  }

  return (
    <div className={classes.root}>
      <Container maw={rem('2500px')}>
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title lh={rem('1.2em')} className={classes.title}>
              Welcome to the
              {' '}
              <Text component="span" inherit c={`${accentColor}.4`}>
                Coyote&nbsp;Arcade
              </Text>
              {' '}
              Web&nbsp;Application
            </Title>
            <Text className={classes.description} mt={30}>
              {description}
            </Text>
            <NavLink style={{ textDecoration: 'none' }} to="/games" key="Games">
              <Button variant="filled" size="xl" className={classes.control} mt={40}>
                View games
              </Button>
            </NavLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
