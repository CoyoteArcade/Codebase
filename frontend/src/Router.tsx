import { createBrowserRouter, Navigate, RouterProvider, useParams } from 'react-router-dom';
import Root, { loader as gamesLoader } from './pages/Root';
import Home from './pages/Home';
import About from './pages/About';
import Categories from './pages/Categories';
import Games from './pages/Games';
import Test from './pages/Test';

import ErrorPage from './pages/ErrorPage';
import { Game } from './sections/Game/Game';
import { Search } from './sections/Search/Search';
import { Login } from './sections/Login/Login';
import { ForgotPassword } from './sections/Login/ForgotPassword/ForgotPassword';
import { Register } from './sections/Login/Register/Register';
import { useContext } from 'react';
import { AuthContext } from './utilities/auth/AuthContext';

function RequireAuth({ children, redirectTo }: any) {
  const { user } = useContext(AuthContext);
  if (user) {
    return children;
  } else {
    return <Navigate to={redirectTo} replace={true} />;
  }
}

function GuestOnly({ children, redirectTo }: any) {
  const { user } = useContext(AuthContext);
  if (!user) {
    return children;
  } else {
    return <Navigate to={redirectTo} replace={true} />;
  }
}

function GameCategoryWrapper() {
  const {category} = useParams();
  console.log(category);
  return <Games gameCategory={category} />;
}
  

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
        path: '/games/categories/:category',
        element: <GameCategoryWrapper />,
      },
      {
        path: '/games/:id',
        element: <Game />,
      },
      {
        path: '/login',
        element: (
          <GuestOnly redirectTo="/" required={true}>
            <Login />
          </GuestOnly>
        ),
      },
      {
        path: '/forgot-password',
        element: (
          <GuestOnly redirectTo="/" required={true}>
            <ForgotPassword />
          </GuestOnly>
        ),
      },
      {
        path: '/profile',
        element:  (
          <RequireAuth redirectTo="/login" required={true}>
            <ErrorPage />
          </RequireAuth>
        ),
      },
      {
        path: '/register',
        element: (
          <GuestOnly redirectTo="/" required={true}>
            <Register />
          </GuestOnly>
        ),
      },
      {
        path: '/upload',
        element: (
          <RequireAuth redirectTo="/login" required={true}>
            <ErrorPage />
          </RequireAuth>
        ),
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
