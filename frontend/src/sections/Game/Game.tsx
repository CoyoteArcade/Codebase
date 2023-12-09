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
} from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { IconThumbUpFilled } from '@tabler/icons-react';

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

  useEffect(() => {
    const fetchGameAssets = async () => {
      const response = await fetch(`https://delightful-sombrero-slug.cyclic.app/games/${id}/url`);
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
        `https://delightful-sombrero-slug.cyclic.app/profile/${(user as any).uid}/purchases/update`,
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
        <Box>
          <Group justify="space-between" align="center">
            <Title mb="sm" order={1}>
              {game.title}
            </Title>
          </Group>
          <Text size="lg" mb="xs">
            {game.tagline}
          </Text>
          {game.developer && (
            <Text c="dimmed" size="md">
              {`Developer: ${game.developer}`}
            </Text>
          )}
          <Text c="dimmed" size="md">
            {`Categories: ${game.categories.join(', ')}`}
          </Text>
          {game.platforms && (
            <Text c="dimmed" size="md">
              {`Platforms: ${game.platforms
                .map((platform: string) => {
                  return platform[0].toUpperCase() + platform.slice(1).toLowerCase();
                })
                .join(', ')}`}
            </Text>
          )}
          {game.releaseDate && (
            <Text c="dimmed" size="md">
              {`Release Date: ${game.releaseDate}`}
            </Text>
          )}
          <Group gap="xs" my="xs">
            <ThemeIcon variant="light" color="green">
              <IconThumbUpFilled style={{ width: '70%', height: '70%' }} />
            </ThemeIcon>
            <Text>{game.rating}</Text>
          </Group>
        </Box>
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
                <Box
                  component="iframe"
                  id="ytplayer"
                  src={`https://www.youtube.com/embed/${getVideoId(game.video)}`}
                  style={{ border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </AspectRatio>
            )}
          </SimpleGrid>
        </Box>
      </SimpleGrid>

      <Box my="xl">
        {/* Downloads */}
        {(gameAssetLinks.windows || gameAssetLinks.mac || gameAssetLinks.linux) && (
          <Accordion defaultValue="downloads">
            <Accordion.Item value="downloads">
              <Accordion.Control>
                <Title order={2}>Downloads</Title>
              </Accordion.Control>
              <Accordion.Panel>
                <Box>
                  <Skeleton visible={loading} height={loading ? 100 : '100%'}>
                    <Stack>
                      <List listStyleType="none">
                        {gameAssetLinks.windows && (
                          <List.Item>
                            <Group>
                              {gameAssetLinks.windows && (
                                <PlatformIcon key={'Windows'} platform={'Windows'} />
                              )}{' '}
                              <Text size="lg">
                                {' '}
                                Windows:{' '}
                                <a href={gameAssetLinks.windows} onClick={handlePurchase}>
                                  Download
                                </a>
                              </Text>
                            </Group>
                          </List.Item>
                        )}

                        {gameAssetLinks.mac && (
                          <List.Item>
                            <Group>
                              {gameAssetLinks.mac && (
                                <PlatformIcon key={'Apple'} platform={'Apple'} />
                              )}{' '}
                              <Text size="lg">
                                {' '}
                                macOS:{' '}
                                <a href={gameAssetLinks.mac} onClick={handlePurchase}>
                                  Download
                                </a>
                              </Text>
                            </Group>
                          </List.Item>
                        )}
                        {gameAssetLinks.linux && (
                          <List.Item>
                            <Group>
                              {gameAssetLinks.linux && (
                                <PlatformIcon key={'Linux'} platform={'Linux'} />
                              )}{' '}
                              <Text size="lg">
                                {' '}
                                Linux:{' '}
                                <a href={gameAssetLinks.linux} onClick={handlePurchase}>
                                  Download
                                </a>
                              </Text>
                            </Group>
                          </List.Item>
                        )}
                      </List>
                    </Stack>
                  </Skeleton>
                </Box>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        )}

        {/* Description */}
        {game.description && (
          <Accordion>
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

        {/* Download & Install Instructions */}
        {game.instructions && (
          <Accordion>
            <Accordion.Item value="instructions">
              <Accordion.Control>
                <Title order={2}>Download & Install Instructions</Title>
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
