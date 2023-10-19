import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import {
  IconBellRinging,
  IconFingerprint,
  IconKey,
  IconSettings,
  Icon2fa,
  IconDatabaseImport,
  IconReceipt2,
  IconSwitchHorizontal,
  IconLogout,
  IconChessKnight,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';

const data = [
  { link: '', label: '', icon: IconBellRinging },
  { link: '', label: 'Specials', icon: IconReceipt2 },
  { link: '', label: 'Browse', icon: IconFingerprint },
  { link: '', label: 'Search', icon: IconKey },
  { link: '', label: 'RPG', icon: IconDatabaseImport },
  { link: '', label: 'Action', icon: Icon2fa },
  { link: '', label: 'MMO', icon: IconSettings },
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
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
        </Group>
        {links}
      </div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}