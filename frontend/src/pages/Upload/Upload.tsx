import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Stack, Title, Button, Text } from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useForm, isNotEmpty } from '@mantine/form';
import { IconCheck, IconX } from '@tabler/icons-react';

import { AuthContext } from '@/utilities/auth/AuthContext';
import { uploadFile } from '@/api';
import { TitleInput, TaglineInput, VideoInput } from './TextInput';
import CategorySelect from './CategorySelect';
import PlatformsInput from './PlatformsInput/PlatformsInput';
import ImageDropzone from './ImageDropzone/ImageDropzone';
import TextEditor from './TextEditor/TextEditor';

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

const baseURL = 'https://delightful-sombrero-slug.cyclic.app';

function Upload() {
  const { user } = useContext(AuthContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

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
      title: isNotEmpty('Please enter a title'),
      categories: isNotEmpty('Select at least 1 category'),
      platforms: isNotEmpty('Select at least 1 platform and include a valid file or link'),
      images: isNotEmpty('Add at least 1 image'),
    },
  });

  const titleScroll = useScrollIntoView<HTMLDivElement>({
    offset: 60,
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
    setIsSubmitting(true);
    console.log(values);
    /*
    firestore collection: games
    fields:
      id: string
      developer: string
      categories: string[]
      platforms: string[]
      rating: number
      releaseDate: string
      tagline: string
      title: string
      video: string (url)
    cloud storage bucket: games
    fields:
      id: string
      images: file[]
      files: file[]
    folder structure:
      images: images/<gameID>/<filename>
      gameFiles:
        windows: gameFiles/<gameID>/windows/<filename>
        mac: gameFiles/<gameID>/mac/<filename>
        linux: gameFiles/<gameID>/linux/<filename>
    */

    const getDateFormatted = () => {
      const date = new Date();
      const year = date.getFullYear();
      let month: any = date.getMonth() + 1;
      let day: any = date.getDate();
      if (month < 10) {
        month = `0${month}`;
      }
      if (day < 10) {
        day = `0${day}`;
      }

      return `${month}-${day}-${year}`;
    };

    const firestoreGameData = {
      developer: (user as any).displayName,
      categories: values.categories,
      platforms: values.platforms.map((platform: any) => platform.name),
      rating: 0,
      releaseDate: getDateFormatted(),
      tagline: values.tagline,
      description: values.description,
      title: values.title,
      video: values.video,
    };

    const firestoreGameFiles = {
      images: values.images.map((image: any) => image.file),
      files: values.platforms.map((platform: any) => ({
        file: platform.archive,
        platform: platform.name,
      })),
    };

    fetch(`${baseURL}/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(firestoreGameData),
    })
      .then((res) => {
        // console.log("res from gameAdd function",res);
        return res.json();
      })
      .then((data) => {
        console.log('data from gameAdd function', data);
        const imageFiles = firestoreGameFiles.images;
        const gameFiles = firestoreGameFiles.files.filter((file: any) => file.platform !== 'web');

        const imageUploadPromises = imageFiles.map((image: any) => {
          return uploadFile(image, `images/${data.gameID}/${image.name}`);
        });

        const gameUploadPromises = gameFiles.map((file: any) => {
          return uploadFile(
            file.file,
            `gameFiles/${data.gameID}/${file.platform}/${file.file.name}`
          );
        });

        Promise.all(imageUploadPromises)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));

        Promise.all(gameUploadPromises)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));

        notifications.show({
          message: 'Game uploaded successfully!',
          color: 'green',
          icon: <IconCheck />,
          autoClose: 3000,
          withCloseButton: true,
          withBorder: true,
        });
        fetch(`${baseURL}/profile/${(user as any).uid}/uploads/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ itemId: data.gameID, action: 'add' }),
        })
          .then((res) => res)
          .then((json) => {
            console.log(json);
          })
          .catch((err) => console.log(err));
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        notifications.show({
          message: 'An error occurred while uploading your game! Please try again.',
          color: 'red',
          icon: <IconX />,
          autoClose: 3000,
          withCloseButton: true,
          withBorder: true,
        });
        setIsSubmitting(false);
      });
  };

  const handleError = (errors: typeof form.errors) => {
    if (errors.title) {
      titleScroll.scrollIntoView();
    } else if (errors.categories) {
      categoriesScroll.scrollIntoView();
    } else if (errors.platforms) {
      platformsScroll.scrollIntoView();
    } else if (errors.images) {
      imagesScroll.scrollIntoView();
    }
  };

  return (
    <Box component="form" onSubmit={form.onSubmit(handleSubmit, handleError)}>
      <Stack align="center" className={classes.root}>
        <Title order={1}>Game Upload</Title>
        <Stack m="0 auto" w={500} gap={40}>
          <Box ref={titleScroll.targetRef}>
            <TitleInput {...form.getInputProps('title')} />
          </Box>

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
        <Button size="lg" m="0 auto" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Uploading...' : 'UPLOAD'}
        </Button>
      </Stack>
    </Box>
  );
}

export default Upload;
