import { Image, Text, Flex, Stack, Container } from '@mantine/core';
import arcade from '../../assets/coyotearcade.png';
import classes from './Logo.module.css';

function StyledText({ children }: { children: string }) {
  return (
    <Text c="coyote-blue" className={classes.text}>
      {children}
    </Text>
  );
}

function Logo() {
  return (
    <>
      <Container className={classes.wrapper}>
        <Flex className={classes['wrapper-flex']}>
          <Image src={arcade} className={classes.img} />
          <Stack gap="0">
            <StyledText>COYOTE</StyledText>
            <StyledText>ARCADE</StyledText>
          </Stack>
        </Flex>
      </Container>
    </>
  );
}

export default Logo;
