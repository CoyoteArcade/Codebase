import { Box } from '@mantine/core';

import CategorySelect from './CategorySelect';
import { TitleInput, TaglineInput } from './TextInput';
import DescriptionEditor from './TextEditor';
import PlatformsInput from './CheckboxInput';

import classes from './Upload.module.css';

function Upload() {
  return (
    <Box className={classes.root}>
      <TitleInput />
      <TaglineInput />
      <CategorySelect />
      <PlatformsInput />
      <DescriptionEditor />
    </Box>
  );
}

export default Upload;
