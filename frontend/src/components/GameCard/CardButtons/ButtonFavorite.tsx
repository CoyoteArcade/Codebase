import { ActionIcon } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';

import classes from './ButtonFavorite.module.css';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/utilities/auth/AuthContext';

function FavoriteButton({gameID, isFavorite}:any) {

  const { user }: any = useContext(AuthContext);
  const [favorited, favoriteToggle] = useToggle();


  useEffect(() => {
    if(isFavorite) {
      favoriteToggle();
    }
  }, [isFavorite]);
  // useEffect(() => {
  //   if (user) {
  //     fetch(`https://delightful-sombrero-slug.cyclic.app/profile/${user.uid}`)
  //       .then((res) => res.json())
  //       .then((json) => {
  //         if(json.favorites.includes(gameID)) {
  //           favoriteToggle();
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, []);


  const handleClick = () => {
    if(user && !favorited) {
      const body = {
        itemId: gameID,
        action: 'add'
      }
      console.log("body",JSON.stringify(body),body);
      fetch(`https://delightful-sombrero-slug.cyclic.app/profile/${user.uid}/favorites/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then(res => res).then((json) => {
          console.log(json);
          favoriteToggle();
        })
        .catch((err) => console.log(err));

    } else if(user && favorited) {
      const removeBodyObj = {
        itemId: gameID,
        action: 'remove'
      }
      console.log("body",removeBodyObj);
      fetch(`https://delightful-sombrero-slug.cyclic.app/profile/${user.uid}/favorites/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(removeBodyObj),
      })
        .then((res) => res)
        .then((json) => {
          console.log(json);
          favoriteToggle();
        })
        .catch((err) => console.log(err));
    } else {
      console.log("please sign in to favorite");
    }
  };

  return (
    <ActionIcon
      classNames={favorited ? { root: classes.filled } : { root: classes.default }}
      aria-label="Add to favorites"
      onClick={handleClick}
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
