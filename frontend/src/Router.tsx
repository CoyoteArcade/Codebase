import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import {loader as gamesLoader} from './pages/Root';
import {Game} from './sections/Game/Game';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: gamesLoader,
    children: [
      { 
        path: '/',
        element: <Home />,
      },
      { 
        path: '/about', 
        element: <About /> 
      },
      {
        path: '/games/:id',
        element: <Game />,
      }
    ],
    errorElement: <ErrorPage />,
  },
]);



export function Router() {
  return <RouterProvider router={router} fallbackElement={<Home />} />;
}
