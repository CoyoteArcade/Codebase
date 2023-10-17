import { rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import '@mantine/carousel/styles.css';

import GameCardSimple from '../GameCard/GameCardSimple';

import classes from './ShopRow.module.css';

import games from '../games.json';

function GameRow() {
  const gameList = games.map((game) => (
    <Carousel.Slide>
      <GameCardSimple gameObj={game} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      classNames={classes}
      height="100%"
      w="100%"
      controlSize={35}
      draggable={false}
      nextControlIcon={<IconArrowRight style={{ width: rem(16), height: rem(16) }} />}
      previousControlIcon={<IconArrowLeft style={{ width: rem(16), height: rem(16) }} />}
      slideSize={{ base: '50%', xs: '33.333333%', sm: '33.333333%', md: '25%' }}
      slideGap={{ base: '5', sm: 'md', lg: 'xl' }}
      align="start"
      slidesToScroll="auto"
    >
      {gameList}
    </Carousel>
  );
}

export default GameRow;
