import { Link, useNavigate } from 'react-router-dom';
import {
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Group,
  Anchor,
  Center,
  Box,
  rem,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft, IconCheck, IconX } from '@tabler/icons-react';

import classes from './ForgotPassword.module.css';
import { useState } from 'react';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setError('');
    setEmail(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  const handleSubmit = (event: any) => {
    if (email === '') {
      setError('Please enter an email');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    event.preventDefault();
    const notificationId = notifications.show({
      message: 'Attempting to send link to reset password...',
      loading: true,
      autoClose: false,
      withCloseButton: false,
      withBorder: true,
    });
    fetch('https://codebase-ty4d.onrender.com/passwordreset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        notifications.update({
          id: notificationId,
          message: `A password reset link has been sent to email: ${email}`,
          color: 'green',
          icon: <IconCheck />,
          loading: false,
          autoClose: 3000,
          withCloseButton: true,
          withBorder: true,
        });
        navigate('/login');
      })
      .catch((error) => {
        // console.log(error);
        notifications.update({
          id: notificationId,
          message: 'Failed to send link to reset password! Please try again.',
          color: 'red',
          icon: <IconX />,
          loading: false,
          autoClose: 3000,
          withCloseButton: true,
          withBorder: true,
        });
      });
  };

  return (
    <Box className={classes.root}>
      <Box className={classes['forgot-password-container']}>
        <Title className={classes.title} ta="center">
          Forgot your password?
        </Title>
        <Text c="dimmed" fz="sm" ta="center">
          Enter your email to get a reset link
        </Text>

        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput
            error={error}
            label="Your email"
            placeholder="me@csusb.dev"
            id="reset-email"
            type="email"
            required
            value={email}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
          />
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor c="dimmed" size="sm" className={classes.control} component={Link} to="/login">
              <Center inline>
                <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                <Box ml={5}>Back to the login page</Box>
              </Center>
            </Anchor>
            <Button className={classes.control} onClick={handleSubmit}>
              Reset password
            </Button>
          </Group>
        </Paper>
      </Box>
    </Box>
  );
}
