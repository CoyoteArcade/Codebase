import {
  Box,
  Text,
  Title,
  Anchor,
  Paper,
  TextInput,
  PasswordInput,
  Button,
  useMantineTheme,
  ThemeIcon,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './Register.module.css';
import { useContext, useState } from 'react';
import { AuthContext } from '@/utilities/auth/AuthContext';

export function Register() {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const [visible, { toggle }] = useDisclosure(false);
  const { user, setUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChange = (event:any) => {
    if(event.target.id === 'email') {
      setEmail(event.target.value);
    } else if(event.target.id === 'username') {
      setUsername(event.target.value);
    } else if(event.target.id === 'password') {
      setPassword(event.target.value);
    } else if(event.target.id === 'confirm-password') {
      setConfirmPassword(event.target.value);
    } else {
      console.log('Error: handleChange()');
    }
  };

  const handleSignup = async () => {
    if(password !== confirmPassword) {
      console.log('Error: Passwords do not match');
      return;
    }
    const request = await fetch('https://delightful-sombrero-slug.cyclic.app/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email, username: username, password: password, confirmPassword: confirmPassword}),
    });
    const response = await request.json();
    console.log("response", response);
    if(response.message === "Signed up") {
      window.alert("Signup successful!");
      setUser((response as any).user);
      navigate('/');
    } else if(response.message === "Error signing up") {
      console.log(response.error, response.errorCode);
      window.alert(`Error: ${response.message} (${response.errorCode})`);
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes['register-container']}>
        <Title ta="center" className={classes.title}>
          Welcome!
        </Title>

        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Already have an account?{' '}
          <Anchor size="sm" component={Link} to="/login">
            Log in
          </Anchor>
        </Text>

        <Paper
          className={classes['register-form']}
          withBorder
          shadow="md"
          p={30}
          mt={30}
          radius="md"
        >
          <TextInput label="Email" placeholder="" required id="email" value={email} onChange={handleChange} />
          <TextInput mt="md" label="Username" placeholder="" required id="username" value={username} onChange={handleChange} />
          <PasswordInput
            classNames={{ visibilityToggle: classes['visibility-toggle'] }}
            label="Password"
            required
            mt="md"
            visible={visible}
            onVisibilityChange={toggle}
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
            id="password"
            value={password}
            onChange={handleChange}
          />
          <PasswordInput
            classNames={{ visibilityToggle: classes['visibility-toggle'] }}
            label="Confirm Password"
            required
            error={password !== confirmPassword && 'Passwords do not match' }
            mt="md"
            visible={visible}
            onVisibilityChange={toggle}
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
            id="confirm-password"
            value={confirmPassword}
            onChange={handleChange}
          />
          <Button fullWidth mt="xl" onClick={handleSignup} disabled={(password === confirmPassword && password.length && email.length && username.length) ? false : true}>
            Register
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
