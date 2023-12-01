import { useState } from 'react';
import { Checkbox, Stack } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faApple as Apple,
  faLinux as Linux,
  faWindows as Windows,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe as Web } from '@fortawesome/free-solid-svg-icons';

import classes from './CheckboxInput.module.css';

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

  return (
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
        <Checkbox value="Web" label={<LabelWindows />} />
        <Checkbox value="Windows" label={<LabelMac />} />
        <Checkbox value="macOS" label={<LabelLinux />} />
        <Checkbox value="Linux" label={<LabelWeb />} />
      </Stack>
    </Checkbox.Group>
  );
}

export default PlatformsInput;
