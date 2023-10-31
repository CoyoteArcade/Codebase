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

const data = [
  { link: '', label: 'Specials', icon: IconReceipt2 },
  { link: '', label: 'Browse', icon: IconBrowser },
  { link: '', label: 'Search', icon: IconListSearch },
  { link: '', label: 'RPG', icon: IconSword },
  { link: '', label: 'Action', icon: IconTank },
  { link: '', label: 'MMO', icon: IconBomb },
  { link: '', label: 'Strategy', icon: IconChessKnight },
];

export default function NavbarSimple() {
  const [active, setActive] = useState('Specials');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
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
