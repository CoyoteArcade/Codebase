import { useState, useContext, useEffect } from 'react';
import { NavLink, useRouteLoaderData } from 'react-router-dom';
import { Box, Divider, Group, Avatar, Text } from '@mantine/core';
import { IconHeart, IconDeviceGamepad, IconAt, IconShoppingBag } from '@tabler/icons-react';

import { AuthContext } from '@/utilities/auth/AuthContext';
import classes from './Profile.module.css';
import coyoteavatar from '@/assets/coyoteavatar.png';

const data = [
  { link: '', label: 'My Uploads', icon: IconDeviceGamepad },
  { link: '', label: 'My Purchases', icon: IconShoppingBag },
  { link: '', label: 'My Favorites', icon: IconHeart },
];

function Profile() {
  const [active, setActive] = useState('User info');
  const [profile, setProfile]: [profile: any, setProfile: any] = useState({});
  const [uploads, setUploads] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user }: any = useContext(AuthContext);
  const games = useRouteLoaderData('root');

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
    if (Object.keys(profile).length !== 0) {
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
            <Box p="10">
              <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                {profile.uploads ? 'Developer' : 'Registered User'}
              </Text>

              <Text fz="lg" fw={500} mb={5} className={classes.name}>
                {profile.username}
              </Text>

              <Divider />

              <Group wrap="nowrap" gap={5} mt={5}>
                <Text fz="xs" c="dimmed">
                  {profile.email}
                </Text>
              </Group>
            </Box>
          </Group>
          {links}
        </div>
      </nav>
      <Box>
        Uploads
        <Box>{}</Box>
      </Box>
    </div>
  );
}

export { Profile };
