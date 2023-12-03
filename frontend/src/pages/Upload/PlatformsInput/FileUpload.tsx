import { useState, useEffect, useRef } from 'react';
import { Box, FileButton, Button, Group, Text, ThemeIcon } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

const ARCHIVE_TYPES =
  'application/gzip,application/zip,application/vnd.rar,application/x-7z-compressed';

export default function FileUpload({ file, setFile }: { file: any; setFile: any }) {
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  useEffect(() => {}, [file]);

  return (
    <Box>
      <Group justify="center">
        <FileButton resetRef={resetRef} onChange={setFile} accept={ARCHIVE_TYPES}>
          {(props) => <Button {...props}>Upload Archive</Button>}
        </FileButton>
        <Button disabled={!file} color="red" onClick={clearFile}>
          Reset
        </Button>
      </Group>

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
    </Box>
  );
}
