import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { loader as gamesLoader } from './pages/Root';
import Home from './pages/Home';
import About from './pages/About';
import Categories from './pages/Categories';
import Games from './pages/Games';

import ErrorPage from './pages/ErrorPage';
import { Game } from './sections/Game/Game';
import { Search } from './sections/Search/Search';
import { Login } from './sections/Login/Login';
import { ForgotPassword } from './sections/Login/ForgotPassword/ForgotPassword';
import { Register } from './sections/Login/Register/Register';

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
        path: '/login',
        element: <Login />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      },
      {
        path:'/register',
        element: <Register />,
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
