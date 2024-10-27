import { useState, useEffect } from 'react';
import {
  PillsInput, Pill, Combobox, CheckIcon, Group, useCombobox,
} from '@mantine/core';

const CATEGORIES_LIMIT = 3;

const categories = [
  'Action',
  'Adventure',
  'Card',
  'Casual',
  'Funny',
  'Fighting',
  'Horror',
  'Multiplayer',
  'Music',
  'Pet',
  'Platformer',
  'Programming',
  'Puzzle',
  'Rhythm',
  'Role-playing',
  'Racing',
  'Retro',
  'Sandbox',
  'Simulation',
  'Survival',
  'Shooter',
  'Sports',
  'Strategy',
  'Tabletop',
  'Visual Novel',
];

export default function CategorySelect(props: any) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [value, setValue] = useState<string[]>([]);

  const handleValueSelect = (val: string) => {
    setValue((current) => (current.includes(val) ? current.filter((v) => v !== val) : [...current, val]));
    setSearch('');
  };

  const handleValueRemove = (val: string) => setValue((current) => current.filter((v) => v !== val));

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const options = categories
    .filter((item) => !value.includes(item))
    .filter((item) => item.toLowerCase().includes(search.trim().toLowerCase()))
    .map((item) => (
      <Combobox.Option
        value={item}
        key={item}
        active={value.includes(item)}
        disabled={value.length >= CATEGORIES_LIMIT}
      >
        <Group gap="sm">
          {value.includes(item) ? <CheckIcon size={12} /> : null}
          <span>{item}</span>
        </Group>
      </Combobox.Option>
    ));

  useEffect(() => {
    props.setFieldValue('categories', value);
    props.clearFieldError('categories');
  }, [value]);

  return (
    <Combobox size="md" store={combobox} onOptionSubmit={handleValueSelect} withinPortal={false}>
      <Combobox.DropdownTarget>
        <PillsInput
          required
          size="md"
          description={`Choose from various game genres (${values.length}/3)`}
          onClick={() => combobox.openDropdown()}
          label="Categories"
          error={props.getInputProps('categories').error}
        >
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(value[value.length - 1]);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
          {options.length > 0 ? options : <Combobox.Empty>Nothing found...</Combobox.Empty>}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
