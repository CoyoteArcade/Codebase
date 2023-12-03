import { useState, useEffect, useRef } from 'react';
import { Box, FileButton, Button, Group, Text } from '@mantine/core';

const ARCHIVE_TYPES =
  'application/gzip,application/zip,application/vnd.rar,application/x-7z-compressed';

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  useEffect(() => {}, [file]);

  return (
    <Box mb={30}>
      <Group justify="center">
        <FileButton resetRef={resetRef} onChange={setFile} accept={ARCHIVE_TYPES}>
          {(props) => <Button {...props}>Upload Archive</Button>}
        </FileButton>
        <Button disabled={!file} color="red" onClick={clearFile}>
          Reset
        </Button>
      </Group>

      {file && (
        <Text size="sm" ta="center" mt="sm">
          Game Archive: {file.name}
        </Text>
      )}
    </Box>
  );
}
