import { useEffect } from 'react';
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
  Skeleton,
} from '@mantine/core';

import ButtonFavorite from './CardButtons/ButtonFavorite';
import PlatformIcon from './PlatformIcon/PlatformIcon';

import classes from './GameCard.module.css';

function GameCard({
  gameObj,
  gameImages = { id: '', urls: [] },
  isFavorite,
  loading = false,
}: any) {
  /** Game Properties */
  const { id, title, tagline } = gameObj;
  let { platforms, categories } = gameObj;

  useEffect(() => {}, []);

  /** CATEGORIES BADGES */
  categories = categories.map((category = '') => (
    <Badge key={category} classNames={{ root: classes['card-genres-badge'] }} variant="light">
      {category}
    </Badge>
  ));

  /** PLATFORM ICONS */
  platforms = platforms.map((platform = '') => <PlatformIcon key={platform} platform={platform} />);

  /** GAME BANNER */
  const aspectRatio = 16 / 9;

  return (
    <Skeleton visible={loading} height="100%" radius="md">
      <Card className={classes.card} withBorder>
        {/* GAME BANNER */}
        <Card.Section>
          <Link to={`/games/${id}`} className={classes['card-banner-link']}>
            <AspectRatio ratio={aspectRatio} className={classes['card-banner']}>
              <Image
                src={
                  gameImages.urls.length > 0
                    ? gameImages.urls[0]
                    : `https://placehold.co/1600x900/003e7a/eee`
                }
              />
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
                <Group className={classes['card-genres']}>{categories}</Group>
              </ScrollArea>
            </Stack>

            {/* TAGLINE */}
            <Text className={classes['card-description']}>{tagline}</Text>
          </Box>

          {/* Bottom Section */}
          <Group className={classes['card-inner-buttons']}>
            {/* FAVORITES BUTTON */}
            <ButtonFavorite gameID={id} isFavorite={isFavorite} />
            {/* PLATFORM ICONS */}
            <Group className={classes['card-inner-platforms']}>{platforms}</Group>
          </Group>
        </Box>
      </Card>
    </Skeleton>
  );
}

function GameCardSimple({ gameObj }: any) {
  /** Game Properties */
  const { id, title, tagline } = gameObj;

  /** GAME BANNER */
  const aspectRatio = 16 / 9;

  return (
    <Card className={classes.card} withBorder>
      {/* GAME BANNER */}
      <Card.Section>
        <Link to={`/games/${id}`} className={classes['card-banner-link']}>
          <AspectRatio ratio={aspectRatio} className={classes['card-banner']}>
            <Image src={`https://placehold.co/1600x900/003e7a/eee?text=${title}`} />
          </AspectRatio>
        </Link>
      </Card.Section>

      <Box className={classes['card-inner-main']}>
        {/* GAME TITLE */}
        <Text className={`${classes['card-title']} ${classes['card-title-simple']}`}>{title}</Text>

        {/* TAGLINE */}
        <Text className={classes['card-description']}>{tagline}</Text>
      </Box>
    </Card>
  );
}

export { GameCard, GameCardSimple };
