import { Card, Image, Text, Badge, Group, Stack, AspectRatio, em, px } from '@mantine/core';
import { useMediaQuery, useElementSize } from '@mantine/hooks';

import ButtonCart from './CardButtons/ButtonCart';
import ButtonFav from './CardButtons/ButtonFav';

import classes from './GameCard.module.css';

function GameCard({ gameObj }: any) {
  const isMobile = useMediaQuery(`(max-width: ${em(768)}`);

  /***** Card Variable Settings *****/
  const { id } = gameObj;
  const title = gameObj.Title;
  const description = gameObj.Description;
  let genres = [...gameObj.Category];

  /** GAME TITLE */
  const titleHeight = 2;

  // eslint-disable-next-line
  const { ref, width, height } = useElementSize(); // Used for 'mb' style prop

  /** GAME BANNER */
  const aspectRatio = 16 / 10;
  const bannerFilled = true;

  /** BADGES */
  const badgeSize = isMobile ? 'xs' : 'md';
  // const priceText = gameObj.price > 0 ? `$${gameObj.price}` : 'Free';
  genres = genres.slice(0, 2).map((genre = '') => (
    <Badge size={badgeSize} color="grey" variant="light">
      {genre}
    </Badge>
  ));

  /** GAME BODY/DESCRIPTION */
  const descHeight = { mobile: 3, desktop: 4 };

  /** ACTION BUTTONS */
  const buttonSize = isMobile ? 'lg' : 'xl';
  //---- Cart Action
  const cartDisabled = gameObj.price <= 0;

  return (
    <Card className={classes.card} shadow="lg" radius="md" withBorder>
      {/* GAME BANNER */}
      <Card.Section>
        <AspectRatio ratio={aspectRatio} className={classes['card-banner']}>
          <Image
            className={classes['card-banner-img']}
            src={`https://placehold.co/1600x900/457EAC/FFF?text=${title}`}
            alt={title}
            w={bannerFilled ? '100%' : 'auto'}
            loading="lazy"
          />
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
            {`${title}`}
          </Text>

          {/* PRICE BADGE */}
          {/* <Badge
            className={classes['card-content-upper-price']}
            size={badgeSize}
            color="dark"
            variant="light"
          >
            {priceText}
          </Badge> */}
        </Group>

        {/* --Lower Content-- */}
        {/* GENRE BADGES */}
        <Group gap="xs" wrap="wrap">
          {genres}
        </Group>

        {/* DESCPIPTION */}
        <Text
          className={classes['card-content-body']}
          c="dimmed"
          lineClamp={isMobile ? descHeight.mobile : descHeight.desktop}
        >
          {description}
        </Text>

        {/* ACTION BUTTONS */}
        <Group justify="space-between" wrap="nowrap">
          {/* Fav Action */}
          <ButtonFav size={buttonSize} />
          {/* Cart Action */}
          <ButtonCart size={buttonSize} disabled={cartDisabled} />
        </Group>
      </Stack>
    </Card>
  );
}

export default GameCard;
