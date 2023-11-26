import { Box } from '@mantine/core';

import CategorySelect from './CategorySelect';
import TextEditor from './TextEditor';

import classes from './Upload.module.css';

function Upload() {
  return (
    <Box className={classes.root}>
      <CategorySelect />
      <Box maw="900px">
        <TextEditor />
      </Box>
    </Box>
  );
}

export default Upload;
