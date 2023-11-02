import { Link, useRouteError } from 'react-router-dom';

// export default function ErrorPage() {

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

import { Box, Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './styles/ErrorPage.module.css';

export default function ServerError() {
  const error: any = useRouteError();

  return (
    <div className={classes.root}>
      <div className={classes.label}>ERROR</div>
      <Title className={classes.title}>Something bad just happened...</Title>
      <Text size="lg" ta="center" className={classes.description}>
        Our servers could not handle your request. Don&apos;t worry, our development team was
        already notified. Try refreshing the page.
      </Text>
      <Group justify="center">
        <Link to="/">
          <Button variant="white" size="md">
            Take me home, please!
          </Button>
        </Link>
      </Group>
    </div>
  );
}
