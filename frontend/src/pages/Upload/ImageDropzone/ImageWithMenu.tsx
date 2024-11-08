import { useState, useEffect } from 'react';
import {
  AspectRatio, Box, ActionIcon, Menu, Image, rem,
} from '@mantine/core';
import { useToggle, useHover } from '@mantine/hooks';

import { IconCrop, IconPhotoX, IconDots,
} from '@tabler/icons-react';

import classes from './ImageWithMenu.module.css';

export default function ImageWithMenu({
  src,
  index,
  handleDelete,
  props,
}: {
  src: any;
  index: any;
  handleDelete: any;
  props: any;
}) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [cropped, setCropped] = useToggle([true, false]);
  const { hovered, ref } = useHover();
  // const [fullscreen, { open, close }] = useDisclosure(false);

  const handleCropped = () => setCropped();

  useEffect(() => {
    setTimeout(() => {
      props.setFieldValue(`images.${index}.cropped`, cropped);
    }, 250);
  }, [cropped]);

  return (
    <Menu
      shadow="md"
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
    >
      <Box ref={ref} className={classes['image-root']}>
        <Menu.Target ref={ref}>
          <ActionIcon
            size="md"
            className={classes.button}
            style={
                hovered || userMenuOpened ? { visibility: 'visible' } : { visibility: 'hidden' }
              }
          >
            <IconDots style={{ width: rem(20), height: rem(20) }} />
          </ActionIcon>
        </Menu.Target>

        <AspectRatio
          bg="dark"
          className={userMenuOpened ? classes['image-active'] : classes.image}
          ratio={1920 / 1080}
        >
          <Image
            className={cropped ? classes['image-cropped'] : classes['image-uncropped']}
            src={src}
            onLoad={() => URL.revokeObjectURL(src)}
          />
        </AspectRatio>
      </Box>

      <Menu.Dropdown w={135}>
        <Menu.Item
          onClick={handleCropped}
          leftSection={<IconCrop style={{ width: rem(14), height: rem(14) }} />}
        >
          Toggle Crop
        </Menu.Item>
        <Menu.Item
          onClick={handleDelete}
          color="red"
          leftSection={<IconPhotoX style={{ width: rem(14), height: rem(14) }} />}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
