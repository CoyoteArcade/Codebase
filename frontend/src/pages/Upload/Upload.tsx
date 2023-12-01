import { Box } from '@mantine/core';

import CategorySelect from './CategorySelect';
import { TitleInput, TaglineInput } from './TextInput';
import DescriptionEditor from './TextEditor';
import PlatformsInput from './PlatformsInput';
import ImageDropzone from './Dropzone';

import classes from './Upload.module.css';

function Upload() {
  return (
    <Box className={classes.root}>
      <TitleInput />
      <TaglineInput />
      <CategorySelect />
      <PlatformsInput />
      <ImageDropzone />
      <DescriptionEditor />
    </Box>
  );
}

export default Upload;
