import { Container, Text, Title, Anchor, Paper, TextInput, PasswordInput, Button, useMantineTheme } from "@mantine/core";
import { Link } from "react-router-dom";
import classes from './Register.module.css';

export function Register() {
    const theme = useMantineTheme();
    const classes = {
        title: {
            color: theme.colors.dark[9],
            fontWeight: 700,
            fontSize: 40,
            lineHeight: 1.2,
        },
    };
    return (
        <Container size={420} my={40}>
        <Title ta="center">
            Welcome!
        </Title>

        <Text c="dimmed" size="sm" ta="center" mt={5}>
            Already have an account?{' '}
            <Link to="/login" style={{textDecoration:"none"}}>
                <Anchor size="sm" component="button">
                Sign in
                </Anchor>
            </Link>
        </Text>
    
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="Email" placeholder="" required />
            <TextInput label="Username" placeholder="" required />
            <PasswordInput label="Password" placeholder="Your password" required mt="md" />
            <PasswordInput label="Confirm Password" placeholder="Your password" required mt="md" />
            <Button fullWidth mt="xl">
            Sign up
            </Button>
        </Paper>
        </Container>
    );
}