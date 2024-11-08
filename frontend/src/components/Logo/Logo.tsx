import { NavLink } from 'react-router-dom';
import {
  Image, Text, Box, Stack,
} from '@mantine/core';
import arcade from '@/assets/coyotearcade.png';
import classes from './Logo.module.css';

function StyledText({ children }: { children: string }) {
  return (
    <Text c="coyote-blue" className={classes.text}>
      {children}
    </Text>
  );
}

function Logo() {
  return (
    <NavLink to="/" style={{ textDecoration: 'none' }}>
      <Box className={classes.root}>
        <Image src={arcade} className={classes.img} />
        <Stack className={classes['text-group']}>
          <StyledText>COYOTE</StyledText>
          <StyledText>ARCADE</StyledText>
        </Stack>
      </Box>
    </NavLink>
  );
}

export default Logo;
