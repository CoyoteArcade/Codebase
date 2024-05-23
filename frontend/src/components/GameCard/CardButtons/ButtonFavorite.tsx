import { ActionIcon } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconHeart,
  IconHeartFilled,
  IconHeartPlus,
  IconHeartX,
  IconLogin2,
} from '@tabler/icons-react';

import classes from './ButtonFavorite.module.css';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/utilities/auth/AuthContext';

function FavoriteButton({ gameID, isFavorite }: any) {
  const { user }: any = useContext(AuthContext);
  const navigate = useNavigate();
  const [favorited, favoriteToggle] = useToggle();

  useEffect(() => {
    if (isFavorite) {
      favoriteToggle();
    }
  }, [isFavorite]);
  // useEffect(() => {
  //   if (user) {
  //     fetch(`https://codebase-ty4d.onrender.com/profile/${user.uid}`)
  //       .then((res) => res.json())
  //       .then((json) => {
  //         if(json.favorites.includes(gameID)) {
  //           favoriteToggle();
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, []);

  const handleClick = (event: any) => {
    if (user && !favorited) {
      const body = {
        itemId: gameID,
        action: 'add',
      };
      console.log('body', JSON.stringify(body), body);
      fetch(`https://codebase-ty4d.onrender.com/profile/${user.uid}/favorites/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
        .then((res) => res)
        .then((json) => {
          console.log(json);
          console.log(event.target);
          notifications.show({
            message: 'Added to favorites!',
            color: 'green',
            icon: <IconHeartPlus style={{ width: '20px', height: '20px' }} />,
            loading: false,
            autoClose: 1500,
            withCloseButton: true,
            withBorder: true,
          });
          favoriteToggle();
        })
        .catch((err) => console.log(err));
    } else if (user && favorited) {
      const removeBodyObj = {
        itemId: gameID,
        action: 'remove',
      };
      console.log('body', removeBodyObj);
      fetch(`https://codebase-ty4d.onrender.com/profile/${user.uid}/favorites/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(removeBodyObj),
      })
        .then((res) => res)
        .then((json) => {
          console.log(json);
          notifications.show({
            message: 'Removed from favorites',
            color: 'red',
            icon: <IconHeartX style={{ width: '20px', height: '20px' }} />,
            loading: false,
            autoClose: 1500,
            withCloseButton: true,
            withBorder: true,
          });
          favoriteToggle();
        })
        .catch((err) => console.log(err));
    } else {
      notifications.show({
        id: 'login',
        message: 'Please login to add favorites',
        color: 'yellow',
        icon: (
          <IconLogin2
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            onClick={() => {
              navigate('/login');
              notifications.hide('login');
            }}
          />
        ),
        loading: false,
        autoClose: 2000,
        withCloseButton: true,
        withBorder: true,
      });
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
