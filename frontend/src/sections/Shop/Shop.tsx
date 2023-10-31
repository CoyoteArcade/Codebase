import { Box, Title, Stack, MantineProvider, rem } from '@mantine/core';
import { useContext } from 'react';

import { GamesContext } from '@/pages/Root';
import ShopGrid from './ShopGrid/ShopGrid';
import ShopCategories from './ShopCategories/ShopCategories';

import classes from './Shop.module.css';

export default function Shop({
  title = '',
  showGrid = true,
  showCategories = true,
  maxCategories,
}: {
  title?: string;
  showGrid?: boolean;
  showCategories?: boolean;
  maxCategories?: number;
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
        <Title order={2}>{title}</Title>
        {showCategories && <ShopCategories gameData={games} maxCategories={maxCategories} />}
        {showGrid && <ShopGrid gameData={games} />}
      </Box>
    </MantineProvider>
  );
}
