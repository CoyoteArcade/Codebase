import { Box, Title, Stack, MantineProvider, rem } from '@mantine/core';
import { useContext } from 'react';

import { GamesContext } from '@/pages/Root';
import ShopGrid from './ShopGrid/ShopGrid';
import ShopCategories from './ShopCategories/ShopCategories';

import classes from './Shop.module.css';

export default function Shop({
  titleCategories = '',
  titleGrid = '',
  showGrid = true,
  showCategories = true,
  maxCategories,
}: {
  titleCategories?: string;
  titleGrid?: string;
  showGrid?: boolean;
  showCategories?: boolean;
  maxCategories?: number;
  title?: string;
}) {
  const games: any = useContext(GamesContext);

  /*
  const [games, setGameData] = useState([]);

  useEffect(() => {
      fetch('https://delightful-sombrero-slug.cyclic.app/games')
      .then(response => response.json())
      .then(data => setGameData(data))
      .catch(error => console.log(error));
  }, []);

  const main = async () => {
    const games = await getGames();
    let arrayThing = games;
    console.log(arrayThing);
    const actionGames = await getCategory('Multiplayer');
    console.log(actionGames[0]);
  };

  main();
  */

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
      <Box className={classes.shop}>
        {showCategories && (
          <Title mb={rem('30px')} order={2}>
            {titleCategories}
          </Title>
        )}
        {showCategories && <ShopCategories gameData={games} maxCategories={maxCategories} />}
        {showGrid && (
          <Title className={classes['title-grid']} order={2}>
            {titleGrid}
          </Title>
        )}

        {showGrid && <ShopGrid gameData={games} />}
      </Box>
    </MantineProvider>
  );
}
