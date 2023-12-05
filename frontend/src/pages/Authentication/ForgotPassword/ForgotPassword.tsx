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
import { IconArrowLeft } from '@tabler/icons-react';

import classes from './ForgotPassword.module.css';
import { useState } from 'react';

export function ForgotPassword() {

  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    fetch('https://delightful-sombrero-slug.cyclic.app/passwordreset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          }),
    })
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      window.alert('A password reset link has been sent to ' + email);
      navigate('/login');
    })
    .catch(error => {
      // console.log(error);
      window.alert('Something went wrong. Please try again.');
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
          <TextInput label="Your email" placeholder="me@csusb.dev" id="reset-email" required value={email} onChange={handleChange}/>
          <Group justify="space-between" mt="lg" className={classes.controls}>
            <Anchor c="dimmed" size="sm" className={classes.control} component={Link} to="/login">
              <Center inline>
                <IconArrowLeft style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                <Box ml={5}>Back to the login page</Box>
              </Center>
            </Anchor>
            <Button className={classes.control} onClick={handleSubmit}>Reset password</Button>
          </Group>
        </Paper>
      </Box>
    </Box>
  );
}
