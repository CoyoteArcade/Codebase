import { useRouteError } from "react-router-dom";

// export default function ErrorPage() {
//     const error:any = useRouteError();
//     console.error(error);

//     return (
//         <div id="error-page">
//             <h1>Oops!</h1>
//             <p>Sorry, an unexpected error has ocurred!</p>
//             <p>
//                 <i>{error.statusText || error.message}</i>
//             </p>
//         </div>
//     );

// }

import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './ErrorPage.module.css';

export default function ServerError() {
  return (
    <div className={classes.root}>
      <Container>
        <div className={classes.label}>500</div>
        <Title className={classes.title}>Something bad just happened...</Title>
        <Text size="lg" ta="center" className={classes.description}>
          Our servers could not handle your request. Don&apos;t worry, our development team was
          already notified. Try refreshing the page.
        </Text>
        <Group justify="center">
          <Button variant="white" size="md">
            Refresh the page
          </Button>
        </Group>
      </Container>
    </div>
  );
}