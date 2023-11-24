import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root, loader as gamesLoader } from './pages/Root/Root';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import Home from './pages/Home';
import About from './pages/About';
import Categories from './pages/Categories';
import Games from './pages/Games';
import Test from './pages/Test';

import { Game } from './sections/Game/Game';
import { Search } from './sections/Search/Search';
import { Login } from './sections/Login/Login';
import { Register } from './sections/Login/Register/Register';
import { ForgotPassword } from './sections/Login/ForgotPassword/ForgotPassword';

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
        element: <ForgotPassword />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/search/:query',
        element: <Search />,
      },
      {
        path: '/test',
        element: <Test />,
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
