import { Button, Indicator } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import classes from './Header.module.css';

export default function CartButton() {
  const cartDisabled = true;

  return (
    <Button
      className={classes.button}
      disabled={cartDisabled}
      variant="transparent"
      leftSection={
        <Indicator
          position="top-start"
          label="0"
          radius="xl"
          size="16"
          color={cartDisabled ? 'var(--mantine-color-teal-1)' : 'var(--mantine-color-teal-6'}
        >
          <IconShoppingCart size={25} />
        </Indicator>
      }
    >
      Cart
    </Button>
  );
}
