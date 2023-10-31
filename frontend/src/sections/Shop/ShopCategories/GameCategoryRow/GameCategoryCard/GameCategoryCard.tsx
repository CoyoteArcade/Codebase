import { Card, Image, Text, Group, Stack, AspectRatio, em, px } from '@mantine/core';
import { useMediaQuery, useElementSize } from '@mantine/hooks';

import classes from './GameCategoryCard.module.css';
import { Link } from 'react-router-dom';

function GameCategoryCard({ gameObj }: any) {
  const isMobile = useMediaQuery(`(max-width: ${em(768)}`);

  /***** Card Variable Settings *****/
  const { id } = gameObj;
  const title = gameObj.Title;
  const description = gameObj.Description;

  /** GAME TITLE */
  const titleHeight = 2;

  // eslint-disable-next-line
  const { ref, width, height } = useElementSize(); // Used for 'mb' style prop

  /** GAME BANNER */
  const aspectRatio = 16 / 10;
  const bannerFilled = true;

  /** GAME BODY/DESCRIPTION */
  const descHeight = { mobile: 2, desktop: 3 };

  return (
    <Card
      className={`${classes.card} ${classes['card-simple']}`}
      shadow="lg"
      radius="md"
      withBorder
    >
      {/* GAME BANNER */}
      <Card.Section>
        <AspectRatio ratio={aspectRatio} className={classes['card-banner']}>
          <Link to={`/games/${id}`} className={classes['card-banner-link']}>
            <Image
              className={classes['card-banner-img']}
              src={`https://placehold.co/1600x900?text=${title}`}
              alt={title}
              w={bannerFilled ? '100%' : 'auto'}
              loading="lazy"
            />
          </Link>
        </AspectRatio>
      </Card.Section>

      {/***** CARD CONTENT *****/}
      <Stack className={classes['card-content']}>
        {/* --Upper Content-- */}
        <Group className={classes['card-content-upper']}>
          {/* GAME TITLE */}
          <Text
            className={classes['card-content-upper-title']}
            lineClamp={titleHeight}
            ref={ref}
            // mb={height > parseInt(`${px('2em')}`, 10) ? '0' : '1.5em'} // Whitespace for one-line titles only
          >
            {`${gameObj.Title}`}
          </Text>
        </Group>

        {/* --Lower Content-- */}

        {/* BODY/DESCPIPTION */}
        <Text
          className={classes['card-content-body']}
          c="dimmed"
          lineClamp={isMobile ? descHeight.mobile : descHeight.desktop}
        >
          {gameObj.Description}
        </Text>
      </Stack>
    </Card>
  );
}

export default GameCategoryCard;