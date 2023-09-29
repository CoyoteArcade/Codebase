import { Button, Indicator } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import classes from './Header.module.css';

export default function CartButton() {
  return (
    <>
      <Button
        className={classes.button}
        variant="transparent"
        leftSection={
          <Indicator
            position="top-start"
            label="5"
            radius="xl"
            size="16"
            color="var(--mantine-color-teal-6)"
          >
            <IconShoppingCart size={25} />
          </Indicator>
        }
      >
        Cart
      </Button>
    </>
  );
}
