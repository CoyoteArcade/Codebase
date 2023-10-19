import { Menu, Button, Text, rem } from '@mantine/core';
import { IconHeart, IconUpload, IconCaretDown } from '@tabler/icons-react';
import classes from './Header.module.css';

export default function GamesMenu() {
  return (
    <Menu shadow="md" width={200} transitionProps={{ transition: 'pop', duration: 150 }}>
      <Menu.Target>
        <Button
          variant="transparent"
          className={classes.button}
          rightSection={<IconCaretDown size={20} />}
        >
          Games
        </Button>
      </Menu.Target>

      <Menu.Dropdown className={classes.dropdown}>
        <Menu.Label>My Games</Menu.Label>
        <Menu.Item leftSection={<IconUpload style={{ width: rem(14), height: rem(14) }} />}>
          My Uploads
        </Menu.Item>
        <Menu.Item leftSection={<IconHeart style={{ width: rem(14), height: rem(14) }} />}>
          My Favorites
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Extra</Menu.Label>
      </Menu.Dropdown>
    </Menu>
  );
}
