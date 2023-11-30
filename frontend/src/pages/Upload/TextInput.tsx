import { useState } from 'react';
import { Textarea } from '@mantine/core';

const TAGLINE_LIMIT = 90;
const TITLE_LIMIT = 50;

function TitleInput() {
  const [value, setValue] = useState('');

  return (
    <Textarea
      size="md"
      label="Title"
      description="The name of your game creation"
      autosize
      maxLength={TITLE_LIMIT}
      onChange={(event) => {
        setValue(event.currentTarget.value);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      }}
    />
  );
}

function TaglineInput() {
  const [value, setValue] = useState('');

  return (
    <Textarea
      size="md"
      autosize
      label={'Tagline'}
      maxLength={TAGLINE_LIMIT}
      description="An engaging hook to draw in your audience"
      value={value}
      onChange={(event) => {
        setValue(event.currentTarget.value);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      }}
    />
  );
}

export { TaglineInput, TitleInput };
