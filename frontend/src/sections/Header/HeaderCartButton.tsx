import { Button, Indicator } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import classes from './Header.module.css';

export default function CartButton({ disabled }: any) {
  return (
    <Button
      className={classes.button}
      disabled={disabled}
      variant="transparent"
      leftSection={
        <Indicator
          position="top-start"
          label="0"
          radius="xl"
          size="16"
          color={disabled ? 'var(--mantine-color-teal-1)' : 'var(--mantine-color-teal-6'}
        >
          <IconShoppingCart size={25} />
        </Indicator>
      }
    >
      Cart
    </Button>
  );
}
