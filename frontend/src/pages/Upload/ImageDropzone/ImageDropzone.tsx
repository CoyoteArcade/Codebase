import { useState, useEffect } from 'react';
import { Box, Group, Text, SimpleGrid, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';

import ImageWithMenu from './ImageWithMenu';

import classes from './ImageDropzone.module.css';

export default function ImageDropzone(props: any) {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    const handleDelete = () => {
      // @ts-ignore
      setFiles(files.toSpliced(index, 1));
    };

    return <ImageWithMenu key={index} src={imageUrl} index={index} handleDelete={handleDelete} />;
  });

  useEffect(() => {
    props.setFieldValue('images', files);
    props.clearFieldError('images');
  }, [files]);

  return (
    <Box w="800px">
      {props.errors.images && <Text c="red">{props.errors.images}</Text>}
      <Dropzone
        style={{ border: '1px solid var(--mantine-color-default-border)' }}
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

          <div>
            <Text size="xl" inline>
              Drag images here or click to select files
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Add up to 4 images, each image should not exceed 5 mb
            </Text>
          </div>
        </Group>
      </Dropzone>
      <SimpleGrid cols={2} mt={previews.length > 0 ? 'xl' : 0}>
        {previews}
      </SimpleGrid>
    </Box>
  );
}
