import { useParams, useRouteLoaderData } from 'react-router-dom';

import {
  Container,
  Grid,
  SimpleGrid,
  rem,
  Box,
  List,
  Image,
  Card,
  Title,
  Group,
  AspectRatio,
} from '@mantine/core';
import { useEffect, useState } from 'react';

const PRIMARY_COL_HEIGHT = rem(500);
const images = [
  'https://placekitten.com/250/167',
  'https://placekitten.com/250/168',
  'https://placekitten.com/249/167',
];

export function Game() {

  const [gameAssetLinks, setGameAssetLinks] = useState({message:"", images:[], windows:"", mac:"", linux:"" } as any);

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
    }
    fetchGameAssets();
  }, [id]);

  return (
    <>
      <Container my="md">
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Box h={PRIMARY_COL_HEIGHT}>
            <Card withBorder shadow="sm" radius="md">
              <Group justify="space-between" align="center">
                <Title mb="sm" order={3}>
                  {game.title}
                </Title>
              </Group>

              <Card.Section>
                <AspectRatio ratio={16 / 9}>
                  <Image style={{ width: '100%' }}
                    src={gameAssetLinks.images.length > 0 ? gameAssetLinks.images[0] : `https://placehold.co/1600x900/0d94f0/FFF?text=Banner for ${game.Title}`}
                  />
                </AspectRatio>
              </Card.Section>

              <Card.Section inheritPadding mt="sm" pb="md">
                <SimpleGrid cols={3}>
                  {gameAssetLinks.images.length > 0 ? gameAssetLinks.images.map((image: any) => (
                    <AspectRatio ratio={16 / 9}>
                      <Image src={image} key={image} radius="sm" />
                    </AspectRatio>
                  )) : images.map((image) => (
                    <Image src={image} key={image} radius="sm" />
                  ))}
                </SimpleGrid>
              </Card.Section>
            </Card>
          </Box>
          <Grid gutter="md">
            <Grid.Col>
              <Box h={SECONDARY_COL_HEIGHT}>
                <video controls src="https://placehold.co/420x220.mp4?text=Video+Trailer"></video>
              </Box>
            </Grid.Col>
            <Grid.Col span={6}>
              <Box h={SECONDARY_COL_HEIGHT}>
                <Title order={3}>System Requirements</Title>
                <List size="sm">
                  <List.Item>Platforms: {game.platforms || 'Unknown'}</List.Item>
                </List>
              </Box>
            </Grid.Col>
            <Grid.Col span={6}>
              <Box h={SECONDARY_COL_HEIGHT}>
                <Title order={3}>Details</Title>
                <List size="sm">
                  <List.Item>Description: {game.description || 'Unknown'}</List.Item>
                  <List.Item>Release Date: {game.releaseDate || 'Unknown'}</List.Item>
                  <List.Item>Developer: {game['Publisher/Developer'] || 'Unknown'}</List.Item>
                  <List.Item>Rating: {game.rating || 'Unknown'}</List.Item>
                </List>
              </Box>
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Container>
    </>
  );
}
