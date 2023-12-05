import { Box, Title, rem, em } from '@mantine/core';
import { Carousel } from '@mantine/carousel';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-react';
import '@mantine/carousel/styles.css';

import { GameCardSimple, GameCard } from '@/components/GameCard/GameCard';
import classes from './CategoryRow.module.css';

function CategoryRow({
  gameData,
  category = '',
  profile = false,
}: {
  gameData: any;
  category?: any;
  profile?: boolean;
}) {
  const isMobile = useMediaQuery(`(max-width: ${em(768)}`);
  const controlSize = isMobile ? 25 : 30;
  const iconSize = isMobile ? 12 : 16;

  const games = gameData.filter((gameObj: any) => gameObj.categories.includes(category));

  const categoryGames = games.map((game: any) => (
    <Carousel.Slide key={game.id}>
      <GameCardSimple gameObj={game} />
    </Carousel.Slide>
  ));

  const profileGames = gameData.map((game: any) => (
    <Carousel.Slide key={game.id}>
      <GameCard gameObj={game} />
    </Carousel.Slide>
  ));

  return (
    <Box>
      {category !== '' && (
        <Title tt="capitalize" order={3} mb={rem('20px')}>
          {category} Games
        </Title>
      )}

      <Carousel
        classNames={classes}
        style={{ justifyContent: 'center' }}
        height="100%"
        w="100%"
        controlSize={controlSize}
        controlsOffset="xs"
        draggable={isMobile}
        nextControlIcon={<IconArrowRight style={{ width: rem(iconSize), height: rem(iconSize) }} />}
        previousControlIcon={
          <IconArrowLeft style={{ width: rem(iconSize), height: rem(iconSize) }} />
        }
        slideSize={{ base: '140px', xs: '170px', sm: '200px', md: '25%', lg: '20%' }}
        slideGap={{ base: 'md', sm: 'md', lg: 'lg' }}
        align="start"
        slidesToScroll="auto"
      >
        {profile ? profileGames : categoryGames}
      </Carousel>
    </Box>
  );
}

export default CategoryRow;
