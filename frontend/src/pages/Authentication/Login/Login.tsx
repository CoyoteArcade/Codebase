import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Group,
  Button,
  Box,
  rem,
  ThemeIcon,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconEye, IconEyeOff, IconCheck, IconX } from '@tabler/icons-react';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import classes from './Login.module.css';
import { AuthContext } from '@/utilities/auth/AuthContext';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const storedUser = localStorage.getItem('coyoteArcadeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleChange = (event: any) => {
    if (event.target.id === 'email') {
      setEmail(event.target.value);
    } else if (event.target.id === 'password') {
      setPassword(event.target.value);
    } else {
      console.log('Error: handleChange()');
    }
  };

  const handleLogin = async () => {
    let response = {};
    const notificationId = notifications.show({
      message: 'Attempting to login...',
      loading: true,
      autoClose: false,
      withCloseButton: false,
      withBorder: true,
    });
    try {
      const request = await fetch('https://delightful-sombrero-slug.cyclic.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      response = await request.json();
      if ((response as any).message === 'Signed in') {
        notifications.update({
          id: notificationId,
          message: 'Login Successful!',
          color: 'green',
          icon: <IconCheck />,
          loading: false,
          autoClose: 3000,
          withCloseButton: true,
          withBorder: true,
        });
        setUser((response as any).user);
        const { email, displayName, uid } = (response as any).user;
        const stringifiedUser = JSON.stringify({ email, displayName, uid });
        localStorage.setItem('coyoteArcadeUser', stringifiedUser);
        navigate('/');
      } else {
        notifications.update({
          id: notificationId,
          message: 'Login Failed! Please try again.',
          color: 'red',
          icon: <IconX />,
          loading: false,
          autoClose: 3000,
          withCloseButton: true,
          withBorder: true,
        });
        setUser(null);
      }
    } catch (error) {
      console.log('error', error);
      response = { error: error };
      notifications.update({
        id: notificationId,
        message: 'Login Failed! Please try again.',
        color: 'red',
        icon: <IconX />,
        loading: false,
        autoClose: 3000,
        withCloseButton: true,
        withBorder: true,
      });
      setUser(null);
    }
    console.log('response', response);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes['login-container']}>
        <Title ta="center" className={classes.title}>
          Welcome back! {user ? (user as any).displayName : 'Guest'}
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component={Link} to="/register">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Email"
            id="email"
            placeholder="you@csusb.dev"
            required
            value={email}
            onChange={handleChange}
          />
          <PasswordInput
            classNames={{ visibilityToggle: classes['visibility-toggle'] }}
            id="password"
            label="Password"
            required
            mt="md"
            visibilityToggleButtonProps={{ 'aria-label': 'Toggle password visibility' }}
            visibilityToggleIcon={({ reveal }) =>
              reveal ? (
                <ThemeIcon variant="light">
                  <IconEye style={{ width: rem('17px'), height: rem('17px') }} />
                </ThemeIcon>
              ) : (
                <ThemeIcon color="default" variant="subtle">
                  <IconEyeOff style={{ width: rem('17px'), height: rem('17px') }} />
                </ThemeIcon>
              )
            }
            onChange={handleChange}
            value={password}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component={Link} size="sm" to="/forgot-password">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" onClick={handleLogin}>
            Log in
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
