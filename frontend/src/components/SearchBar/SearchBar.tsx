import { TextInput, ActionIcon, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './SearchBar.module.css';

export default function InputWithButton(props: any) {
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSearch = () => {
    if (inputValue) {
      navigate(`/search/${inputValue}`);
      props.drawerClose();
      setInputValue('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <TextInput
      className={classes['search-bar']}
      radius="md"
      size="md"
      placeholder="Search games"
      rightSectionWidth={42}
      leftSection={<IconSearch className={classes['icon-search']} />}
      value={inputValue}
      onChange={handleChange}
      onKeyDown={handleKeyPress}
      rightSection={(
        <ActionIcon size={rem(30)} radius="lg" variant="outline" onClick={handleSearch}>
          <IconArrowRight
            style={{
              width: rem(15),
              height: rem(18),
            }}
            stroke={3}
          />
        </ActionIcon>
      )}
      {...props}
    />
  );
}
