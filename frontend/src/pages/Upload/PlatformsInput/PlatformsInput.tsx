import { useState, useEffect } from 'react';
import { Box, Checkbox, Stack, TextInput } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faApple as Apple,
  faLinux as Linux,
  faWindows as Windows,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe as Web } from '@fortawesome/free-solid-svg-icons';

import FileUpload from './FileUpload';
import { uploadFormActions } from '../UploadFormActions';

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

function PlatformsInput(props: any) {
  const [platformNames, setPlatformNames] = useState<string[]>([]);
  const [platforms, setPlatforms] = useState<any[]>([]);

  const [windowsArchive, setWindowsArchive] = useState({});
  const [macArchive, setMacArchive] = useState({});
  const [linuxArchive, setLinuxArchive] = useState({});

  const [windowsLink, setWindowsLink] = useState('');
  const [macLink, setMacLink] = useState('');
  const [linuxLink, setLinuxLink] = useState('');
  const [hostedLink, setHostedLink] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    let result: any = [];

    platformNames.map((name) => {
      let platform;
      switch (name) {
        case 'windows':
          platform = { name: name, archive: windowsArchive, link: windowsLink };
          break;
        case 'mac':
          platform = { name: name, archive: macArchive, link: macLink };
          break;
        case 'linux':
          platform = { name: name, archive: linuxArchive, link: linuxLink };
          break;
        case 'web':
          platform = { name: name, archive: {}, link: hostedLink };
          break;
        default:
          platform = undefined;
      }

      if (platform !== undefined) {
        result.push(platform);
      }
    });

    setPlatforms(result);
  }, [platformNames]);

  return (
    <Checkbox.Group
      value={platformNames}
      onChange={setPlatformNames}
      size="md"
      label="Platforms"
      description="Check which platforms your game supports"
      required
      error={error}
      classNames={classes}
    >
      <Stack mt="xs" gap="sm">
        <Checkbox value="windows" label={<LabelWindows />} />
        {platformNames.includes('windows') && <FileUpload />}
        <Checkbox value="mac" label={<LabelMac />} />
        {platformNames.includes('mac') && <FileUpload />}
        <Checkbox value="linux" label={<LabelLinux />} />
        {platformNames.includes('linux') && <FileUpload />}
        <Checkbox value="web" label={<LabelWeb />} onClick={() => setHostedLink('')} />
        {platformNames.includes('web') && (
          <TextInput
            type="url"
            size="md"
            label="Hosted Link"
            required={platformNames.includes('web')}
            value={hostedLink}
            placeholder="https://coyotegame.io/"
            onChange={(event) => setHostedLink(event.currentTarget.value)}
          />
        )}
      </Stack>
    </Checkbox.Group>
  );
}

export default PlatformsInput;
