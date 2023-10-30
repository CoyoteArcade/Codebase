import { ActionIcon } from '@mantine/core';
import { useToggle } from '@mantine/hooks';

import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

function FavButton({ size = 'lg' }) {
  const [isFav, favToggle] = useToggle();
  const iconSize = {
    width: '75%',
    height: '75%',
  };

  return (
    <ActionIcon
      size={size}
      variant="subtle"
      color="var(--mantine-color-red-6)"
      aria-label="Favorite"
      radius="xl"
      onClick={() => favToggle()}
    >
      {isFav ? <IconHeartFilled style={iconSize} /> : <IconHeart style={iconSize} />}
    </ActionIcon>
  );
}

export default FavButton;
