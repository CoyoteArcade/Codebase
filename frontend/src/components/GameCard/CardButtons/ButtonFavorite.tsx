import { ActionIcon } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

import classes from './ButtonFavorite.module.css';

function FavoriteButton() {
  const [favorited, favoriteToggle] = useToggle();

  return (
    <ActionIcon
      classNames={favorited ? { root: classes.filled } : { root: classes.default }}
      aria-label="Add to favorites"
      onClick={() => favoriteToggle()}
    >
      <IconHeartFilled
        display={favorited ? 'block' : 'none'}
        className={`${classes.icon} ${favorited ? classes.visible : classes.hidden}`}
      />
      <IconHeart
        display={favorited ? 'none' : 'block'}
        className={`${classes.icon} ${favorited ? classes.hidden : classes.visible}`}
      />
    </ActionIcon>
  );
}

export default FavoriteButton;
