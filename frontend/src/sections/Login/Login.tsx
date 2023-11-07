import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
import { IconEye, IconEyeOff } from '@tabler/icons-react';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import classes from './Login.module.css';

export function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event:any) => {
    if(event.target.id === 'email') {
      setEmail(event.target.value);
    } else if(event.target.id === 'password') {
      setPassword(event.target.value);
    } else {
      console.log('Error: handleChange()');
    }
  };

  const handleLogin = async () => {
    const request = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email, password: password}),
    });
    const response = await request.json();
    console.log("response", response);
  }


  return (
    <Box className={classes.root}>
      <Box className={classes['login-container']}>
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="sm" component={Link} to="/register">
            Create account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" id="email" placeholder="you@csusb.dev" required value={email} onChange={handleChange} />
          <PasswordInput
            classNames={{ visibilityToggle: classes['visibility-toggle'] }}
            id="password"
            label="Password"
            required
            mt="md"
            visibilityToggleButtonProps={{ 'aria-label': 'Toggle password visibility' }}
            visibilityToggleIcon={({ reveal }) =>
              reveal ? (
                <ThemeIcon variant="filled">
                  <IconEyeOff style={{ width: rem('17px'), height: rem('17px') }} />
                </ThemeIcon>
              ) : (
                <ThemeIcon variant="subtle">
                  <IconEye style={{ width: rem('17px'), height: rem('17px') }} />
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
