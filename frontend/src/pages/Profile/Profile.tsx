import { useState, useContext } from 'react';
import { NavLink, useRouteLoaderData } from 'react-router-dom';
import { Group, Avatar, Text } from '@mantine/core';
import {
  IconHeart,
  IconDeviceGamepad,
  IconPhoneCall,
  IconAt,
  IconShoppingBag,
} from '@tabler/icons-react';

import { AuthContext } from '@/utilities/auth/AuthContext';
import classes from './Profile.module.css';
import coyoteavatar from '@/assets/coyoteavatar.png';

const data = [
  { link: '', label: 'My Favorites', icon: IconHeart },
  { link: '', label: 'My Uploads', icon: IconDeviceGamepad },
  { link: '', label: 'My Purchases', icon: IconShoppingBag },
];

async function loader() {
  let profile;
  const profileResponse = await fetch(
    'https://delightful-sombrero-slug.cyclic.app/profile/txS1Y7PhuDWVeYc5AX8t096QRq43'
  );
  const profileJson = await profileResponse.json();
  if (profileJson.length) {
    profile = profileJson;
  }
  return profileJson;
}

function Profile() {
  const [active, setActive] = useState('User info');
  const profile = useRouteLoaderData('profile');
  console.log(profile);

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
    <div style={{ display: 'flex' }}>
      <nav className={classes.navbar}>
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            <Avatar src={coyoteavatar} size={120} radius="md" />
            <div>
              <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                Software engineer
              </Text>

              <Text fz="lg" fw={500} className={classes.name}>
                Jordi Servin
              </Text>

              <Group wrap="nowrap" gap={10} mt={3}>
                <IconAt stroke={1.5} size="1rem" className={classes.icon} />
                <Text fz="xs" c="dimmed">
                  test@csusb.dev
                </Text>
              </Group>

              <Group wrap="nowrap" gap={10} mt={5}>
                <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
                <Text fz="xs" c="dimmed">
                  +1 (800)-LIL-BROO
                </Text>
              </Group>
            </div>
          </Group>
          {links}
        </div>
      </nav>
    </div>
  );
}

export { Profile, loader };
