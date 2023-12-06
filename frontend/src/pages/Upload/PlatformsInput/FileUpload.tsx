import { useState, useEffect, useRef } from 'react';
import { Box, FileButton, Code, Button, Group, Text, ThemeIcon } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

const ARCHIVE_TYPES =
  'application/zip,application/x-7z-compressed,application/gzip,application/vnd.rar,application/x-zip-compressed,application/x-rar-compressed,application/x-rar';

export default function FileUpload({ file, setFile }: { file: any; setFile: any }) {
  const resetRef = useRef<() => void>(null);
  const [error, setError] = useState(false);

  const validateFile = (file: any) => {
    setError(false);

    if (ARCHIVE_TYPES.split(',').includes(file.type)) {
      setFile(file);
    } else {
      clearFile();
      setError(true);
    }
  };

  const clearFile = () => {
    setFile(null);
    setError(false);
    resetRef.current?.();
  };

  useEffect(() => {}, [file]);

  return (
    <Box>
      {/* Upload & Reset Buttons */}
      <Group justify="center">
        <FileButton resetRef={resetRef} onChange={validateFile} accept={ARCHIVE_TYPES}>
          {(props) => <Button {...props}>Upload Archive</Button>}
        </FileButton>
        <Button disabled={!file} color="red" onClick={clearFile}>
          Reset
        </Button>
      </Group>

      {/* Successful File Message */}
      {file && (
        <Group justify="center" gap={10}>
          <ThemeIcon mt="sm" size="xs" radius="xl" color="green">
            <IconCheck style={{ width: '60%', height: '60%' }} />
          </ThemeIcon>
          <Text size="md" ta="center" mt="sm">
            Game Archive: {file.name}
          </Text>
        </Group>
      )}

      {/* Invalid File Message */}
      {error && (
        <Group justify="center" gap={10}>
          <ThemeIcon mt="sm" size="xs" radius="xl" color="red">
            <IconX style={{ width: '60%', height: '60%' }} />
          </ThemeIcon>
          {/* prettier-ignore */}
          <Text size="md" ta="center" mt="sm">
            Invalid file format! Try {' '}
            <Code>.zip</Code>{' '}
            <Code>.rar</Code>{' '}
            <Code>.7z</Code>{' or '}
            <Code>.gz</Code>{' files.'}
          </Text>
        </Group>
      )}
    </Box>
  );
}
