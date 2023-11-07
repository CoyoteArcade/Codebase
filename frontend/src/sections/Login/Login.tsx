import { Link } from 'react-router-dom';
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

import classes from './Login.module.css';

export function Login() {
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
          <TextInput label="Email" placeholder="you@csusb.dev" required />
          <PasswordInput
            classNames={{ visibilityToggle: classes['visibility-toggle'] }}
            label="Password"
            required
            mt="md"
            visibilityToggleButtonProps={{ 'aria-label': 'Toggle password visibility' }}
            visibilityToggleIcon={({ reveal }) =>
              reveal ? (
                <ThemeIcon variant="filled">
                  <IconEye style={{ width: rem('17px'), height: rem('17px') }} />
                </ThemeIcon>
              ) : (
                <ThemeIcon variant="subtle">
                  <IconEyeOff style={{ width: rem('17px'), height: rem('17px') }} />
                </ThemeIcon>
              )
            }
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component={Link} size="sm" to="/forgot-password">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl">
            Log in
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
