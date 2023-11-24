import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GamesContext } from '@/pages/Root';

import {
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  rem,
  Box,
  List,
  Image,
  Card,
  Text,
  Title,
  Group,
} from '@mantine/core';

import Favorite from '@/components/GameCard/CardButtons/ButtonFavorite';

const PRIMARY_COL_HEIGHT = rem(500);
const images = [
  'https://placekitten.com/250/167',
  'https://placekitten.com/250/168',
  'https://placekitten.com/249/167',
];

export function Game() {
  const games: any = useContext(GamesContext);
  const { id } = useParams();
  const game = games.find((game: any) => game.id === id) || {};
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <>
      <Container my="md">
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Box h={PRIMARY_COL_HEIGHT}>
            <Card withBorder shadow="sm" radius="md">
              <Group justify="space-between" align="center">
                <Text mb="sm" size="sm">
                  <Title order={3}>{game.Title}</Title>
                </Text>
                <Box mb="10px">
                  <Favorite size="xl" />
                </Box>
              </Group>

              <Card.Section>
                <Image
                  src={`https://placehold.co/1600x900/0d94f0/FFF?text=Banner for ${game.Title}`}
                />
              </Card.Section>

              <Card.Section inheritPadding mt="sm" pb="md">
                <SimpleGrid cols={3}>
                  {images.map((image) => (
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

              {/* https://placehold.co/3840x2160.mp4?text=Trailer+For+ */}
            </Grid.Col>
            <Grid.Col span={6}>
              <Box h={SECONDARY_COL_HEIGHT}>
                <h3>System Requirements</h3>
                <List size="sm">
                  <List.Item>
                    Graphics: {game['System Requirements'].Graphics || 'Unknown'}
                  </List.Item>
                  <List.Item>OS: {game['System Requirements'].OS || 'Unknown'}</List.Item>
                  <List.Item>Storage: {game['System Requirements'].Storage || 'Unknown'}</List.Item>
                  <List.Item>Memory: {game['System Requirements'].Memory || 'Unknown'}</List.Item>
                  <List.Item>
                    Processor: {game['System Requirements'].Processor || 'Unknown'}
                  </List.Item>
                </List>
              </Box>
            </Grid.Col>
            <Grid.Col span={6}>
              <Box h={SECONDARY_COL_HEIGHT}>
                <h3>Details</h3>
                <List size="sm">
                  <List.Item>Description: {game.Description || 'Unknown'}</List.Item>
                  <List.Item>Release Date: {game['Release Date'] || 'Unknown'}</List.Item>
                  <List.Item>Developer: {game['Publisher/Developer'] || 'Unknown'}</List.Item>
                  <List.Item>Rating: {game.Rating || 'Unknown'}</List.Item>
                </List>
              </Box>
            </Grid.Col>
          </Grid>
        </SimpleGrid>
      </Container>
    </>
  );
}
