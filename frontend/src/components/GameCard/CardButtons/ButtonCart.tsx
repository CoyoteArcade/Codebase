import { ActionIcon } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { IconShoppingCartPlus, IconShoppingCartFilled } from '@tabler/icons-react';

import classes from './ButtonCart.module.css';

function CartButton({ disabled = false }) {
  const [inCart, cartToggle] = useToggle();

  return (
    <ActionIcon
      classNames={inCart ? { root: classes.filled } : { root: classes.default }}
      disabled={disabled}
      onClick={() => cartToggle()}
      aria-label="Add to cart"
    >
      {inCart ? (
        <IconShoppingCartFilled className={classes.icon} />
      ) : (
        <IconShoppingCartPlus className={classes.icon} />
      )}
    </ActionIcon>
  );
}

export default CartButton;
