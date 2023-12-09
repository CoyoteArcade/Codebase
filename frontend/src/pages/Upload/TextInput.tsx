import { useState } from 'react';
import { TextInput, Textarea } from '@mantine/core';

const TAGLINE_LIMIT = 90;
const TITLE_LIMIT = 50;

function TitleInput(props: any) {
  return (
    <Textarea
      withAsterisk
      size="md"
      label="Title"
      description="The name of your game creation"
      autosize
      maxLength={TITLE_LIMIT}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      }}
      {...props}
    />
  );
}

function TaglineInput(props: any) {
  return (
    <Textarea
      size="md"
      autosize
      label={'Tagline'}
      maxLength={TAGLINE_LIMIT}
      description="An engaging hook to draw in your audience"
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      }}
      {...props}
    />
  );
}

function VideoInput(props: any) {
  return (
    <TextInput
      type="url"
      size="md"
      label={'Video'}
      description="Showcase gameplay with a quick (YouTube) video"
      placeholder="https://www.youtube.com/watch?v=YWp6qjevHH0"
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      }}
      {...props}
    />
  );
}

export { TaglineInput, TitleInput, VideoInput };
