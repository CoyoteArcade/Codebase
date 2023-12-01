import { useState } from 'react';
import { AspectRatio, Menu, Image, rem } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';
import { IconArrowsMaximize, IconCrop, IconPhotoX } from '@tabler/icons-react';

import classes from './ImageWithMenu.module.css';

export default function ImageWithMenu({ src, ...props }: { src: any }) {
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  return (
    <Menu
      shadow="md"
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      {...props}
    >
      <Menu.Target>
        <AspectRatio
          className={userMenuOpened ? classes['image-active'] : classes.image}
          w={175}
          ratio={1920 / 1080}
        >
          <Image src={src} onLoad={() => URL.revokeObjectURL(src)} fit="none" w="auto" m="0 auto" />
        </AspectRatio>
      </Menu.Target>
      <Menu.Dropdown w={175}>
        <Menu.Item leftSection={<IconArrowsMaximize style={{ width: rem(14), height: rem(14) }} />}>
          View Fullscreen
        </Menu.Item>{' '}
        <Menu.Item leftSection={<IconCrop style={{ width: rem(14), height: rem(14) }} />}>
          Toggle Crop
        </Menu.Item>{' '}
        <Menu.Item
          color="red"
          leftSection={<IconPhotoX style={{ width: rem(14), height: rem(14) }} />}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
