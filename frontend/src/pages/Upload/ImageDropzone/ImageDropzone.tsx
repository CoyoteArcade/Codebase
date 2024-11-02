import { useState, useEffect } from 'react';
import {
  Box, Group, Text, SimpleGrid, rem,
} from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import {
  Dropzone, IMAGE_MIME_TYPE, FileWithPath,
} from '@mantine/dropzone';

import ImageWithMenu from './ImageWithMenu';

import classes from './ImageDropzone.module.css';

export default function ImageDropzone(props: any) {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    const handleDelete = () => {
      setFiles(files.toSpliced(index, 1));
    };

    return (
      <ImageWithMenu
        key={index}
        src={imageUrl}
        index={index}
        handleDelete={handleDelete}
        props={props}
      />
    );
  });

  useEffect(() => {
    const result = files.map((file) => ({ file, cropped: true }));
    props.setFieldValue('images', result);
    props.clearFieldError('images');
  }, [files]);

  return (
    <Box w="100%" className={classes.root}>
      {props.errors.images && (
        <Text mb="xs" c="var(--mantine-color-error)">
          {props.errors.images}
        </Text>
      )}
      <Dropzone
        style={
          props.errors.images
            ? { border: '1px solid var(--mantine-color-error)' }
            : { border: '1px solid var(--mantine-color-default-border)' }
        }
        px={20}
        py={10}
        onDrop={(newFiles: any) => {
          setFiles([...files, ...newFiles].slice(0, 4));
        }}
        onReject={(files: any) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        maxFiles={4}
        accept={IMAGE_MIME_TYPE}
        disabled={previews.length >= 4}
        className={previews.length >= 4 ? classes.disabled : ''}
      >
        <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
          <Dropzone.Accept>
            <IconUpload
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <Box>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Add up to 4 images, each image should not exceed 5 mb
            </Text>
          </Box>
        </Group>
      </Dropzone>
      <SimpleGrid cols={2} mt={previews.length > 0 ? 'xl' : 0}>
        {previews}
      </SimpleGrid>
    </Box>
  );
}
