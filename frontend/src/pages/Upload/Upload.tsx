/*
TODO:
- Fix upload functionality
- Add a loading spinner to the upload button while the game is being uploaded
- Add a success notification when the game is successfully uploaded
- Add an error notification when the game fails to upload
- Add a redirect to the home page after the game is uploaded successfully
- might be error with game upload calls, refactor a bit to make sure it works
*/
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Stack, Title, Button, Text,
  Textarea,
} from '@mantine/core';
import { useScrollIntoView } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useForm, isNotEmpty } from '@mantine/form';
import { IconCheck, IconX } from '@tabler/icons-react';

import { AuthContext } from '@/utilities/auth/AuthContext';
// import { uploadFile } from '@/api';
import { TitleInput, TaglineInput, VideoInput } from './TextInput';
import CategorySelect from './CategorySelect';
import PlatformsInput from './PlatformsInput/PlatformsInput';
import ImageDropzone from './ImageDropzone/ImageDropzone';

import classes from './Upload.module.css';
import RestController from '@/utilities/api/restController';

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
  const { user } = useContext(AuthContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const restController = RestController.getInstance();

  const form = useForm<FormValues>({
    initialValues: {
      id: '', // todo
      developer: '', // todo
      title: '',
      tagline: '',
      description: 'Insert game description here',
      categories: [],
      platforms: [],
      instructions: 'Insert download and install instructions here',
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

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true);
    const notificationId = notifications.show({
      message: 'Attempting to upload game...',
      loading: true,
      autoClose: false,
      withCloseButton: false,
      withBorder: true,
    });
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
    try {
      const response = await restController.post<any>('/games', firestoreGameData);
      console.log( "data from gameAdd function", response);
      const imageFiles = firestoreGameFiles.images;
      const gameFiles = firestoreGameFiles.files.filter((file: any) => file.platform !== 'web');
  
      const imageUploadPromises = imageFiles.map((image: any) => console.log(image, `images/${response.gameID}/${image.name}`));
  
      const gameUploadPromises = gameFiles.map((file: any) => console.log(
        file.file,
        `gameFiles/${response.gameID}/${file.platform}/${file.file.name}`,
      ));
  
      Promise.all(imageUploadPromises)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
  
      Promise.all(gameUploadPromises)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
  
      notifications.update({
        id: notificationId,
        message: 'Game uploaded successfully!',
        color: 'green',
        icon: <IconCheck />,
        loading: false,
        autoClose: 3000,
        withCloseButton: true,
        withBorder: true,
      });
      try {
        const json = await restController.post<any>(`/games/${response.gameID}/purchase`, { itemId: response.gameID, action: 'add' });
        console.log(json);
      } catch (error) {
        console.error('failed to upload game', error);
      } finally {
        setIsSubmitting(false);
        navigate('/');
      }
    } catch (error) {
      console.error('failed to upload game', error);
      notifications.update({
        id: notificationId,
        message: 'An error occurred while uploading your game! Please try again.',
        color: 'red',
        icon: <IconX />,
        loading: false,
        autoClose: 3000,
        withCloseButton: true,
        withBorder: true,
      });
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
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

        <Stack m="0 auto" w="100%" maw={500} gap={40}>
          {/* Title */}
          <Box ref={titleScroll.targetRef}>
            <TitleInput {...form.getInputProps('title')} />
          </Box>

          {/* Categories */}
          <Box ref={categoriesScroll.targetRef}>
            <CategorySelect {...form} />
          </Box>

          {/* Tagline */}
          <TaglineInput {...form.getInputProps('tagline')} />

          {/* Video */}
          <VideoInput {...form.getInputProps('video')} />

          {/* Platforms */}
          <Box ref={platformsScroll.targetRef}>
            <PlatformsInput {...form} />
          </Box>

        {/* Images */}
        <Box w="100%" maw={700} ref={imagesScroll.targetRef} m="0 auto">
          <Box mb="xs">
            <Title order={3}>
              Images
              {' '}
              <Box component="span" c="var(--mantine-color-error)">
                *
              </Box>
            </Title>
            <Text c="dimmed">The first (top left-most) image will be used as the game&apos;s cover</Text>
          </Box>
          <ImageDropzone {...form} />
        </Box>

        {/* Description */}
        <Box w="100%" maw={1000}>
          <Title order={3} mb="xs">
            Game Page Description
          </Title>
          <Textarea {...form.getInputProps('description')} />
        </Box>

        {/* Download & Install Instructions */}
        <Box w="100%" maw={1000}>
          <Title order={3} mb="xs">
            Download & Install Instructions
          </Title>
          <Textarea {...form.getInputProps('instructions')} />
        </Box>

        {/* Upload Button */}
        <Button size="lg" m="0 auto" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Uploading...' : 'UPLOAD'}
        </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default Upload;
