import { useState } from 'react';
import { Box, Group, Text, SimpleGrid, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone';

import ImageWithMenu from './ImageWithMenu';

import classes from './ImageDropzone.module.css';

export default function ImageDropzone(props: Partial<DropzoneProps>) {
  const [files, setFiles] = useState<FileWithPath[]>([]);

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    const handleDelete = () => {
      // @ts-ignore
      setFiles(files.toSpliced(index, 1));
    };

    return <ImageWithMenu key={index} src={imageUrl} index={index} handleDelete={handleDelete} />;
  });

  return (
    <Box w="800px">
      <Dropzone
        style={{ border: '1px solid var(--mantine-color-default-border)' }}
        onDrop={(newFiles: any) => {
          setFiles([...files, ...newFiles].slice(0, 4));
          console.log('accepted files', files);
        }}
        onReject={(files: any) => console.log('rejected files', files)}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        disabled={previews.length >= 4}
        className={previews.length >= 4 ? classes.disabled : ''}
        {...props}
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
              Attach as many files as you like, each file should not exceed 5mb
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
