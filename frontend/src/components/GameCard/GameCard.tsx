import { Link } from 'react-router-dom';
import {
  Box,
  Stack,
  Card,
  AspectRatio,
  Image,
  Text,
  Badge,
  ScrollArea,
  Group,
  em,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import ButtonCart from './CardButtons/ButtonCart';
import ButtonFav from './CardButtons/ButtonFavorite';

import classes from './GameCard.module.css';

function GameCard({ gameObj }: any) {
  const isMobile = useMediaQuery(`(max-width: ${em(991)}`);

  /** Game Properties */
  const { id } = gameObj;
  const title = gameObj.Title;
  const description = gameObj.Description;
  let genres = [...gameObj.Category];

  /** GENRE BADGES */
  genres = genres.map((genre = '', idx) => (
    <Badge
      key={idx}
      classNames={{ root: classes['card-genres-badge'] }}
      color="coyote-blue"
      variant="light"
    >
      {genre}
    </Badge>
  ));

  /** GAME BANNER */
  const aspectRatio = 16 / 9;

  /** ACTION BUTTONS */
  const buttonSize = isMobile ? 'md' : 'lg';

  return (
    <Card className={classes.card} shadow="md" radius="md" padding="xs" withBorder>
      {/* GAME BANNER */}
      <Card.Section>
        <Link to={`/games/${id}`} className={classes['card-banner-link']}>
          <AspectRatio ratio={aspectRatio} className={classes['card-banner']}>
            <Image src="https://placehold.co/1600x900?text=16:9+Banner" />
          </AspectRatio>
        </Link>
      </Card.Section>

      <Box className={classes['card-inner']}>
        <Box className={classes['card-inner-main']}>
          <Group gap="xs" justify="space-between" my="xs">
            {/* GAME TITLE */}
            <Text className={classes['card-title']} lineClamp={2}>
              {title}
            </Text>

            {/* GENRE BADGES */}
            <ScrollArea
              classNames={classes}
              w="100%"
              type="hover"
              scrollbarSize={4}
              offsetScrollbars
            >
              <Group className={classes['card-genres']} gap="xs">
                {genres}
              </Group>
            </ScrollArea>
          </Group>

          {/* DESCRIPTION */}
          <Text className={classes['card-description']} c="dimmed" lineClamp={isMobile ? 3 : 4}>
            {description}
          </Text>
        </Box>

        {/* ACTION BUTTONS */}
        <Group className={classes['card-inner-buttons']} justify="space-between" wrap="nowrap">
          <ButtonFav size={buttonSize} />
          <ButtonCart size={buttonSize} />
        </Group>
      </Box>
    </Card>
  );
}

function GameCardSimple({ gameObj }: any) {
  const isMobile = useMediaQuery(`(max-width: ${em(991)}`);

  /** Game Properties */
  const { id } = gameObj;
  const title = gameObj.Title;
  const description = gameObj.Description;

  /** GAME BANNER */
  const aspectRatio = 16 / 9;

  return (
    <Card className={classes.card} shadow="md" radius="md" padding="xs" withBorder>
      {/* GAME BANNER */}
      <Card.Section>
        <Link to={`/games/${id}`} className={classes['card-banner-link']}>
          <AspectRatio ratio={aspectRatio} className={classes['card-banner']}>
            <Image src="https://placehold.co/1600x900?text=16:9+Banner" />
          </AspectRatio>
        </Link>
      </Card.Section>

      <Box className={classes['card-inner']}>
        {/* GAME TITLE */}
        <Box my="xs">
          <Text className={classes['card-title']} lineClamp={2}>
            {title}
          </Text>
        </Box>

        {/* DESCRIPTION */}
        <Text className={classes['card-description']} c="dimmed" lineClamp={isMobile ? 3 : 4}>
          {description}
        </Text>
      </Box>
    </Card>
  );
}

export { GameCard, GameCardSimple };
