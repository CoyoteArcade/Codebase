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
  Text,
  Group,
  Stack,
  AspectRatio,
  Accordion,
  TypographyStylesProvider,
} from '@mantine/core';
import { useContext, useEffect, useState } from 'react';
import { IconThumbUpFilled } from '@tabler/icons-react';

import { AuthContext } from '@/utilities/auth/AuthContext';
import PlatformIcon from '@/components/GameCard/PlatformIcon/PlatformIcon';
import classes from './Game.module.css';

const PRIMARY_COL_HEIGHT = rem(500);
const images = [
  'https://placekitten.com/250/167',
  'https://placekitten.com/250/168',
  'https://placekitten.com/249/167',
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
  const game = games.find((game: any) => game.id === id) || {};

  useEffect(() => {
    const fetchGameAssets = async () => {
      const response = await fetch(`https://delightful-sombrero-slug.cyclic.app/games/${id}/url`);
      const json = await response.json();
      console.log(json);
      setGameAssetLinks(json);
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
    <Container my="md">
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
          <Group gap="xs">
            <ThemeIcon variant="light" color="green">
              <IconThumbUpFilled style={{ width: '70%', height: '70%' }} />
            </ThemeIcon>
            <Text>{game.rating}</Text>
          </Group>
        </Box>
        <Box>Hi</Box>
      </SimpleGrid>

      {/* Description */}
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

      {/* Downloads */}
      <Accordion>
        <Accordion.Item value="downloads">
          <Accordion.Control>
            <Title order={2}>Downloads</Title>
          </Accordion.Control>
          <Accordion.Panel>
            <Box>
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
                        {gameAssetLinks.mac && <PlatformIcon key={'Apple'} platform={'Apple'} />}{' '}
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
                        {gameAssetLinks.linux && <PlatformIcon key={'Linux'} platform={'Linux'} />}{' '}
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
            </Box>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
}
