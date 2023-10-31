import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { loader as gamesLoader } from './pages/Root';
import Home from './pages/Home';
import About from './pages/About';
import Categories from './pages/Categories';
import Games from './pages/Games';

import ErrorPage from './pages/ErrorPage';
import { Game } from './sections/Game/Game';
import { Search } from './sections/Search/Search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: gamesLoader,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/games',
        element: <Games />,
      },
      {
        path: '/games/categories',
        element: <Categories />,
      },
      {
        path: '/games/:id',
        element: <Game />,
      },

      {
        path: '/search/:query',
        element: <Search />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} fallbackElement={<Home />} />;
}
