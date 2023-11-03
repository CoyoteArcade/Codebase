import { NavLink } from 'react-router-dom';
import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  Space,
  SimpleGrid,
  ThemeIcon,
  ActionIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Code,
} from '@mantine/core';
import Logo from '@/components/Logo/Logo';
import { useDisclosure } from '@mantine/hooks';
import {
  IconChevronDown,
  IconUpload,
  IconDeviceGamepad,
  IconShoppingBag,
  IconList,
  IconHeart,
} from '@tabler/icons-react';

import Search from '@/components/SearchBar/SearchBar';
import DarkModeToggle from '@/components/DarkModeToggle/DarkModeToggle';
import classes from './Header.module.css';
import { useId } from 'react';

const mockdata = [
  {
    icon: IconUpload,
    title: 'My Uploads',
    link: '#',
    description: 'Games you have personally developed and uploaded to the web app',
  },
  {
    icon: IconDeviceGamepad,
    title: 'View all Games',
    link: '/games',
    description: 'List of games with filter and sorting options',
  },
  {
    icon: IconShoppingBag,
    title: 'My Purchases',
    link: '#',
    description: 'Games you purchased or owned on this account',
  },
  {
    icon: IconList,
    title: 'View by Categories',
    link: '/games/categories',
    description: 'Games grouped by their respective genre or category',
  },
  {
    icon: IconHeart,
    title: 'My Favorites',
    link: '#',
    description: 'Games that you liked or loved on this account',
  },
];

export default function Header() {
  const theme = useMantineTheme();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

  // Game Hover - Links
  const links = mockdata.map((item) => (
    <NavLink to={item.link} end key={item.title}>
      <UnstyledButton c="var(--mantine-color-text)" className={classes.subLink} key={item.title}>
        <Group wrap="nowrap" align="flex-start">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon
              style={{ width: rem(22), height: rem(22) }}
              color={theme.colors['coyote-blue'][6]}
            />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" c="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    </NavLink>
  ));

  return (
    <header className={classes.root}>
      <nav className={classes.header}>
        <Group justify="space-between" h="100%">
          <Group justify="center">
            <Logo />
            <Code style={{ alignSelf: 'flex-end' }}>v1.0</Code>
          </Group>

          <Group h="100%" gap={0} visibleFrom="sm">
            {/* HOME */}
            <NavLink
              style={{ textDecoration: 'none' }}
              to="/"
              key="Home"
              className={({ isActive }: { isActive: boolean }) => {
                return isActive ? `${classes.link} ${classes.active}` : `${classes.link}`;
              }}
            >
              Home
            </NavLink>
            {/* ABOUT */}
            <NavLink
              style={{ textDecoration: 'none' }}
              to="/about"
              key="About"
              className={({ isActive }: { isActive: boolean }) => {
                return isActive ? `${classes.link} ${classes.active}` : `${classes.link}`;
              }}
            >
              About
            </NavLink>

            {/* GAME Button */}
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <Box className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Games
                    </Box>
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors['coyote-blue'][4]}
                    />
                  </Center>
                </Box>
              </HoverCard.Target>

              {/* GAME Hover Card */}
              <Box></Box>
              <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Create an account
                      </Text>
                      <Text size="xs" c="dimmed">
                        Create a Coyote Arcade account now for increased functionality!
                      </Text>
                    </div>
                    <Button variant="outline">Register</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>

            {/* UPLOAD */}
            <NavLink
              style={{ textDecoration: 'none' }}
              to="/upload"
              key="Upload"
              className={({ isActive }: { isActive: boolean }) => {
                return isActive ? `${classes.link} ${classes.active}` : `${classes.link}`;
              }}
            >
              Upload
            </NavLink>

            {/* Search */}
            <Space w="xl" />
            <Box visibleFrom="md">
              <Search />
            </Box>
          </Group>

          {/* Login, Register */}
          <Group visibleFrom="md" align="stretch">
            {/* <ActionIcon
              mr="var(--mantine-spacing-xs)"
              variant="default"
              disabled
              size="lg"
              aria-label="Settings"
            >
              <IconShoppingCart style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon> */}
            <DarkModeToggle />
            <NavLink style={{ textDecoration: 'none' }} to="/login" key="Login">
              <Button variant="outline">Log In</Button>
            </NavLink>
            <NavLink style={{ textDecoration: 'none' }} to="/register" key="Register">
              <Button>Register</Button>
            </NavLink>
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </nav>

      <nav>
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider />

            <NavLink to="/" className={classes['link-drawer']}>
              Home
            </NavLink>

            <a href="#" className={classes['link-drawer']}>
              About
            </a>
            <UnstyledButton className={classes['link-drawer']} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Games
                </Box>
                <IconChevronDown
                  style={{ width: rem(16), height: rem(16) }}
                  color={theme.colors.blue[6]}
                />
              </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{links}</Collapse>
            <NavLink to="/upload" className={classes['link-drawer']}>
              Upload
            </NavLink>

            <Divider />

            <Box w="80vw" mx="auto" my="lg">
              <Search />
            </Box>

            <Group justify="center" grow pb="xl" px="md" my="lg">
              <Button variant="default">Log in</Button>
              <Button>Register</Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </nav>
    </header>
  );
}
