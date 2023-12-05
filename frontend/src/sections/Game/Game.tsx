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
  AspectRatio,
  Accordion,
  TypographyStylesProvider,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { IconThumbUpFilled } from '@tabler/icons-react';

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
  const game = games.find((game: any) => game.id === id) || {};
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  useEffect(() => {
    const fetchGameAssets = async () => {
      const response = await fetch(`https://delightful-sombrero-slug.cyclic.app/games/${id}/url`);
      const json = await response.json();
      console.log(json);
      setGameAssetLinks(json);
    };
    fetchGameAssets();
  }, [id]);

  return (
    <Container my="md">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <Box h={PRIMARY_COL_HEIGHT}>
          <Group justify="space-between" align="center">
            <Title mb="sm" order={1}>
              {game.title}
            </Title>
          </Group>
          <Text size="xl">{game.tagline}</Text>
          <Text c="dimmed" size="lg">
            {`Categories: ${game.categories.join(', ')}`}
          </Text>
          {game.platforms && (
            <Text c="dimmed" size="lg">
              {`Platforms: ${game.platforms
                .map((platform: string) => {
                  return platform[0].toUpperCase() + platform.slice(1).toLowerCase();
                })
                .join(', ')}`}
            </Text>
          )}

          <AspectRatio ratio={16 / 9}>
            <Image
              style={{ width: '100%' }}
              src={
                gameAssetLinks.images.length > 0
                  ? gameAssetLinks.images[0]
                  : `https://placehold.co/1600x900/0d94f0/FFF?text=Banner for ${game.Title}`
              }
            />
          </AspectRatio>

          <SimpleGrid cols={3}>
            {gameAssetLinks.images.length > 0
              ? gameAssetLinks.images.map((image: any, index: any) => (
                  <AspectRatio ratio={16 / 9} key={index}>
                    <Image src={image} key={index} radius="sm" />
                  </AspectRatio>
                ))
              : images.map((image, index: any) => <Image src={image} key={index} radius="sm" />)}
          </SimpleGrid>
        </Box>
        <Grid gutter="md">
          <Grid.Col>
            <Box h={SECONDARY_COL_HEIGHT}></Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box h={SECONDARY_COL_HEIGHT}>
              <Title order={3}>Platforms</Title>
              <List size="sm">
                {game.platforms.map((platform: any, index: any) => (
                  <List.Item key={index}>{platform}</List.Item>
                ))}
              </List>
            </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box h={SECONDARY_COL_HEIGHT}>
              <Title order={3}>Details</Title>
              <List size="sm">
                <List.Item>Release Date: {game.releaseDate || 'No Release Date Found'}</List.Item>
                <List.Item>Developer: {game['developer'] || 'No developer found'}</List.Item>
                <List.Item>Rating: {game.rating || '0'}</List.Item>
              </List>
            </Box>
          </Grid.Col>
          <Grid.Col span={6}>
            <Box h={SECONDARY_COL_HEIGHT}>
              <Title order={3}>Purchase</Title>
              <List size="sm">
                {gameAssetLinks.windows && (
                  <List.Item>
                    Windows: <a href={gameAssetLinks.windows}>Download</a>
                  </List.Item>
                )}
                {gameAssetLinks.mac && (
                  <List.Item>
                    Mac: <a href={gameAssetLinks.mac}>Download</a>
                  </List.Item>
                )}
                {gameAssetLinks.linux && (
                  <List.Item>
                    Linux: <a href={gameAssetLinks.linux}>Download</a>
                  </List.Item>
                )}
              </List>
            </Box>
          </Grid.Col>
        </Grid>
      </SimpleGrid>

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
      <Accordion>
        <Accordion.Item value="downloads">
          <Accordion.Control>
            <Title order={2}>Downloads</Title>
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
    </Container>
  );
}
