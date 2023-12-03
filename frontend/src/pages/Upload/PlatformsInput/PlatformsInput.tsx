import { useState, useEffect } from 'react';
import { Box, Checkbox, Stack, TextInput, Divider } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faApple as Apple,
  faLinux as Linux,
  faWindows as Windows,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe as Web } from '@fortawesome/free-solid-svg-icons';

import FileUpload from './FileUpload';

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

  const [windowsArchive, setWindowsArchive] = useState<File | null>(null);
  const [macArchive, setMacArchive] = useState<File | null>(null);
  const [linuxArchive, setLinuxArchive] = useState<File | null>(null);

  const [windowsLink, setWindowsLink] = useState('');
  const [macLink, setMacLink] = useState('');
  const [linuxLink, setLinuxLink] = useState('');
  const [hostedLink, setHostedLink] = useState('');

  useEffect(() => {
    let result: object[] = [];
    platformNames.map((name) => {
      switch (name) {
        case 'web':
          result.push({ name: name, archive: null, link: hostedLink });
          break;
        case 'windows':
          if (windowsArchive !== null) {
            result.push({ name: name, archive: windowsArchive, link: '' });
          }
          break;
        case 'mac':
          if (macArchive !== null) {
            result.push({ name: name, archive: macArchive, link: '' });
          }
          break;
        case 'linux':
          if (linuxArchive !== null) {
            result.push({ name: name, archive: linuxArchive, link: '' });
          }
          break;
      }
    });

    props.setFieldValue('platforms', result);
  }, [windowsArchive, macArchive, linuxArchive, hostedLink]);

  useEffect(() => {
    props.clearFieldError('platforms');
  }, [platformNames]);

  return (
    <Checkbox.Group
      value={platformNames}
      onChange={setPlatformNames}
      size="md"
      label="Platforms"
      description="Check which platforms your game supports"
      required
      classNames={classes}
      error={props.getInputProps('platforms').error}
    >
      <Stack mt="xs" gap="sm">
        <Checkbox value="windows" label={<LabelWindows />} />
        {platformNames.includes('windows') && (
          <>
            <Box mb={10}>
              <FileUpload file={windowsArchive} setFile={setWindowsArchive} />
            </Box>
            <Divider />
          </>
        )}
        <Checkbox value="mac" label={<LabelMac />} />
        {platformNames.includes('mac') && (
          <>
            <Box mb={10}>
              <FileUpload file={macArchive} setFile={setMacArchive} />
            </Box>
            <Divider />
          </>
        )}
        <Checkbox value="linux" label={<LabelLinux />} />
        {platformNames.includes('linux') && (
          <>
            <Box mb={10}>
              <FileUpload file={linuxArchive} setFile={setLinuxArchive} />
            </Box>
            <Divider />
          </>
        )}
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
