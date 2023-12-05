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
} from '@mantine/core';

import ButtonCart from './CardButtons/ButtonCart';
import ButtonFavorite from './CardButtons/ButtonFavorite';
import PlatformIcon from './PlatformIcon/PlatformIcon';

import classes from './GameCard.module.css';
import { useEffect, useState } from 'react';

function GameCard({ gameObj }: any) {
  /** Game Properties */
  const { id, title } = gameObj;
  const [gameAssetLinks, setGameAssetLinks] = useState({message:"", images:[], windows:"", mac:"", linux:"" } as any);
  const description = gameObj.tagline;
  let genres = [...gameObj.categories];
  let platforms: any = ['Apple', 'Windows', 'DoesNotExist', 'Linux', 'Web'];

  useEffect(() => {
    const fetchGameAssets = async () => {
      const response = await fetch(`https://delightful-sombrero-slug.cyclic.app/games/${id}/url`);
      const json = await response.json();
      console.log(json);
      setGameAssetLinks(json);
    }
    fetchGameAssets();
  }, [id]);

  /** GENRE BADGES */
  genres = genres.map((genre = '') => (
    <Badge key={genre} classNames={{ root: classes['card-genres-badge'] }} variant="light">
      {genre}
    </Badge>
  ));

  /** PLATFORM ICONS */
  platforms = platforms.map((platform = '') => <PlatformIcon key={platform} platform={platform} />);

  /** GAME BANNER */
  const aspectRatio = 16 / 9;

  return (
    <Card className={classes.card} withBorder>
      {/* GAME BANNER */}
      <Card.Section>
        <Link to={`/games/${id}`} className={classes['card-banner-link']}>
          <AspectRatio ratio={aspectRatio} className={classes['card-banner']}>
            <Image src={gameAssetLinks.images.length > 0 ? gameAssetLinks.images[0] :`https://placehold.co/1600x900/003e7a/eee?text=${title}`} />
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
          <ButtonFavorite gameID={id}/>
          <Group className={classes['card-inner-platforms']}>
            {gameAssetLinks.windows && <PlatformIcon key={"Windows"} platform={"Windows"} />}
            {gameAssetLinks.mac && <PlatformIcon key={"Apple"} platform={"Apple"} />}
            {gameAssetLinks.linux && <PlatformIcon key={"Linux"} platform={"Linux"} />}
          </Group>
        </Group>
      </Box>
    </Card>
  );
}

function GameCardSimple({ gameObj }: any) {
  /** Game Properties */
  const { id, title } = gameObj;
  const description = gameObj.tagline;

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

        {/* DESCRIPTION */}
        <Text className={classes['card-description']}>{description}</Text>
      </Box>
    </Card>
  );
}

export { GameCard, GameCardSimple };
