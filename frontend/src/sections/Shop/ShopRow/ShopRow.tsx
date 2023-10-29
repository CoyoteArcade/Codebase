import { MantineProvider, Box, Title, rem, em } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import '@mantine/carousel/styles.css';

import GameCardSimple from '../GameCard/GameCardSimple';

import classes from './ShopRow.module.css';

// import gameData from '../games.json';

function GameRow({ gameData, category }: any) {
  const isMobile = useMediaQuery(`(max-width: ${em(768)}`);

  const controlSize = isMobile ? 25 : 30;
  const iconSize = isMobile ? 12 : 16;

  const games = gameData.filter((gameObj: any) => {
    return gameObj.Category.includes(category);
  });

  const gameList = games.map((game: any) => (
    <Carousel.Slide>
      <GameCardSimple gameObj={game} />
    </Carousel.Slide>
  ));

  return (
    <MantineProvider
      theme={{
        components: {
          Title: Title.extend({
            classNames: {
              root: classes.heading,
            },
          }),
        },
      }}
    >
      <Box>
        <Title tt="uppercase" order={3} mb={rem('20px')}>
          {category} Games
        </Title>
        <Carousel
          classNames={classes}
          height="100%"
          w="100%"
          controlSize={controlSize}
          controlsOffset="xs"
          draggable={isMobile}
          nextControlIcon={
            <IconArrowRight style={{ width: rem(iconSize), height: rem(iconSize) }} />
          }
          previousControlIcon={
            <IconArrowLeft style={{ width: rem(iconSize), height: rem(iconSize) }} />
          }
          slideSize={{ base: '50%', xs: '33.333333%', sm: '33.333333%', md: '25%', lg: '20%' }}
          slideGap={{ base: '5', sm: 'md', lg: 'lg' }}
          align="start"
          slidesToScroll="auto"
        >
          {gameList}
        </Carousel>
      </Box>
    </MantineProvider>
  );
}

export default GameRow;
