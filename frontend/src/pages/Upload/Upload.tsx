import { Box, Container, Flex, Title, Button } from '@mantine/core';
import { useForm } from '@mantine/form';

import CategorySelect from './CategorySelect';
import { TitleInput, TaglineInput, VideoInput } from './TextInput';
import TextEditor from './TextEditor/TextEditor';
import PlatformsInput from './PlatformsInput/PlatformsInput';
import ImageDropzone from './ImageDropzone/ImageDropzone';

import classes from './Upload.module.css';

export interface FormValues {
  id: string;
  developer: string;
  title: string;
  tagline: string;
  description: string;
  categories: string[];
  platforms: object[];
  platformNames: string[];
  platformArchives: object[];
  platformLinks: string[];
  images: object[];
  video: string;
}

function Upload() {
  const form = useForm<FormValues>({
    name: 'upload-form',
    initialValues: {
      id: '', // todo
      developer: '', // todo
      title: '',
      tagline: '',
      description: '',
      categories: [],
      platforms: [],
      platformNames: [],
      platformArchives: [],
      platformLinks: [],
      images: [],
      video: '',
    },
    transformValues: (values) => ({
      ...values,
      platforms: values.platformNames.map((name, idx) => {
        return {
          name: name,
          archive: values.platformArchives[idx],
          link: values.platformLinks[idx],
        };
      }),
    }),
  });

  return (
    <Container className={classes.root}>
      <Box component="form" onSubmit={form.onSubmit((values) => console.log(values))}>
        <Container>
          <Flex direction="column" gap={50}>
            <TitleInput {...form.getInputProps('title')} />
            <CategorySelect {...form.getInputProps('categories')} />
            <TaglineInput {...form.getInputProps('tagline')} />
            <PlatformsInput {...form} />
            <VideoInput {...form.getInputProps('video')} />
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
        <Button type="submit">Submit</Button>
      </Box>
    </Container>
  );
}

export default Upload;
