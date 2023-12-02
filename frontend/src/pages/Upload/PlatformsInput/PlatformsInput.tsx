import { useState } from 'react';
import { Checkbox, Stack, TextInput } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faApple as Apple,
  faLinux as Linux,
  faWindows as Windows,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe as Web } from '@fortawesome/free-solid-svg-icons';

import classes from './PlatformsInput.module.css';

const LabelWeb = () => {
  return (
    <>
      {/* @ts-ignore */}
      <FontAwesomeIcon icon={Web} />
      &nbsp;&nbsp;Web-hosted
    </>
  );
};

const LabelMac = () => {
  return (
    <>
      {/* @ts-ignore */}
      <FontAwesomeIcon icon={Apple} size="lg" />
      &nbsp;&nbsp;macOS
    </>
  );
};

const LabelWindows = () => {
  return (
    <>
      {/* @ts-ignore */}
      <FontAwesomeIcon icon={Windows} />
      &nbsp;&nbsp;Windows
    </>
  );
};

const LabelLinux = () => {
  return (
    <>
      {/* @ts-ignore */}
      <FontAwesomeIcon icon={Linux} />
      &nbsp;&nbsp;Linux
    </>
  );
};

function PlatformsInput() {
  const [value, setValue] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [link, setLink] = useState('');

  return (
    <>
      <Checkbox.Group
        value={value}
        onChange={setValue}
        size="md"
        label="Platforms"
        description="Check which platforms your game supports"
        required
        error={error}
        classNames={classes}
      >
        <Stack mt="xs">
          <Checkbox value="Windows" label={<LabelWindows />} />
          <Checkbox value="macOS" label={<LabelMac />} />
          <Checkbox value="Linux" label={<LabelLinux />} />
          <Checkbox value="Web" label={<LabelWeb />} />
        </Stack>
        <TextInput
          type="url"
          label="Hosted Link"
          c={value.includes('Web') ? '' : 'dimmed'}
          required={value.includes('Web')}
          disabled={!value.includes('Web')}
          value={link}
          placeholder="https://coyotegame.io/"
          onChange={(event) => setLink(event.currentTarget.value)}
          mt="xs"
        />
      </Checkbox.Group>
    </>
  );
}

export default PlatformsInput;
