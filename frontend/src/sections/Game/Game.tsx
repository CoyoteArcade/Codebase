import { useParams, useRouteLoaderData } from 'react-router-dom';

import {
  Container,
  Grid,
  SimpleGrid,
  rem,
  Box,
  List,
  Image,
  ThemeIcon,
  Title,
  Skeleton,
  Text,
  Group,
  Stack,
  AspectRatio,
  Accordion,
  LoadingOverlay,
  TypographyStylesProvider,
  Button,
} from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { IconShoppingBagPlus, IconThumbUpFilled } from '@tabler/icons-react';

import { AuthContext } from '@/utilities/auth/AuthContext';
import { getVideoId } from '@/utilities/video/embedYoutube';
import PlatformIcon from '@/components/GameCard/PlatformIcon/PlatformIcon';
import classes from './Game.module.css';

const PRIMARY_COL_HEIGHT = rem(500);
const catPics = [
  'https://placekitten.com/1920/1084',
  'https://placekitten.com/1920/1083',
  'https://placekitten.com/1920/1082',
  'https://placekitten.com/1920/1085',
];

export function Game() {
  const [gameAssetLinks, setGameAssetLinks] = useState({
    message: '',
    images: [],
    windows: '',
    mac: '',
    linux: '',
  } as any);

  const games: any = useRouteLoaderData('root');
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const game = games.find((game: any) => game.id === id) || {};

  const createImageSkeletons = (num: number) => {
    const imageSkeletons = [];
    for (let i = 0; i < num; i++) {
      const skeleton = (
        <AspectRatio ratio={16 / 9} key={i}>
          <Skeleton animate={false} key={i} radius="sm" />
        </AspectRatio>
      );
      imageSkeletons.push(skeleton);
    }
    return imageSkeletons;
  };

  const Downloads = () => {
    return (
      <Skeleton visible={loading} height={loading ? 150 : '100%'} width={loading ? 320 : '100%'}>
        <Stack>
          {gameAssetLinks.windows || gameAssetLinks.mac || gameAssetLinks.linux ? (
            <List listStyleType="none">
              {gameAssetLinks.windows && (
                <List.Item>
                  <Group>
                    {gameAssetLinks.windows && (
                      <PlatformIcon key={'windows'} platform={'windows'} />
                    )}
                    <Text size="lg">
                      <a href={gameAssetLinks.windows} onClick={handlePurchase}>
                        Download for Windows
                      </a>
                    </Text>
                  </Group>
                </List.Item>
              )}

              {gameAssetLinks.mac && (
                <List.Item>
                  <Group>
                    {gameAssetLinks.mac && <PlatformIcon key={'mac'} platform={'mac'} />}
                    <Text size="lg">
                      <a href={gameAssetLinks.mac} onClick={handlePurchase}>
                        Download for macOS
                      </a>
                    </Text>
                  </Group>
                </List.Item>
              )}
              {gameAssetLinks.linux && (
                <List.Item>
                  <Group>
                    {gameAssetLinks.linux && <PlatformIcon key={'linux'} platform={'linux'} />}{' '}
                    <Text size="lg">
                      <a href={gameAssetLinks.linux} onClick={handlePurchase}>
                        Download for Linux
                      </a>
                    </Text>
                  </Group>
                </List.Item>
              )}
            </List>
          ) : (
            <Text c="dimmed">No Downloads Available...</Text>
          )}
        </Stack>
      </Skeleton>
    );
  };

  useEffect(() => {
    const fetchGameAssets = async () => {
      const response = await fetch(`https://codebase-ty4d.onrender.com/games/${id}/url`);
      const json = await response.json();
      console.log(json);
      setGameAssetLinks(json);
      setLoading(false);
    };
    fetchGameAssets();
  }, [id]);

  const handlePurchase = (event: any) => {
    if (user) {
      fetch(
        `https://codebase-ty4d.onrender.com/profile/${(user as any).uid}/purchases/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ itemId: id, action: 'add' }),
        }
      )
        .then((res) => res)
        .then((json) => {
          console.log(json);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Container my="md" size="lg">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        {/* GAME DETAILS */}
        <Box aria-label="game details">
          {/* Title */}
          <Title mb="sm" order={1}>
            {game.title}
          </Title>

          {/* Tagline */}
          <Text size="lg" mb="xs">
            {game.tagline}
          </Text>

          {/* Developer */}
          {game.developer && (
            <Text c="dimmed" size="md">
              {`Developer: ${game.developer}`}
            </Text>
          )}
          {/* Categories */}
          <Text c="dimmed" size="md">
            {`Categories: ${game.categories.join(', ')}`}
          </Text>
          {/* Platforms */}
          {game.platforms && (
            <Text c="dimmed" size="md">
              {`Platforms: ${game.platforms
                .map((platform: string) => {
                  return platform[0].toUpperCase() + platform.slice(1).toLowerCase();
                })
                .join(', ')}`}
            </Text>
          )}
          {/* Release Date */}
          {game.releaseDate && (
            <Text c="dimmed" size="md">
              {`Release Date: ${game.releaseDate}`}
            </Text>
          )}

          {/* Ratings */}
          <Group gap="xs" my="xs">
            <ThemeIcon variant="light" color="green">
              <IconThumbUpFilled style={{ width: '70%', height: '70%' }} />
            </ThemeIcon>
            <Text>{game.rating}</Text>
          </Group>

          {/* Purchase Button */}
          <Button mt="md" color="green" leftSection={<IconShoppingBagPlus size={20} />}>
            Buy Now
          </Button>

          {/* Downloads */}
          <Box my={50} aria-label="downloads">
            <Title mb={20} order={2}>
              Downloads
            </Title>
            <Downloads />
          </Box>
        </Box>

        {/* Images and Video */}
        <Box>
          <SimpleGrid cols={1}>
            <SimpleGrid cols={2}>
              {gameAssetLinks.images.length > 0
                ? gameAssetLinks.images.map((image: any, index: any) => (
                    <AspectRatio ratio={16 / 9} key={index}>
                      <Image src={image} key={index} radius="sm" />
                    </AspectRatio>
                  ))
                : loading &&
                  catPics.map((image, index: any) => (
                    <AspectRatio ratio={16 / 9} key={index}>
                      <Image src={image} key={index} radius="sm" />
                      <LoadingOverlay
                        visible={loading}
                        zIndex={1000}
                        overlayProps={{ radius: 'sm', blur: 1 }}
                      />
                    </AspectRatio>
                  ))}
              {!loading && createImageSkeletons(4 - gameAssetLinks.images.length)}
            </SimpleGrid>
            {game.video && (
              <AspectRatio ratio={16 / 9}>
                <iframe
                  src={`https://www.youtube.com/embed/${getVideoId(game.video)}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </AspectRatio>
            )}
          </SimpleGrid>
        </Box>
      </SimpleGrid>

      <Box my="xl">
        {/* Description */}
        {game.description && (
          <Accordion defaultValue="description">
            <Accordion.Item value="description">
              <Accordion.Control>
                <Title order={2}>Description</Title>
              </Accordion.Control>
              <Accordion.Panel>
                <Box className={classes.description} px="md" style={{ borderRadius: '5px' }}>
                  <TypographyStylesProvider p="0">
                    {/* @ts-ignore */}
                    <div dangerouslySetInnerHTML={{ __html: game.description }} />
                  </TypographyStylesProvider>
                </Box>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        )}
      </Box>
    </Container>
  );
}
