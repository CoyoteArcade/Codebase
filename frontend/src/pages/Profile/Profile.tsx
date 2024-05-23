import { useState, useContext, useEffect } from 'react';
import { useRouteLoaderData } from 'react-router-dom';
import { Box, Flex, UnstyledButton, Title, Divider, Group, Avatar, Text } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { IconHeart, IconDeviceGamepad, IconShoppingBag } from '@tabler/icons-react';

import { AuthContext } from '@/utilities/auth/AuthContext';
import GameGrid from '@/components/GameGrid/GameGrid';

import classes from './Profile.module.css';
import coyoteavatar from '@/assets/coyoteavatar.png';

const data = [
  { link: 'uploads', label: 'Uploads', icon: IconDeviceGamepad },
  { link: 'purchases', label: 'Purchases', icon: IconShoppingBag },
  { link: 'favorites', label: 'Favorites', icon: IconHeart },
];

function Profile() {
  const [active, setActive] = useState('Uploads');
  const [profile, setProfile]: [profile: any, setProfile: any] = useState({});
  const [uploads, setUploads] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const uploadsScroll = useScrollIntoView<HTMLDivElement>({
    offset: 80,
    duration: 0,
  });
  const purchasesScroll = useScrollIntoView<HTMLDivElement>({
    offset: 80,
    duration: 0,
  });
  const favoritesScroll = useScrollIntoView<HTMLDivElement>({
    offset: 80,
    duration: 0,
  });

  const { user }: any = useContext(AuthContext);

  const games: any = useRouteLoaderData('root');

  async function getProfile() {
    if (user) {
      const profileResponse = await fetch(
        `https://codebase-ty4d.onrender.com/profile/${user.uid}`
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
      data-active={item.label === active || undefined}
      className={classes.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        if (item.link === 'uploads') {
          uploadsScroll.scrollIntoView();
        } else if (item.link === 'purchases') {
          purchasesScroll.scrollIntoView();
        } else if (item.link === 'favorites') {
          favoritesScroll.scrollIntoView();
        }
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <Box ml="md" visibleFrom="xs" component="span">
        {item.label}
      </Box>
    </UnstyledButton>
  ));

  const NavBar = () => {
    return (
      <Box component="nav" className={classes.navbar} visibleFrom="xxs">
        <div className={classes.navbarMain}>
          <Group className={classes.header} justify="space-between">
            <Avatar visibleFrom="xs" src={coyoteavatar} size={120} radius="md" />
            <Avatar hiddenFrom="xs" src={coyoteavatar} size={30} radius="md" />
            <Box visibleFrom="xs" p={10}>
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
      </Box>
    );
  };

  return (
    <Flex style={{ flexWrap: 'nowrap' }} align="flex-start" w="100vw">
      <NavBar />
      <Box className={classes.profile} style={{ flex: '1' }}>
        <Box className={classes.section} my={30} w="100%">
          <Title
            className={classes.title}
            id="uploads"
            ref={uploadsScroll.targetRef}
            my={10}
            order={2}
          >
            Uploads
          </Title>
          {uploadedGames.length !== 0 ? (
            <GameGrid gameData={uploadedGames} />
          ) : (
            <Text className={classes.notfound} c="dimmed">
              'No Uploaded Games Found...'
            </Text>
          )}
        </Box>
        <Box className={classes.section} my={30}>
          <Title
            className={classes.title}
            id="purchases"
            ref={purchasesScroll.targetRef}
            my={10}
            order={2}
          >
            Purchases
          </Title>
          {purchasedGames.length !== 0 ? (
            <GameGrid gameData={purchasedGames} />
          ) : (
            <Text className={classes.notfound} c="dimmed">
              'No Purchased Games Found...'
            </Text>
          )}
        </Box>
        <Box className={classes.section} my={30}>
          <Title
            className={classes.title}
            id="favorites"
            ref={favoritesScroll.targetRef}
            my={10}
            order={2}
          >
            Favorites
          </Title>
          {favoritedGames.length !== 0 ? (
            <GameGrid gameData={favoritedGames} />
          ) : (
            <Text className={classes.notfound} c="dimmed">
              'No Favorited Games Found...'
            </Text>
          )}
        </Box>
      </Box>
    </Flex>
  );
}

export default Profile;
