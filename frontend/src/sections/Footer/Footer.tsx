import {
  Anchor, Group, Container, ActionIcon, rem,
} from '@mantine/core';
import { IconBrandGithub } from '@tabler/icons-react';

import { NavLink } from 'react-router-dom';
import Logo from '../../components/Logo/Logo';
import classes from './Footer.module.css';

const GITHUB_URL = 'https://github.com/CoyoteArcade/Codebase';

const links = [
  { link: '/', label: 'Home' },
  { link: '/about', label: 'About' },
  { link: '/games', label: 'Games' },
];

function Footer() {
  const items = links.map((link) => (
    <Anchor
      component={NavLink}
      c="dimmed"
      key={link.label}
      to={link.link}
      lh={1}
      // onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <Group>
          <Logo />
          <ActionIcon
            hiddenFrom="xs"
            size="lg"
            variant="default"
            radius="xl"
            href={GITHUB_URL}
            component="a"
            target="_blank"
          >
            <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
          </ActionIcon>
        </Group>

        <Group className={classes.links}>{items}</Group>

        <ActionIcon
          visibleFrom="xs"
          size="lg"
          variant="default"
          radius="xl"
          href={GITHUB_URL}
          component="a"
          target="_blank"
        >
          <IconBrandGithub style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        </ActionIcon>
      </Container>
    </footer>
  );
}

export default Footer;
