import { NavLink } from 'react-router-dom';
import { Group, Box, Title, Text, rem, ActionIcon } from '@mantine/core';
import {
  IconBrowser,
  IconBalloon,
  IconSword,
  IconMoodXd,
  IconChessKnight,
  IconPuzzle,
  IconDeviceGamepad,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';

const data = [
  { link: '/games', label: 'Browse', icon: IconBrowser },
  { link: '/games/categories/adventure', label: 'Adventure', icon: IconSword },
  { link: '/games/categories/casual', label: 'Casual', icon: IconBalloon },
  { link: '/games/categories/funny', label: 'Funny', icon: IconMoodXd },
  { link: '/games/categories/puzzle', label: 'Puzzle', icon: IconPuzzle },
  { link: '/games/categories/strategy', label: 'Strategy', icon: IconChessKnight },
];

export default function NavbarSimple({ ...props }) {
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
      <Box ml="md" visibleFrom="xs" component="span">
        {item.label}
      </Box>
    </NavLink>
  ));

  return (
    <Box component="nav" visibleFrom="xxs" className={classes.navbar} {...props}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="center">
          <Group wrap="nowrap" align="center" gap="xs">
            <NavLink to="/games">
              <ActionIcon size={30} variant="filled" radius="xl">
                <IconDeviceGamepad className={classes['view-icon']} />
              </ActionIcon>
            </NavLink>

            <Title className={classes['header-title']} visibleFrom="xs" order={4}>
              View Games
            </Title>
          </Group>
        </Group>
        {links}
      </div>
    </Box>
  );
}
