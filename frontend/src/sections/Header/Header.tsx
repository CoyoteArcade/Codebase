import { Flex, Button } from '@mantine/core';

import Logo from '../../components/Logo/Logo';
import SearchBar from '../../components/SearchBar/SearchBar';
import GamesButton from './HeaderGamesButton';
import CartButton from './HeaderCartButton';

import classes from './Header.module.css';

export default function Header() {
  return (
    <>
      <Flex className={classes.wrapper}>
        <Logo />

        {/* Button-Row Left-Side */}
        <Flex className={`${classes['button-row']} ${classes['button-row-left']}`}>
          <Button variant="transparent" className={classes.button}>
            Home
          </Button>
          <GamesButton />
          <Button variant="transparent" className={classes.button}>
            Upload
          </Button>
          <Button variant="transparent" className={classes.button}>
            About
          </Button>
        </Flex>

        <SearchBar className={classes['search-bar']} />

        {/* Button-Row Right-Side */}
        <Flex className={`${classes['button-row']} ${classes['button-row-right']}`}>
          <CartButton />
          <Button variant="transparent" className={classes.button}>
            Login
          </Button>
          <Button variant="transparent" className={classes.button}>
            Register
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
