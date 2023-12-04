import { useState, useContext, useEffect } from 'react';
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

function Profile() {
  const [active, setActive] = useState('User info');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const { user }: any = useContext(AuthContext);

  async function getProfile() {
    if (user) {
      const profileResponse = await fetch(
        `https://delightful-sombrero-slug.cyclic.app/profile/${user.uid}`
      );
      const profileJson = await profileResponse.json();
      setProfile(profileJson);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile != null) {
      setLoading(false);
      console.log(profile);
    }
  }, [profile]);

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
      <div></div>
    </div>
  );
}

export { Profile };
