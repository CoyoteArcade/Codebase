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
import { IconEye, IconEyeOff } from '@tabler/icons-react';
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import classes from './Login.module.css';
import { AuthContext } from '../../utilities/auth/AuthContext';

export function Login() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, setUser } = useContext(AuthContext);

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
    let response = {};
    try {
      const request = await fetch('https://delightful-sombrero-slug.cyclic.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email, password: password}),
      });
      response = await request.json();
      setUser((response as any).user);
      navigate('/');
    } catch(error) {
      console.log("error", error);
      response = {error: error};
      setUser(null);
    }
    console.log("response", response);
  }


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
                <ThemeIcon variant="light">
                  <IconEye style={{ width: rem('17px'), height: rem('17px') }} />
                </ThemeIcon>
              ) : (
                <ThemeIcon variant="subtle">
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
