import { TextInput, TextInputProps, ActionIcon, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './SearchBar.module.css';

export default function InputWithButton(props: TextInputProps) {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (inputValue) {
      navigate(`/search/${inputValue}`);
      setInputValue('');
    }
  };

  return (
    <TextInput
      className={classes['search-bar']}
      radius="md"
      size="lg"
      placeholder="Search games"
      rightSectionWidth={42}
      leftSection={<IconSearch className={classes['magnify-icon']} />}
      value={inputValue}
      onChange={handleChange}
      rightSection={
        <ActionIcon size={32} radius="lg" variant="outline" className={classes['arrow-icon']} onClick={handleSearch}>
          <IconArrowRight
            style={{
              width: rem(18),
              height: rem(18),
            }}
            stroke={3}
          />
        </ActionIcon>
      }
      {...props}
    />
  );
}
