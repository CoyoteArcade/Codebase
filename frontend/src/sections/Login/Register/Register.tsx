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
import { Link } from 'react-router-dom';
import classes from './Register.module.css';
import { useState } from 'react';

export function Register() {
  const theme = useMantineTheme();
  const [visible, { toggle }] = useDisclosure(false);
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
    const request = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email, username: username, password: password, confirmPassword: confirmPassword}),
    });
    const response = await request.json();
    console.log("response", response);
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
                <ThemeIcon variant="filled">
                  <IconEyeOff style={{ width: rem('17px'), height: rem('17px') }} />
                </ThemeIcon>
              ) : (
                <ThemeIcon variant="subtle">
                  <IconEye style={{ width: rem('17px'), height: rem('17px') }} />
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
            mt="md"
            visible={visible}
            onVisibilityChange={toggle}
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
            id="confirm-password"
            value={confirmPassword}
            onChange={handleChange}
          />
          <Button fullWidth mt="xl" onClick={handleSignup}>
            Register
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
