import { useState, useContext, useEffect } from 'react';
import { NavLink, useRouteLoaderData } from 'react-router-dom';
import { Box, UnstyledButton, Title, Divider, Group, Avatar, Text, Anchor } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { IconHeart, IconDeviceGamepad, IconShoppingBag } from '@tabler/icons-react';

import { AuthContext } from '@/utilities/auth/AuthContext';
import GameGrid from '@/components/GameGrid/GameGrid';
import classes from './Profile.module.css';
import coyoteavatar from '@/assets/coyoteavatar.png';

const data = [
  { link: 'uploads', label: 'My Uploads', icon: IconDeviceGamepad },
  { link: 'purchases', label: 'My Purchases', icon: IconShoppingBag },
  { link: 'favorites', label: 'My Favorites', icon: IconHeart },
];

function Profile() {
  const [active, setActive] = useState('User info');
  const [profile, setProfile]: [profile: any, setProfile: any] = useState({});
  const [uploads, setUploads] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const uploadsScroll = useScrollIntoView<HTMLDivElement>({
    offset: 60,
    duration: 0,
  });
  const purchasesScroll = useScrollIntoView<HTMLDivElement>({
    offset: 60,
    duration: 0,
  });
  const favoritesScroll = useScrollIntoView<HTMLDivElement>({
    offset: 60,
    duration: 0,
  });

  const { user }: any = useContext(AuthContext);

  const games: any = useRouteLoaderData('root');

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
      const { uploads, favorites, purchases } = profile;
      setUploads(uploads);
      setFavorites(favorites);
      setPurchases(purchases);
      setLoading(false);
      console.log(profile);
    }
  }, [profile]);

  function getUploads() {
    let result: any = [];
    games.filter((game: any) => {
      // @ts-ignore
      if (uploads.includes(game.id)) {
        result.push(game);
      }
    });

    return result;
  }

  function getFavorites() {
    let result: any = [];
    games.filter((game: any) => {
      // @ts-ignore
      if (favorites.includes(game.id)) {
        result.push(game);
      }
    });

    return result;
  }

  function getPurchases() {
    let result: any = [];
    games.filter((game: any) => {
      // @ts-ignore
      if (purchases.includes(game.id)) {
        result.push(game);
      }
    });

    return result;
  }

  const uploadedGames = getUploads();
  const favoritedGames = getFavorites();
  const purchasedGames = getPurchases();

  const links = data.map((item) => (
    <UnstyledButton
      w="100%"
      className={classes.link}
      key={item.label}
      onClick={() => {
        if (item.link === 'uploads') {
          uploadsScroll.scrollIntoView();
        } else if (item.link === 'uploads') {
          favoritesScroll.scrollIntoView();
        } else if (item.link === 'purchases') {
          purchasesScroll.scrollIntoView();
        }
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </UnstyledButton>
  ));

  return (
    <Group align="start" wrap="nowrap" miw={320}>
      <Box>
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
      </Box>
      <Box mx={30} style={{ flex: 1 }}>
        <Box my={30} w="100%">
          <Title id="uploads" ref={uploadsScroll.targetRef} my={10} order={2}>
            Uploads
          </Title>
          {uploadedGames.length !== 0 ? (
            <GameGrid gameData={uploadedGames} />
          ) : (
            <Text c="dimmed">'No Uploaded Games Found...'</Text>
          )}
        </Box>
        <Box my={30}>
          <Title id="purchases" ref={purchasesScroll.targetRef} my={10} order={2}>
            Purchases
          </Title>
          {purchasedGames.length !== 0 ? (
            <GameGrid gameData={purchasedGames} />
          ) : (
            <Text my={10} c="dimmed">
              'No Purchased Games Found...'
            </Text>
          )}
        </Box>
        <Box my={30}>
          <Title id="favorites" ref={favoritesScroll.targetRef} my={10} order={2}>
            Favorites
          </Title>
          {favoritedGames.length !== 0 ? (
            <GameGrid gameData={favoritedGames} />
          ) : (
            <Text my={10} c="dimmed">
              'No Favorited Games Found...'
            </Text>
          )}
        </Box>
      </Box>
    </Group>
  );
}

export { Profile };
