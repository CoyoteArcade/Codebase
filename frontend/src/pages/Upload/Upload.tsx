import { Box } from '@mantine/core';

import CategorySelect from './CategorySelect';

import classes from './Upload.module.css';

function Upload() {
  return (
    <Box className={classes.root}>
      <CategorySelect />
    </Box>
  );
}

export default Upload;
