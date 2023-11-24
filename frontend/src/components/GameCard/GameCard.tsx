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

import ButtonCart from './CardButtons/ButtonCart';
import ButtonFavorite from './CardButtons/ButtonFavorite';

import classes from './GameCard.module.css';

function GameCard({ gameObj }: any) {
  /** Game Properties */
  const { id } = gameObj;
  const title = gameObj.Title;
  const description = gameObj.Description;
  let genres = [...gameObj.Category];

  /** GENRE BADGES */
  genres = genres.map((genre = '', idx) => (
    <Badge key={genre} classNames={{ root: classes['card-genres-badge'] }} variant="light">
      {genre}
    </Badge>
  ));

  /** GAME BANNER */
  const aspectRatio = 16 / 9;

  return (
    <Card className={classes.card} withBorder>
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
          <Stack className={classes['card-inner-top']}>
            {/* GAME TITLE */}
            <Text className={classes['card-title']}>{title}</Text>

            {/* GENRE BADGES */}
            <ScrollArea classNames={classes} type="hover" scrollbarSize={4} offsetScrollbars>
              <Group className={classes['card-genres']}>{genres}</Group>
            </ScrollArea>
          </Stack>

          {/* DESCRIPTION */}
          <Text className={classes['card-description']}>{description}</Text>
        </Box>

        {/* ACTION BUTTONS */}
        <Group className={classes['card-inner-buttons']}>
          <ButtonFavorite />
          <ButtonCart />
        </Group>
      </Box>
    </Card>
  );
}

function GameCardSimple({ gameObj }: any) {
  /** Game Properties */
  const { id } = gameObj;
  const title = gameObj.Title;
  const description = gameObj.Description;

  /** GAME BANNER */
  const aspectRatio = 16 / 9;

  return (
    <Card className={classes.card} withBorder>
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
        <Text className={`${classes['card-title']} ${classes['card-title-simple']}`}>{title}</Text>

        {/* DESCRIPTION */}
        <Text className={classes['card-description']}>{description}</Text>
      </Box>
    </Card>
  );
}

export { GameCard, GameCardSimple };
