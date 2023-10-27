// import { Image, Container, Title, Button, Group, Text, List, ThemeIcon, rem } from '@mantine/core';
// import { IconCheck } from '@tabler/icons-react';
// import image from './image.svg';
// import classes from './Hero.module.css';

import { Container, Title, Text, Button } from '@mantine/core';
import classes from './Hero.module.css';

export default function HeroImageRight() {
  return (
    <div className={classes.root}>
      <Container size="lg">
        <div className={classes.inner}>
          <div className={classes.content}>
            {/* <Title className={classes.title}>
              A{' '}
              <Text
                component="span"
                inherit
                variant="gradient"
                gradient={{ from: 'pink', to: 'white' }}
              >
                fully featured
              </Text>{' '}
              React components library
            </Title> */}

            {/* <Text className={classes.description} mt={30}>
              Build fully functional accessible web applications with ease – Mantine includes more
              than 100 customizable components and hooks to cover you in any situation
            </Text> */}

            {/* <Button
              variant="gradient"
              gradient={{ from: 'pink', to: 'yellow' }}
              size="xl"
              className={classes.control}
              mt={40}
            >
              Get started
            </Button> */}
          </div>
        </div>
      </Container>
    </div>
  );
}

// export default function HeroBullets() {
//   return (
//     <Container size="md">
//       <div className={classes.inner}>
//         <div className={classes.content}>
//           <Title className={classes.title}>
//             A <span className={classes.highlight}>modern</span> React <br /> components library
//           </Title>
//           <Text c="dimmed" mt="md">
//             Build fully functional accessible web applications faster than ever – Mantine includes
//             more than 120 customizable components and hooks to cover you in any situation
//           </Text>

//           <List
//             mt={30}
//             spacing="sm"
//             size="sm"
//             icon={
//               <ThemeIcon size={20} radius="xl">
//                 <IconCheck style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
//               </ThemeIcon>
//             }
//           >
//             <List.Item>
//               <b>TypeScript based</b> – build type safe applications, all components and hooks
//               export types
//             </List.Item>
//             <List.Item>
//               <b>Free and open source</b> – all packages have MIT license, you can use Mantine in
//               any project
//             </List.Item>
//             <List.Item>
//               <b>No annoying focus ring</b> – focus ring will appear only when user navigates with
//               keyboard
//             </List.Item>
//           </List>

//           <Group mt={30}>
//             <Button radius="xl" size="md" className={classes.control}>
//               Get started
//             </Button>
//             <Button variant="default" radius="xl" size="md" className={classes.control}>
//               Source code
//             </Button>
//           </Group>
//         </div>
//         <Image src={image} className={classes.image} />
//       </div>
//     </Container>
//   );
// }
