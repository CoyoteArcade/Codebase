import { NavLink } from 'react-router-dom';
import { Group, Box, Title } from '@mantine/core';
import {
  IconBrowser,
  IconBalloon,
  IconSword,
  IconMoodXd,
  IconChessKnight,
  IconGhost,
  IconPuzzle,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';

const data = [
  { link: '/games', label: 'Browse', icon: IconBrowser },
  { link: '/games/categories/adventure', label: 'Adventure', icon: IconSword },
  { link: '/games/categories/casual', label: 'Casual', icon: IconBalloon },
  { link: '/games/categories/funny', label: 'Funny', icon: IconMoodXd },
  { link: '/games/categories/horror', label: 'Horror', icon: IconGhost },
  { link: '/games/categories/puzzle', label: 'Puzzle', icon: IconPuzzle },
  { link: '/games/categories/strategy', label: 'Strategy', icon: IconChessKnight },
];

export default function NavbarSimple() {
  const links = data.map((item) => (
    <NavLink
      className={({ isActive }: { isActive: boolean }) => {
        return isActive ? `${classes.link} ${classes.active}` : `${classes.link}`;
      }}
      to={item.link}
      end
      key={item.label}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <Box component="nav" visibleFrom="lg" className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="center">
          <Title order={3}>Navigation Bar</Title>
        </Group>
        {links}
      </div>
    </Box>
  );
}
