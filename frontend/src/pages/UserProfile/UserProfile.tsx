import { useState } from 'react';
import { Group, Code, Avatar, Text } from '@mantine/core';
import {
  IconMail,
  IconHeart,
  IconDeviceGamepad,
  IconCreditCard,
  IconUserCircle,
  IconPhoneCall, 
  IconAt
} from '@tabler/icons-react';
import classes from './UserProfile.module.css';
import Userinfo from './UserInfo.module.css';
import Coyote from '@/assets/coyote.png'

const data = [
  //{ link: '', label: 'Email', icon: IconMail },
  //{ link: '', label: 'User info', icon: IconUserCircle },
  { link: '', label: 'Favorites', icon: IconHeart },
  { link: '', label: 'Game uploads', icon: IconDeviceGamepad },
  { link: '', label: 'Previous purchases', icon: IconCreditCard },
];

export default function NavbarSimple() {
  const [active, setActive] = useState('User info');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));


  return (
    <div style = {{display: 'flex'}}>
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          {/* <Code fw={700}>v3.1.2</Code> */}
          <Avatar
          src={Coyote}
          size={94}
          radius="md"
        />
        <div>
        <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            Software engineer
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            Jordi Servin
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              test@csusb.dev
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              +1 (800)-LIL-BROO
            </Text>
          </Group>
        </div>
        </Group>
        {links}
      </div>
    </nav>
    <div>
    <Group wrap="nowrap">
        {/* <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          size={94}
          radius="md"
        /> */}
        {/* <div>
          <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
            Software engineer
          </Text>

          <Text fz="lg" fw={500} className={classes.name}>
            Jordi Servin
          </Text>

          <Group wrap="nowrap" gap={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              test@csusb.dev
            </Text>
          </Group>

          <Group wrap="nowrap" gap={10} mt={5}>
            <IconPhoneCall stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              +1 (800)-LIL-BROO
            </Text>
          </Group>
        </div> */}
      </Group>
    </div>
    </div>
  );
}
