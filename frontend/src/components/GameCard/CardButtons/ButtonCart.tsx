import { ActionIcon } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

import { IconShoppingCartPlus, IconShoppingCartFilled } from '@tabler/icons-react';

function CartButton({ size = 'lg', disabled = false }) {
  const [inCart, cartToggle] = useToggle();
  const iconSize = {
    width: '65%',
    height: '65%',
  };

  return (
    <ActionIcon
      size={size}
      variant={inCart ? 'filled' : 'default'}
      onClick={() => cartToggle()}
      color="green"
      aria-label="Cart"
      radius="xl"
      disabled={disabled}
    >
      {inCart ? (
        <IconShoppingCartFilled style={iconSize} />
      ) : (
        <IconShoppingCartPlus style={iconSize} />
      )}
    </ActionIcon>
  );
}

export default CartButton;
