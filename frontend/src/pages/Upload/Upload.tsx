import { Box, Container, Stack, Title, Button, Text } from '@mantine/core';
import { useForm, isNotEmpty } from '@mantine/form';
import { useScrollIntoView } from '@mantine/hooks';

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
  instructions: string;
  images: object[];
  video: string;
}

function Upload() {
  const form = useForm<FormValues>({
    initialValues: {
      id: '', // todo
      developer: '', // todo
      title: '',
      tagline: '',
      description: '',
      categories: [],
      platforms: [],
      instructions: '',
      images: [],
      video: '',
    },
    validate: {
      categories: isNotEmpty('Select at least 1 category'),
      platforms: isNotEmpty('Select at least 1 platform and include a valid file or link'),
      images: isNotEmpty('Add at least 1 image'),
    },
  });

  const categoriesScroll = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });
  const platformsScroll = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });
  const imagesScroll = useScrollIntoView<HTMLDivElement>({
    offset: 60,
  });

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  const handleError = (errors: typeof form.errors) => {
    if (errors.categories) {
      categoriesScroll.scrollIntoView();
    } else if (errors.platforms) {
      platformsScroll.scrollIntoView();
    } else if (errors.images) {
      imagesScroll.scrollIntoView();
    }
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit, handleError)}>
      <Container className={classes.root}>
        <Stack m="0 auto" w={500} gap={40}>
          <TitleInput {...form.getInputProps('title')} />
          <Box ref={categoriesScroll.targetRef}>
            <CategorySelect {...form} />
          </Box>
          <TaglineInput {...form.getInputProps('tagline')} />
          <VideoInput {...form.getInputProps('video')} />
          <Box ref={platformsScroll.targetRef}>
            <PlatformsInput {...form} />
          </Box>
        </Stack>

        <Box ref={imagesScroll.targetRef} m="0 auto">
          <Box mb="xs">
            <Title order={3}>
              Images{' '}
              <Box component="span" c="red">
                *
              </Box>
            </Title>
            <Text c="dimmed">The first (top left-most) image will be used as the game's cover</Text>
          </Box>

          <ImageDropzone {...form} />
        </Box>

        <Box>
          <Title order={3} mb="xs">
            Game Page Description
          </Title>
          <TextEditor useFor="description" props={form} />
        </Box>

        <Box>
          <Title order={3} mb="xs">
            Download & Install Instructions
          </Title>
          <TextEditor useFor="instructions" props={form} />
        </Box>
        <Button type="submit">Submit</Button>
      </Container>
    </Box>
  );
}

export default Upload;
