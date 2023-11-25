import { useRouteLoaderData } from "react-router-dom";
import { Box, Title, MantineProvider, rem } from '@mantine/core';

import GameGrid from '@/components/GameGrid/GameGrid';
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
  const games: any = useRouteLoaderData("root");

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

        {showGrid && <GameGrid gameData={games} />}
      </Box>
    </MantineProvider>
  );
}
