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

import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './ButtonFavorite.module.css';
import { AuthContext } from '@/utilities/auth/AuthContext';
import RestController from '@/utilities/api/restController';

function FavoriteButton({ gameID, isFavorite }: any) {
  const { user }: any = useContext(AuthContext);
  const navigate = useNavigate();
  const [favorited, favoriteToggle] = useToggle();
  const restController = RestController.getInstance();

  useEffect(() => {
    if (isFavorite) {
      favoriteToggle();
    }
  }, [isFavorite]);

  const handleClick = async (event: any) => {
    if (user && !favorited) {
      const body = {
        itemId: gameID,
        action: 'add',
      };
      console.log('body', JSON.stringify(body), body);
      try {
        const json = await restController.post<any>(`/profile/${user.uid}/favorites/update`, body);
        console.log(json);
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
      } catch (err) {
        console.log("user favorite error", err);
      } 
    } else if (user && favorited) {
      const removeBodyObj = {
        itemId: gameID,
        action: 'remove',
      };
      console.log('body', removeBodyObj);
      try {
        const json = await restController.post<any>(`/profile/${user.uid}/favorites/update`, removeBodyObj);
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
      } catch (err) {
        console.log("user unfavorite error",err);
      }
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
