import { useState } from 'react';
import { Textarea } from '@mantine/core';

const CHAR_LIMIT = 90;

function TextInput() {
  const [value, setValue] = useState('');
  const [charAmount, setCharAmount] = useState(value.length);
  const [errorText, setErrorText] = useState('');

  return (
    <Textarea
      label={'Brief Description'}
      description={`A simple tagline to draw in your audience (${charAmount}/${CHAR_LIMIT})`}
      value={value}
      error={errorText}
      placeholder={'The cake is a lie. Find out why by clicking on this game.'}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
      }}
      onChange={(event) => {
        if (event.currentTarget.value.length > CHAR_LIMIT) {
          setErrorText('Max Characters Reached');
        } else {
          setErrorText('');
          setValue(event.currentTarget.value);
          setCharAmount(event.currentTarget.value.length);
        }
      }}
    />
  );
}

export default TextInput;
