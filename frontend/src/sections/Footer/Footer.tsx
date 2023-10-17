import { Anchor, Group, Container, ActionIcon, rem } from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';

import Logo from '../../components/Logo/Logo';
import classes from './Footer.module.css';

const links = [
  { link: '#', label: 'Link 1' },
  { link: '#', label: 'Link 2' },
  { link: '#', label: 'Link 3' },
  { link: '#', label: 'Link 4' },
];

function Footer() {
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Logo />

        <Group className={classes.links}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}

export default Footer;
