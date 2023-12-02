import { useState } from 'react';
import { Group, Box, Title } from '@mantine/core';
import {
  IconBellRinging,
  IconBrowser,
  IconListSearch,
  IconBomb,
  IconSword,
  IconTank,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconChessKnight,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';
import Logo from '@/components/Logo/Logo';
import { NavLink } from 'react-router-dom';

const data = [
  { link: '/games', label: 'Browse', icon: IconBrowser },
  { link: '/games/categories/fps', label: 'FPS', icon: IconSword },
  { link: '/games/categories/action', label: 'Action', icon: IconTank },
  { link: '/games/categories/multiplayer', label: 'Multiplayer', icon: IconBomb },
  { link: '/games/categories/strategy', label: 'Strategy', icon: IconChessKnight },
];

export default function NavbarSimple() {
  const [active, setActive] = useState('Browse');

  const links = data.map((item) => (
    <NavLink
      className={classes.link}
      data-active={item.label === active || undefined}
      to={item.link}
      key={item.label}
      onClick={(event) => {
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <Box component="nav" visibleFrom="xl" className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="center">
          <Title order={3}>Navigation Bar</Title>
        </Group>
        {links}
      </div>
    </Box>
  );
}
