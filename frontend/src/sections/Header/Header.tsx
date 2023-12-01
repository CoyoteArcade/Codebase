import { NavLink, useLocation } from 'react-router-dom';
import {
  HoverCard,
  Menu,
  Group,
  Button,
  UnstyledButton,
  Text,
  Space,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  Code,
  MenuDivider,
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
  IconAlertCircle,
} from '@tabler/icons-react';

import Search from '@/components/SearchBar/SearchBar';
import DarkModeToggle from '@/components/DarkModeToggle/DarkModeToggle';
import classes from './Header.module.css';
import { MouseEventHandler, useContext } from 'react';
import { AuthContext } from '@/utilities/auth/AuthContext';

// Game Hover - Links Content
const mockdata = [
  {
    icon: IconUpload,
    title: 'My Uploads',
    link: '*',
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
    link: '*',
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
    link: '*',
    description: 'Games that you liked or loved on this account',
  },
];

const registerButton = (
  <NavLink style={{ textDecoration: 'none' }} to="/register" key="Register">
    <Button>Register</Button>
  </NavLink>
);

const profileButton = (
  <NavLink style={{ textDecoration: 'none' }} to="/profile" key="Profile">
    <Button>Profile</Button>
  </NavLink>
);

const loginButton = (
  <NavLink style={{ textDecoration: 'none' }} to="/login" key="Login">
    <Button variant="outline">Log In</Button>
  </NavLink>
);

const logoutButton = (logoutFunction:MouseEventHandler) => (
  <NavLink style={{ textDecoration: 'none' }} to="/login" key="Logout">
    <Button variant="outline" onClick={logoutFunction}>Log Out</Button>
  </NavLink>
);

export default function Header() {
  const { user, setUser } = useContext(AuthContext);
  let location = useLocation();
  console.log(location);
  const [drawerOpened, drawerHandler] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

  const handleLogout = () => {
    setUser(null);
    console.log("Logged out");
  };

  const handleMobileLogout = () => {
    handleLogout();
    drawerHandler.close();
  };

  // Game Hover - Rendered Links
  const links = mockdata.map((item) => (
    <NavLink to={item.link} end key={item.title} onClick={drawerHandler.close}>
      <UnstyledButton className={classes.subLink} key={item.title}>
        <Group style={{ flexDirection: 'row' }} wrap="nowrap" align="flex-start">
          <ThemeIcon size={34} variant="outline" radius="md">
            <item.icon style={{ width: rem(22), height: rem(22) }} />
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
        <Group justify="space-between" h="100%" gap="xs">
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
                <Box
                  pr="0px"
                  className={(() => {
                    switch (location.pathname) {
                      case '/games':
                      case '/games/categories':
                        return `${classes.link} ${classes.active}`;
                        break;
                      default:
                        return `${classes.link}`;
                    }
                  })()}
                >
                  <Center inline>
                    <Box component="span" mr={5}>
                      Games
                    </Box>
                    <ThemeIcon variant="transparent">
                      <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
                    </ThemeIcon>
                  </Center>
                </Box>
              </HoverCard.Target>

              {/* GAME Hover Card */}
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
                        {user ? "View your profile" : "Create an account"}
                      </Text>
                      <Text size="xs" c="dimmed">
                        {user ? "Check out your favorites, past purchases, and more!" : "Create a Coyote Arcade account now for increased functionality!"}
                      </Text>
                    </div>
                    <Button component={NavLink} to={user ? "/profile" : "/register"} onClick={drawerHandler.close}>
                      {user ? "Profile" : "Register"}
                    </Button>
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
          <Group visibleFrom="lg" align="stretch">
            <DarkModeToggle />
            {user ? logoutButton(handleLogout) : loginButton}
            {user ? profileButton : registerButton}
          </Group>

          {/* Drawer/Burger Menu on Mobile */}
          <Group hiddenFrom="sm">
            <DarkModeToggle />
            <Burger opened={drawerOpened} onClick={() => drawerHandler.toggle()} />
          </Group>

          {/* Dropdown/Burger Menu  */}
          <Group hiddenFrom="lg" visibleFrom="sm">
            <DarkModeToggle />
            <Menu shadow="md">
              <Menu.Target>
                <Burger />
              </Menu.Target>

              <Menu.Dropdown w={250} hiddenFrom="lg" visibleFrom="sm">
                <Menu.Item component="div">
                  <Button variant="outline" w="100%" component={NavLink} to="/login" onClick={user ? handleLogout : ()=>console.log('clicked')}>
                    {user ? "Log Out" : "Log In"}
                  </Button>
                </Menu.Item>
                <Menu.Item component="div">
                  <Button w="100%" component={NavLink} to="/register">
                    {user ? "Profile" : "Register"}
                  </Button>
                </Menu.Item>
                <MenuDivider />
                <Menu.Item component="div" closeMenuOnClick={false}>
                  <Search />
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </nav>

      <nav>
        <Drawer
          opened={drawerOpened}
          onClose={() => drawerHandler.close()}
          size="100%"
          padding="md"
          title="Navigation"
          hiddenFrom="sm"
          position="right"
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
            <Divider />

            <NavLink
              to="/"
              key="Home"
              className={classes['link-drawer']}
              onClick={drawerHandler.close}
            >
              Home
            </NavLink>

            <NavLink
              to="/about"
              key="About"
              className={classes['link-drawer']}
              onClick={drawerHandler.close}
            >
              About
            </NavLink>
            <UnstyledButton className={classes['link-drawer']} onClick={toggleLinks}>
              <Center inline>
                <Box component="span" mr={5}>
                  Games
                </Box>
                <ThemeIcon variant="transparent">
                  <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
                </ThemeIcon>
              </Center>
            </UnstyledButton>
            <Collapse in={linksOpened}>{links}</Collapse>
            <NavLink to="/upload" className={classes['link-drawer']} onClick={drawerHandler.close}>
              Upload
            </NavLink>

            <Divider />

            <Box w="80vw" mx="auto" my="lg">
              <Search drawerClose={drawerHandler.close} />
            </Box>

            <Group justify="center" grow pb="xl" px="md" my="lg">
              <Button
                component={NavLink}
                variant="outline"
                to="/login"
                onClick={user ? handleMobileLogout : drawerHandler.close}
              >
                {user ? "Log Out" : "Log In"}
              </Button>
              <Button component={NavLink} to={user ? "/profile" : "/register"} onClick={drawerHandler.close}>
                {user ? "Profile" : "Register"}
              </Button>
            </Group>
          </ScrollArea>
        </Drawer>
      </nav>
    </header>
  );
}
