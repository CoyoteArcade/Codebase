import { TextInput, TextInputProps, ActionIcon, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';

import classes from './SearchBar.module.css';

export default function InputWithButton(props: TextInputProps) {
  return (
    <TextInput
      className={classes['search-bar']}
      radius="md"
      size="lg"
      placeholder="Search games"
      rightSectionWidth={42}
      leftSection={<IconSearch className={classes['magnify-icon']} />}
      rightSection={
        <ActionIcon size={32} radius="lg" variant="outline" className={classes['arrow-icon']}>
          <IconArrowRight
            style={{
              width: rem(18),
              height: rem(18),
            }}
            stroke={3}
          />
        </ActionIcon>
      }
      {...props}
    />
  );
}
