import { Box, Container, Flex, Title } from '@mantine/core';

import CategorySelect from './CategorySelect';
import { TitleInput, TaglineInput } from './TextInput';
import TextEditor from './TextEditor/TextEditor';
import PlatformsInput from './PlatformsInput/PlatformsInput';
import ImageDropzone from './ImageDropzone/ImageDropzone';
import FileUpload from './FileUpload';

import classes from './Upload.module.css';

function Upload() {
  return (
    <Container className={classes.root}>
      <Container>
        <Flex direction="column" gap={50}>
          <TitleInput />
          <CategorySelect />
          <TaglineInput />
          <PlatformsInput />
        </Flex>
      </Container>

      <Box>
        <Title order={2} mb="xs">
          Game Page Description
        </Title>
        <TextEditor useFor="description" />
      </Box>
      <Box>
        <Title mb="xs" order={2}>
          File Upload
        </Title>
        <FileUpload />
      </Box>
      <Box>
        <Title mb="xs" order={2}>
          Images Upload
        </Title>
        <ImageDropzone />
      </Box>
      <Box>
        <Title order={2} mb="xs">
          Download & Install Instructions
        </Title>
        <TextEditor useFor="instructions" />
      </Box>
    </Container>
  );
}

export default Upload;
