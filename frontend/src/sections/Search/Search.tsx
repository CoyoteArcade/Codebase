import { Link, useParams, useRouteLoaderData } from 'react-router-dom';
import { Container, Title, rem, Divider, Text } from '@mantine/core';

export function Search() {
  const games: any = useRouteLoaderData('root');
  const { query }: any = useParams();
  const filteredGames = games.filter((game: any) =>
    game.title.toLowerCase().includes(query.toLowerCase())
  );
  if (!filteredGames.length) {
    return (
      <Container size="md" p={rem('40px')}>
        <Title order={1} mt={rem('30px')} mb={rem('60px')}>
          Search Results for "{query}"
        </Title>

        <Divider my="sm" />
        <Text my={rem('30px')} fz={rem('20px')} c="dimmed">
          No Game Found
        </Text>
      </Container>
    );
  }

  return (
    <Container size="md" p={rem('40px')}>
      <Title order={1} mt={rem('30px')} mb={rem('60px')}>
        Search Results for "{query}"
      </Title>

      <Divider my="sm" />
      {filteredGames.map((game: any) => (
        <div key={game.id}>
          <Link to={`/games/${game.id}`}>
            <h2>{game.title}</h2>
          </Link>
          <p>{game.tagline}</p>
        </div>
      ))}
    </Container>
  );
}
