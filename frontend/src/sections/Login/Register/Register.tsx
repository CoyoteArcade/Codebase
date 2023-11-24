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

export function Register() {
  const theme = useMantineTheme();
  const [visible, { toggle }] = useDisclosure(false);

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
          <TextInput label="Email" placeholder="" required />
          <TextInput mt="md" label="Username" placeholder="" required />
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
                <ThemeIcon color="default" variant="subtle">
                  <IconEyeOff style={{ width: rem('17px'), height: rem('17px') }} />
                </ThemeIcon>
              )
            }
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
                <ThemeIcon variant="light">
                  <IconEye style={{ width: rem('17px'), height: rem('17px') }} />
                </ThemeIcon>
              ) : (
                <ThemeIcon color="default" variant="subtle">
                  <IconEyeOff style={{ width: rem('17px'), height: rem('17px') }} />
                </ThemeIcon>
              )
            }
          />
          <Button fullWidth mt="xl">
            Register
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
