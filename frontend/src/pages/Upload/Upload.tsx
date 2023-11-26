import { Box } from '@mantine/core';

import CategorySelect from './CategorySelect';
import TextInput from './TextInput';
import DescriptionEditor from './TextEditor';

import classes from './Upload.module.css';

function Upload() {
  return (
    <Box className={classes.root}>
      <CategorySelect />
      <TextInput />
      <DescriptionEditor />
    </Box>
  );
}

export default Upload;
