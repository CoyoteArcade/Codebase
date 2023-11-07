import { Container, Box } from '@mantine/core';

const aboutText =
  "This is Coyote Arcade, an exclusive digital gaming platform tailored specifically to showcase and market games developed by the prodigious talents at California State University, San Bernardino (CSUSB). Recognizing the burgeoning potential and creativity of our student body, this platform will serve as a nexus between student developers and gaming aficionados worldwide. More than just a sales platform, Coyote Arcade will foster a sense of community, offering features like student developer profiles, game demos, robust rating and review systems, and community forums where feedback flows freely. This initiative will not only provide a commercial outlet for student creations but also equip them with real-world insights into the market's dynamics, user preferences, and iterative development based on feedback. By bridging the gap between academia and the commercial world, we endeavor to elevate CSUSB's reputation in the digital arts and provide a tangible pathway for students to thrive in the competitive gaming industry.";

export default function About() {
  return (
    <Box h="100%" bg="var(--mantine-primary-color-light)">
      <Container
        h="100%"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <h1 style={{ textAlign: 'center' }}> About Coyote Arcade</h1>
        <p style={{ lineHeight: '2', padding: '40px', fontSize: '15px' }}>{aboutText}</p>
      </Container>
    </Box>
  );
}
