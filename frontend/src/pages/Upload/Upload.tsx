import { Box } from '@mantine/core';

import CategorySelect from './CategorySelect';
import { TitleInput, TaglineInput } from './TextInput';
import DescriptionEditor from './TextEditor';

import classes from './Upload.module.css';

function Upload() {
  return (
    <Box className={classes.root}>
      <TitleInput />
      <TaglineInput />
      <CategorySelect />
      <DescriptionEditor />
    </Box>
  );
}

export default Upload;
